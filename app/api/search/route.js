import Groq from "groq-sdk";

export const dynamic = 'force-dynamic';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "dummy_key_for_build",
});

const SYSTEM_PROMPT = `You are a Smart Search & Extraction Agent for the Smart Bharat civic platform. Your job is to classify the user's search query and extract any relevant personal/form data.

Smart Bharat has 3 application forms available:
1. "passport" (Passport Application)
2. "income-certificate" (Income Certificate Application)
3. "aadhaar" (Aadhaar Card Application)

## Classification Rules:
- If the user is specifically trying to apply for, register, search for, or get one of these three services, classify it. For example, "passport apply", "renew passport", "income certificate application", "apply for Aadhaar" should match the respective service.
- If the query does not specifically match any of these three, return null for the service.

## Extraction Rules:
- If a service is matched AND the user has provided details about themselves in their query (e.g., name, phone number, state, income, etc.), extract them.
- Map the extracted details to the respective field names:
  - For "income-certificate": fullName, fatherName, dob, gender, aadhaar, phone, email, address, state, district, pincode, occupation, annualIncome, incomeSource, purpose
  - For "passport": fullName, surname, dob, gender, placeOfBirth, aadhaar, pan, phone, email, address, state, district, pincode, fatherName, motherName, emergencyContact, emergencyPhone
  - For "aadhaar": fullName, dob, gender, phone, email, address, state, district, pincode, fatherName

## Output Format:
You MUST output a valid JSON object ONLY. Do not include any other text, markdown formatting, or explanations. The format must be exactly:
{
  "service": "passport" | "income-certificate" | "aadhaar" | null,
  "extractedDetails": { ... } | null
}
`;

export async function POST(request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return Response.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Query to analyze: "${query}"` }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(chatCompletion.choices[0]?.message?.content || "{}");

    return Response.json(result);
  } catch (error) {
    console.error("GROQ Search API Error:", error);
    return Response.json(
      { service: null, extractedDetails: null },
      { status: 500 }
    );
  }
}
