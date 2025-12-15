// Translation dictionaries for English and Hindi

export const translations = {
  en: {
    // Common
    common: {
      loading: "Loading...",
      error: "An error occurred",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      search: "Search",
      filter: "Filter",
      all: "All",
      active: "Active",
      inactive: "Inactive",
      status: "Status",
      actions: "Actions",
      yes: "Yes",
      no: "No",
      confirm: "Confirm",
      back: "Back",
      next: "Next",
      previous: "Previous",
      download: "Download",
      upload: "Upload",
      required: "Required",
      optional: "Optional",
      success: "Success",
      failed: "Failed",
      pending: "Pending",
    },

    // Navigation
    nav: {
      home: "Home",
      about: "About",
      contact: "Contact",
      pricing: "Pricing",
      faq: "FAQ",
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
      dashboard: "Dashboard",
      profile: "Profile",
      settings: "Settings",
    },

    // Landing Page
    landing: {
      heroTitle: "Scientific Soil Testing for Better Harvests",
      heroSubtitle:
        "Get accurate soil analysis and AI-powered recommendations for your farm. Our agents collect samples, labs test them, and you receive actionable insights.",
      ctaBookTest: "Book a Soil Test",
      ctaTalk: "Talk to Our Team",
      brandMeaning: '"Bhu" means Soil, "Metra" means Measurement',

      // How it Works
      howItWorksTitle: "How It Works",
      step1Title: "Book Your Test",
      step1Desc: "Contact our agent or fill the form. We'll reach your farm.",
      step2Title: "Sample Collection",
      step2Desc: "Our trained agent collects soil samples from your land.",
      step3Title: "Lab Analysis",
      step3Desc: "Certified labs test your soil for 15+ parameters.",
      step4Title: "Get Recommendations",
      step4Desc: "Receive detailed report with AI-powered crop & fertilizer advice.",

      // Benefits
      benefitsTitle: "Why Choose Bhumetra?",
      benefit1Title: "Scientific Accuracy",
      benefit1Desc: "Certified lab testing with precise measurements",
      benefit2Title: "Easy Process",
      benefit2Desc: "Door-to-door sample collection by trained agents",
      benefit3Title: "Smart Recommendations",
      benefit3Desc: "AI-powered crop and fertilizer suggestions",
      benefit4Title: "Affordable Pricing",
      benefit4Desc: "Best rates with transparent pricing per acre",

      // Lead Form
      leadFormTitle: "Get Started Today",
      leadFormSubtitle: "Fill the form and our agent will contact you",
    },

    // About Page
    about: {
      title: "About Bhumetra",
      subtitle: "Empowering farmers with scientific soil insights",
      storyTitle: "Our Story",
      storyContent:
        'Bhumetra was born from a simple observation: most farmers in rural India make crop decisions without knowing what their soil actually needs. "Bhu" means soil in Sanskrit, and "Metra" comes from measurement. Together, Bhumetra represents our mission to bring scientific soil measurement to every farmer.',
      missionTitle: "Our Mission",
      missionContent:
        "To provide accessible, affordable, and accurate soil testing services with actionable recommendations that help farmers increase their yield while maintaining soil health.",
      howWeWorkTitle: "How We Work",
      howWeWorkContent:
        "Our network of trained field agents visit farms to collect soil samples. These samples are sent to certified laboratories where technicians analyze them for essential parameters. The results are then processed to generate personalized recommendations for crops, fertilizers, and farming practices.",
      privacyTitle: "Your Privacy Matters",
      privacyContent:
        "We maintain strict privacy boundaries. Lab technicians only see sample IDs, never your personal details. Your farm data belongs to you.",
    },

    // Contact Page
    contact: {
      title: "Contact Us",
      subtitle: "Have questions? We're here to help",
      formTitle: "Send us a Message",
      name: "Your Name",
      phone: "Phone Number",
      email: "Email Address",
      message: "Your Message",
      submitButton: "Send Message",
      successMessage: "Thank you! We'll get back to you soon.",
      infoTitle: "Get in Touch",
      addressLabel: "Office Address",
      phoneLabel: "Phone",
      emailLabel: "Email",
      whatsAppLabel: "WhatsApp",
    },

    // Pricing
    pricing: {
      title: "Simple, Transparent Pricing",
      subtitle: "Pay only for what you test",
      perAcre: "per acre",
      includes: "Includes",
      includesList: [
        "Complete soil analysis (15+ parameters)",
        "Door-to-door sample collection",
        "Digital report with AI recommendations",
        "Crop-specific fertilizer guidance",
      ],
      bookNow: "Book Now",
    },

    // FAQ
    faq: {
      title: "Frequently Asked Questions",
      q1: "How is soil sample collected?",
      a1: "Our trained agent visits your farm and collects soil samples from multiple points at the recommended depth. This ensures accurate representation of your soil.",
      q2: "How long does it take to get the report?",
      a2: "Typically 5-7 working days from sample collection. You'll receive SMS notification when your report is ready.",
      q3: "What parameters are tested?",
      a3: "We test pH, EC, Organic Carbon, Nitrogen, Phosphorus, Potassium, and essential micronutrients like Zinc, Iron, Manganese, Copper, and Boron.",
      q4: "Can I pay in cash?",
      a4: "Yes, you can pay in cash to the agent or use UPI/online payment methods.",
      q5: "Is my farm data secure?",
      a5: "Absolutely. Your personal data is only visible to you and your assigned agent. Lab technicians only see anonymous sample IDs.",
    },

    // Dashboard Common
    dashboard: {
      welcome: "Welcome",
      overview: "Overview",
      recentOrders: "Recent Orders",
      totalTests: "Total Tests",
      pendingTests: "Pending Tests",
      completedTests: "Completed Tests",
      revenue: "Revenue",
      noData: "No data available",
    },

    // Farmer Dashboard
    farmer: {
      title: "Farmer Dashboard",
      myTests: "My Soil Tests",
      viewReport: "View Report",
      downloadReport: "Download Report",
      testDetails: "Test Details",
      soilReport: "Soil Report",
      recommendations: "AI Recommendations",
      overallSummary: "Overall Summary",
      recommendedCrops: "Recommended Crops",
      fertilizerPlan: "Fertilizer Plan",
      organicPractices: "Organic Practices",
      irrigationTips: "Irrigation Tips",
      noReportYet: "Report not available yet. Please wait for lab analysis.",
    },

    // Agent Dashboard
    agent: {
      title: "Agent Dashboard",
      createOrder: "Create New Order",
      myOrders: "My Orders",
      markSentToLab: "Mark Sent to Lab",
      searchFarmer: "Search farmer by phone",
      createNewFarmer: "Create New Farmer",
      farmerDetails: "Farmer Details",
      landDetails: "Land Details",
      orderSummary: "Order Summary",
      proceedToPayment: "Proceed to Payment",
      paymentSuccess: "Payment Successful!",
      customerIdGenerated: "Customer ID Generated",
      sampleLabelInstruction: "Please label the sample with this Customer ID",
    },

    // Lab Dashboard
    lab: {
      title: "Lab Dashboard",
      pendingSamples: "Pending Samples",
      enterResults: "Enter Results",
      completedTests: "Completed Tests",
      soilParameters: "Soil Parameters",
      uploadPdf: "Upload PDF Report",
      saveReport: "Save Report",
      markUnderTesting: "Mark Under Testing",
      markCompleted: "Mark Completed",
    },

    // Admin Dashboard
    admin: {
      title: "Admin Dashboard",
      manageAgents: "Manage Agents",
      manageLabTechs: "Manage Lab Technicians",
      manageFarmers: "View Farmers",
      ordersReports: "Orders & Reports",
      globalConfig: "Global Configuration",
      leadsContacts: "Leads & Contacts",
      createAgent: "Create Agent",
      createLabTech: "Create Lab Technician",
      businessSettings: "Business Settings",
      commissionSettings: "Commission Settings",
    },

    // Order Status
    orderStatus: {
      PAYMENT_PENDING: "Payment Pending",
      PAID: "Paid",
      SENT_TO_LAB: "Sent to Lab",
      UNDER_TESTING: "Under Testing",
      COMPLETED: "Completed",
      CANCELLED: "Cancelled",
    },

    // Payment Status
    paymentStatus: {
      PENDING: "Pending",
      SUCCESS: "Success",
      FAILED: "Failed",
      REFUNDED: "Refunded",
    },

    // Form Labels
    form: {
      name: "Name",
      phone: "Phone Number",
      email: "Email",
      village: "Village",
      tehsil: "Tehsil",
      district: "District",
      state: "State",
      pinCode: "PIN Code",
      address: "Address",
      acres: "Land Size (Acres)",
      region: "Region",
      labName: "Lab Name",
      preferredCrop: "Preferred Crop",
    },

    // Footer
    footer: {
      tagline: "Scientific soil testing for better harvests",
      quickLinks: "Quick Links",
      contact: "Contact",
      copyright: "All rights reserved",
    },
  },

  hi: {
    // Common
    common: {
      loading: "लोड हो रहा है...",
      error: "एक त्रुटि हुई",
      submit: "जमा करें",
      cancel: "रद्द करें",
      save: "सहेजें",
      delete: "हटाएं",
      edit: "संपादित करें",
      view: "देखें",
      search: "खोजें",
      filter: "फ़िल्टर",
      all: "सभी",
      active: "सक्रिय",
      inactive: "निष्क्रिय",
      status: "स्थिति",
      actions: "कार्रवाई",
      yes: "हाँ",
      no: "नहीं",
      confirm: "पुष्टि करें",
      back: "वापस",
      next: "आगे",
      previous: "पिछला",
      download: "डाउनलोड",
      upload: "अपलोड",
      required: "आवश्यक",
      optional: "वैकल्पिक",
      success: "सफल",
      failed: "विफल",
      pending: "लंबित",
    },

    // Navigation
    nav: {
      home: "होम",
      about: "हमारे बारे में",
      contact: "संपर्क करें",
      pricing: "मूल्य",
      faq: "सवाल-जवाब",
      login: "लॉगिन",
      signup: "साइन अप",
      logout: "लॉगआउट",
      dashboard: "डैशबोर्ड",
      profile: "प्रोफ़ाइल",
      settings: "सेटिंग्स",
    },

    // Landing Page
    landing: {
      heroTitle: "बेहतर फसल के लिए वैज्ञानिक मिट्टी परीक्षण",
      heroSubtitle:
        "अपने खेत के लिए सटीक मिट्टी विश्लेषण और AI-संचालित सिफारिशें प्राप्त करें। हमारे एजेंट नमूने एकत्र करते हैं, प्रयोगशालाएं परीक्षण करती हैं, और आपको कार्रवाई योग्य जानकारी मिलती है।",
      ctaBookTest: "मिट्टी परीक्षण बुक करें",
      ctaTalk: "हमारी टीम से बात करें",
      brandMeaning: '"भू" का अर्थ है मिट्टी, "मेट्रा" का अर्थ है माप',

      // How it Works
      howItWorksTitle: "यह कैसे काम करता है",
      step1Title: "टेस्ट बुक करें",
      step1Desc: "हमारे एजेंट से संपर्क करें या फॉर्म भरें। हम आपके खेत तक पहुंचेंगे।",
      step2Title: "नमूना संग्रह",
      step2Desc: "हमारे प्रशिक्षित एजेंट आपकी जमीन से मिट्टी के नमूने एकत्र करते हैं।",
      step3Title: "प्रयोगशाला विश्लेषण",
      step3Desc: "प्रमाणित प्रयोगशालाएं आपकी मिट्टी का 15+ मापदंडों पर परीक्षण करती हैं।",
      step4Title: "सिफारिशें प्राप्त करें",
      step4Desc: "AI-संचालित फसल और उर्वरक सलाह के साथ विस्तृत रिपोर्ट प्राप्त करें।",

      // Benefits
      benefitsTitle: "भूमेत्र क्यों चुनें?",
      benefit1Title: "वैज्ञानिक सटीकता",
      benefit1Desc: "सटीक माप के साथ प्रमाणित प्रयोगशाला परीक्षण",
      benefit2Title: "आसान प्रक्रिया",
      benefit2Desc: "प्रशिक्षित एजेंटों द्वारा घर-घर नमूना संग्रह",
      benefit3Title: "स्मार्ट सिफारिशें",
      benefit3Desc: "AI-संचालित फसल और उर्वरक सुझाव",
      benefit4Title: "किफायती मूल्य",
      benefit4Desc: "प्रति एकड़ पारदर्शी मूल्य के साथ सर्वोत्तम दरें",

      // Lead Form
      leadFormTitle: "आज ही शुरू करें",
      leadFormSubtitle: "फॉर्म भरें और हमारा एजेंट आपसे संपर्क करेगा",
    },

    // About Page
    about: {
      title: "भूमेत्र के बारे में",
      subtitle: "वैज्ञानिक मिट्टी जानकारी से किसानों को सशक्त बनाना",
      storyTitle: "हमारी कहानी",
      storyContent:
        'भूमेत्र एक साधारण अवलोकन से पैदा हुआ: ग्रामीण भारत के अधिकांश किसान यह जाने बिना फसल का निर्णय लेते हैं कि उनकी मिट्टी को वास्तव में क्या चाहिए। संस्कृत में "भू" का अर्थ है मिट्टी, और "मेट्रा" माप से आता है। साथ में, भूमेत्र हर किसान तक वैज्ञानिक मिट्टी माप लाने के हमारे मिशन का प्रतिनिधित्व करता है।',
      missionTitle: "हमारा मिशन",
      missionContent:
        "कार्रवाई योग्य सिफारिशों के साथ सुलभ, किफायती और सटीक मिट्टी परीक्षण सेवाएं प्रदान करना जो किसानों को मिट्टी के स्वास्थ्य को बनाए रखते हुए अपनी उपज बढ़ाने में मदद करती हैं।",
      howWeWorkTitle: "हम कैसे काम करते हैं",
      howWeWorkContent:
        "हमारे प्रशिक्षित फील्ड एजेंटों का नेटवर्क मिट्टी के नमूने एकत्र करने के लिए खेतों का दौरा करता है। ये नमूने प्रमाणित प्रयोगशालाओं में भेजे जाते हैं जहां तकनीशियन आवश्यक मापदंडों के लिए उनका विश्लेषण करते हैं। परिणामों को फिर फसलों, उर्वरकों और कृषि प्रथाओं के लिए व्यक्तिगत सिफारिशें उत्पन्न करने के लिए संसाधित किया जाता है।",
      privacyTitle: "आपकी गोपनीयता मायने रखती है",
      privacyContent:
        "हम सख्त गोपनीयता सीमाएं बनाए रखते हैं। प्रयोगशाला तकनीशियन केवल नमूना आईडी देखते हैं, कभी भी आपका व्यक्तिगत विवरण नहीं। आपका खेत डेटा आपका है।",
    },

    // Contact Page
    contact: {
      title: "संपर्क करें",
      subtitle: "सवाल हैं? हम मदद के लिए यहां हैं",
      formTitle: "हमें संदेश भेजें",
      name: "आपका नाम",
      phone: "फ़ोन नंबर",
      email: "ईमेल पता",
      message: "आपका संदेश",
      submitButton: "संदेश भेजें",
      successMessage: "धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।",
      infoTitle: "संपर्क में रहें",
      addressLabel: "कार्यालय का पता",
      phoneLabel: "फ़ोन",
      emailLabel: "ईमेल",
      whatsAppLabel: "व्हाट्सएप",
    },

    // Pricing
    pricing: {
      title: "सरल, पारदर्शी मूल्य निर्धारण",
      subtitle: "केवल वही भुगतान करें जो आप परीक्षण करते हैं",
      perAcre: "प्रति एकड़",
      includes: "शामिल है",
      includesList: [
        "संपूर्ण मिट्टी विश्लेषण (15+ मापदंड)",
        "घर-घर नमूना संग्रह",
        "AI सिफारिशों के साथ डिजिटल रिपोर्ट",
        "फसल-विशिष्ट उर्वरक मार्गदर्शन",
      ],
      bookNow: "अभी बुक करें",
    },

    // FAQ
    faq: {
      title: "अक्सर पूछे जाने वाले प्रश्न",
      q1: "मिट्टी का नमूना कैसे एकत्र किया जाता है?",
      a1: "हमारा प्रशिक्षित एजेंट आपके खेत का दौरा करता है और अनुशंसित गहराई पर कई बिंदुओं से मिट्टी के नमूने एकत्र करता है। यह आपकी मिट्टी का सटीक प्रतिनिधित्व सुनिश्चित करता है।",
      q2: "रिपोर्ट प्राप्त करने में कितना समय लगता है?",
      a2: "आमतौर पर नमूना संग्रह से 5-7 कार्य दिवस। जब आपकी रिपोर्ट तैयार होगी तो आपको SMS सूचना मिलेगी।",
      q3: "कौन से मापदंडों का परीक्षण किया जाता है?",
      a3: "हम pH, EC, ऑर्गेनिक कार्बन, नाइट्रोजन, फॉस्फोरस, पोटेशियम और जिंक, आयरन, मैंगनीज, कॉपर और बोरॉन जैसे आवश्यक सूक्ष्म पोषक तत्वों का परीक्षण करते हैं।",
      q4: "क्या मैं नकद भुगतान कर सकता हूं?",
      a4: "हाँ, आप एजेंट को नकद भुगतान कर सकते हैं या UPI/ऑनलाइन भुगतान विधियों का उपयोग कर सकते हैं।",
      q5: "क्या मेरा खेत डेटा सुरक्षित है?",
      a5: "बिल्कुल। आपका व्यक्तिगत डेटा केवल आपको और आपके असाइन किए गए एजेंट को दिखाई देता है। प्रयोगशाला तकनीशियन केवल अनाम नमूना आईडी देखते हैं।",
    },

    // Dashboard Common
    dashboard: {
      welcome: "स्वागत है",
      overview: "सारांश",
      recentOrders: "हाल के ऑर्डर",
      totalTests: "कुल परीक्षण",
      pendingTests: "लंबित परीक्षण",
      completedTests: "पूर्ण परीक्षण",
      revenue: "राजस्व",
      noData: "कोई डेटा उपलब्ध नहीं",
    },

    // Farmer Dashboard
    farmer: {
      title: "किसान डैशबोर्ड",
      myTests: "मेरे मिट्टी परीक्षण",
      viewReport: "रिपोर्ट देखें",
      downloadReport: "रिपोर्ट डाउनलोड करें",
      testDetails: "परीक्षण विवरण",
      soilReport: "मिट्टी रिपोर्ट",
      recommendations: "AI सिफारिशें",
      overallSummary: "समग्र सारांश",
      recommendedCrops: "अनुशंसित फसलें",
      fertilizerPlan: "उर्वरक योजना",
      organicPractices: "जैविक प्रथाएं",
      irrigationTips: "सिंचाई सुझाव",
      noReportYet: "रिपोर्ट अभी उपलब्ध नहीं है। कृपया प्रयोगशाला विश्लेषण की प्रतीक्षा करें।",
    },

    // Agent Dashboard
    agent: {
      title: "एजेंट डैशबोर्ड",
      createOrder: "नया ऑर्डर बनाएं",
      myOrders: "मेरे ऑर्डर",
      markSentToLab: "प्रयोगशाला भेजा गया",
      searchFarmer: "फ़ोन से किसान खोजें",
      createNewFarmer: "नया किसान बनाएं",
      farmerDetails: "किसान विवरण",
      landDetails: "भूमि विवरण",
      orderSummary: "ऑर्डर सारांश",
      proceedToPayment: "भुगतान के लिए आगे बढ़ें",
      paymentSuccess: "भुगतान सफल!",
      customerIdGenerated: "ग्राहक आईडी उत्पन्न हुई",
      sampleLabelInstruction: "कृपया इस ग्राहक आईडी के साथ नमूने को लेबल करें",
    },

    // Lab Dashboard
    lab: {
      title: "प्रयोगशाला डैशबोर्ड",
      pendingSamples: "लंबित नमूने",
      enterResults: "परिणाम दर्ज करें",
      completedTests: "पूर्ण परीक्षण",
      soilParameters: "मिट्टी मापदंड",
      uploadPdf: "PDF रिपोर्ट अपलोड करें",
      saveReport: "रिपोर्ट सहेजें",
      markUnderTesting: "परीक्षण में चिह्नित करें",
      markCompleted: "पूर्ण चिह्नित करें",
    },

    // Admin Dashboard
    admin: {
      title: "व्यवस्थापक डैशबोर्ड",
      manageAgents: "एजेंट प्रबंधित करें",
      manageLabTechs: "प्रयोगशाला तकनीशियन प्रबंधित करें",
      manageFarmers: "किसान देखें",
      ordersReports: "ऑर्डर और रिपोर्ट",
      globalConfig: "वैश्विक कॉन्फ़िगरेशन",
      leadsContacts: "लीड और संपर्क",
      createAgent: "एजेंट बनाएं",
      createLabTech: "प्रयोगशाला तकनीशियन बनाएं",
      businessSettings: "व्यापार सेटिंग्स",
      commissionSettings: "कमीशन सेटिंग्स",
    },

    // Order Status
    orderStatus: {
      PAYMENT_PENDING: "भुगतान लंबित",
      PAID: "भुगतान हो गया",
      SENT_TO_LAB: "प्रयोगशाला भेजा गया",
      UNDER_TESTING: "परीक्षण में",
      COMPLETED: "पूर्ण",
      CANCELLED: "रद्द",
    },

    // Payment Status
    paymentStatus: {
      PENDING: "लंबित",
      SUCCESS: "सफल",
      FAILED: "विफल",
      REFUNDED: "वापस",
    },

    // Form Labels
    form: {
      name: "नाम",
      phone: "फ़ोन नंबर",
      email: "ईमेल",
      village: "गाँव",
      tehsil: "तहसील",
      district: "जिला",
      state: "राज्य",
      pinCode: "पिन कोड",
      address: "पता",
      acres: "भूमि का आकार (एकड़)",
      region: "क्षेत्र",
      labName: "प्रयोगशाला का नाम",
      preferredCrop: "पसंदीदा फसल",
    },

    // Footer
    footer: {
      tagline: "बेहतर फसल के लिए वैज्ञानिक मिट्टी परीक्षण",
      quickLinks: "त्वरित लिंक",
      contact: "संपर्क",
      copyright: "सर्वाधिकार सुरक्षित",
    },
  },
} as const

export type TranslationKeys = typeof translations.en
export type Language = keyof typeof translations
