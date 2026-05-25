import { create } from 'zustand';

// Pre-embedded dictionaries for instant, zero-flicker, client-side translation across 7 languages
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DICTIONARIES: Record<string, any> = {
  en: {
    "app": {
      "name": "AgriConnect India",
      "tagline": "Empowering Indian Farmers with Artificial Intelligence"
    },
    "nav": {
      "dashboard": "Dashboard",
      "cropRecommendation": "Crop Recommendation",
      "mandiPrices": "Mandi Prices",
      "diseaseDetection": "Disease Detection",
      "assistant": "KrishiMitra",
      "marketplace": "Marketplace",
      "settings": "Settings",
      "logout": "Logout",
      "livePrices": "Live Prices",
      "platform": "Platform",
      "aiCapabilities": "AI Capabilities",
      "vision": "Our Vision",
      "signIn": "Sign In",
      "getStarted": "Get Started",
      "backToHome": "Back to Home",
      "home": "Home",
      "logistics": "Logistics"
    },
    "dashboard": {
      "welcome": "Hello",
      "livePricesBadge": "Live Prices",
      "weatherLocation": "Nainital, Uttarakhand",
      "weatherStatus": "Partly Cloudy",
      "profileRole": "Farmer Rajesh",
      "profileDiv": "Uttarakhand Division",
      "advisoryBullet": "AgriConnect Advisory Bulletin",
      "liveAdvisory": "LIVE ADVISORY",
      "govOfIndia": "AGRICONNECT NETWORK",
      "kvkPortal": "ADVISORY PORTAL",
      "cottonSowingTitle": "Sowing: Cotton Sowing Time",
      "cottonSowingSub": "(Recommendation: Cotton Sowing Time)",
      "speakToAsk": "Speak to Ask",
      "newsFeed": "Personalized News Feed",
      "alertTomato": "Alert: Tomato Disease Detected nearby",
      "alertCotton": "Advisory: Sowing time for Cotton has arrived",
      "cardMandi": "Mandi Prices",
      "cardMandiSub": "(Real-time commodity prices)",
      "cardDisease": "My Crops",
      "cardDiseaseSub": "(Crop Health Check)",
      "cardMarket": "Find Buyers",
      "cardMarketSub": "(Direct Marketplace)",
      "cardCrop": "Crop suggestions",
      "cardCropSub": "(AI Crop Recommendation)",
      "cardLogistics": "Logistics",
      "cardLogisticsSub": "(Transport & Load Sharing)",
      "homeNav": "Home",
      "messagesNav": "Messages",
      "communityNav": "Community",
      "helpNav": "Help",
      "settingsNav": "Settings",
      "cropSowingAdvisory": "Advisory"
    },
    "auth": {
      "login": "Login",
      "register": "Register",
      "phone": "Mobile Number",
      "password": "Password",
      "name": "Full Name",
      "role": "I am a",
      "farmer": "Farmer",
      "buyer": "Buyer"
    },
    "crop": {
      "title": "AI Crop Recommendation",
      "subtitle": "Get personalized crop suggestions powered by Gemini AI",
      "enterDetails": "Enter Farm Details",
      "soilType": "Soil Type",
      "season": "Season",
      "kharif": "Kharif (June-November)",
      "rabi": "Rabi (November-April)",
      "zaid": "Zaid (March-June)",
      "irrigationType": "Irrigation Type",
      "rainfall": "Rainfall (mm)",
      "temperature": "Temp (°C)",
      "budget": "Budget (₹/acre)",
      "previousCrop": "Previous Crop",
      "landSize": "Land Size (acres)",
      "selectSoil": "Select soil",
      "selectIrrigation": "Select irrigation",
      "selectState": "Select state",
      "district": "District",
      "submit": "Get AI Recommendations",
      "loading": "AI is analyzing...",
      "resultsTitle": "Top Crop Recommendations",
      "expectedYield": "Expected Yield",
      "confidenceMatch": "match",
      "marketPrice": "Market Price"
    },
    "mandi": {
      "title": "Live Mandi Prices",
      "subtitle": "Real-time commodity prices from 7,000+ markets across India",
      "search": "Search Prices",
      "commodity": "Commodity",
      "state": "State",
      "trending": "Today's Trending",
      "allCommodities": "All Commodities",
      "allStates": "All States",
      "searchBtn": "Search Prices",
      "loading": "Loading...",
      "noData": "No Data Found",
      "noDataSub": "Try adjusting your filters or check back later for live prices.",
      "headers": {
        "commodity": "Commodity",
        "market": "Market",
        "stateDistrict": "State/District",
        "min": "Min ₹",
        "max": "Max ₹",
        "modal": "Modal ₹",
        "date": "Date"
      }
    },
    "disease": {
      "title": "AI Crop Disease Detection",
      "subtitle": "Upload a photo of your crop for instant AI diagnosis",
      "uploadPhoto": "Upload Crop Photo",
      "dropzone": "Drop crop image or click to upload",
      "dropzoneActive": "Drop image here!",
      "fileLimits": "JPG, PNG, WebP up to 10MB",
      "cropType": "Crop Type *",
      "selectCrop": "Select crop type",
      "stateOptional": "State (optional)",
      "selectState": "Select state",
      "detectBtn": "Detect Disease with AI",
      "analyzing": "Analyzing crop...",
      "analyzingSub": "Gemini Vision AI is examining the image",
      "resultsTitle": "Diagnosis Results",
      "symptoms": "Symptoms",
      "treatment": "Treatment",
      "prevention": "Prevention Tips",
      "healthy": "Your crop is healthy!",
      "severity": "Severity"
    },
    "assistant": {
      "title": "KrishiMitra AI",
      "subtitle": "Your multilingual farming assistant",
      "placeholder": "Type your farming question here...",
      "send": "Send",
      "clear": "Clear Chat",
      "greeting": "Hello! I am KrishiMitra. Ask me anything about farming in your language!",
      "listening": "Listening... Speak now...",
      "quickQuestions": "Quick Questions",
      "voiceNotSupported": "Your browser does not support voice input."
    },
    "marketplace": {
      "title": "Buyer Marketplace",
      "subtitle": "Buy directly from farmers, no middlemen",
      "listCrop": "List Your Crop",
      "cropLabel": "Crop",
      "allCrops": "All Crops",
      "stateLabel": "State",
      "allStates": "All States",
      "searchBtn": "Search Listings",
      "foundLabel": "Found",
      "activeListings": "active listings",
      "noListings": "No Listings Found",
      "noListingsSub": "Be the first to list your crop in this market!",
      "createListing": "Create First Listing",
      "qualityTier": "Quality",
      "contactSeller": "Contact Seller",
      "perUnit": "per"
    },
    "settings": {
      "title": "Settings",
      "subtitle": "Manage your account, preferences, and security.",
      "profileInfo": "Profile Information",
      "fullName": "Full Name",
      "phoneNumber": "Phone Number",
      "role": "Role",
      "location": "Location",
      "saveChanges": "Save Changes",
      "appPreferences": "App Preferences",
      "displayLanguage": "Display Language",
      "displayLanguageDesc": "This will change the interface language of the dashboard.",
      "darkTheme": "Dark Mode",
      "darkThemeDesc": "Enable dark theme across the app",
      "notifications": "Notifications",
      "noNotifications": "You have no new notifications.",
      "privacy": "Privacy & Security",
      "changePassword": "Change Password"
    }
  },
  hi: {
    "app": {
      "name": "एग्रीकनेक्ट इंडिया",
      "tagline": "कृत्रिम बुद्धिमत्ता से भारतीय किसानों को सशक्त बनाना"
    },
    "nav": {
      "dashboard": "डैशबोर्ड",
      "cropRecommendation": "फसल सुझाव",
      "mandiPrices": "मंडी भाव",
      "diseaseDetection": "रोग पहचान",
      "assistant": "कृषि मित्र",
      "marketplace": "बाज़ार",
      "settings": "सेटिंग्स",
      "logout": "लॉगआउट",
      "livePrices": "लाइव भाव",
      "platform": "प्लेटफ़ॉर्म",
      "aiCapabilities": "AI क्षमताएं",
      "vision": "हमारा दृष्टिकोण",
      "signIn": "लॉगिन",
      "getStarted": "शुरू करें",
      "backToHome": "मुख्य पृष्ठ पर जाएं",
      "home": "होम",
      "logistics": "परिवहन"
    },
    "dashboard": {
      "welcome": "नमस्ते",
      "livePricesBadge": "लाइव भाव",
      "weatherLocation": "नैनीताल, उत्तराखंड",
      "weatherStatus": "आंशिक रूप से बादल",
      "profileRole": "किसान राजेश",
      "profileDiv": "उत्तराखंड प्रभाग",
      "advisoryBullet": "एग्रीकनेक्ट सलाहकार बुलेटिन",
      "liveAdvisory": "LIVE सलाहकार",
      "govOfIndia": "एग्रीकनेक्ट नेटवर्क",
      "kvkPortal": "सलाहकार पोर्टल",
      "cottonSowingTitle": "बिजाई: कपास बोने का समय",
      "cottonSowingSub": "(सिफारिश: कपास बोने का समय)",
      "speakToAsk": "बोलकर पूछें",
      "newsFeed": "व्यक्तिगत समाचार फ़ीड",
      "alertTomato": "अलर्ट: टमाटर का रोग आस-पास पाया गया",
      "alertCotton": "सलाह: कपास की बुवाई का समय आ गया है",
      "cardMandi": "मंडी भाव",
      "cardMandiSub": "(रियल-टाइम मंडी भाव)",
      "cardDisease": "मेरी फसल",
      "cardDiseaseSub": "(फसल स्वास्थ्य जांच)",
      "cardMarket": "खरीदार खोजें",
      "cardMarketSub": "(सीधा किसान बाज़ार)",
      "cardCrop": "फसल सुझाव",
      "cardCropSub": "(AI फसल सिफारिश)",
      "cardLogistics": "परिवहन",
      "cardLogisticsSub": "(लॉजिस्टिक्स और लोड शेयरिंग)",
      "homeNav": "मुख्य पृष्ठ",
      "messagesNav": "संदेश",
      "communityNav": "समुदाय",
      "helpNav": "सहायता",
      "settingsNav": "सेटिंग्स",
      "cropSowingAdvisory": "सलाहकार"
    },
    "auth": {
      "login": "लॉगिन",
      "register": "पंजीकरण",
      "phone": "मोबाइल नंबर",
      "password": "पासवर्ड",
      "name": "पूरा नाम",
      "role": "मैं हूँ",
      "farmer": "किसान",
      "buyer": "खरीदार"
    },
    "crop": {
      "title": "AI फसल सुझाव",
      "subtitle": "Gemini AI द्वारा संचालित व्यक्तिगत फसल सुझाव प्राप्त करें",
      "enterDetails": "खेत का विवरण दर्ज करें",
      "soilType": "मिट्टी का प्रकार",
      "season": "मौसम",
      "kharif": "खरीफ (जून-नवंबर)",
      "rabi": "रबी (नवंबर-अप्रैल)",
      "zaid": "ज़ायद (मार्च-जून)",
      "irrigationType": "सिंचाई का प्रकार",
      "rainfall": "वर्षा (मिमी)",
      "temperature": "तापमान (°C)",
      "budget": "बजट (₹/एकड़)",
      "previousCrop": "पिछली फसल",
      "landSize": "भूमि का आकार (एकड़)",
      "selectSoil": "मिट्टी चुनें",
      "selectIrrigation": "सिंचाई चुनें",
      "selectState": "राज्य चुनें",
      "district": "ज़िला",
      "submit": "AI सिफारिश प्राप्त करें",
      "loading": "AI विश्लेषण कर रही है...",
      "resultsTitle": "शीर्ष फसल सिफारिशें",
      "expectedYield": "अनुमानित उपज",
      "confidenceMatch": "मैच",
      "marketPrice": "बाजार भाव"
    },
    "mandi": {
      "title": "लाइव मंडी भाव",
      "subtitle": "भारत भर के 7,000+ बाज़ारों के रियल-टाइम मंडी भाव",
      "search": "खोजें",
      "commodity": "फसल/उत्पाद",
      "state": "राज्य",
      "trending": "आज के ट्रेंडिंग भाव",
      "allCommodities": "सभी फसलें",
      "allStates": "सभी राज्य",
      "searchBtn": "भाव खोजें",
      "loading": "लोड हो रहा है...",
      "noData": "कोई डेटा नहीं मिला",
      "noDataSub": "फ़िल्टर बदलें या लाइव भावों के लिए बाद में देखें।",
      "headers": {
        "commodity": "उत्पाद",
        "market": "मंडी",
        "stateDistrict": "राज्य/ज़िला",
        "min": "न्यूनतम ₹",
        "max": "अधिकतम ₹",
        "modal": "मॉडल ₹",
        "date": "तारीख"
      }
    },
    "disease": {
      "title": "AI फसल रोग पहचान",
      "subtitle": "त्वरित AI निदान के लिए अपनी फसल की फोटो अपलोड करें",
      "uploadPhoto": "फसल की फोटो अपलोड करें",
      "dropzone": "फसल की फोटो खींचें या यहाँ डालें",
      "dropzoneActive": "यहाँ फोटो डालें!",
      "fileLimits": "JPG, PNG, WebP 10MB तक",
      "cropType": "फसल का प्रकार *",
      "selectCrop": "फसल का प्रकार चुनें",
      "stateOptional": "राज्य (वैकल्पिक)",
      "selectState": "राज्य चुनें",
      "detectBtn": "AI से रोग की पहचान करें",
      "analyzing": "फसल का विश्लेषण किया जा रहा है...",
      "analyzingSub": "Gemini विज़न AI पत्ते की जांच कर रही है",
      "resultsTitle": "निदान के परिणाम",
      "symptoms": "लक्षण",
      "treatment": "उपचार",
      "prevention": "रोकथाम के उपाय",
      "healthy": "आपकी फसल स्वस्थ है!",
      "severity": "तीव्रता"
    },
    "assistant": {
      "title": "कृषि मित्र AI",
      "subtitle": "आपका बहुभाषी कृषि सहायक",
      "placeholder": "यहाँ अपना खेती से जुड़ा सवाल लिखें...",
      "send": "भेजें",
      "clear": "साफ़ करें",
      "greeting": "नमस्ते! मैं कृषि मित्र हूँ। अपनी भाषा में खेती से जुड़ा कोई भी सवाल पूछें!",
      "listening": "सुन रहा हूँ... अब बोलें...",
      "quickQuestions": "त्वरित प्रश्न",
      "voiceNotSupported": "आपका ब्राउज़र वॉयस इनपुट का समर्थन नहीं करता है।"
    },
    "marketplace": {
      "title": "किसान बाज़ार",
      "subtitle": "सीधे किसानों से खरीदें, कोई बिचौलिया नहीं",
      "listCrop": "अपनी फसल लिस्ट करें",
      "cropLabel": "फसल",
      "allCrops": "सभी फसलें",
      "stateLabel": "राज्य",
      "allStates": "सभी राज्य",
      "searchBtn": "लिस्टिंग खोजें",
      "foundLabel": "कुल",
      "activeListings": "सक्रिय लिस्टिंग मिलीं",
      "noListings": "कोई लिस्टिंग नहीं मिली",
      "noListingsSub": "इस बाज़ार में अपनी फसल सूचीबद्ध करने वाले पहले व्यक्ति बनें!",
      "createListing": "पहली लिस्टिंग बनाएं",
      "qualityTier": "गुणवत्ता",
      "contactSeller": "किसान से संपर्क करें",
      "perUnit": "प्रति"
    },
    "settings": {
      "title": "सेटिंग्स",
      "subtitle": "अपने खाते, प्राथमिकताओं और सुरक्षा का प्रबंधन करें।",
      "profileInfo": "प्रोफ़ाइल जानकारी",
      "fullName": "पूरा नाम",
      "phoneNumber": "मोबाइल नंबर",
      "role": "भूमिका",
      "location": "स्थान",
      "saveChanges": "परिवर्तन सहेजें",
      "appPreferences": "ऐप प्राथमिकताएं",
      "displayLanguage": "प्रदर्शित भाषा",
      "displayLanguageDesc": "यह डैशबोर्ड की भाषा को बदल देगा।",
      "darkTheme": "डार्क मोड",
      "darkThemeDesc": "पूरे ऐप में डार्क थीम सक्षम करें",
      "notifications": "सूचनाएं",
      "noNotifications": "आपके पास कोई नई सूचना नहीं है।",
      "privacy": "गोपनीयता और सुरक्षा",
      "changePassword": "पासवर्ड बदलें"
    }
  },
  mr: {
    "app": {
      "name": "एग्रीकनेक्ट इंडिया",
      "tagline": "कृत्रिम बुद्धिमत्तेने भारतीय शेतकऱ्यांना सक्षम करणे"
    },
    "nav": {
      "dashboard": "डॅशबोर्ड",
      "cropRecommendation": "पीक शिफारस",
      "mandiPrices": "मंडी भाव",
      "diseaseDetection": "रोग ओळख",
      "assistant": "कृषी मित्र",
      "marketplace": "बाज़ार",
      "settings": "सेटिंग्स",
      "logout": "लॉगआउट",
      "livePrices": "थेट भाव",
      "platform": "प्लॅटफॉर्म",
      "aiCapabilities": "AI क्षमता",
      "vision": "आमचा दृष्टिकोन",
      "signIn": "लॉगिन",
      "getStarted": "सुरू करा",
      "backToHome": "मुख्य पृष्ठावर जा",
      "home": "मुख्य पृष्ठ",
      "logistics": "परिवहन"
    },
    "dashboard": {
      "welcome": "नमस्कार",
      "livePricesBadge": "थेट भाव",
      "weatherLocation": "नैनीताल, उत्तराखंड",
      "weatherStatus": "अंशतः ढगाळ",
      "profileRole": "शेतकरी राजेश",
      "profileDiv": "उत्तराखंड विभाग",
      "advisoryBullet": "एग्रीकनेक्ट सल्लागार बुलेटिन",
      "liveAdvisory": "थेट सल्लागार",
      "govOfIndia": "एग्रीकनेक्ट नेटवर्क",
      "kvkPortal": "सल्लागार पोर्टल",
      "cottonSowingTitle": "पेरणी: कापूस पेरणीची वेळ",
      "cottonSowingSub": "(शिफारस: कापूस पेरणीची वेळ)",
      "speakToAsk": "बोलून विचारा",
      "newsFeed": "वैयक्तिकृत बातमी फीड",
      "alertTomato": "चेतावणी: जवळ टोमॅटो रोग आढळला",
      "alertCotton": "सल्ला: कापूस पेरणीची वेळ आली आहे",
      "cardMandi": "मंडी भाव",
      "cardMandiSub": "(थेट बाजार भाव)",
      "cardDisease": "माझे पीक",
      "cardDiseaseSub": "(पीक आरोग्य तपासणी)",
      "cardMarket": "खरेदीदार शोधा",
      "cardMarketSub": "(थेट शेतकरी बाज़ार)",
      "cardCrop": "पीक शिफारस",
      "cardCropSub": "(AI पीक शिफारस)",
      "cardLogistics": "परिवहन",
      "cardLogisticsSub": "(लॉजिस्टिक्स आणि लोड शेअरिंग)",
      "homeNav": "मुख्य पृष्ठ",
      "messagesNav": "संदेश",
      "communityNav": "समुदाय",
      "helpNav": "मदत",
      "settingsNav": "सेटिंग्स",
      "cropSowingAdvisory": "सल्लागार"
    },
    "auth": {
      "login": "लॉगिन",
      "register": "नोंदणी",
      "phone": "मोबाईल नंबर",
      "password": "पासवर्ड",
      "name": "पूर्ण नाव",
      "role": "मी आहे",
      "farmer": "शेतकरी",
      "buyer": "खरेदीदार"
    },
    "crop": {
      "title": "AI पीक शिफारस",
      "subtitle": "Gemini AI द्वारे वैयक्तिकृत पीक शिफारस मिळवा",
      "enterDetails": "शेत तपशील प्रविष्ट करा",
      "soilType": "मातीचा प्रकार",
      "season": "हंगाम",
      "kharif": "खरीप (जून-नोव्हेंबर)",
      "rabi": "रब्बी (नोव्हेंबर-एप्रिल)",
      "zaid": "उन्हाळी/झैद (मार्च-जून)",
      "irrigationType": "सिंचनाचा प्रकार",
      "rainfall": "पाऊस (मिमी)",
      "temperature": "तापमान (°C)",
      "budget": "बजेट (₹/एकर)",
      "previousCrop": "मागील पीक",
      "landSize": "जमिनीचा आकार (एकर)",
      "selectSoil": "माती निवडा",
      "selectIrrigation": "सिंचन निवडा",
      "selectState": "राज्य निवडा",
      "district": "जिल्हा",
      "submit": "AI शिफारस मिळवा",
      "loading": "AI विश्लेषण करत आहे...",
      "resultsTitle": "प्रमुख पीक शिफारसी",
      "expectedYield": "अपेक्षित उत्पादन",
      "confidenceMatch": "साम्य",
      "marketPrice": "बाजार भाव"
    },
    "mandi": {
      "title": "थेट मंडी भाव",
      "subtitle": "भारतातील ७,०००+ बाजारपेठांमधील थेट शेतीमाल भाव",
      "search": "शोधा",
      "commodity": "पीक/उत्पादन",
      "state": "राज्य",
      "trending": "आजचे ट्रेंडिंग भाव",
      "allCommodities": "सर्व पिके",
      "allStates": "सर्व राज्ये",
      "searchBtn": "भाव शोधा",
      "loading": "लोड होत आहे...",
      "noData": "माहिती आढळली नाही",
      "noDataSub": "कृपया फिल्टर बदला किंवा थेट भावांसाठी नंतर तपासा.",
      "headers": {
        "commodity": "उत्पादन",
        "market": "मंडी/बाजार",
        "stateDistrict": "राज्य/जिल्हा",
        "min": "किमान ₹",
        "max": "कमाल ₹",
        "modal": "मॉडेल ₹",
        "date": "तारीख"
      }
    },
    "disease": {
      "title": "AI पीक रोग ओळख",
      "subtitle": "त्वरित AI निदानासाठी पिकाचा फोटो अपलोड करा",
      "uploadPhoto": "पिकाचा फोटो अपलोड करा",
      "dropzone": "पिकाचा फोटो अपलोड करा किंवा येथे ड्रॅग करा",
      "dropzoneActive": "येथे फोटो टाका!",
      "fileLimits": "JPG, PNG, WebP १०MB पर्यंत",
      "cropType": "पिकाचा प्रकार *",
      "selectCrop": "पिकाचा प्रकार निवडा",
      "stateOptional": "राज्य (पर्यायी)",
      "selectState": "राज्य निवडा",
      "detectBtn": "AI ने रोग ओळखा",
      "analyzing": "विश्लेषण करत आहे...",
      "analyzingSub": "Gemini विजन AI पानांची तपासणी करत आहे",
      "resultsTitle": "निदान निकाल",
      "symptoms": "लक्षणे",
      "treatment": "उपचार",
      "prevention": "प्रतिबंधात्मक उपाय",
      "healthy": "तुमचे पीक निरोगी आहे!",
      "severity": "तीव्रता"
    },
    "assistant": {
      "title": "कृषी मित्र AI",
      "placeholder": "येथे तुमचा प्रश्न लिहा...",
      "send": "पाठवा",
      "clear": "साफ़ करा",
      "greeting": "नमस्कार! मी कृषी मित्र आहे. तुमच्या भाषेत शेतीबद्दल काहीही विचारा!",
      "listening": "ऐकत आहे... आता बोला...",
      "quickQuestions": "त्वरित प्रश्न",
      "voiceNotSupported": "तुमचा ब्राउझर व्हॉइस इनपुटला सपोर्ट करत नाही."
    },
    "marketplace": {
      "title": "शेतकरी बाज़ार",
      "subtitle": "थेट शेतकऱ्यांकडून खरेदी करा, मध्यस्थ नाही",
      "listCrop": "तुमचे पीक सूचीबद्ध करा",
      "cropLabel": "पीक",
      "allCrops": "सर्व पिके",
      "stateLabel": "राज्य",
      "allStates": "सर्व राज्ये",
      "searchBtn": "यादी शोधा",
      "foundLabel": "एकूण",
      "activeListings": "सक्रिय यादी आढळल्या",
      "noListings": "यादी आढळली नाही",
      "noListingsSub": "या बाजारात आपले पीक सूचीबद्ध करणारे पहिले व्हा!",
      "createListing": "पहिली यादी तयार करा",
      "qualityTier": "गुणवत्ता",
      "contactSeller": "शेतकऱ्याशी संपर्क करा",
      "perUnit": "प्रति"
    },
    "settings": {
      "title": "सेटिंग्स",
      "subtitle": "खाते, पसंती आणि सुरक्षिततेचे व्यवस्थापन करा.",
      "profileInfo": "प्रोफाइल माहिती",
      "fullName": "पूर्ण नाव",
      "phoneNumber": "मोबाईल नंबर",
      "role": "भूमिका",
      "location": "स्थान",
      "saveChanges": "बदल जतन करा",
      "appPreferences": "अॅप पसंती",
      "displayLanguage": "प्रदर्शित भाषा",
      "displayLanguageDesc": "हे डॅशबोर्डची भाषा बदलेल.",
      "darkTheme": "डार्क मोड",
      "darkThemeDesc": "अॅपमध्ये डार्क थीम सक्षम करा",
      "notifications": "सूचना",
      "noNotifications": "तुमच्याकडे कोणतीही नवीन सूचना नाही.",
      "privacy": "गोपनीयता आणि सुरक्षा",
      "changePassword": "पासवर्ड बदला"
    }
  },
  pa: {
    "app": {
      "name": "ਐਗਰੀਕਨੈਕਟ ਇੰਡੀਆ",
      "tagline": "ਨਕਲੀ ਬੁੱਧੀ ਨਾਲ ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਨੂੰ ਸਸ਼ਕਤ ਕਰਨਾ"
    },
    "nav": {
      "dashboard": "ਡੈਸ਼ਬੋਰਡ",
      "cropRecommendation": "ਫਸਲ ਸਿਫਾਰਸ਼",
      "mandiPrices": "ਮੰਡੀ ਭਾਅ",
      "diseaseDetection": "ਰੋਗ ਪਛਾਣ",
      "assistant": "ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ",
      "marketplace": "ਬਾਜ਼ਾਰ",
      "settings": "ਸੈਟਿੰਗਜ਼",
      "logout": "ਲੌਗਆਊਟ",
      "livePrices": "ਲਾਈਵ ਭਾਅ",
      "platform": "ਪਲੇਟਫਾਰਮ",
      "aiCapabilities": "AI ਸਮਰੱਥਾ",
      "vision": "ਸਾਡਾ ਦ੍ਰਿਸ਼ਟੀਕੋਣ",
      "signIn": "ਲੌਗਇਨ",
      "getStarted": "ਸ਼ੁਰੂ ਕਰੋ",
      "backToHome": "ਮੁੱਖ ਪੰਨੇ 'ਤੇ ਜਾਓ",
      "home": "ਮੁੱਖ ਪੰਨਾ"
    },
    "dashboard": {
      "welcome": "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
      "livePricesBadge": "ਲਾਈਵ ਭਾਅ",
      "weatherLocation": "ਨੈਨੀਤਾਲ, ਉੱਤਰਾਖੰਡ",
      "weatherStatus": "ਅੰਸ਼ਕ ਤੌਰ 'ਤੇ ਬੱਦਲਵਾਈ",
      "profileRole": "ਕਿਸਾਨ ਰਾਜੇਸ਼",
      "profileDiv": "ਉੱਤਰਾਖੰਡ ਡਿਵੀਜ਼ਨ",
      "advisoryBullet": "ਐਗਰੀਕਨੈਕਟ ਸਲਾਹਕਾਰ ਬੁਲੇਟਿਨ",
      "liveAdvisory": "ਲਾਈਵ ਸਲਾਹਕਾਰ",
      "govOfIndia": "ਐਗਰੀਕਨੈਕਟ ਨੈੱਟਵਰਕ",
      "kvkPortal": "ਸਲਾਹਕਾਰ ਪੋਰਟਲ",
      "cottonSowingTitle": "ਬਿਜਾਈ: ਕਪਾਹ ਦੀ ਬਿਜਾਈ ਦਾ ਸਮਾਂ",
      "cottonSowingSub": "(ਸਿਫਾਰਸ਼: ਕਪਾਹ ਦੀ ਬਿਜਾਈ ਦਾ ਸਮਾਂ)",
      "speakToAsk": "ਬੋਲ ਕੇ ਪੁੱਛੋ",
      "newsFeed": "ਨਿੱਜੀ ਖ਼ਬਰਾਂ ਫੀਡ",
      "alertTomato": "ਚੇਤਾਵਨੀ: ਨੇੜੇ ਟਮਾਟਰ ਦੀ ਬੀਮਾਰੀ ਮਿਲੀ ਹੈ",
      "alertCotton": "ਸਲਾਹ: ਕਪਾਹ ਦੀ ਬਿਜਾਈ ਦਾ ਸਮਾਂ ਆ ਗਿਆ ਹੈ",
      "cardMandi": "ਮੰਡੀ ਭਾਅ",
      "cardMandiSub": "(ਲਾਈਵ ਮੰਡੀ ਭਾਅ)",
      "cardDisease": "ਮੇਰੀ ਫਸਲ",
      "cardDiseaseSub": "(ਫਸਲ ਦੀ ਸਿਹਤ ਜਾਂਚ)",
      "cardMarket": "ਖਰੀਦਦਾਰ ਲੱਭੋ",
      "cardMarketSub": "(ਸਿੱਧਾ ਕਿਸਾਨ ਬਾਜ਼ਾਰ)",
      "cardCrop": "ਫਸਲ ਸੁਝਾਅ",
      "cardCropSub": "(AI ਫਸਲ ਸਿਫਾਰਸ਼)",
      "cardLogistics": "ਪਰਿਵਹਨ",
      "cardLogisticsSub": "(ਲੌਜਿਸਟਿਕਸ ਅਤੇ ਲੋਡ ਸਾਂਝਾ ਕਰਨਾ)",
      "homeNav": "ਮੁੱਖ ਪੰਨਾ",
      "messagesNav": "ਸੁਨੇਹੇ",
      "communityNav": "ਭਾਈਚਾਰਾ",
      "helpNav": "ਮਦਦ",
      "settingsNav": "ਸੈਟਿੰਗਜ਼",
      "cropSowingAdvisory": "ਸਲਾਹਕਾਰ"
    },
    "auth": {
      "login": "ਲੌਗਇਨ",
      "register": "ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
      "phone": "ਮੋਬਾਈਲ ਨੰਬਰ",
      "password": "ਪਾਸਵਰਡ",
      "name": "ਪੂਰਾ ਨਾਮ",
      "role": "ਮੈਂ ਹਾਂ",
      "farmer": "ਕਿਸਾਨ",
      "buyer": "ਖਰੀਦਦਾਰ"
    },
    "crop": {
      "title": "AI ਫਸਲ ਸੁਝਾਅ",
      "subtitle": "Gemini AI ਦੁਆਰਾ ਨਿੱਜੀ ਫਸਲ ਸੁਝਾਅ ਪ੍ਰਾਪਤ ਕਰੋ",
      "enterDetails": "ਖੇਤ ਦਾ ਵੇਰਵਾ ਦਰਜ ਕਰੋ",
      "soilType": "ਮਿੱਟੀ ਦੀ ਕਿਸਮ",
      "season": "ਮੌਸਮ",
      "kharif": "ਖਰੀਫ (ਜੂਨ-ਨਵੰਬਰ)",
      "rabi": "ਹਾੜੀ/ਰਬੀ (ਨਵੰਬਰ-ਅਪ੍ਰੈਲ)",
      "zaid": "ਜ਼ੈਦ (ਮਾਰਚ-ਜੂਨ)",
      "irrigationType": "ਸਿੰਚਾਈ ਦੀ ਕਿਸਮ",
      "rainfall": "ਮੀਂਹ (ਮੀ.ਮੀ.)",
      "temperature": "ਤਾਪਮਾਨ (°C)",
      "budget": "ਬਜਟ (₹/ਏਕੜ)",
      "previousCrop": "ਪਿਛਲੀ ਫਸਲ",
      "landSize": "ਜ਼ਮੀਨ ਦਾ ਆਕਾਰ (ਏਕੜ)",
      "selectSoil": "ਮਿੱਟੀ ਚੁਣੋ",
      "selectIrrigation": "ਸਿੰਚਾਈ ਚੁਣੋ",
      "selectState": "ਰਾਜ ਚੁਣੋ",
      "district": "ਜ਼ਿਲ੍ਹਾ",
      "submit": "AI ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ",
      "loading": "AI ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਰਿਹਾ ਹੈ...",
      "resultsTitle": "ਪ੍ਰਮੁੱਖ ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ",
      "expectedYield": "ਸੰਭਾਵਿਤ ਉਪਜ",
      "confidenceMatch": "ਮੇਲ",
      "marketPrice": "ਮਾਰਕੀਟ ਕੀਮਤ"
    },
    "mandi": {
      "title": "ਲਾਈਵ ਮੰਡੀ ਭਾਅ",
      "subtitle": "ਭਾਰਤ ਭਰ ਦੀਆਂ 7,000+ ਮੰਡੀਆਂ ਤੋਂ ਲਾਈਵ ਫਸਲ ਭਾਅ",
      "search": "ਖੋਜੋ",
      "commodity": "ਫਸਲ/ਉਤਪਾਦ",
      "state": "ਰਾਜ",
      "trending": "ਅੱਜ ਦੇ ਟ੍ਰੈਂਡਿੰਗ ਭਾਅ",
      "allCommodities": "ਸਾਰੀਆਂ ਫਸਲਾਂ",
      "allStates": "ਸਾਰੇ ਰਾਜ",
      "searchBtn": "ਭਾਅ ਖੋਜੋ",
      "loading": "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
      "noData": "ਕੋਈ ਡਾਟਾ ਨਹੀਂ ਮਿਲਿਆ",
      "noDataSub": "ਕਿਰਪਾ ਕਰਕੇ ਫਿਲਟਰ ਬਦਲੋ ਜਾਂ ਲਾਈਵ ਭਾਅ ਲਈ ਬਾਅਦ ਵਿੱਚ ਦੇਖੋ।",
      "headers": {
        "commodity": "ਉਤਪਾਦ",
        "market": "ਮੰਡੀ",
        "stateDistrict": "ਰਾਜ/ਜ਼ਿਲ੍ਹਾ",
        "min": "ਘੱਟੋ-ਘੱਟ ₹",
        "max": "ਵੱਧ ਤੋਂ ਵੱਧ ₹",
        "modal": "ਮਾਡਲ ₹",
        "date": "ਤਾਰੀਖ"
      }
    },
    "disease": {
      "title": "AI ਫਸਲ ਰੋਗ ਪਛਾਣ",
      "subtitle": "ਤੁਰੰਤ AI ਨਿਦਾਨ ਲਈ ਆਪਣੀ ਫਸਲ ਦੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ",
      "uploadPhoto": "ਫਸਲ ਦੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ",
      "dropzone": "ਫਸਲ ਦੀ ਫੋਟੋ ਖਿੱਚੋ ਜਾਂ ਇੱਥੇ ਸੁੱਟੋ",
      "dropzoneActive": "ਇੱਥੇ ਫੋਟੋ ਸੁੱਟੋ!",
      "fileLimits": "JPG, PNG, WebP 10MB ਤੱਕ",
      "cropType": "ਫਸਲ ਦੀ ਕਿਸਮ *",
      "selectCrop": "ਫਸਲ ਦੀ ਕਿਸਮ ਚੁਣੋ",
      "stateOptional": "ਰਾਜ (ਵੈਕਲਪਿਕ)",
      "selectState": "ਰਾਜ ਚੁਣੋ",
      "detectBtn": "AI ਨਾਲ ਬੀਮਾਰੀ ਪਛਾਣੋ",
      "analyzing": "ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਰਿਹਾ ਹੈ...",
      "analyzingSub": "Gemini ਵਿਜ਼ਨ AI ਪੱਤੇ ਦੀ ਜਾਂਚ ਕਰ ਰਿਹਾ ਹੈ",
      "resultsTitle": "ਨਿਦਾਨ ਦੇ ਨਤੀਜੇ",
      "symptoms": "ਲੱਛਣ",
      "treatment": "ਇਲਾਜ",
      "prevention": "ਬਚਾਅ ਦੇ ਉਪਾਅ",
      "healthy": "ਤੁਹਾਡੀ ਫਸਲ ਸਿਹਤਮੰਦ ਹੈ!",
      "severity": "ਗੰਭੀਰਤਾ"
    },
    "assistant": {
      "title": "ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ AI",
      "placeholder": "ਇੱਥੇ ਆਪਣਾ ਸਵਾਲ ਲਿਖੋ...",
      "send": "ਭੇਜੋ",
      "clear": "ਸਾਫ਼ ਕਰੋ",
      "greeting": "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ ਹਾਂ। ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਖੇਤੀਬਾੜੀ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ!",
      "listening": "ਸੁਣ ਰਿਹਾ ਹਾਂ... ਹੁਣ ਬੋਲੋ...",
      "quickQuestions": "ਤੁਰੰਤ ਪ੍ਰਸ਼ਨ",
      "voiceNotSupported": "ਤੁਹਾਡਾ ਬ੍ਰਾਊਜ਼ਰ ਵੌਇਸ ਇਨਪੁਟ ਦਾ ਸਮਰਥਨ ਨਹੀਂ ਕਰਦਾ।"
    },
    "marketplace": {
      "title": "ਕਿਸਾਨ ਬਾਜ਼ਾਰ",
      "subtitle": "ਸਿੱਧਾ ਕਿਸਾਨਾਂ ਤੋਂ ਖਰੀਦੋ, ਕੋਈ ਵਿਚੋਲਾ ਨਹੀਂ",
      "listCrop": "ਆਪਣੀ ਫਸਲ ਸੂਚੀਬੱਧ ਕਰੋ",
      "cropLabel": "ਫਸਲ",
      "allCrops": "ਸਾਰੀਆਂ ਫਸਲਾਂ",
      "stateLabel": "ਰਾਜ",
      "allStates": "ਸਾਰੇ ਰਾਜ",
      "searchBtn": "ਸੂਚੀ ਖੋਜੋ",
      "foundLabel": "ਕੁੱਲ",
      "activeListings": "ਸਰਗਰਮ ਸੂਚੀਆਂ ਮਿਲੀਆਂ",
      "noListings": "ਕੋਈ ਸੂਚੀ ਨਹੀਂ ਮਿਲੀ",
      "noListingsSub": "ਇਸ ਬਾਜ਼ਾਰ ਵਿੱਚ ਆਪਣੀ ਫਸਲ ਸੂਚੀਬੱਧ ਕਰਨ ਵਾਲੇ ਪਹਿਲੇ ਬਣੋ!",
      "createListing": "ਪਹਿਲੀ ਸੂਚੀ ਬਣਾਓ",
      "qualityTier": "ਗੁਣਵੱਤਾ",
      "contactSeller": "ਕਿਸਾਨ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
      "perUnit": "ਪ੍ਰਤੀ"
    },
    "settings": {
      "title": "ਸੈਟਿੰਗਜ਼",
      "subtitle": "ਆਪਣੇ ਖਾਤੇ, ਤਰਜੀਹਾਂ ਅਤੇ ਸੁਰੱਖਿਆ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ।",
      "profileInfo": "ਪ੍ਰੋਫਾਈਲ ਜਾਣਕਾਰੀ",
      "fullName": "ਪੂਰਾ ਨਾਮ",
      "phoneNumber": "ਮੋਬਾਈਲ ਨੰਬਰ",
      "role": "ਭੂਮਿਕਾ",
      "location": "ਸਥਾਨ",
      "saveChanges": "ਬਦਲਾਅ ਸੁਰੱਖਿਅਤ ਕਰੋ",
      "appPreferences": "ਐਪ ਤਰਜੀਹਾਂ",
      "displayLanguage": "ਪ੍ਰਦਰਸ਼ਿਤ ਭਾਸ਼ਾ",
      "displayLanguageDesc": "ਇਹ ਡੈਸ਼ਬੋਰਡ ਦੀ ਭਾਸ਼ਾ ਨੂੰ ਬਦਲ ਦੇਵੇਗਾ।",
      "darkTheme": "ਡਾਰਕ ਮੋਡ",
      "darkThemeDesc": "ਪੂਰੇ ਐਪ ਵਿੱਚ ਡਾਰਕ ਥੀਮ ਸਮਰੱਥ ਕਰੋ",
      "notifications": "ਨੋਟੀਫਿਕੇਸ਼ਨ",
      "noNotifications": "ਤੁਹਾਡੇ ਕੋਲ ਕੋਈ ਨਵਾਂ ਨੋਟੀਫਿਕੇਸ਼ਨ ਨਹੀਂ ਹੈ।",
      "privacy": "ਪ੍ਰਾਈਵੇਸੀ ਅਤੇ ਸੁਰੱਖਿਆ",
      "changePassword": "ਪਾਸਵਰਡ ਬਦਲੋ"
    }
  },
  bn: {
    "app": { "name": "এগ্রিকানেক্ট ইন্ডিয়া", "tagline": "কৃত্রিম বুদ্ধিমত্তা দিয়ে ভারতীয় কৃষকদের ক্ষমতায়ন করা" },
    "nav": { "dashboard": "ড্যাশবোর্ড", "cropRecommendation": "ফসল সুপারিশ", "mandiPrices": "মন্ডির দর", "diseaseDetection": "রোগ সনাক্তকরণ", "assistant": "কৃষি মিত্র", "marketplace": "বাজার", "settings": "সেটিংস", "logout": "লগআউট", "livePrices": "লাইভ বাজার দর", "platform": "প্ল্যাটফর্ম", "aiCapabilities": "AI ক্ষমতা", "vision": "আমাদের লক্ষ্য", "signIn": "লগইন", "getStarted": "শুরু করুন", "backToHome": "মূল পাতায় ফিরে যান", "home": "মূল পাতা" },
    "dashboard": {
      "welcome": "নমস্কার", "livePricesBadge": "লাইভ দর", "weatherLocation": "নৈনিতাল, উত্তরাখণ্ড", "weatherStatus": "আংশিক মেঘলা", "profileRole": "কৃষক রাজেশ", "profileDiv": "উত্তরাখণ্ড বিভাগ",
      "advisoryBullet": "এগ্রিকানেক্ট অ্যাডভাইজরি বুলেটিন", "liveAdvisory": "লাইভ অ্যাডভাইজরি", "govOfIndia": "এগ্রিকানেক্ট নেটওয়ার্ক", "kvkPortal": "পরামর্শ পোর্টাল", "cottonSowingTitle": "বপন: তুলা বপনের সময়", "cottonSowingSub": "(সুপারিশ: তুলা বপনের সময়)", "speakToAsk": "বলুন এবং জিজ্ঞাসা করুন", "newsFeed": "ব্যক্তিগতকৃত খবর", "alertTomato": "সতর্কতা: টমেটোর রোগ আশেপাশে পাওয়া গেছে", "alertCotton": "পরামর্শ: তুলা বপনের সময় এসে গেছে",
      "cardMandi": "মন্ডির দর", "cardMandiSub": "(লাইভ বাজার দর)", "cardDisease": "আমার ফসল", "cardDiseaseSub": "(ফসল স্বাস্থ্য পরীক্ষা)", "cardMarket": "ক্রেতা খুঁজুন", "cardMarketSub": "(সরাসরি কৃষক বাজার)", "cardCrop": "ফসল সুপারিশ", "cardCropSub": "(AI ফসল সুপারিশ)", "cardLogistics": "পরিবহন", "cardLogisticsSub": "(লজিস্টিকস ও লোড শেয়ারিং)",
      "homeNav": "মূল পাতা", "messagesNav": "বার্তা", "communityNav": "সম্প্রদায়", "helpNav": "সহায়তা", "settingsNav": "সেটিংস", "cropSowingAdvisory": "পরামর্শ"
    },
    "crop": { "title": "AI ফসল সুপারিশ", "subtitle": "Gemini AI চালিত ফসল চাষের ব্যক্তিগত পরামর্শ পান", "enterDetails": "খামারের বিবরণ দিন", "soilType": "মাটির ধরন", "season": "ঋতু", "kharif": "খরিফ (জুন-নভেম্বর)", "rabi": "রবি (নভেম্বর-এপ্রিল)", "zaid": "জায়েদ (মার্চ-জুন)", "irrigationType": "সেচের ধরন", "rainfall": "বৃষ্টিপাত (মিমি)", "temperature": "তাপমাত্রা (°C)", "budget": "বাজেট (₹/একর)", "previousCrop": "পূর্ববর্তী ফসল", "landSize": "জমির পরিমাণ (একর)", "selectSoil": "মাটি নির্বাচন করুন", "selectIrrigation": "সেচ নির্বাচন করুন", "selectState": "রাজ্য নির্বাচন করুন", "district": "জেলা", "submit": "AI সুপারিশ পান", "loading": "AI বিশ্লেষণ করছে...", "resultsTitle": "সেরা ফসল সুপারিশ", "expectedYield": "প্রত্যাশিত ফলন", "confidenceMatch": "মিল", "marketPrice": "বাজার দর" },
    "mandi": { "title": "লাইভ মন্ডির দর", "subtitle": "ভারত জুড়ে ৭,০০০+ মন্ডির রিয়েল-টাইম বাজার দর", "search": "অনুসন্ধান করুন", "commodity": "ফসল/পণ্য", "state": "রাজ্য", "trending": "আজকের ট্রেন্ডিং দর", "allCommodities": "সমস্ত পণ্য", "allStates": "সমস্ত রাজ্য", "searchBtn": "দর অনুসন্ধান", "loading": "লোড হচ্ছে...", "noData": "কোন তথ্য পাওয়া যায়নি", "noDataSub": "অনুগ্রহ করে ফিল্টার পরিবর্তন করুন অথবা লাইভ দরের জন্য পরে দেখুন।", "headers": { "commodity": "পণ্য", "market": "মন্ডি/বাজার", "stateDistrict": "রাজ্য/জেলা", "min": "নূন্যতম ₹", "max": "সর্বাধিক ₹", "modal": "মডাল ₹", "date": "তারিখ" } },
    "disease": { "title": "AI ফসল রোগ সনাক্তকরণ", "subtitle": "তাৎক্ষণিক AI রোগ নির্ণয়ের জন্য আপনার ফসলের ছবি আপলোড করুন", "uploadPhoto": "ফসলের ছবি আপলোড করুন", "dropzone": "ফসলের ছবি আপলোড করুন বা এখানে ড্র্যাগ করুন", "dropzoneActive": "এখানে ছবি ছেড়ে দিন!", "fileLimits": "JPG, PNG, WebP ১০MB পর্যন্ত", "cropType": "ফসলের ধরন *", "selectCrop": "ফসলের ধরন নির্বাচন করুন", "stateOptional": "রাজ্য (ঐচ্ছিক)", "selectState": "রাজ্য নির্বাচন করুন", "detectBtn": "AI দিয়ে রোগ সনাক্ত করুন", "analyzing": "ফসলের বিশ্লেষণ চলছে...", "analyzingSub": "Gemini ভিশন AI পাতা পরীক্ষা করছে", "resultsTitle": "নির্ণয়ের ফলাফল", "symptoms": "লক্ষণসমূহ", "treatment": "চিকিৎসা", "prevention": "প্রতিরোধ টিপস", "healthy": "আপনার ফসল সুস্থ আছে!", "severity": "গুরুত্ব" },
    "assistant": { "title": "কৃষি মিত্র AI", "placeholder": "আপনার চাষ সংক্রান্ত প্রশ্ন এখানে লিখুন...", "send": "পাঠান", "clear": "চ্যাট মুছুন", "greeting": "নমস্কার! আমি কৃষি মিত্র। আপনার নিজের ভাষায় চাষের যে কোনো প্রশ্ন জিজ্ঞাসা করুন!", "listening": "শুনছি... এখন বলুন...", "quickQuestions": "দ্রুত প্রশ্নাবলী", "voiceNotSupported": "আপনার ব্রাউজার ভয়েস ইনপুট সমর্থন করে না।" },
    "marketplace": { "title": "কৃষক বাজার", "subtitle": "সরাসরি কৃষকদের থেকে কিনুন, কোনো ফড়িয়া নেই", "listCrop": "আপনার ফসল তালিকাভুক্ত করুন", "cropLabel": "ফসল", "allCrops": "সমস্ত ফসল", "stateLabel": "রাজ্য", "allStates": "সমস্ত রাজ্য", "searchBtn": "তালিকা খুঁজুন", "foundLabel": "মোট", "activeListings": "টি সক্রিয় তালিকা পাওয়া গেছে", "noListings": "কোনো তালিকা পাওয়া যায়নি", "noListingsSub": "এই বাজারে প্রথম আপনার ফসল তালিকাভুক্ত করুন!", "createListing": "প্রথম তালিকা তৈরি করুন", "qualityTier": "মান", "contactSeller": "কৃষকের সাথে যোগাযোগ করুন", "perUnit": "প্রতি" },
    "settings": { "title": "সেটিংস", "subtitle": "আপনার অ্যাকাউন্ট, পছন্দ এবং নিরাপত্তা পরিচালনা করুন।", "profileInfo": "প্রোফাইল তথ্য", "fullName": "সম্পূর্ণ নাম", "phoneNumber": "মোবাইল নম্বর", "role": "ভূমিকা", "location": "ঠিকানা", "saveChanges": "পরিবর্তন সংরক্ষণ করুন", "appPreferences": "অ্যাপ পছন্দসমূহ", "displayLanguage": "ভাষা পরিবর্তন", "displayLanguageDesc": "এটি ড্যাশবোর্ডের ভাষা পরিবর্তন করবে।", "darkTheme": "ডার্ক মোড", "darkThemeDesc": "অ্যাপে ডার্ক থিম সক্রিয় করুন", "notifications": "বিজ্ঞপ্তি", "noNotifications": "আপনার কোনো নতুন বিজ্ঞপ্তি নেই।", "privacy": "গোপনীয়তা ও নিরাপত্তা", "changePassword": "পাসওয়ার্ড পরিবর্তন করুন" }
  },
  te: {
    "app": { "name": "అగ్రి-కనెక్ట్ ఇండియా", "tagline": "కృత్రిమ మేధస్సుతో భారతీయ రైతులకు సాధికారత" },
    "nav": { "dashboard": "డ్యాష్‌బోర్డ్", "cropRecommendation": "పంట సిఫార్సు", "mandiPrices": "మార్కెట్ ధరలు", "diseaseDetection": "పంట రోగ నిర్ధారణ", "assistant": "కృషి మిత్ర", "marketplace": "మార్కెట్ స్థలం", "settings": "సెట్టింగ్స్", "logout": "లాగౌట్", "livePrices": "లైవ్ ధరలు", "platform": "ప్లాట్‌ఫారమ్", "aiCapabilities": "AI సామర్థ్యాలు", "vision": "మా విజన్", "signIn": "లాగిన్", "getStarted": "ప్రారంభించండి", "backToHome": "ప్రధాన పేజీకి తిరిగి వెళ్లండి", "home": "హోమ్" },
    "dashboard": {
      "welcome": "నమస్కారం", "livePricesBadge": "లైవ్ ధరలు", "weatherLocation": "నైనీతాల్, ఉత్తరాఖండ్", "weatherStatus": "పాక్షికంగా మేఘావృతం", "profileRole": "రైతు రాజేష్", "profileDiv": "ఉత్తరాఖండ్ డివిజన్",
      "advisoryBullet": "అగ్రి-కనెక్ట్ సలహా బులెటిన్", "liveAdvisory": "లైవ్ సలహా", "govOfIndia": "అగ్రి-కనెక్ట్ నెట్‌వర్క్", "kvkPortal": "సలహా పోర్టల్", "cottonSowingTitle": "విత్తడం: పత్తి విత్తే సమయం", "cottonSowingSub": "(సిఫార్సు: పత్తి విత్తే సమయం)", "speakToAsk": "మాట్లాడి అడగండి", "newsFeed": "వ్యక్తిగతీకరించిన వార్తలు", "alertTomato": "అలర్ట్: టమోటా తెగులు సమీపంలో కనుగొనబడింది", "alertCotton": "సలహా: పత్తి విత్తే సమయం ఆసన్నమైంది",
      "cardMandi": "మార్కెట్ ధరలు", "cardMandiSub": "(నిజ సమయ మార్కెట్ ధరలు)", "cardDisease": "నా పంట", "cardDiseaseSub": "(పంట ఆరోగ్య పరీక్ష)", "cardMarket": "కొనుగోలుదారులను వెతకండి", "cardMarketSub": "(రైతు మార్కెట్)", "cardCrop": "పంట సిఫార్సు", "cardCropSub": "(AI పంట సిఫార్సు)", "cardLogistics": "రవాణా", "cardLogisticsSub": "(రవాణా & లోడ్ షేరింగ్)",
      "homeNav": "ప్రధాన పేజీ", "messagesNav": "సందేశాలు", "communityNav": "సంఘం", "helpNav": "సహాయం", "settingsNav": "సెట్టింగ్స్", "cropSowingAdvisory": "సలహా"
    },
    "crop": { "title": "AI పంట సిఫార్సు", "subtitle": "Gemini AI ఆధారంగా వ్యక్తిగతీకరించిన పంట సిఫార్సులు పొందండి", "enterDetails": "పొలం వివరాలను నమోదు చేయండి", "soilType": "నేల రకం", "season": "సీజన్", "kharif": "ఖరీఫ్ (జూన్-నవంబర్)", "rabi": "రబీ (నవంబర్-ఏప్రిల్)", "zaid": "జాయెద్ (మార్చి-జూన్)", "irrigationType": "నీటి పారుదల రకం", "rainfall": "వర్షపాతం (mm)", "temperature": "ఉష్ణోగ్రత (°C)", "budget": "బడ్జెట్ (₹/ఎకరాకి)", "previousCrop": "మునుపటి పంట", "landSize": "భూమి పరిమాణం (ఎకరాలు)", "selectSoil": "నేల రకాన్ని ఎంచుకోండి", "selectIrrigation": "నీటి పారుదల పద్ధతిని ఎంచుకోండి", "selectState": "రాష్ట్రాన్ని ఎంచుకోండి", "district": "జిల్లా", "submit": "AI సిఫార్సులను పొందండి", "loading": "AI విశ్లేషిస్తోంది...", "resultsTitle": "టాప్ పంట సిఫార్సులు", "expectedYield": "ఆశించిన దిగుబడి", "confidenceMatch": "సరిపోలిక", "marketPrice": "మార్కెట్ ధర" },
    "mandi": { "title": "లైవ్ మార్కెట్ ధరలు", "subtitle": "భారతదేశవ్యాప్తంగా 7,000+ మార్కెట్ల నుండి నిజ-సమయ ధరలు", "search": "వెతకండి", "commodity": "పంట/వస్తువు", "state": "రాష్ట్రం", "trending": "నేటి ట్రెండింగ్ ధరలు", "allCommodities": "అన్ని పంటలు", "allStates": "అన్ని రాష్ట్రాలు", "searchBtn": "ధరలను వెతకండి", "loading": "నమోదవుతోంది...", "noData": "డేటా కనుగొనబడలేదు", "noDataSub": "దయచేసి ఫిల్టర్లను సర్దుబాటు చేయండి లేదా లైవ్ ధరల కోసం తర్వాత తనిఖీ చేయండి.", "headers": { "commodity": "పంట వస్తువు", "market": "మార్కెట్/మండి", "stateDistrict": "రాష్ట్రం/జిల్లా", "min": "కనీస ధర ₹", "max": "గరిష్ట ధర ₹", "modal": "మోడల్ ధర ₹", "date": "తేదీ" } },
    "disease": { "title": "AI పంట రోగ నిర్ధారణ", "subtitle": "తక్షణ AI నిర్ధారణ కోసం మీ పంట ఫోటోను అప్‌లోడ్ చేయండి", "uploadPhoto": "పంట ఫోటోను అప్‌లోడ్ చేయండి", "dropzone": "పంట ఫోటోను ఇక్కడ వేయండి లేదా క్లిక్ చేయండి", "dropzoneActive": "ఫోటోను ఇక్కడ వేయండి!", "fileLimits": "JPG, PNG, WebP 10MB వరకు", "cropType": "పంట రకం *", "selectCrop": "పంట రకాన్ని ఎంచుకోండి", "stateOptional": "రాష్ట్రం (ఆప్షనల్)", "selectState": "రాష్ట్రాన్ని ఎంచుకోండి", "detectBtn": "AI తో వ్యాధిని గుర్తించండి", "analyzing": "పంటను విశ్లేషిస్తోంది...", "analyzingSub": "Gemini విజన్ AI ఆకును పరిశీలిస్తోంది", "resultsTitle": "రోగ నిర్ధారణ ఫలితాలు", "symptoms": "లక్షణాలు", "treatment": "చికిత్స", "prevention": "నివారణ చిట్కాలు", "healthy": "మీ పంట ఆరోగ్యంగా ఉంది!", "severity": "తీవ్రత" },
    "assistant": { "title": "కృషి మిత్ర AI", "placeholder": "మీ వ్యవసాయ ప్రశ్నాన్ని ఇక్కడ రాయండి...", "send": "పంపండి", "clear": "చాట్ క్లియర్ చేయండి", "greeting": "నమస్కారం! నేను కృషి మిత్రను. మీ స్వంత భాషలో వ్యవసాయానికి సంబంధించిన ఏదైనా అడగండి!", "listening": "వింటున్నాను... ఇప్పుడు మాట్లాడండి...", "quickQuestions": "త్వరిత ప్రశ్నలు", "voiceNotSupported": "మీ బ్రౌజర్ వాయిస్ ఇన్‌పుట్‌కు మద్దతు ఇవ్వదు." },
    "marketplace": { "title": "రైతు బజార్", "subtitle": "నేరుగా రైతుల నుండి కొనండి, దళారులు లేరు", "listCrop": "మీ పంటను జాబితా చేయండి", "cropLabel": "పంట", "allCrops": "అన్ని పంటలు", "stateLabel": "రాష్ట్రం", "allStates": "అన్ని రాష్ట్రాలు", "searchBtn": "జాబితాలను వెతకండి", "foundLabel": "మొత్తం", "activeListings": "సక్రియ జాబితాలు కనుగొనబడ్డాయి", "noListings": "జాబితాలు కనుగొనబడలేదు", "noListingsSub": "ఈ మార్కెట్లో మీ పంటను మొదట జాబితా చేయండి!", "createListing": "మొదటి జాబితాను సృష్టించండి", "qualityTier": "నాణ్యత", "contactSeller": "రైతును సంప్రదించండి", "perUnit": "ప్రతి" },
    "settings": { "title": "సెట్టింగ్స్", "subtitle": "మీ ఖాతా, ప్రాధాన్యతలు మరియు భద్రతను నిర్వహించండి.", "profileInfo": "ప్రొఫైల్ సమాచారం", "fullName": "పూర్తి పేరు", "phoneNumber": "ఫోన్ నంబర్", "role": "పాత్ర", "location": "చిరునామా", "saveChanges": "మార్పులను సేవ్ చేయండి", "appPreferences": "యాప్ ప్రాధాన్యతలు", "displayLanguage": "భాషను మార్చండి", "displayLanguageDesc": "ఇది డ్యాష్‌బోర్డ్ ఇంటర్‌ఫేస్ భాషను మారుస్తుంది.", "darkTheme": "డార్క్ మోడ్", "darkThemeDesc": "యాప్ అంతటా డార్క్ థీమ్‌ను ప్రారంభించండి", "notifications": "నోటిఫికేషన్లు", "noNotifications": "మీకు కొత్త నోటిఫికేషన్లు ఏవీ లేవు.", "privacy": "గోప్యత & భద్రత", "changePassword": "పాస్‌వర్డ్ మార్చండి" }
  },
  ta: {
    "app": { "name": "அக்ரிகனெக்ட் இந்தியா", "tagline": "செயற்கை நுண்ணறிவு மூலம் இந்திய விவசாயிகளுக்கு அதிகாரம் அளித்தல்" },
    "nav": { "dashboard": "டாஷ்போர்டு", "cropRecommendation": "பயிர் பரிந்துரை", "mandiPrices": "சந்தை விலைகள்", "diseaseDetection": "நோய் கண்டறிதல்", "assistant": "கிருஷி மித்ரா", "marketplace": "சந்தை", "settings": "அமைப்புகள்", "logout": "வெளியேறு", "livePrices": "நேரடி விலைகள்", "platform": "தளம்", "aiCapabilities": "AI திறன்கள்", "vision": "எங்கள் பார்வை", "signIn": "உள்நுழை", "getStarted": "தொடங்குங்கள்", "backToHome": "முதன்மை பக்கத்திற்குச் செல்லவும்", "home": "முகப்பு" },
    "dashboard": {
      "welcome": "வணக்கம்", "livePricesBadge": "நேரடி விலைகள்", "weatherLocation": "நைனிடால், உத்தரகாண்ட்", "weatherStatus": "பகுதி மேகமூட்டம்", "profileRole": "விவசாயி ராஜேஷ்", "profileDiv": "உத்தரகாண்ட் பிரிவு",
      "advisoryBullet": "அக்ரிகனெக்ட் ஆலோசனை அறிக்கை", "liveAdvisory": "நேரடி ஆலோசனை", "govOfIndia": "அக்ரிகனெக்ட் நெட்வொர்க்", "kvkPortal": "ஆலோசனை போர்டல்", "cottonSowingTitle": "விதைப்பு: பருத்தி விதைப்பு நேரம்", "cottonSowingSub": "(பரிந்துரை: பருத்தி விதைப்பு நேரம்)", "speakToAsk": "பேசி கேட்கவும்", "newsFeed": "தனிப்பயனாக்கப்பட்ட செய்திகள்", "alertTomato": "எச்சரிக்கை: தக்காளி நோய் அருகில் கண்டறியப்பட்டுள்ளது", "alertCotton": "ஆலோசனை: பருத்தி விதைப்பதற்கான நேரம் வந்துவிட்டது",
      "cardMandi": "சந்தை விலைகள்", "cardMandiSub": "(உண்மைநேர சந்தை விலைகள்)", "cardDisease": "என் பயிர்", "cardDiseaseSub": "(பயிர் சுகாதார சோதனை)", "cardMarket": "கொள்முதல் செய்பவரை தேடுக", "cardMarketSub": "(விவசாயி நேரடி சந்தை)", "cardCrop": "பயிர் பரிந்துரை", "cardCropSub": "(AI பயிர் பரிந்துரை)", "cardLogistics": "போக்குவரத்து", "cardLogisticsSub": "(போக்குவரத்து & லோடு பகிர்வு)",
      "homeNav": "முதன்மை பக்கம்", "messagesNav": "செய்திகள்", "communityNav": "சமூகம்", "helpNav": "உதவி", "settingsNav": "அமைப்புகள்", "cropSowingAdvisory": "ஆலோசனை"
    },
    "crop": { "title": "AI பயிர் பரிந்துரை", "subtitle": "Gemini AI மூலம் தனிப்பயனாக்கப்பட்ட பயிர் ஆலோசனைகளைப் பெறுங்கள்", "enterDetails": "விவசாய விவரங்களை உள்ளிடவும்", "soilType": "மண் வகை", "season": "பருவம்", "kharif": "காரிஃப் (ஜூன்-நவம்பர்)", "rabi": "ரபி (நவம்பர்-ஏப்ரல்)", "zaid": "சையத் (மார்ச்-ஜூன்)", "irrigationType": "பாசன வகை", "rainfall": "மழைப்பொழிவு (மிமீ)", "temperature": "வெப்பநிலை (°C)", "budget": "பட்ஜெட் (₹/ஏக்கர்)", "previousCrop": "முந்தைய பயிர்", "landSize": "நில அளவு (ஏக்கர்)", "selectSoil": "மண்ணைத் தேர்ந்தெடுக்கவும்", "selectIrrigation": "பாசன முறையைத் தேர்ந்தெடுக்கவும்", "selectState": "மாநிலத்தைத் தேர்ந்தெடுக்கவும்", "district": "மாவட்டம்", "submit": "AI பரிந்துரைகளைப் பெறுங்கள்", "loading": "AI பகுப்பாய்வு செய்கிறது...", "resultsTitle": "சிறந்த பயிர் பரிந்துரைகள்", "expectedYield": "எதிர்பார்க்கப்படும் மகசூல்", "confidenceMatch": "பொருத்தம்", "marketPrice": "சந்தை விலை" },
    "mandi": { "title": "நேரடி சந்தை விலைகள்", "subtitle": "இந்தியா முழுவதும் உள்ள 7,000+ சந்தைகளின் உண்மைநேர விலைகள்", "search": "தேடுக", "commodity": "பயிர்/பொருள்", "state": "மாநிலம்", "trending": "இன்றைய முக்கிய விலைகள்", "allCommodities": "அனைத்து பயிர்கள்", "allStates": "அனைத்து மாநிலங்கள்", "searchBtn": "விலைகளைத் தேடுக", "loading": "ஏற்றப்படுகிறது...", "noData": "தகவல்கள் எதுவும் இல்லை", "noDataSub": "வடிகட்டிகளை மாற்றவும் அல்லது நேரடி விலைகளுக்குப் பின்னர் பார்க்கவும்.", "headers": { "commodity": "பொருள்", "market": "சந்தை/மண்டி", "stateDistrict": "மாநிலம்/மாவட்டம்", "min": "குறைந்தபட்ச ₹", "max": "அதிகபட்ச ₹", "modal": "சராசரி ₹", "date": "தேதி" } },
    "disease": { "title": "AI பயிர் நோய் கண்டறிதல்", "subtitle": "உடனடி AI கண்டறிதலுக்கு உங்கள் பயிரின் புகைப்படத்தை பதிவேற்றவும்", "uploadPhoto": "பயிர் புகைப்படத்தை பதிவேற்றவும்", "dropzone": "பயிர் புகைப்படத்தை இங்கே இழுத்து போடவும் அல்லது கிளிக் செய்யவும்", "dropzoneActive": "புகைப்படத்தை இங்கே போடவும்!", "fileLimits": "JPG, PNG, WebP 10MB வரை", "cropType": "பயிர் வகை *", "selectCrop": "பயிர் வகையைத் தேர்ந்தெடுக்கவும்", "stateOptional": "மாநிலம் (விருப்பம்)", "selectState": "மாநிலத்தைத் தேர்ந்தெடுக்கவும்", "detectBtn": "AI மூலம் நோய் கண்டறியவும்", "analyzing": "பயிரை பகுப்பாய்வு செய்கிறது...", "analyzingSub": "Gemini விஷன் AI இலையை ஆய்வு செய்கிறது", "resultsTitle": "கண்டறிதல் முடிவுகள்", "symptoms": "அறிகுறிகள்", "treatment": "சிகிச்சை", "prevention": "தடுப்பு குறிப்புகள்", "healthy": "உங்கள் பயிர் ஆரோக்கியமாக உள்ளது!", "severity": "தீவிரம்" },
    "assistant": { "title": "கிருஷி மித்ரா AI", "placeholder": "உங்கள் விவசாய கேள்வியை இங்கே எழுதுங்கள்...", "send": "அனுப்புக", "clear": "அரட்டையை அழி", "greeting": "வணக்கம்! நான் கிருஷி மித்ரா. உங்கள் சொந்த மொழியில் விவசாயம் பற்றி எது வேண்டுமானாலும் கேளுங்கள்!", "listening": "கேட்கிறது... இப்போது பேசுங்கள்...", "quickQuestions": "விரைவான கேள்விகள்", "voiceNotSupported": "உங்கள் உலாவி குரல் உள்ளீட்டை ஆதரிக்கவில்லை." },
    "marketplace": { "title": "விவசாயி சந்தை", "subtitle": "நேரடியாக விவசாயிகளிடமிருந்து வாங்குங்கள், இடைத்தரகர்கள் இல்லை", "listCrop": "உங்கள் பயிரை பட்டியலிடுங்கள்", "cropLabel": "பயிர்", "allCrops": "அனைத்து பயிர்கள்", "stateLabel": "மாநிலம்", "allStates": "அனைத்து மாநிலங்கள்", "searchBtn": "பட்டியல்களைத் தேடுக", "foundLabel": "மொத்தம்", "activeListings": "செயலில் உள்ள பட்டியல்கள் உள்ளன", "noListings": "பட்டியல்கள் எதுவும் இல்லை", "noListingsSub": "இந்த சந்தையில் உங்கள் பயிரை முதலில் பட்டியலிடுங்கள்!", "createListing": "முதல் பட்டியலை உருவாக்குங்கள்", "qualityTier": "தரம்", "contactSeller": "விவசாயியைத் தொடர்பு கொள்க", "perUnit": "ஒவ்வொரு" },
    "settings": { "title": "அமைப்புகள்", "subtitle": "உங்கள் கணக்கு, விருப்பங்கள் மற்றும் பாதுகாப்பை நிர்வகிக்கவும்.", "profileInfo": "சுயவிவர தகவல்", "fullName": "முழு பெயர்", "phoneNumber": "தொலைபேசி எண்", "role": "பங்கு", "location": "முகவரி", "saveChanges": "மாற்றங்களைச் சேமிக்கவும்", "appPreferences": "செயலி விருப்பங்கள்", "displayLanguage": "மொழியை மாற்றவும்", "displayLanguageDesc": "இது டாஷ்போர்டு இடைமுக மொழியை மாற்றும்.", "darkTheme": "இருண்ட பயன்முறை", "darkThemeDesc": "செயலி முழுவதும் இருண்ட தீம் இயக்கவும்", "notifications": "அறிவிப்புகள்", "noNotifications": "உங்களுக்கு புதிய அறிவிப்புகள் எதுவும் இல்லை.", "privacy": "தனியுரிமை & பாதுகாப்பு", "changePassword": "கடவுச்சொல்லை மாற்றவும்" }
  }
};

