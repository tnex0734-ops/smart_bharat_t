// Using native global fetch (Node.js 18+)

async function testChat() {
  console.log("Testing Smart Bharat AI Chat API...");
  try {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "user", content: "Hi! My name is Rahul Kumar. I live in Haryana. What is my name?" }
        ],
        formContext: {
          title: "Income Certificate Application",
          service: "Income Certificate",
          allFields: [
            { name: "fullName", label: "Full Name", required: true, filled: false },
            { name: "state", label: "State", required: true, filled: false }
          ],
          missingFields: ["Full Name", "State"],
          completionScore: 0
        }
      })
    });

    const data = await response.json();
    console.log("\nResponse Status:", response.status);
    console.log("Response JSON:", JSON.stringify(data, null, 2));

    if (data.formData && data.formData.fullName === "Rahul Kumar") {
      console.log("\n✅ SUCCESS: Agentic form auto-fill successfully extracted 'Rahul Kumar'!");
    } else {
      console.log("\n❌ FAILED: Form extraction failed or returned unexpected values.");
    }
  } catch (error) {
    console.error("Test failed with error:", error);
  }
}

testChat();
