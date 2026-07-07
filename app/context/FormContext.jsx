"use client";

import { createContext, useContext, useState, useCallback } from "react";

const FormContext = createContext(null);

export function FormProvider({ children }) {
  const [formFields, setFormFields] = useState({}); // { fieldName: { value, label, status, source } }
  const [formMeta, setFormMeta] = useState(null); // { title, service, requiredFields[] }
  const [isFormActive, setIsFormActive] = useState(false);
  const [completionScore, setCompletionScore] = useState(0);
  const [preFilledFields, setPreFilledFields] = useState({}); // Stores data prior to mounting form

  const registerForm = useCallback((meta) => {
    setFormMeta(meta);
    setIsFormActive(true);
    // Initialize fields merging with pre-filled ones if any
    const fields = {};
    meta.fields.forEach((f) => {
      const preVal = preFilledFields[f.name] || "";
      fields[f.name] = {
        value: preVal,
        label: f.label,
        status: preVal ? "filled" : "missing",
        source: preVal ? "AI Agent" : null,
        required: f.required
      };
    });
    setFormFields(fields);
    
    // Clear pre-filled fields after loading them
    setPreFilledFields({});
    
    // Recalculate completion
    const total = Object.keys(fields).filter(k => fields[k].required).length;
    const filled = Object.keys(fields).filter(k => fields[k].required && fields[k].value).length;
    setCompletionScore(total > 0 ? Math.round((filled / total) * 100) : 0);
  }, [preFilledFields]);

  const unregisterForm = useCallback(() => {
    setFormMeta(null);
    setIsFormActive(false);
    setFormFields({});
    setCompletionScore(0);
  }, []);

  const fillField = useCallback((fieldName, value, source = "AI Agent") => {
    setFormFields((prev) => {
      const updated = {
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          value,
          status: "filled",
          source,
          filledAt: new Date().toISOString(),
        },
      };
      // Recalculate completion
      const total = Object.keys(updated).filter(k => updated[k].required).length;
      const filled = Object.keys(updated).filter(k => updated[k].required && updated[k].value).length;
      setCompletionScore(total > 0 ? Math.round((filled / total) * 100) : 0);
      return updated;
    });
  }, []);

  const fillMultipleFields = useCallback((fieldValues, source = "AI Agent") => {
    setFormFields((prev) => {
      const updated = { ...prev };
      Object.entries(fieldValues).forEach(([fieldName, value]) => {
        if (updated[fieldName]) {
          updated[fieldName] = {
            ...updated[fieldName],
            value,
            status: "filled",
            source,
            filledAt: new Date().toISOString(),
          };
        }
      });
      const total = Object.keys(updated).filter(k => updated[k].required).length;
      const filled = Object.keys(updated).filter(k => updated[k].required && updated[k].value).length;
      setCompletionScore(total > 0 ? Math.round((filled / total) * 100) : 0);
      return updated;
    });
  }, []);

  const updateFieldManually = useCallback((fieldName, value) => {
    setFormFields((prev) => {
      const updated = {
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          value,
          status: value ? "manual" : "missing",
          source: "User Input",
        },
      };
      const total = Object.keys(updated).filter(k => updated[k].required).length;
      const filled = Object.keys(updated).filter(k => updated[k].required && updated[k].value).length;
      setCompletionScore(total > 0 ? Math.round((filled / total) * 100) : 0);
      return updated;
    });
  }, []);

  const getFormSummary = useCallback(() => {
    if (!formMeta) return null;
    const fields = Object.entries(formFields).map(([name, data]) => ({
      name,
      label: data.label,
      filled: !!data.value,
      value: data.value,
      required: data.required,
    }));
    const missing = fields.filter(f => f.required && !f.filled);
    const filled = fields.filter(f => f.filled);
    return {
      title: formMeta.title,
      service: formMeta.service,
      totalFields: fields.length,
      filledCount: filled.length,
      missingCount: missing.length,
      completionScore,
      missingFields: missing.map(f => f.label),
      filledFields: filled.map(f => ({ label: f.label, value: f.value })),
      allFields: fields,
    };
  }, [formFields, formMeta, completionScore]);

  return (
    <FormContext.Provider
      value={{
        formFields,
        formMeta,
        isFormActive,
        completionScore,
        preFilledFields,
        setPreFilledFields,
        registerForm,
        unregisterForm,
        fillField,
        fillMultipleFields,
        updateFieldManually,
        getFormSummary,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormContext must be used within FormProvider");
  return ctx;
}