interface LanguageStore {
  locale: string;
  setLanguage: (locale: string) => void;
  t: (path: string, defaultValue?: string) => string;
  hydrate: () => void;
}

export const useLanguageStore = create<LanguageStore>((set, get) => {
  // IMPORTANT: Always start with 'en' so server and first client render match.
  // The actual stored locale is applied after mount via hydrate() called in useEffect.
  // This prevents Next.js SSR hydration mismatches.
  const defaultLocale = 'en';
  
  return {
    locale: defaultLocale,
    setLanguage: (locale) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('agriconnect_locale', locale);
      }
      set({ locale });
    },
    // Called once in useEffect after mount to read localStorage and update locale
    hydrate: () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('agriconnect_locale');
        if (stored && stored !== get().locale) {
          set({ locale: stored });
        }
      }
    },
    t: (path, defaultValue) => {
      const { locale } = get();
      const dictionary = DICTIONARIES[locale] || DICTIONARIES['en'];
      
      const keys = path.split('.');
      let result = dictionary;
      
      for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
          result = result[key];
        } else {
          // Fallback to English dictionary if key is missing in local dictionary
          let enResult = DICTIONARIES['en'];
          for (const enKey of keys) {
            if (enResult && typeof enResult === 'object' && enKey in enResult) {
              enResult = enResult[enKey];
            } else {
              enResult = null;
              break;
            }
          }
          return enResult || defaultValue || path;
        }
      }
      
      return typeof result === 'string' ? result : (defaultValue || path);
    }
  };
});
