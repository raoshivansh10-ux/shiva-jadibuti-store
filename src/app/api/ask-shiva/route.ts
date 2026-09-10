import { NextResponse } from "next/server";
import {
  getCatalogPromptContext,
  searchCatalogProducts,
  getCatalogProductById,
  detectLanguage,
  detectUserIntent,
  resolveReferencedProduct,
  UnifiedProduct,
  UNIFIED_CATALOG,
} from "@/utils/aiCatalog";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages = [], query = "", previousProducts = [] } = body;

    const lastUserMessage: string =
      query ||
      (messages.length > 0 ? messages[messages.length - 1].content : "") ||
      "";

    if (!lastUserMessage.trim()) {
      return NextResponse.json(
        { error: "Query or message is required" },
        { status: 400 }
      );
    }

    const lowerQuery = lastUserMessage.toLowerCase();
    const detectedLang = detectLanguage(lastUserMessage);
    const intent = detectUserIntent(lastUserMessage);

    // Check for medical condition / symptom / treatment inquiry in English, Hindi, and Hinglish
    const medicalKeywords = [
      "diagnose", "diagnosis", "prescribe", "prescription", "cure", "cure my",
      "treat", "treatment", "medicine", "medical dosage", "dosage", "dose",
      "disease", "illness", "fever", "diabetes", "diabetic", "hypertension",
      "blood pressure", "bp", "infection", "platelet loss", "cancer",
      "ulcer", "dengue", "asthma", "bronchitis", "eczema", "psoriasis",
      "pain", "chronic", "symptom", "symptoms", "doctor",
      "heart", "sugar",
      // Hindi / Hinglish medical terms
      "bimari", "bimaari", "ilaj", "ilaaj", "dawa", "dawai", "madhumeh",
      "sugar ki dawa", "sugar ki medicine", "bp ki dawa", "heart ki dawa",
      "dard", "bukhar", "khansi ki dawa", "infection ka ilaj", "heart ke liye", "sugar ke liye", "bp ke liye"
    ];

    const isMedicalQuery = medicalKeywords.some((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, "i");
      return regex.test(lowerQuery);
    });

    const apiKey = process.env.OPENAI_API_KEY;

    // If OpenAI API key is available, call OpenAI
    if (apiKey && apiKey.trim() !== "" && apiKey !== "your_openai_api_key_here") {
      try {
        const catalogContext = getCatalogPromptContext();

        const systemPrompt = `You are "Ask Shiva AI", the official multilingual botanical product discovery assistant for Shiva Jadibuti Store (a premier wholesale supplier of natural herbs, roots, leaves, barks, powders, and raw spices in India).

CRITICAL INSTRUCTIONS & BOUNDARIES:

1. STRICT CATALOG GROUNDING:
   - Recommend ONLY products that actually exist in the Shiva Jadibuti Store catalog provided below.
   - NEVER invent a product, price, ingredient, availability, specification, or product benefit.
   - If there is NO matching product in the catalog, state politely:
     • English: "I couldn't find a matching product in our current catalog."
     • Hinglish: "Mujhe hamare current catalog mein iska matching product nahi mila."
     • Hindi: "मुझे हमारे वर्तमान कैटलॉग में इससे मिलता-जुलता उत्पाद नहीं मिला।"

2. MULTILINGUAL CONVERSATIONAL UNDERSTANDING & LANGUAGE MIRRORING:
   - The user may speak English, Hindi (Devanagari), Hinglish (Hindi in Roman letters), or mixed Hindi+English.
   - ALWAYS reply in the exact same language and tone as the user.
   - Understand Indian conversational phrases, typos, and vernacular names (e.g., "ashwaganda", "haldi", "chahiye", "dikhao", "moringa hai kya", "ye wala dikhao", "pehla wala cart me daal do", "iska rate kya hai").

3. CONTEXT & REFERENCE RESOLUTION:
   - Understand references to products shown in earlier conversation turns (e.g. "pehla wala", "dusra wala", "ye", "ye wala", "iska", "is product", "first one", "second one").
   - If the user asks to add a referenced product to cart (e.g. "cart me daal do", "pehla wala cart me add karo"), identify the exact product ID and set the cartAction field.

4. HEALTH-RELATED QUERY HANDLING & MEDICAL SAFETY:
   - You are a PRODUCT DISCOVERY ASSISTANT, NOT A DOCTOR.
   - When a customer asks about a body part, disease, symptom, or condition, DO NOT claim a product "treats", "cures", or "is good for your disease".
   - For general wellness: Use neutral wording ("Traditionally associated with...", "Listed in our catalog for...", "Hamare catalog mein traditional wellness ke liye listed hai...").
   - For medical diseases/symptoms (diabetes, BP, severe illness, medicine requests):
     • English: "I can help you explore relevant products in our catalog, but I can't diagnose a condition or recommend treatment. If you have a medical condition, take prescription medicines, or have concerning symptoms, please consult a qualified healthcare professional."
     • Hinglish: "Main aapko hamare catalog mein available relevant herbal products explore karne mein madad kar sakta hoon, lekin main kisi bimari ka diagnosis ya treatment recommend nahi kar sakta. Kisi bhi medical condition ya prescription medicine ke liye kripya qualified healthcare professional se consult karein."
     • Hindi: "मैं आपको हमारे कैटलॉग में उपलब्ध उत्पादों की जानकारी दे सकता हूँ, लेकिन मैं किसी बीमारी का निदान या उपचार नहीं बता सकता। स्वास्थ्य संबंधी समस्या के लिए कृपया योग्य चिकित्सक से परामर्श लें।"
   - Show relevant products ONLY as botanical product information.
   - Always remember: PRODUCT INFORMATION ≠ MEDICAL ADVICE.

5. OUTPUT SCHEMA (JSON ONLY):
   {
     "message": "Your conversational response in Markdown (matching user's language)",
     "matchedProductIds": ["id-1", "id-2"], // Exact IDs from catalog context, max 4 items
     "suggestedQuestions": ["Question 1", "Question 2", "Question 3"], // In user's language
     "isMedicalQuery": boolean,
     "cartAction": { "productId": "exact-product-id", "action": "add" } // Optional, when user requests cart addition
   }

CATALOG DATABASE CONTEXT:
${catalogContext}`;

        // Format conversation history for OpenAI
        const formattedMessages = [
          { role: "system", content: systemPrompt },
          ...messages.slice(-6).map((m: ChatMessage) => ({
            role: m.role,
            content: m.content,
          })),
        ];

        // If the last message was not in messages array
        if (
          formattedMessages[formattedMessages.length - 1]?.role !== "user" ||
          formattedMessages[formattedMessages.length - 1]?.content !== lastUserMessage
        ) {
          formattedMessages.push({ role: "user", content: lastUserMessage });
        }

        const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: formattedMessages,
            temperature: 0.25,
            response_format: { type: "json_object" },
          }),
        });

        if (openAiRes.ok) {
          const data = await openAiRes.json();
          const parsed = JSON.parse(data.choices[0].message.content);

          // Validate and resolve matched product IDs against real catalog
          const matchedProducts: UnifiedProduct[] = (parsed.matchedProductIds || [])
            .map((id: string) => getCatalogProductById(id))
            .filter((p: UnifiedProduct | undefined): p is UnifiedProduct => Boolean(p));

          return NextResponse.json({
            message: parsed.message || "Here is product information from our catalog:",
            matchedProducts: matchedProducts.slice(0, 4),
            suggestedQuestions: parsed.suggestedQuestions || [
              detectedLang === "hinglish" ? "Wholesale rate chahiye" : "Show me herbal powders",
              detectedLang === "hinglish" ? "Bulk availability batao" : "Tell me about bulk availability",
              detectedLang === "hinglish" ? "Quote request karein" : "Get wholesale quote",
            ],
            isMedicalQuery: Boolean(parsed.isMedicalQuery || isMedicalQuery),
            cartAction: parsed.cartAction || null,
          });
        }
      } catch (aiErr) {
        console.warn("OpenAI API call failed, falling back to local multilingual catalog search:", aiErr);
      }
    }

    // =========================================================================
    // LOCAL MULTILINGUAL SEARCH & CONVERSATION ENGINE (FALLBACK / OFFLINE MODE)
    // =========================================================================
    const matched = searchCatalogProducts(lastUserMessage, 4, previousProducts);
    const referencedProduct = resolveReferencedProduct(lastUserMessage, previousProducts);

    let assistantMessage = "";
    let suggested: string[] = [];
    let cartAction = null;

    // 1. ADD TO CART INTENT
    if (intent === "ADD_TO_CART" && (referencedProduct || matched.length > 0)) {
      const target = referencedProduct || matched[0];
      cartAction = { productId: target.id, action: "add" };

      if (detectedLang === "hindi") {
        assistantMessage = `जी बिल्कुल! मैंने **${target.name} ${target.hindiName ? `(${target.hindiName})` : ""}** को आपके Quote Cart में जोड़ दिया है।\n\nआप नीचे दिए गए बटन से सीधे होलसेल कोटेशन भी भेज सकते हैं।`;
        suggested = ["कोटेशन भेजें", "और उत्पाद देखें", "न्यूनतम ऑर्डर मात्रा (MOQ) कितनी है?"];
      } else if (detectedLang === "hinglish") {
        assistantMessage = `Bilkul! 🛒 Maine **${target.name} ${target.hindiName ? `(${target.hindiName})` : ""}** ko aapke Quote Cart mein add kar diya hai.\n\nAap bulk requirement ke liye direct Wholesale Quote bhi request kar sakte hain:`;
        suggested = ["Wholesale quote request karein", "Aur products dikhao", "Iska MOQ kitna hai?"];
      } else {
        assistantMessage = `Added **${target.name}** to your Quote Cart (100 Kg standard unit).\n\nYou can submit your bulk quotation or explore specifications below:`;
        suggested = ["Submit wholesale quote", "Show other products", "What is the MOQ?"];
      }

      return NextResponse.json({
        message: assistantMessage,
        matchedProducts: [target],
        suggestedQuestions: suggested,
        isMedicalQuery: false,
        cartAction,
      });
    }

    // 2. CHECK PRICE / RETAIL PACK / WHOLESALE RATE / QUANTITY INQUIRY INTENT
    const retailGramRegex = /\b(\d+)\s*(g|gm|gms|gram|grams|packet|pouch)\b/i;
    const bulkQuantityRegex = /\b(\d+)\s*(kg|kilo|kilos|quintal|ton|tons|metric ton|mt)\b/i;
    
    const retailMatch = lastUserMessage.match(retailGramRegex);
    const bulkMatch = lastUserMessage.match(bulkQuantityRegex);

    if (
      (intent === "CHECK_PRICE" || intent === "REQUEST_WHOLESALE_QUOTE" || retailMatch || bulkMatch || lowerQuery.includes("pack") || lowerQuery.includes("retail") || lowerQuery.includes("rate") || lowerQuery.includes("bhav") || lowerQuery.includes("price")) &&
      (referencedProduct || matched.length > 0)
    ) {
      const target = referencedProduct || matched[0];
      const isRetailQuery = Boolean(retailMatch || lowerQuery.includes("retail") || lowerQuery.includes("pack") || lowerQuery.includes("chhota") || lowerQuery.includes("gram"));

      if (isRetailQuery) {
        const variantsList = target.retailVariants && target.retailVariants.length > 0
          ? target.retailVariants.map((v) => `• **${v.size}:** ₹${v.price} *(MRP: ₹${v.mrp})*`).join("\n")
          : `• **100 g:** ₹${target.startingRetailPrice || 149}\n• **250 g:** ₹${Math.round((target.startingRetailPrice || 149) * 2.3)}\n• **500 g:** ₹${Math.round((target.startingRetailPrice || 149) * 4.2)}\n• **1 Kg:** ₹${Math.round((target.startingRetailPrice || 149) * 7.8)}`;

        if (detectedLang === "hindi") {
          assistantMessage = `**${target.name} ${target.hindiName ? `(${target.hindiName})` : ""}** के रिटेल पैकेट मूल्य (Retail Prices):\n\n${variantsList}\n\n🚚 **₹999 से अधिक के ऑर्डर पर पूरे भारत में मुफ़्त डिलीवरी!**\nआप इसे सीधे कार्ट में जोड़ सकते हैं या ऑनलाइन ऑर्डर कर सकते हैं।`;
          suggested = ["कार्ट में जोड़ें", "चेकआउट करें", "होलसेल रेट दिखाएं"];
        } else if (detectedLang === "hinglish") {
          assistantMessage = `**${target.name} ${target.hindiName ? `(${target.hindiName})` : ""}** ke retail pack prices:\n\n${variantsList}\n\n🚚 **Free Pan-India Delivery on orders above ₹999!**\nAap ise direct cart mein add karke checkout kar sakte hain:`;
          suggested = ["Cart mein add karo", "Retail shop dekhein", "Bulk wholesale quote chahiye"];
        } else {
          assistantMessage = `Retail packaging and prices for **${target.name}**:\n\n${variantsList}\n\n🚚 **Free Pan-India Shipping on orders above ₹999!**\nYou can add individual pack sizes directly to your cart for checkout:`;
          suggested = ["Add to cart", "Proceed to checkout", "Get wholesale bulk quote"];
        }

        return NextResponse.json({
          message: assistantMessage,
          matchedProducts: [target],
          suggestedQuestions: suggested,
          isMedicalQuery: false,
        });
      }

      // Wholesale inquiry
      const qtyText = bulkMatch ? bulkMatch[0] : "";
      if (detectedLang === "hindi") {
        if (qtyText) {
          assistantMessage = `जी बिल्कुल। **${qtyText}** की थोक आवश्यकता के लिए मैं आपको फ़ैक्टरी कोटेशन (Wholesale Quote) का अनुरोध करने में मदद कर सकता हूँ।\n\n**${target.name}** के थोक आपूर्ति विवरण:\n• **उपलब्धता:** ${target.bulkAvailability}\n• **न्यूनतम ऑर्डर (MOQ):** ${target.moq}\n\nकृपया नीचे दिए गए **[Get Wholesale Quote]** बटन से अपना विवरण भेजें।`;
        } else {
          assistantMessage = `**${target.name} ${target.hindiName ? `(${target.hindiName})` : ""}** के लिए थोक आपूर्ति विवरण:\n\n• **उपलब्धता:** ${target.bulkAvailability}\n• **न्यूनतम ऑर्डर (MOQ):** ${target.moq}\n• **श्रेणी/प्रारूप:** ${target.form}\n\nसटीक फ़ैक्टरी थोक मूल्य (Wholesale Rate) प्राप्त करने के लिए कृपया **[Get Wholesale Quote]** बटन पर क्लिक करें।`;
        }
        suggested = ["कोटेशन फॉर्म खोलें", "कार्ट में जोड़ें", "रिटेल पैकेट मूल्य दिखाएं"];
      } else if (detectedLang === "hinglish") {
        if (qtyText) {
          assistantMessage = `Bilkul. **${qtyText}** ke bulk order ke liye main aapko wholesale quote request karne mein help kar sakta hoon.\n\n**${target.name} ${target.hindiName ? `(${target.hindiName})` : ""}** supply details:\n• **Bulk Availability:** ${target.bulkAvailability}\n• **Minimum Order (MOQ):** ${target.moq}\n• **Cut Form:** ${target.form}\n\nFactory direct rates aur dispatch schedule ke liye aap **[Get Wholesale Quote]** button se quote request submit kar sakte hain:`;
        } else {
          assistantMessage = `**${target.name} ${target.hindiName ? `(${target.hindiName})` : ""}** ke wholesale pricing aur bulk details:\n\n• **Bulk Supply:** ${target.bulkAvailability}\n• **Minimum Order (MOQ):** ${target.moq}\n• **Cut Form/Grade:** ${target.form}\n\nCommercial bulk rates ke liye aap neeche diye gaye **[Get Wholesale Quote]** button se direct factory quote request kar sakte hain:`;
        }
        suggested = ["Wholesale quote request karein", "Retail pack prices dikhao", "Aur options dikhao"];
      } else {
        if (qtyText) {
          assistantMessage = `Certainly. For **${qtyText}**, I can assist you with submitting a wholesale quote request for **${target.name}**:\n\n• **Bulk Supply:** ${target.bulkAvailability}\n• **Minimum Order (MOQ):** ${target.moq}\n• **Grade/Form:** ${target.form}\n\nPlease click **[Get Wholesale Quote]** below to receive tier pricing and CoA:`;
        } else {
          assistantMessage = `Wholesale supply and pricing details for **${target.name}**:\n\n• **Bulk Supply:** ${target.bulkAvailability}\n• **Minimum Order (MOQ):** ${target.moq}\n• **Cut Form/Grade:** ${target.form}\n\nFor commercial tier pricing and Certificate of Analysis (CoA), please request a wholesale quote below:`;
        }
        suggested = ["Get wholesale quote", "Show retail pack sizes", "Show more options"];
      }

      return NextResponse.json({
        message: assistantMessage,
        matchedProducts: [target],
        suggestedQuestions: suggested,
        isMedicalQuery: false,
      });
    }

    // 3. MEDICAL CONDITION / SYMPTOM INQUIRY (SAFETY ENFORCED)
    if (isMedicalQuery) {
      if (detectedLang === "hindi") {
        assistantMessage =
          "मैं आपको शिवा जड़ी-बूटी स्टोर के कैटलॉग में उपलब्ध उत्पादों की जानकारी दे सकता हूँ, लेकिन मैं किसी बीमारी का निदान या उपचार नहीं बता सकता। यदि आपको कोई स्वास्थ्य समस्या है या आप दवा ले रहे हैं, तो कृपया किसी योग्य डॉक्टर से परामर्श लें।\n\nहमारे कैटलॉग में इस संदर्भ में पारंपरिक रूप से दर्ज उत्पाद जानकारी:";
        suggested = ["थोक न्यूनतम ऑर्डर (MOQ) कितना है?", "होलसेल कोटेशन चाहिए", "पारंपरिक जड़ी-बूटियां दिखाएं"];
      } else if (detectedLang === "hinglish") {
        assistantMessage =
          "Main aapko hamare catalog mein available relevant herbal products explore karne mein madad kar sakta hoon, lekin main kisi bimari ka diagnosis ya medical treatment recommend nahi kar sakta. Agar aapko koi medical condition hai ya prescription medicine le rahe hain, toh kripya qualified doctor/healthcare professional se consult karein.\n\nTraditional herbal literature mein is area se related hamare catalog ke botanical products:";
        suggested = ["Iska MOQ kitna hai?", "Wholesale quote chahiye", "Pehla wala cart me add karo"];
      } else {
        assistantMessage =
          "I can help you explore relevant products in our catalog, but I can't diagnose a condition or recommend treatment. If you have a medical condition, take prescription medicines, or have concerning symptoms, please consult a qualified healthcare professional.\n\nHere is product information from our catalog for botanical items traditionally associated with this area in herbal literature:";
        suggested = ["What is the MOQ for these herbs?", "Show me herbal powders in bulk", "Request Certificate of Analysis (CoA)"];
      }

      return NextResponse.json({
        message: assistantMessage,
        matchedProducts: matched,
        suggestedQuestions: suggested,
        isMedicalQuery: true,
      });
    }

    // 4. NO PRODUCTS MATCHED
    if (matched.length === 0) {
      if (detectedLang === "hindi") {
        assistantMessage =
          "मुझे हमारे वर्तमान कैटलॉग में इससे मिलता-जुलता उत्पाद नहीं मिला।\n\nहम मुख्य रूप से प्रामाणिक थोक भारतीय जड़ी-बूटियों, जड़ों, पत्तियों, छालों, चूर्णों और खड़े मसालों में विशेषज्ञता रखते हैं। कृपया किसी विशिष्ट जड़ी-बूटी का नाम बताएं।";
        suggested = ["अश्वगंधा दिखाइए", "हर्बल पाउडर दिखाएं", "कच्ची जड़ी-बूटियां दिखाएं", "होलसेल रेट चाहिए"];
      } else if (detectedLang === "hinglish") {
        assistantMessage =
          "Mujhe hamare current catalog mein iska matching product nahi mila.\n\nHum authentic bulk Indian medicinal herbs, roots, leaves, barks, powders aur khade masale provide karte hain. Aap kisi specific herb ya raw material ka naam bata sakte hain.";
        suggested = ["Ashwagandha dikhao", "Herbal powder dikhao", "Moringa hai kya?", "Bulk mein herbs chahiye"];
      } else {
        assistantMessage =
          "I couldn't find a matching product in our current catalog.\n\nWe specialize in authentic bulk Indian medicinal herbs, roots, leaves, barks, powders, and raw spices. Feel free to describe the herb name or botanical application you are looking for.";
        suggested = ["Show me herbal powders", "Show me raw herbs", "Help me find turmeric products", "I need products in bulk"];
      }

      return NextResponse.json({
        message: assistantMessage,
        matchedProducts: [],
        suggestedQuestions: suggested,
        isMedicalQuery: false,
      });
    }

    // 5. DIGESTION / PET / PACHAN WELLNESS QUERY
    if (lowerQuery.includes("digest") || lowerQuery.includes("stomach") || lowerQuery.includes("pet") || lowerQuery.includes("pachan") || lowerQuery.includes("hazma")) {
      if (detectedLang === "hindi") {
        assistantMessage =
          "जी बिल्कुल 🌿 हमारे कैटलॉग में पाचन स्वास्थ्य (Digestive Wellness) के लिए पारंपरिक रूप से उपयोग की जाने वाली जड़ी-बूटियाँ उपलब्ध हैं:\n\n• क्या आप चूर्ण, अर्क (extract) या साबुत सूखे फल की तलाश में हैं?\n\nशिवा जड़ी-बूटी स्टोर के कैटलॉग से उत्पाद जानकारी:";
        suggested = ["त्रिफला सामग्री के बारे में बताएं", "सूखा आंवला का MOQ कितना है?", "हरड़ का होलसेल कोटेशन"];
      } else if (detectedLang === "hinglish") {
        assistantMessage =
          "Bilkul 🌿 Digestive wellness aur traditional Ayurvedic formulations ke liye hamare catalog mein ye authentic raw materials listed hain:\n\n• Kya aap powder (churna) ke liye dekh rahe hain ya whole dried herbs?\n\nShiva Jadibuti Store ke catalog se product information:";
        suggested = ["Triphala ingredients ke bare me batao", "Amla dry ka MOQ kitna hai?", "Pehla wala cart me daal do"];
      } else {
        assistantMessage =
          "I can help you explore products in our catalog. Here is product information for botanical raw materials commonly used in traditional herbal practices and listed in our catalog for digestive wellness formulations:\n\n• Are you formulating an Ayurvedic digestive churna, tablet, or extract?\n• Do you require whole dried fruits or micro-milled powder?\n\nHere is product information for items from Shiva Jadibuti Store traditionally associated with this area:";
        suggested = ["Tell me about Triphala ingredients", "What is the MOQ for Amla Dry?", "Get wholesale quote for Harad"];
      }

      return NextResponse.json({
        message: assistantMessage,
        matchedProducts: matched,
        suggestedQuestions: suggested,
        isMedicalQuery: false,
      });
    }

    // 6. GENERAL SPECIFIC PRODUCT OR BULK DISCOVERY
    if (detectedLang === "hindi") {
      assistantMessage = `जी बिल्कुल 🌿 शिवा जड़ी-बूटी स्टोर में उपलब्ध उत्पाद जानकारी:`;
      suggested = ["पहला वाला कार्ट में जोड़ें", "थोक मूल्य (Wholesale Rate) बताएं", "न्यूनतम ऑर्डर मात्रा (MOQ)"];
    } else if (detectedLang === "hinglish") {
      assistantMessage = `Bilkul 🌿 Ye rahe Shiva Jadibuti Store ke available products:`;
      suggested = ["Pehla wala cart me daal do", "Iska wholesale rate kya hai?", "Aur options dikhao"];
    } else {
      assistantMessage = `Here is product information for items from Shiva Jadibuti Store listed in our catalog:`;
      suggested = ["Show me herbal powders", "Tell me about bulk availability", "Get wholesale quote"];
    }

    return NextResponse.json({
      message: assistantMessage,
      matchedProducts: matched,
      suggestedQuestions: suggested,
      isMedicalQuery: false,
    });
  } catch (error) {
    console.error("Ask Shiva API route error:", error);
    return NextResponse.json(
      { error: "Internal server error processing request" },
      { status: 500 }
    );
  }
}
