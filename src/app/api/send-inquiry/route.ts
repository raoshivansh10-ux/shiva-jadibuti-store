import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, company, product, quantity, message, city, formType } = data;

    const emailSubject = `[Wholesale Inquiry] ${product || "General Order"} from ${name || "Buyer"} (${company || "Individual"})`;
    
    const formattedMessage = `
========================================
NEW WHOLESALE INQUIRY - SHIVA JADIBUTI STORE
========================================

Inquiry Type: ${formType || "Website Contact / Quote"}
Date & Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}

CUSTOMER DETAILS:
-----------------
Name: ${name || "N/A"}
Company / Brand: ${company || "N/A"}
Email: ${email || "N/A"}
Phone / WhatsApp: ${phone || "N/A"}
Location / City: ${city || "N/A"}

ORDER SPECIFICATIONS:
---------------------
Target Product: ${product || "General Catalog Inquiry"}
Required Quantity: ${quantity || "Not specified"}

CUSTOM SPECIFICATIONS / NOTES:
------------------------------
${message || "No additional notes provided."}

========================================
Sent directly from Shiva Jadibuti Store Online Portal
Target Destination: shivajadibutistore@gmail.com
========================================
    `.trim();

    // 1. Try sending via FormSubmit API to deliver directly to shivajadibutistore@gmail.com
    try {
      const response = await fetch("https://formsubmit.co/ajax/shivajadibutistore@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: emailSubject,
          _template: "table",
          _captcha: "false",
          Name: name,
          Company: company || "N/A",
          Email: email,
          Phone: phone,
          City: city || "N/A",
          Product: product || "General Inquiry",
          Quantity: quantity || "N/A",
          Requirement_Details: message || "None",
          Submission_Time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        }),
      });

      if (!response.ok) {
        console.warn("FormSubmit response status:", response.status);
      }
    } catch (err) {
      console.error("Error sending via FormSubmit:", err);
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry successfully processed and dispatched to shivajadibutistore@gmail.com",
    });
  } catch (error) {
    console.error("Error handling inquiry submission:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
