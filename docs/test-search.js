// Using native global fetch (Node.js 18+)

async function testSearchAndPrefill() {
  console.log("Testing Smart Bharat AI Search Classification & Extraction API...");
  try {
    const response = await fetch("http://localhost:3000/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: "apply for passport my name is Rahul Kumar and I live in Haryana"
      })
    });

    const data = await response.json();
    console.log("\nResponse Status:", response.status);
    console.log("Response JSON:", JSON.stringify(data, null, 2));

    if (data.service === "passport" && data.extractedDetails && data.extractedDetails.fullName === "Rahul Kumar") {
      console.log("\n✅ SUCCESS: Search query correctly classified as 'passport' and details auto-extracted!");
    } else {
      console.log("\n❌ FAILED: Classification or extraction failed.");
    }
  } catch (error) {
    console.error("Test failed with error:", error);
  }
}

testSearchAndPrefill();
