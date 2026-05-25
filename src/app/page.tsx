'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useLanguageStore } from '@/store/languageStore';
import { useUIStore } from '@/store/uiStore';
import { LANGUAGES } from '@/lib/constants';
import { 
  Sprout, 
  TrendingUp, 
  Microscope, 
  MessageCircle, 
  ShoppingCart, 
  Bot,
  Globe2,
  ShieldCheck,
  Users,
  ArrowRight,
  Menu,
  X,
  Mic,
  Calendar,
  AlertTriangle,
  Sun,
  Moon
} from 'lucide-react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ── COMPREHENSIVE LOCALIZED DICTIONARY FOR 7 INDIAN LANGUAGES
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LANDING_DICT: Record<string, any> = {
  en: {
    ministryName: "AgriConnect Agricultural Network",
    govOfIndia: "AgriConnect India",
    kvkPortal: "AgriConnect Digital Portal",
    portalTitle: "AgriConnect India",
    portalSub: "AgriConnect Intelligence Portal",
    platform: "Platform Services",
    aiCapabilities: "AI Capabilities",
    vision: "Our Vision",
    signIn: "Sign In",
    getStarted: "Get Started",
    badge: "AgriConnect Digital Agriculture Initiative",
    titlePart1: "Empowering Indian",
    titlePart2: "Farmers with AI",
    subTitle: "A prestigious digital platform delivering live APMC mandis, Gemini AI crop suggestions, visual disease leaf scanning, and multi-language agricultural advisory services to 14 crore farmers.",
    enterPortal: "Enter Digital Portal",
    kvkBulletins: "AgriConnect Advisory Bulletins",
    metricMandis: "7,200+ Live Mandis",
    metricMandisSub: "APMC markets updated live",
    metricAccuracy: "98.7% AI Scanner",
    metricAccuracySub: "Gemini Vision diagnostics",
    metricLang: "7 Indian Languages",
    metricLangSub: "Bilingual regional dialects",
    
    crisisTitle: "Agriculture Challenge & Intervention",
    crisisSub: "Despite employing over 40% of the workforce, Indian agriculture faces major structural challenges. Our AI-driven portal provides instant digital interventions.",
    issue1Title: "Agricultural Information Gap",
    issue1Desc: "Farmers lack direct access to modern crop science, local soil diagnostics, and expert regional advice.",
    issue2Title: "Undetected Crop Pathology",
    issue2Desc: "Millions of tonnes of yield are lost annually because plant diseases are not detected and treated in time.",
    issue3Title: "Entrenched Middlemen Margins",
    issue3Desc: "Farmers often receive a small fraction of market prices due to long intermediary supply chains.",
    
    statTitle: "Agricultural Telemetry Panel",
    statLoss: "35%",
    statLossDesc: "Crop yield lost to pests & diseases annually",
    statFarmers: "140M+",
    statFarmersDesc: "Farmers requiring direct digital intervention",
    statMoney: "₹90,000 Cr",
    statMoneyDesc: "Post-harvest losses due to missing market links",
    
    servicesTitle: "Unified Agricultural Services Portal",
    servicesSub: "State-of-the-art agricultural services and unified advisory systems, designed for modern Indian farming.",
    
    cardMandiTitle: "Live Mandi Prices",
    cardMandiDesc: "Access real-time price feeds from 7,000+ APMC mandis across India to get maximum value for your harvest.",
    cardDiseaseTitle: "Leaf Disease Scanner",
    cardDiseaseDesc: "Snap a crop leaf photo to diagnose plant pathogens instantly with Gemini Vision AI and obtain remedies.",
    cardCropTitle: "AI Sowing suggestions",
    cardCropDesc: "Get personalized crop recommendations based on soil type, season, weather telemetry, and budget.",
    cardAssistantTitle: "KrishiMitra AI Voice",
    cardAssistantDesc: "Speak or type in Hindi, Marathi, Punjabi, Tamil, Telugu, and more for instant voice agricultural help.",
    cardMarketTitle: "Buyer Marketplace",
    cardMarketDesc: "List your harvest directly to verified bulk buyers, processing mills, and distributors without middlemen.",
    cardAdvisoryTitle: "AgriConnect Live Advisory",
    cardAdvisoryDesc: "Advisory bulletins, weather warnings, and sowing guidelines updated live from AgriConnect Research Centers.",
    
    aiTitle: "AgriConnect AI Sowing & Vision Models",
    aiSub: "AgriConnect India is engineered with state-of-the-art Large Language Models and Computer Vision architectures, customized specifically for Indian agricultural data.",
    aiFeature1: "Real-time visual inference for plant pathology and leaf diagnostics",
    aiFeature2: "Context-aware RAG for localized agricultural best practices",
    aiFeature3: "Predictive analytics for live regional commodity price forecasts",
    
    visionTitle: "Built for Bharat",
    visionDesc: "We believe that giving the right data to a farmer at the right time can change the trajectory of an entire rural community. AgriConnect India is our step towards a more equitable and technologically advanced agricultural sector.",
    joinBtn: "Join the Digital Platform",
    
    builtWith: "Built with ❤️ for Indian Farmers.",
    allRights: "All rights reserved.",
    coDesigned: "AgriConnect Unified Portal. Powered by Advanced Agricultural Systems."
  },
  hi: {
    ministryName: "एग्रीकनेक्ट कृषि नेटवर्क",
    govOfIndia: "एग्रीकनेक्ट भारत",
    kvkPortal: "एग्रीकनेक्ट डिजिटल पोर्टल",
    portalTitle: "एग्रीकनेक्ट भारत",
    portalSub: "एग्रीकनेक्ट कृषि खुफिया पोर्टल",
    platform: "प्लेटफ़ॉर्म सेवाएं",
    aiCapabilities: "AI क्षमताएं",
    vision: "हमारा दृष्टिकोण",
    signIn: "लॉगिन",
    getStarted: "शुरू करें",
    badge: "एग्रीकनेक्ट डिजिटल कृषि पहल",
    titlePart1: "भारतीय किसानों का",
    titlePart2: "AI सशक्तिकरण",
    subTitle: "14 करोड़ किसानों को लाइव APMC मंडी भाव, Gemini AI फसल सुझाव, दृश्य रोग पहचान और बहुभाषी कृषि सलाहकार सेवाएं प्रदान करने वाला एक प्रतिष्ठित डिजिटल पोर्टल।",
    enterPortal: "पोर्टल में प्रवेश करें",
    kvkBulletins: "सलाहकार बुलेटिन",
    metricMandis: "7,200+ लाइव मंडियां",
    metricMandisSub: "सक्रिय एपीएमसी बाजार लाइव अपडेट",
    metricAccuracy: "98.7% AI स्कैनर",
    metricAccuracySub: "Gemini विज़न रोग निदान",
    metricLang: "7 क्षेत्रीय भाषाएं",
    metricLangSub: "द्विभाषी क्षेत्रीय बोलियां",
    
    crisisTitle: "भारतीय कृषि चुनौती और समाधान",
    crisisSub: "40% से अधिक कार्यबल को रोजगार देने के बावजूद, भारतीय कृषि को संरचनात्मक चुनौतियों का सामना करना पड़ता है। हमारा AI पोर्टल तत्काल डिजिटल समाधान प्रदान करता है।",
    issue1Title: "कृषि सूचना का अभाव",
    issue1Desc: "किसानों के पास आधुनिक कृषि विज्ञान, स्थानीय मिट्टी निदान और विशेषज्ञ क्षेत्रीय सलाह तक सीधी पहुंच नहीं है।",
    issue2Title: "अज्ञात फसल बीमारियाँ",
    issue2Desc: "हर साल लाखों टन फसल नष्ट हो जाती है क्योंकि पौधों के रोगों की समय पर पहचान और उपचार नहीं हो पाता है।",
    issue3Title: "बिचौलियों का शोषण",
    issue3Desc: "लंबी मध्यस्थ आपूर्ति श्रृंखलाओं के कारण किसानों को अक्सर बाजार कीमतों का एक छोटा हिस्सा ही मिल पाता है।",
    
    statTitle: "एकीकृत कृषि टेलीमेट्री",
    statLoss: "35%",
    statLossDesc: "कीटों और बीमारियों के कारण सालाना फसल की हानि",
    statFarmers: "140M+",
    statFarmersDesc: "किसानों को प्रत्यक्ष डिजिटल हस्तक्षेप की आवश्यकता है",
    statMoney: "₹90,000 करोड़",
    statMoneyDesc: "बाजार संपर्कों के अभाव में फसल कटाई के बाद नुकसान",
    
    servicesTitle: "एकीकृत कृषि सेवा पोर्टल",
    servicesSub: "आधुनिक भारतीय कृषि के लिए डिज़ाइन की गई अत्याधुनिक कृषि सेवाएं और एकीकृत सलाहकार प्रणालियां।",
    
    cardMandiTitle: "लाइव मंडी भाव",
    cardMandiDesc: "अपनी उपज का अधिकतम मूल्य प्राप्त करने के लिए भारत भर की 7,000+ एपीएमसी मंडियों से लाइव भावों की तुलना करें।",
    cardDiseaseTitle: "फसल रोग स्कैनर",
    cardDiseaseDesc: "Gemini विज़न AI के साथ पौधों के रोगों का तुरंत निदान करने और उपचार प्राप्त करने के लिए पत्ते की फोटो लें।",
    cardCropTitle: "AI फसल बुवाई सुझाव",
    cardCropDesc: "मिट्टी के प्रकार, मौसम, मौसम टेलीमेट्री और बजट के आधार पर व्यक्तिगत फसल सिफारिशें प्राप्त करें।",
    cardAssistantTitle: "कृषि मित्र AI वॉयस",
    cardAssistantDesc: "त्वरित मौखिक कृषि सहायता के लिए हिंदी, मराठी, पंजाबी, तमिल, तेलुगु और अन्य भाषाओं में बोलें या लिखें।",
    cardMarketTitle: "खरीदार बाज़ार",
    cardMarketDesc: "बिना किसी बिचौलिए के अपनी फसल को सीधे सत्यापित थोक खरीदारों, मिलों और वितरकों को सूचीबद्ध करें।",
    cardAdvisoryTitle: "एग्रीकनेक्ट लाइव सलाहकार",
    cardAdvisoryDesc: "एग्रीकनेक्ट अनुसंधान केंद्रों से सीधे लाइव अपडेट किए गए सलाहकार बुलेटिन, मौसम की चेतावनी और बुवाई दिशानिर्देश।",
    
    aiTitle: "एग्रीकनेक्ट AI बुवाई और विज़न मॉडल",
    aiSub: "एग्रीकनेक्ट भारत को अत्याधुनिक लार्ज लैंग्वेज मॉडल और कंप्यूटर विज़न आर्किटेक्चर के साथ इंजीनियर किया गया है, जो विशेष रूप से भारतीय कृषि डेटा के लिए अनुकूलित है।",
    aiFeature1: "पौधों के रोग और पत्ते के निदान के लिए रीयल-टाइम विज़ुअल विश्लेषण",
    aiFeature2: "स्थानीय कृषि सर्वोत्तम प्रथाओं के लिए संदर्भ-जागरूक RAG",
    aiFeature3: "लाइव क्षेत्रीय जिंस मूल्य पूर्वानुमानों के लिए भविष्य कहनेवाला विश्लेषण",
    
    visionTitle: "भारत के लिए निर्मित",
    visionDesc: "हमारा मानना है कि एक किसान को सही समय पर सही डेटा देने से पूरे ग्रामीण समुदाय की दिशा बदल सकती है। एग्रीकनेक्ट भारत अधिक न्यायसंगत और तकनीकी रूप से उन्नत कृषि क्षेत्र की ओर हमारा कदम है।",
    joinBtn: "डिजिटल प्लेटफॉर्म में शामिल हों",
    
    builtWith: "भारतीय किसानों के लिए ❤️ से निर्मित।",
    allRights: "सर्वाधिकार सुरक्षित।",
    coDesigned: "एग्रीकनेक्ट एकीकृत पोर्टल। उन्नत कृषि प्रणालियों द्वारा संचालित।"
  },
  mr: {
    ministryName: "एग्रीकनेक्ट कृषी नेटवर्क",
    govOfIndia: "एग्रीकनेक्ट भारत",
    kvkPortal: "एग्रीकनेक्ट डिजिटल पोर्टल",
    portalTitle: "एग्रीकनेक्ट भारत",
    portalSub: "एग्रीकनेक्ट कृषी गुप्तचर पोर्टल",
    platform: "प्लॅटफॉर्म सेवा",
    aiCapabilities: "AI क्षमता",
    vision: "आमचा दृष्टिकोन",
    signIn: "लॉगिन",
    getStarted: "सुरू करा",
    badge: "एग्रीकनेक्ट डिजिटल कृषी उपक्रम",
    titlePart1: "भारतीय शेतकऱ्यांचे",
    titlePart2: "AI सबलीकरण",
    subTitle: "14 कोटी शेतकऱ्यांना थेट APMC बाजार भाव, Gemini AI पीक शिफारसी, पानांचे रोग स्कॅनिंग आणि बहुभाषी सल्लागार सेवा देणारे एक प्रतिष्ठित डिजिटल पोर्टल.",
    enterPortal: "पोर्टलमध्ये प्रवेश करा",
    kvkBulletins: "सल्लागार बुलेटिन",
    metricMandis: "7,200+ थेट मंडई",
    metricMandisSub: "एपीएमसी थेट बाजार अपडेट",
    metricAccuracy: "98.7% AI स्कॅनर",
    metricAccuracySub: "Gemini विजन रोग निदान",
    metricLang: "7 प्रादेशिक भाषा",
    metricLangSub: "द्विभाषी प्रादेशिक बोलीभाषा",
    
    crisisTitle: "भारतीय कृषी आव्हान आणि उपाय",
    crisisSub: "40% पेक्षा जास्त कार्यबलाला रोजगार देऊनही, भारतीय शेतीला रचनात्मक आव्हानांना सामोरे जावे लागते. आमचे AI पोर्टल त्वरित डिजिटल शिफारसी प्रदान करते.",
    issue1Title: "कृषी माहितीची कमतरता",
    issue1Desc: "शेतकऱ्यांकडे आधुनिक कृषी विज्ञान, स्थानिक माती तपासणी आणि तज्ज्ञ प्रादेशिक सल्ल्याचा थेट अभाव असतो.",
    issue2Title: "अपेक्षा नसलेले पीक रोग",
    issue2Desc: "दरवर्षी लाखो टन पीक वाया जाते कारण झाडांच्या रोगांचे वेळेवर निदान आणि उपचार होऊ शकत नाहीत.",
    issue3Title: "मध्यस्थांचे शोषण",
    issue3Desc: "लांब मध्यस्थ पुरवठा साखळीमुळे शेतकऱ्यांना सहसा बाजारभावाचा एक छोटासा हिस्साच मिळतो.",
    
    statTitle: "एकीकृत कृषी टेलीमेट्री",
    statLoss: "35%",
    statLossDesc: "कीटक आणि रोगांमुळे होणारे वार्षिक पीक नुकसान",
    statFarmers: "140M+",
    statFarmersDesc: "शेतकऱ्यांना थेट डिजिटल हस्तक्षेपाची गरज",
    statMoney: "₹90,000 कोटी",
    statMoneyDesc: "बाजार जोडणीअभावी काढणीनंतरचे नुकसान",
    
    servicesTitle: "एकीकृत कृषी सेवा पोर्टल",
    servicesSub: "आधुनिक भारतीय शेतीसाठी डिझाइन केलेल्या अत्याधुनिक कृषी सेवा आणि सल्लागार प्रणाली.",
    
    cardMandiTitle: "थेट मंडी भाव",
    cardMandiDesc: "तुमच्या शेतीमालाचा जास्तीत जास्त मोबदला मिळवण्यासाठी भारतातील 7,000+ एपीएमसी बाजारपेठांमधील थेट भावांची तुलना करा.",
    cardDiseaseTitle: "पीक रोग स्कॅनर",
    cardDiseaseDesc: "Gemini विजन AI द्वारे पानांच्या रोगाचे त्वरित निदान करण्यासाठी आणि उपचार मिळवण्यासाठी पानाचा फोटो घ्या.",
    cardCropTitle: "AI पीक पेरणी शिफारस",
    cardCropDesc: "मातीचा प्रकार, हंगाम, हवामान निर्देशांक आणि बजेटनुसार वैयक्तिकृत पीक शिफारसी मिळवा.",
    cardAssistantTitle: "कृषी मित्र AI व्हॉइस",
    cardAssistantDesc: "त्वरित तोंडी कृषी मदतीसाठी मराठी, हिंदी, पंजाबी, तमिळ, तेलुगू आणि इतर भाषांमध्ये बोला किंवा लिहा.",
    cardMarketTitle: "खरेदीदार बाज़ार",
    cardMarketDesc: "कोणत्याही मध्यस्थाशिवाय थेट घाऊक खरेदीदार, प्रक्रिया मिल आणि वितरकांकडे तुमचे पीक सूचीबद्ध करा.",
    cardAdvisoryTitle: "एग्रीकनेक्ट थेट सल्लागार",
    cardAdvisoryDesc: "एग्रीकनेक्ट संशोधन केंद्रांमधून थेट थेट अपडेट केलेले सल्लागार बुलेटिन, हवामान इशारा आणि पेरणी मार्गदर्शक तत्त्वे.",
    
    aiTitle: "एग्रीकनेक्ट AI पेरणी आणि व्हिजन मॉडेल",
    aiSub: "एग्रीकनेक्ट भारत हे अत्याधुनिक लार्ज लँग्वेज मॉडेल आणि कॉम्प्युटर व्हिजन आर्किटेक्चरसह इंजिनियर केले गेले आहे, जे विशेषतः भारतीय कृषी डेटासाठी अनुकूलित आहे.",
    aiFeature1: "वनस्पती रोग आणि पानांच्या निदानासाठी रीयल-टाइम व्हिज्युअल विश्लेषण",
    aiFeature2: "स्थानिक कृषी सर्वोत्तम पद्धतींसाठी संदर्भ-जागरूक RAG",
    aiFeature3: "थेट प्रादेशिक शेतीमाल मूल्य अंदाजासाठी भविष्यसूचक विश्लेषण",
    
    visionTitle: "भारतासाठी निर्मित",
    visionDesc: "आम्हाला विश्वास आहे की शेतकऱ्याला योग्य वेळी योग्य माहिती मिळाल्यास संपूर्ण ग्रामीण भागाचे चित्र बदलू शकते. एग्रीकनेक्ट भारत हे कृषी क्षेत्राच्या प्रगतीसाठी आमचे एक पाऊल आहे.",
    joinBtn: "डिजिटल प्लॅटफॉर्ममध्ये सामील व्हा",
    
    builtWith: "भारतीय शेतकऱ्यांसाठी ❤️ ने बनवले.",
    allRights: "सर्व हक्क राखीव.",
    coDesigned: "एग्रीकनेक्ट एकीकृत पोर्टल. प्रगत कृषी यंत्रणेद्वारे व्यवस्थापित."
  },
  pa: {
    ministryName: "ਐਗਰੀਕਨੈਕਟ ਖੇਤੀਬਾੜੀ ਨੈੱਟਵਰਕ",
    govOfIndia: "ਐਗਰੀਕਨੈਕਟ ਭਾਰਤ",
    kvkPortal: "ਐਗਰੀਕਨੈਕਟ ਡਿਜੀਟਲ ਪੋਰਟਲ",
    portalTitle: "ਐਗਰੀਕਨੈਕਟ ਭਾਰਤ",
    portalSub: "ਐਗਰੀਕਨੈਕਟ ਖੇਤੀਬਾੜੀ ਖੁਫੀਆ ਪੋਰਟਲ",
    platform: "ਪਲੇਟਫਾਰਮ ਸੇਵਾਵਾਂ",
    aiCapabilities: "AI ਸਮਰੱਥਾ",
    vision: "ਸਾਡਾ ਦ੍ਰਿਸ਼ਟੀਕੋਣ",
    signIn: "ਲੌਗਇਨ",
    getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
    badge: "ਐਗਰੀਕਨੈਕਟ ਡਿਜੀਟਲ ਖੇਤੀਬਾੜੀ ਪਹਿਲਕਦਮੀ",
    titlePart1: "ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਦਾ",
    titlePart2: "AI ਸਭਿਅਤਾ",
    subTitle: "14 ਕਰੋੜ ਕਿਸਾਨਾਂ ਨੂੰ ਲਾਈਵ APMC ਮੰਡੀ ਦੇ ਭਾਅ, Gemini AI ਫਸਲ ਸੁਝਾਅ, ਦ੍ਰਿਸ਼ ਰੋਗ ਪਛਾਣ ਅਤੇ ਬਹੁ-ਭਾਸ਼ਾਈ ਖੇਤੀਬਾੜੀ ਸਲਾਹਕਾਰ ਸੇਵਾਵਾਂ ਪ੍ਰਦਾਨ ਕਰਨ ਵਾਲਾ ਇੱਕ ਵੱਕਾਰੀ ਡਿਜੀਟਲ ਪੋਰਟਲ।",
    enterPortal: "ਪੋਰਟਲ ਵਿੱਚ ਦਾਖਲ ਹੋਵੋ",
    kvkBulletins: "ਸਲਾਹਕਾਰ ਬੁਲੇਟਿਨ",
    metricMandis: "7,200+ ਲਾਈਵ ਮੰਡੀਆਂ",
    metricMandisSub: "ਸਰਗਰਮ ਏਪੀਐਮਸੀ ਬਾਜ਼ਾਰ ਲਾਈਵ ਅਪਡੇਟ",
    metricAccuracy: "98.7% AI ਸਕੈਨਰ",
    metricAccuracySub: "Gemini ਵਿਜ਼ਨ ਰੋਗ ਨਿਦਾਨ",
    metricLang: "7 ਖੇਤਰੀ ਭਾਸ਼ਾਵਾਂ",
    metricLangSub: "ਦੋ-ਭਾਸ਼ਾਈ ਖੇਤਰੀ ਬੋਲੀਆਂ",
    
    crisisTitle: "ਖੇਤੀਬਾੜੀ ਚੁਣੌਤੀ ਅਤੇ ਹੱਲ",
    crisisSub: "40% ਤੋਂ ਵੱਧ ਕਰਮਚਾਰੀਆਂ ਨੂੰ ਰੁਜ਼ਗਾਰ ਦੇਣ ਦੇ ਬਾਵਜੂਦ, ਭਾਰਤੀ ਖੇਤੀਬਾੜੀ ਨੂੰ ਢਾਂਚਾਗਤ ਚੁਣੌਤੀਆਂ ਦਾ ਸਾਹਮਣਾ ਕਰਨਾ ਪੈਂਦਾ ਹੈ। ਸਾਡਾ AI ਪੋਰਟਲ ਤੁਰੰਤ ਡਿਜੀਟਲ ਹੱਲ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।",
    issue1Title: "ਖੇਤੀਬਾੜੀ ਜਾਣਕਾਰੀ ਦੀ ਘਾਟ",
    issue1Desc: "ਕਿਸਾਨਾਂ ਕੋਲ ਆਧੁਨਿਕ ਫਸਲ ਵਿਗਿਆਨ, ਸਥਾਨਕ ਮਿੱਟੀ ਦੀ ਜਾਂਚ ਅਤੇ ਮਾਹਰ ਖੇਤਰੀ ਸਲਾਹ ਤੱਕ ਸਿੱਧੀ ਪਹੁੰਚ ਨਹੀਂ ਹੈ।",
    issue2Title: "ਅਣਪਛਾਤੀਆਂ ਫਸਲੀ ਬੀਮਾਰੀਆਂ",
    issue2Desc: "ਹਰ ਸਾਲ ਲੱਖਾਂ ਟਨ ਫਸਲ ਬਰਬਾਦ ਹੋ ਜਾਂਦੀ ਹੈ ਕਿਉਂਕਿ ਪੌਦਿਆਂ ਦੀਆਂ ਬੀਮਾਰੀਆਂ ਦੀ ਸਮੇਂ ਸਿਰ ਪਛਾਣ ਅਤੇ ਇਲਾਜ ਨਹੀਂ ਹੋ ਪਾਉਂਦਾ।",
    issue3Title: "ਵਿਚੋਲਿਆਂ ਦੀ ਲੁੱਟ",
    issue3Desc: "ਲੰਮੀ ਵਿਚੋਲੀ ਸਪਲਾਈ ਚੇਨ ਦੇ ਕਾਰਨ ਕਿਸਾਨਾਂ ਨੂੰ ਅਕਸਰ ਮੰਡੀ ਦੀਆਂ ਕੀਮਤਾਂ ਦਾ ਇੱਕ ਬਹੁਤ ਛੋਟਾ ਹਿੱਸਾ ਹੀ ਮਿਲਦਾ ਹੈ।",
    
    statTitle: "ਏਕੀਕ੍ਰਿਤ ਖੇਤੀਬਾੜੀ ਟੈਲੀਮੈਟਰੀ",
    statLoss: "35%",
    statLossDesc: "ਕੀੜਿਆਂ ਅਤੇ ਬੀਮਾਰੀਆਂ ਕਾਰਨ ਸਾਲਾਨਾ ਫਸਲ ਦਾ ਨੁਕਸਾਨ",
    statFarmers: "140M+",
    statFarmersDesc: "ਕਿਸਾਨਾਂ ਨੂੰ ਸਿੱਧੇ ਡਿਜੀਟਲ ਦਖਲ ਦੀ ਲੋੜ ਹੈ",
    statMoney: "₹90,000 ਕਰੋੜ",
    statMoneyDesc: "ਮਾਰਕੀਟ ਲਿੰਕਾਂ ਦੀ ਘਾਟ ਕਾਰਨ ਫਸਲ ਦੀ ਕਟਾਈ ਤੋਂ ਬਾਅਦ ਦਾ ਨੁਕਸਾਨ",
    
    servicesTitle: "ਏਕੀਕ੍ਰਿਤ ਖੇਤੀਬਾੜੀ ਸੇਵਾ ਪੋਰਟਲ",
    servicesSub: "ਆਧੁਨਿਕ ਭਾਰਤੀ ਖੇਤੀ ਲਈ ਡਿਜ਼ਾਈਨ ਕੀਤੀਆਂ ਅਤਿ-ਆਧੁਨਿਕ ਖੇਤੀਬਾੜੀ ਸੇਵਾਵਾਂ ਅਤੇ ਸਲਾਹਕਾਰ ਪ੍ਰਣਾਲੀਆਂ।",
    
    cardMandiTitle: "ਲਾਈਵ ਮੰਡੀ ਭਾਅ",
    cardMandiDesc: "ਆਪਣੀ ਫਸਲ ਦਾ ਵੱਧ ਤੋਂ ਵੱਧ ਮੁੱਲ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਭਾਰਤ ਭਰ ਦੀਆਂ 7,000+ ਏਪੀਐਮਸੀ ਮੰਡੀਆਂ ਤੋਂ ਲਾਈਵ ਭਾਅ ਦੀ ਤੁਲਨਾ ਕਰੋ।",
    cardDiseaseTitle: "ਫਸਲ ਰੋਗ ਸਕੈਨਰ",
    cardDiseaseDesc: "Gemini ਵਿਜ਼ਨ AI ਨਾਲ ਪੌਦਿਆਂ ਦੀਆਂ ਬੀਮਾਰੀਆਂ ਦਾ ਤੁਰੰਤ ਨਿਦਾਨ ਕਰਨ ਅਤੇ ਇਲਾਜ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਪੱਤੇ ਦੀ ਫੋਟੋ ਲਓ।",
    cardCropTitle: "AI ਫਸਲ ਸੁਝਾਅ",
    cardCropDesc: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ, ਮੌਸਮ, ਮੌਸਮ ਟੈਲੀਮੈਟਰੀ ਅਤੇ ਬਜਟ ਦੇ ਅਧਾਰ 'ਤੇ ਨਿੱਜੀ ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।",
    cardAssistantTitle: "ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ AI ਵੌਇਸ",
    cardAssistantDesc: "ਤੁਰੰਤ ਖੇਤੀਬਾੜੀ ਸਹਾਇਤਾ ਲਈ ਪੰਜਾਬੀ, ਹਿੰਦੀ, ਮਰਾਠੀ, ਤਾਮਿਲ, ਤੇਲਗੂ ਅਤੇ ਹੋਰ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਬੋਲੋ ਜਾਂ ਲਿਖੋ।",
    cardMarketTitle: "ਖਰੀਦਦਾਰ ਬਾਜ਼ਾਰ",
    cardMarketDesc: "ਬਿਨਾਂ ਕਿਸੇ ਵਿਚੋਲੇ ਦੇ ਆਪਣੀ ਫਸਲ ਨੂੰ ਸਿੱਧਾ ਪ੍ਰਮਾਣਿਤ ਥੋਕ ਖਰੀਦਦਾਰਾਂ, ਮਿੱਲਾਂ ਅਤੇ ਵਿਤਰਕਾਂ ਕੋਲ ਸੂਚੀਬੱਧ ਕਰੋ।",
    cardAdvisoryTitle: "ਐਗਰੀਕਨੈਕਟ ਲਾਈਵ ਸਲਾਹਕਾਰ",
    cardAdvisoryDesc: "ਐਗਰੀਕਨੈਕਟ ਖੋਜ ਕੇਂਦਰਾਂ ਤੋਂ ਸਿੱਧੇ ਲਾਈਵ ਅਪਡੇਟ ਕੀਤੇ ਸਲਾਹਕਾਰ ਬੁਲੇਟਿਨ, ਮੌਸਮ ਦੀ ਚੇਤਾਵਨੀ ਅਤੇ ਬਿਜਾਈ ਦੇ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼।",
    
    aiTitle: "ਐਗਰੀਕਨੈਕਟ AI ਬਿਜਾਈ ਅਤੇ ਵਿਜ਼ਨ ਮਾਡਲ",
    aiSub: "ਐਗਰੀਕਨੈਕਟ ਭਾਰਤ ਨੂੰ ਅਤਿ-ਆਧੁਨਿਕ ਲਾਰਜ ਲੈਂਗੂਏਜ ਮਾਡਲ ਅਤੇ ਕੰਪਿਊਟਰ ਵਿਜ਼ਨ ਆਰਕੀਟੈਕਚਰ ਨਾਲ ਇੰਜੀਨੀਅਰ ਕੀਤਾ ਗਿਆ ਹੈ, ਜੋ ਵਿਸ਼ੇਸ਼ ਤੌਰ 'ਤੇ ਭਾਰਤੀ ਖੇਤੀਬਾੜੀ ਡੇਟਾ ਲਈ ਅਨੁਕੂਲਿਤ ਹੈ।",
    aiFeature1: "ਪੌਦਿਆਂ ਦੇ ਰੋਗਾਂ ਅਤੇ ਪੱਤਿਆਂ ਦੇ ਨਿਦਾਨ ਲਈ ਰੀਅਲ-ਟਾਈਮ ਵਿਜ਼ੂਅਲ ਵਿਸ਼ਲੇਸ਼ਣ",
    aiFeature2: "ਸਥਾਨਕ ਖੇਤੀਬਾੜੀ ਦੇ ਵਧੀਆ ਤਰੀਕਿਆਂ ਲਈ ਸੰਦਰਭ-ਸੰਵੇਦਨਸ਼ੀਲ RAG",
    aiFeature3: "ਲਾਈਵ ਖੇਤਰੀ ਫਸਲ ਕੀਮਤ ਪੂਰਵ-ਅਨੁਮਾਨਾਂ ਲਈ ਭਵਿੱਖਬਾਣੀ ਵਿਸ਼ਲੇਸ਼ਣ",
    
    visionTitle: "ਭਾਰਤ ਲਈ ਨਿਰਮਿਤ",
    visionDesc: "ਸਾਡਾ ਮੰਨਣਾ ਹੈ ਕਿ ਕਿਸਾਨ ਨੂੰ ਸਹੀ ਸਮੇਂ 'ਤੇ ਸਹੀ ਜਾਣਕਾਰੀ ਦੇਣ ਨਾਲ ਪੂਰੇ ਪੇਂਡੂ ਭਾਈਚਾਰੇ ਦੀ ਕਿਸਮਤ ਬਦਲ ਸਕਦੀ ਹੈ। ਐਗਰੀਕਨੈਕਟ ਭਾਰਤ ਵਧੇਰੇ ਬਰਾਬਰੀ ਵਾਲੇ ਅਤੇ ਤਕਨੀਕੀ ਤੌਰ 'ਤੇ ਉੱਨਤ ਖੇਤੀਬਾੜੀ ਖੇਤਰ ਵੱਲ ਸਾਡਾ ਕਦਮ ਹੈ।",
    joinBtn: "ਡਿਜੀਟਲ ਪਲੇਟਫਾਰਮ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ",
    
    builtWith: "ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ ❤️ ਨਾਲ ਬਣਾਇਆ ਗਿਆ।",
    allRights: "ਸਭ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।",
    coDesigned: "ਐਗਰੀਕਨੈਕਟ ਏਕੀਕ੍ਰਿਤ ਪੋਰਟਲ। ਉੱਨਤ ਖੇਤੀਬਾੜੀ ਪ੍ਰਣਾਲੀਆਂ ਦੁਆਰਾ ਪ੍ਰਬੰਧਿਤ।"
  },
  bn: {
    ministryName: "এগ্রিকানেক্ট কৃষি নেটওয়ার্ক",
    govOfIndia: "এগ্রিকানেক্ট ভারত",
    kvkPortal: "এগ্রিকানেক্ট ডিজিটাল পোর্টাল",
    portalTitle: "এগ্রিকানেক্ট ভারত",
    portalSub: "এগ্রিকানেক্ট কৃষি গোয়েন্দা পোর্টাল",
    platform: "প্ল্যাটফর্ম পরিষেবা",
    aiCapabilities: "AI ক্ষমতা",
    vision: "আমাদের লক্ষ্য",
    signIn: "লগইন",
    getStarted: "শুরু করুন",
    badge: "এগ্রিকানেক্ট ডিজিটাল কৃষি উদ্যোগ",
    titlePart1: "भारतीय কৃষকদের",
    titlePart2: "AI ক্ষমতায়ন",
    subTitle: "১৪ কোটি কৃষককে সরাসরি APMC বাজার দর, Gemini AI ফসল সুপারিশ, পাতার রোগ নির্ণয় এবং বহুভাষী কৃষি পরামর্শ পরিষেবা প্রদানকারী একটি মর্যাদাপূর্ণ ডিজিটাল পোর্টাল।",
    enterPortal: "পোর্টালে প্রবেশ করুন",
    kvkBulletins: "পরামর্শ বুলেটিন",
    metricMandis: "৭,২০০+ লাইভ মন্ডি",
    metricMandisSub: "সক্রিয় এপিএমসি বাজার লাইভ আপডেট",
    metricAccuracy: "৯৮.৭% AI স্ক্যানার",
    metricAccuracySub: "Gemini ভিশন রোগ নির্ণয়",
    metricLang: "৭টি আঞ্চলিক ভাষা",
    metricLangSub: "দ্বিভাষী আঞ্চলিক উপভাষা",
    
    crisisTitle: "কৃষি চ্যালেঞ্জ ও সমাধান",
    crisisSub: "৪০% এরও বেশি কর্মীবাহিনী নিযুক্ত থাকা সত্ত্বেও, ভারতীয় কৃষিকে কাঠামোগত চ্যালেঞ্জের মুখোমুখি হতে হয়। আমাদের AI পোর্টাল তাৎক্ষণিক ডিজিটাল সমাধান প্রদান করে।",
    issue1Title: "কৃষি তথ্যের অভাব",
    issue1Desc: "কৃষকদের কাছে আধুনিক কৃষি বিজ্ঞান, স্থানীয় মাটি পরীক্ষা এবং বিশেষজ্ঞ আঞ্চলিক পরামর্শের সরাসরি অভাব রয়েছে।",
    issue2Title: "অজানা ফসলের রোগ",
    issue2Desc: "প্রতি বছর লক্ষ লক্ষ টন ফসল নষ্ট হয় কারণ উদ্ভিদের রোগ সময়মতো সনাক্ত ও চিকিত্সা করা যায় না।",
    issue3Title: "মধ্যস্বত্বভোগীদের শোষণ",
    issue3Desc: "দীর্ঘ মধ্যস্থতাকারী সরবরাহ শৃঙ্খলের কারণে কৃষকরা প্রায়শই বাজার মূল্যের একটি ক্ষুদ্র অংশই পান।",
    
    statTitle: "একীকৃত কৃষি টেলিমেট্রি",
    statLoss: "৩৫%",
    statLossDesc: "কীটপতঙ্গ ও রোগের কারণে বার্ষিক ফসল ক্ষতি",
    statFarmers: "১৪০M+",
    statFarmersDesc: "কৃষকদের সরাসরি ডিজিটাল হস্তক্ষেপের প্রয়োজন",
    statMoney: "₹৯০,০০০ কোটি",
    statMoneyDesc: "বাজার সংযোগের অভাবে ফসল কাটার পরবর্তী ক্ষতি",
    
    servicesTitle: "একীকৃত কৃষি পরিষেবা পোর্টাল",
    servicesSub: "আধুনিক ভারতীয় কৃষির জন্য ডিজাইন করা অত্যাধুনিক কৃষি পরিষেবা এবং পরামর্শ ব্যবস্থা।",
    
    cardMandiTitle: "লাইভ মন্ডির দর",
    cardMandiDesc: "আপনার ফসলের সর্বোচ্চ মূল্য পেতে ভারত জুড়ে ৭,০০০+ এপিএমসি মন্ডির লাইভ দামের তুলনা করুন।",
    cardDiseaseTitle: "ফসল রোগ স্ক্যানার",
    cardDiseaseDesc: "Gemini ভিশন AI এর সাথে উদ্ভিদের রোগ অবিলম্বে সনাক্ত করতে এবং চিকিত্সা পেতে পাতার ছবি তুলুন।",
    cardCropTitle: "AI ফসল বপন সুপারিশ",
    cardCropDesc: "মাটির ধরন, ঋতু, আবহাওয়া টেলিমেট্রি এবং বাজেটের ভিত্তিতে ব্যক্তিগত ফসল সুপারিশ পান।",
    cardAssistantTitle: "কৃষি মিত্র AI ভয়েস",
    cardAssistantDesc: "তাৎক্ষণিক মৌখিক কৃষি সহায়তার জন্য বাংলা, হিন্দি, মারাঠি, পাঞ্জাবি, তামিল, তেলুগু এবং অন্যান্য ভাষায় কথা বলুন বা লিখুন।",
    cardMarketTitle: "ক্রেতা বাজার",
    cardMarketDesc: "কোন মধ্যস্বত্বভোগী ছাড়াই সরাসরি প্রত্যয়িত পাইকারি ক্রেতা, প্রক্রিয়াকরণ মিল এবং পরিবেশকদের কাছে আপনার ফসল তালিকাভুক্ত করুন।",
    cardAdvisoryTitle: "এগ্রিকানেক্ট লাইভ পরামর্শকারী",
    cardAdvisoryDesc: "এগ্রিকানেক্ট গবেষণা কেন্দ্র থেকে সরাসরি লাইভ আপডেট করা পরামর্শ বুলেটিন, আবহাওয়ার সতর্কতা এবং বপনের নির্দেশিকা।",
    
    aiTitle: "এগ্রিকানেক্ট AI বপন এবং ভিশন মডেল",
    aiSub: "এগ্রিকানেক্ট ভারতকে অত্যাধুনিক লার্জ ল্যাঙ্গুয়েজ মডেল এবং কম্পিউটার ভিশন আর্কিটেকচারের সাথে ইঞ্জিনিয়ার করা হয়েছে, যা বিশেষ করে ভারতীয় কৃষি ডেটার জন্য কাস্টমাইজ করা হয়েছে।",
    aiFeature1: "উদ্ভিদের রোগ এবং পাতা পরীক্ষার জন্য রিয়েল-টাইম ভিজ্যুয়াল বিশ্লেষণ",
    aiFeature2: "স্থানীয় কৃষি সর্বোত্তম অনুশীলনের জন্য প্রসঙ্গ-সচেতন RAG",
    aiFeature3: "লাইভ আঞ্চলিক পণ্য মূল্য পূর্বাভাসের জন্য অনুমানমূলক বিশ্লেষণ",
    
    visionTitle: "ভারতের জন্য নির্মিত",
    visionDesc: "আমরা বিশ্বাস করি যে কোনও কৃষককে সঠিক সময়ে সঠিক তথ্য দিলে তা পুরো গ্রামীণ সম্প্রদায়ের ভাগ্য পরিবর্তন করতে পারে। এগ্রিকানেক্ট ভারত আমাদের কৃষি খাতের অগ্রগতির একটি পদক্ষেপ।",
    joinBtn: "ডিজিটাল প্ল্যাটফর্মে যোগ দিন",
    
    builtWith: "ভারতীয় কৃষকদের জন্য ❤️ দিয়ে তৈরি।",
    allRights: "সর্বস্বত্ব সংরক্ষিত।",
    coDesigned: "এগ্রিকানেক্ট একীকৃত পোর্টাল। উন্নত কৃষি ব্যবস্থা দ্বারা পরিচালিত।"
  },
  te: {
    ministryName: "అగ్రికనెక్ట్ వ్యవసాయ నెట్‌వర్క్",
    govOfIndia: "అగ్రికనెక్ట్ భారత్",
    kvkPortal: "అగ్రికనెక్ట్ డిజిటల్ పోర్టల్",
    portalTitle: "అగ్రికనెక్ట్ భారత్",
    portalSub: "అగ్రికనెక్ట్ వ్యవసాయ ఇంటెలిజెన్స్ పోర్టల్",
    platform: "ప్లాట్‌ఫారమ్ సేవలు",
    aiCapabilities: "AI సామర్థ్యాలు",
    vision: "మా దృష్టి",
    signIn: "లాగిన్",
    getStarted: "ప్రారంభించండి",
    badge: "అగ్రికనెక్ట్ డిజిటల్ వ్యవసాయ చొరవ",
    titlePart1: "భారతీయ రైతుల",
    titlePart2: "AI సశక్తీకరణ",
    subTitle: "14 కోట్ల మంది రైతులకు ప్రత్యక్ష APMC మార్కెట్ ధరలు, Gemini AI పంట సూచనలు, ఆకుల వ్యాధి గుర్తింపు మరియు బహుభాషా వ్యవసాయ సలహా సేవలను అందించే ఒక ప్రతిష్టాత్మక డిజిటల్ పోర్టల్.",
    enterPortal: "పోర్టల్‌లోకి ప్రవేశించండి",
    kvkBulletins: "సలహా బులెటిన్లు",
    metricMandis: "7,200+ లైవ్ మార్కెట్లు",
    metricMandisSub: "క్రియాశీల ఏపీఎంసీ మార్కెట్ ప్రత్యక్ష అప్‌డేట్",
    metricAccuracy: "98.7% AI స్కానర్",
    metricAccuracySub: "Gemini విజన్ వ్యాధి నిర్ధారణ",
    metricLang: "7 ప్రాంతీయ భాషలు",
    metricLangSub: "ద్విభాషా ప్రాంతీయ మాండలికాలు",
    
    crisisTitle: "వ్యవసాయ సవాలు మరియు పరిష్కారం",
    crisisSub: "40% కంటే ఎక్కువ శ్రామిక శక్తికి ఉపాధి కల్పించినప్పటికీ, భారతీయ వ్యవసాయం అనేక సవాళ్లను ఎదుర్కొంటోంది. మా AI పోర్టల్ తక్షణ డిజిటల్ పరిష్కారాలను అందిస్తుంది.",
    issue1Title: "వ్యవసాయ సమాచార కొరత",
    issue1Desc: "రైతులకు ఆధునిక పంట విజ్ఞానం, స్థానిక నేల నిర్ధారణ మరియు నిపుణుల ప్రాంతీయ సలహాల గురించి ప్రత్యక్ష సమాచారం లేదు.",
    issue2Title: "అపరిచిత పంట వ్యాధులు",
    issue2Desc: "మొక్కల వ్యాధులను సకాలంలో గుర్తించి చికిత్స చేయకపోవడం వల్ల ప్రతిసంవత్సరం లక్షలాది టన్నుల పంట వృథా అవుతోంది.",
    issue3Title: "దళారుల దోపిడీ",
    issue3Desc: "సుదీర్ఘ మధ్యవర్తిత్వ సరఫరా గొలుసుల కారణంగా రైతులు తరచుగా మార్కెట్ ధరలలో చాలా తక్కువ భాగాన్ని మాత్రమే పొందుతారు.",
    
    statTitle: "ఏకీకృత వ్యవసాయ టెలిమెట్రీ",
    statLoss: "35%",
    statLossDesc: "కీటకాలు మరియు వ్యాధుల కారణంగా వార్షిక పంట నష్టం",
    statFarmers: "140M+",
    statFarmersDesc: "రైతులకు ప్రత్యక్ష డిజిటల్ జోక్యం అవసరం",
    statMoney: "₹90,000 కోట్లు",
    statMoneyDesc: "మార్కెట్ లింక్‌లు లేకపోవడం వల్ల పంట కోత అనంతర నష్టం",
    
    servicesTitle: "ఏకీకృత వ్యవసాయ సేవల పోర్టల్",
    servicesSub: "ఆధునిక భారతీయ వ్యవసాయం కోసం రూపకల్పన చేయబడిన అత్యాధునిక వ్యవసాయ సేవలు మరియు సలహా వ్యవస్థలు.",
    
    cardMandiTitle: "లైవ్ మార్కెట్ ధరలు",
    cardMandiDesc: "మీ పంటకు గరిష్ట ధరను పొందడానికి భారతదేశం అంతటా 7,000+ ఏపీఎంసీ మార్కెట్ల నుండి ప్రత్యక్ష ధరలను పోల్చండి.",
    cardDiseaseTitle: "పంట వ్యాధి స్కానర్",
    cardDiseaseDesc: "Gemini విజన్ AIతో మొక్కల వ్యాధులను తక్షణమే గుర్తించడానికి మరియు చికిత్స పొందడానికి ఆకు ఫోటో తీయండి.",
    cardCropTitle: "AI పంటల సిఫార్సు",
    cardCropDesc: "నేల రకం, సీజన్, వాతావరణ టెలిమెట్రీ మరియు బడ్జెట్ ఆధారంగా వ్యక్తిగతీకరించిన పంట సిఫార్సులను పొందండి.",
    cardAssistantTitle: "కృషి మిత్ర AI వాయిస్",
    cardAssistantDesc: "తక్షణ వ్యవసాయ సహాయం కోసం తెలుగు, హిందీ, మరాఠీ, పంజాబీ, తమిళం మరియు ఇతర భాషలలో మాట్లాడండి లేదా రాయండి.",
    cardMarketTitle: "కొనుగోలుదారుల మార్కెట్",
    cardMarketDesc: "ఎలాంటి దళారీలు లేకుండా నేరుగా ధృవీకరించబడిన హోల్‌సేల్ కొనుగోలుదారులు, ప్రాసెసింగ్ మిల్లులు మరియు పంపిణీదారులకు మీ పంటను జాబితా చేయండి.",
    cardAdvisoryTitle: "అగ్రికనెక్ట్ లైవ్ సలహాదారు",
    cardAdvisoryDesc: "అగ్రికనెక్ట్ పరిశోధనా కేంద్రాల నుండి నేరుగా ప్రత్యక్షంగా నవీకరించబడిన సలహా బులెటిన్లు, వాతావరణ హెచ్చరికలు మరియు విత్తే మార్గదర్శకాలు.",
    
    aiTitle: "అగ్రికనెక్ట్ AI విత్తే మరియు విజన్ మోడల్స్",
    aiSub: "అగ్రికనెక్ట్ భారత్ అత్యాధునిక లార్జ్ లాంగ్వేజ్ మోడల్స్ మరియు కంప్యూటర్ విజన్ ఆర్కిటెక్చర్‌లతో రూపొందించబడింది, ఇది ప్రత్యేకంగా భారతీయ వ్యవసాయ డేటా కోసం అనుకూలీకరించబడింది.",
    aiFeature1: "మొక్కల వ్యాధులు మరియు ఆకుల నిర్ధారణ కోసం నిజ-సమయ విజువల్ విశ్లేషణ",
    aiFeature2: "స్థానిక వ్యవసాయ ఉత్తమ పద్ధతుల కోసం సందర్భోచిత RAG",
    aiFeature3: "ప్రత్యక్ష ప్రాంతీయ కమోడిటీ ధరల అంచనాల కోసం ప్రిడిక్టివ్ అనలిటిక్స్",
    
    visionTitle: "భారతదేశం కోసం నిర్మించబడింది",
    visionDesc: "రైతుకు సరైన సమయంలో సరైన సమాచారం ఇవ్వడం వల్ల మొత్తం గ్రామీణ సమాజం యొక్క భవిష్యత్తు మారుతుందని మేము నమ్ముతున్నాము. అగ్రికనెక్ట్ భారత్ వ్యవసాయ రంగాన్ని మరింత అభివృద్ధి చేయడానికి మా ఒక అడుగు.",
    joinBtn: "డిజిటల్ ప్లాట్‌ఫారమ్‌లో చేరండి",
    
    builtWith: "భారతీయ రైతుల కోసం ❤️ తో నిర్మించబడింది.",
    allRights: "అన్ని హక్కులు ప్రత్యేకించబడినవి.",
    coDesigned: "అగ్రికనెక్ట్ ఏకీకృత పోర్టల్. అధునాతన వ్యవసాయ వ్యవస్థల ద్వారా నిర్వహించబడుతుంది."
  },
  ta: {
    ministryName: "அக்ரிகனெக்ட் வேளாண் நெட்வொர்க்",
    govOfIndia: "அக்ரிகனெக்ட் பாரத்",
    kvkPortal: "அக்ரிகனெக்ட் டிஜிட்டல் போர்டல்",
    portalTitle: "அக்ரிகனெக்ட் பாரத்",
    portalSub: "அக்ரிகனெக்ட் வேளாண் நுண்ணறிவு போர்டல்",
    platform: "தள சேவைகள்",
    aiCapabilities: "AI திறன்கள்",
    vision: "எங்கள் பார்வை",
    signIn: "உள்நுழை",
    getStarted: "தொடங்குங்கள்",
    badge: "அக்ரிகனெக்ட் டிஜிட்டல் வேளாண்மை திட்டம்",
    titlePart1: "இந்திய விவசாயிகளின்",
    titlePart2: "AI அதிகாரமளித்தல்",
    subTitle: "14 கோடி விவசாயிகளுக்கு நேரடி APMC சந்தை விலைகள், Gemini AI பயிர் பரிந்துரைகள், காட்சி நோய் கண்டறிதல் மற்றும் பன்மொழி வேளாண் ஆலோசனை சேவைகளை வழங்கும் ஒரு மதிப்புமிக்க டிஜிட்டல் போர்டல்.",
    enterPortal: "போர்ட்டலில் நுழையவும்",
    kvkBulletins: "ஆலோசனை புல்லட்டின்கள்",
    metricMandis: "7,200+ நேரடி சந்தைகள்",
    metricMandisSub: "செயலில் உள்ள ஏபிஎம்சி சந்தை நேரடி அப்ளிகேஷன்",
    metricAccuracy: "98.7% AI ஸ்கேனர்",
    metricAccuracySub: "Gemini விஷன் நோய் கண்டறிதல்",
    metricLang: "7 பிராந்திய மொழிகள்",
    metricLangSub: "இருமொழி பிராந்திய பேச்சுவழக்குகள்",
    
    crisisTitle: "விவசாய சவால் மற்றும் தீர்வு",
    crisisSub: "40% க்கும் அதிகமான தொழிலாளர்களுக்கு வேலைவாய்ப்பு அளித்த போதிலும், இந்திய விவசாயம் பல சவால்களை எதிர்கொள்கிறது. எங்களது AI போர்டல் உடனடி டிஜிட்டல் தீர்வுகளை வழங்குகிறது.",
    issue1Title: "வேளாண் தகவல் பற்றாக்குறை",
    issue1Desc: "விவசாயிகளுக்கு நவீன பயிர் அறிவியல், உள்ளூர் மண் கண்டறிதல் மற்றும் நிபுணர்களின் பிராந்திய ஆலோசனைகள் பற்றிய நேரடி தகவல் இல்லை.",
    issue2Title: "அறியப்படாத பயிர் நோய்கள்",
    issue2Desc: "தாவர நோய்களை சரியான நேரத்தில் கண்டறிந்து சிகிச்சை அளிக்காததால் ஒவ்வொரு ஆண்டும் மில்லியன் கணக்கான டன் பயிர்கள் வீணாகின்றன.",
    issue3Title: "தரகர்களின் சுரண்டல்",
    issue3Desc: "நீண்ட இடைத்தரகர் விநியோகச் சங்கிலிகளால் விவசாயிகள் பெரும்பாலும் சந்தை விலையில் மிகக் குறைந்த பகுதியை மட்டுமே பெறுகிறார்கள்.",
    
    statTitle: "ஒருங்கிணைந்த வேளாண் டெலிமெட்ரி",
    statLoss: "35%",
    statLossDesc: "பூச்சிகள் மற்றும் நோய்களால் ஏற்படும் வருடாந்திர பயிர் இழப்பு",
    statFarmers: "140M+",
    statFarmersDesc: "விவசாயிகளுக்கு நேரடி டிஜிட்டல் தலையீடு தேவை",
    statMoney: "₹90,000 கோடி",
    statMoneyDesc: "சந்தை இணைப்புகள் இல்லாததால் அறுவடைக்கு பிந்தைய இழப்பு",
    
    servicesTitle: "ஒருங்கிணைந்த வேளாண் சேவைகள் போர்டல்",
    servicesSub: "நவீன இந்திய விவசாயத்திற்காக வடிவமைக்கப்பட்ட அதிநவீன விவசாய சேவைகள் மற்றும் ஆலோசனை அமைப்புகள்.",
    
    cardMandiTitle: "நேரடி சந்தை விலைகள்",
    cardMandiDesc: "உங்கள் பயிரின் அதிகபட்ச விலையைப் பெற இந்தியா முழுவதும் உள்ள 7,000+ ஏபிஎம்சி சந்தைகளின் நேரடி விலைகளை ஒப்பிடுங்கள்.",
    cardDiseaseTitle: "பயிர் நோய் ஸ்கேனர்",
    cardDiseaseDesc: "Gemini விஷன் AI உடன் தாவர நோய்களை உடனடியாகக் கண்டறியவும் சிகிச்சை பெறவும் இலையின் புகைப்படத்தை எடுக்கவும்.",
    cardCropTitle: "AI பயிர் பரிந்துரை",
    cardCropDesc: "மண் வகை, பருவம், வானிலை டெலிமெட்ரி மற்றும் பட்ஜெட்டின் அடிப்படையில் தனிப்பயனாக்கப்பட்ட பயிர் பரிந்துரைகளைப் பெறுங்கள்.",
    cardAssistantTitle: "வேளாண் மித்ரா AI குரல்",
    cardAssistantDesc: "உடனடி விவசாய உதவிக்கு தமிழ், இந்தி, मராத்தி, பஞ்சாபி, தெலுங்கு மற்றும் பிற மொழிகளில் பேசவும் அல்லது எழுதவும்.",
    cardMarketTitle: "கொள்முதல் சந்தை",
    cardMarketDesc: "தரகர்கள் இல்லாமல் நேரடியாக சரிபார்க்கப்பட்ட மொத்த கொள்முதல் செய்பவர்கள், செயலாக்க ஆலைகள் மற்றும் விநியோகஸ்தர்களுக்கு உங்கள் பயிரை பட்டியலிடுங்கள்.",
    cardAdvisoryTitle: "அக்ரிகனெக்ட் நேரடி ஆலோசகர்",
    cardAdvisoryDesc: "அக்ரிகனெக்ட் ஆராய்ச்சி மையங்களில் இருந்து நேரடியாக நேரலையில் புதுப்பிக்கப்பட்ட ஆலோசனை புல்லட்டின்கள், வானிலை எச்சரிக்கைகள் மற்றும் விதைப்பு வழிகாட்டுதல்கள்.",
    
    aiTitle: "அக்ரிகனெக்ட் AI விதைப்பு மற்றும் விஷன் மாதிரிகள்",
    aiSub: "அக்ரிகனெக்ட் பாரத் அதிநவீன லார்ஜ் லாங்குவேஜ் மாடல்கள் மற்றும் கணினி பார்வை கட்டமைப்புகளுடன் வடிவமைக்கப்பட்டுள்ளது, இது குறிப்பாக இந்திய விவசாயத் தரவுகளுக்காக தனிப்பயனாக்கப்பட்டுள்ளது.",
    aiFeature1: "தாவர நோய்கள் மற்றும் இலை நோய் கண்டறிதலுக்கான நிகழ்நேர காட்சி பகுப்பாய்வு",
    aiFeature2: "உள்ளூர் விவசாய சிறந்த நடைமுறைகளுக்கான சூழல் சார்ந்த RAG",
    aiFeature3: "நேரடி பிராந்திய கமாடிட்டி விலை முன்னறிவிப்புகளுக்கான முன்கணிப்பு பகுப்பாய்வு",
    
    visionTitle: "பாரதத்திற்காக உருவாக்கப்பட்டது",
    visionDesc: "விவசாயிக்கு சரியான நேரத்தில் சரியான தகவலை வழங்குவது முழு கிராமப்புற சமூகத்தின் எதிர்காலத்தையும் மாற்றும் என்று நாங்கள் நம்புகிறோம். அக்ரிகனெக்ட் பாரத் விவசாயத் துறையை மேலும் மேம்படுத்துவதற்கான எங்கள் ஒரு படியாகும்.",
    joinBtn: "டிஜிட்டல் தளத்தில் இணையுங்கள்",
    
    builtWith: "இந்திய விவசாயிகளுக்காக ❤️ உடன் உருவாக்கப்பட்டது.",
    allRights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    coDesigned: "அக்ரிகனெக்ட் ஒருங்கிணைந்த போர்டல். மேம்பட்ட விவசாய அமைப்புகளால் நிர்வகிக்கப்படுகிறது."
  }
};

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale, setLanguage } = useLanguageStore();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { theme, toggleTheme } = useUIStore();
  const isDark = theme === 'dark';

  // Dynamic localized translations based on client state
  const trans = LANDING_DICT[locale] || LANDING_DICT['en'];
  const currentLang = LANGUAGES.find(l => l.code === locale) || LANGUAGES[0];

  // Prevent dynamic layout shifting or flashes
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-green-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <main className="bg-[var(--bg-base)] min-h-screen text-slate-800 overflow-hidden font-sans selection:bg-green-500/30">
      

      {/* ── 1. PATRIOTIC NAVIGATION HEADER ── */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-md border-b border-green-600/10 px-6 py-4 flex items-center justify-between"
      >
        {/* TRICOLOR TOP RIBBON ACCENT */}
        <div className="absolute top-0 left-0 right-0 h-[4px] flex z-20">
          <div className="flex-grow bg-[#FF9933]" /> {/* Saffron */}
          <div className="flex-grow bg-[#FFFFFF]" /> {/* White */}
          <div className="flex-grow bg-[#128807]" /> {/* Green */}
        </div>

        <div className="flex items-center gap-3">
          {/* Custom Wheat SVG Emblem Logo */}
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow border-2 border-green-600 overflow-hidden flex-shrink-0">
            <svg className="w-full h-full p-0.5" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="52" stroke="#16a34a" strokeWidth="6" fill="#fef08a" />
              <circle cx="60" cy="60" r="42" fill="#d97706" />
              <path d="M60 95V35" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
              <path d="M60 42L45 32M60 52L45 42M60 62L45 52M60 72L45 62M60 82L45 72" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M60 42L75 32M60 52L75 42M60 62L75 52M60 72L75 62M60 82L75 72" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M60 95V35" stroke="#fef08a" strokeWidth="1.5" />
              <path d="M60 42L45 32M60 52L45 42M60 62L45 52M60 72L45 62M60 82L45 72" stroke="#fef08a" strokeWidth="1.5" />
              <path d="M60 42L75 32M60 52L75 42M60 62L75 52M60 72L75 62M60 82L75 72" stroke="#fef08a" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-green-900 flex items-center gap-1">
              AgriConnect <span className="text-orange-500">India</span>
            </span>
            <p className="text-[9px] text-green-600 font-extrabold uppercase tracking-wide leading-none">
              {trans.portalSub}
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-600">
          <a href="#features" className="hover:text-green-700 transition-colors">{trans.platform}</a>
          <a href="#ai-capabilities" className="hover:text-green-700 transition-colors">{trans.aiCapabilities}</a>
          <a href="#vision" className="hover:text-green-700 transition-colors">{trans.vision}</a>
        </div>

        <div className="flex items-center gap-4">
          {/* Elegant Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-all text-slate-700 cursor-pointer select-none"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-slate-600" />}
          </button>

          {/* Elegant Language Selector Button with Flag */}
          <div className="relative z-50">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-all text-xs font-bold text-slate-700 cursor-pointer select-none"
            >
              <span>{currentLang.flag}</span>
              <span className="hidden sm:inline">{currentLang.name}</span>
            </button>
            
            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white border border-slate-200 p-1.5 shadow-2xl z-50 flex flex-col gap-0.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-left text-xs transition-all cursor-pointer ${
                        locale === lang.code 
                          ? 'bg-green-50 text-green-700 font-bold border border-green-100' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                      {locale === lang.code && <span>✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <Link href="/login" className="text-sm font-bold text-green-800 hover:text-green-900 hover:underline transition-all hidden sm:block">
            {trans.signIn}
          </Link>
          <Link href="/register" className="bg-gradient-to-r from-green-700 to-emerald-800 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:shadow-md hover:shadow-green-500/20 hover:scale-[1.02] transition-all flex items-center justify-center">
            {trans.getStarted}
          </Link>
          <button 
            className="lg:hidden text-slate-700 hover:text-green-700 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-green-500/10 lg:hidden z-50"
          >
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-700 font-bold py-2 border-b border-slate-100">{trans.platform}</a>
            <a href="#ai-capabilities" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-700 font-bold py-2 border-b border-slate-100">{trans.aiCapabilities}</a>
            <a href="#vision" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-700 font-bold py-2 border-b border-slate-100">{trans.vision}</a>
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-700 font-bold py-2 sm:hidden">{trans.signIn}</Link>
          </motion.div>
        )}
      </motion.nav>

      {/* ── 2. PRESTIGIOUS HERO SECTION ── */}
      <section className="bg-gradient-to-b from-green-100/40 via-green-50 to-white pt-16 pb-24 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[85vh]">
        {/* Decorative background grid and blurs */}
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-green-200/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none" />
        
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center max-w-6xl mx-auto z-10">
          
          {/* PM Digital Agriculture Badge */}
          <motion.div 
            variants={fadeInUp} 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-700 text-xs font-extrabold mb-6 tracking-wide uppercase shadow-sm"
          >
            🇮🇳 {trans.badge}
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.15] text-slate-900 tracking-tight">
            {trans.titlePart1} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-600 to-green-600">
              {trans.titlePart2}
            </span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-slate-600 text-base md:text-lg max-w-3xl mb-10 leading-relaxed font-medium">
            {trans.subTitle}
          </motion.p>
          
          {/* Primary Action CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
            <Link href="/register" className="bg-gradient-to-r from-green-700 to-emerald-800 text-white px-8 py-4 rounded-2xl font-black text-lg hover:shadow-lg hover:shadow-green-700/25 transition-all flex items-center justify-center gap-2 group">
              {trans.enterPortal} <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <a href="#features" className="bg-white border-2 border-green-600/10 hover:border-green-600/20 text-green-800 px-8 py-4 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm">
              <Calendar size={20} /> {trans.kvkBulletins}
            </a>
          </motion.div>

          {/* National Agricultural Telemetry Panel */}
          <motion.div variants={scaleIn} className="w-full max-w-4xl bg-white border border-green-500/10 rounded-[36px] p-6 shadow-md grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 flex rounded-t-[36px] overflow-hidden">
              <div className="flex-grow bg-[#FF9933]" />
              <div className="flex-grow bg-[#FFFFFF]" />
              <div className="flex-grow bg-[#128807]" />
            </div>

            <div className="flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-slate-100">
              <div className="text-xs font-extrabold text-orange-600 tracking-wider uppercase mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Telemetry
              </div>
              <div className="text-3xl font-black text-green-900 leading-none mb-1">
                {trans.metricMandis}
              </div>
              <div className="text-xs text-slate-500 font-bold">
                {trans.metricMandisSub}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-slate-100">
              <div className="text-xs font-extrabold text-blue-600 tracking-wider uppercase mb-1 flex items-center gap-1.5">
                <ShieldCheck size={14} /> Certified AI
              </div>
              <div className="text-3xl font-black text-green-900 leading-none mb-1">
                {trans.metricAccuracy}
              </div>
              <div className="text-xs text-slate-500 font-bold">
                {trans.metricAccuracySub}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-4">
              <div className="text-xs font-extrabold text-purple-600 tracking-wider uppercase mb-1 flex items-center gap-1.5">
                <Globe2 size={14} /> Multilingual
              </div>
              <div className="text-3xl font-black text-green-900 leading-none mb-1">
                {trans.metricLang}
              </div>
              <div className="text-xs text-slate-500 font-bold">
                {trans.metricLangSub}
              </div>
            </div>

          </motion.div>
        </motion.div>
      </section>

      {/* ── 3. CRISIS & NECESSITY INTERVENTION SECTION ── */}
      <section className="py-24 px-6 bg-white border-y border-slate-200/50">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-black mb-6 text-green-950 leading-tight">
                {trans.crisisTitle}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8 font-medium">
                {trans.crisisSub}
              </p>
              
              <div className="space-y-6">
                {[
                  { title: trans.issue1Title, desc: trans.issue1Desc },
                  { title: trans.issue2Title, desc: trans.issue2Desc },
                  { title: trans.issue3Title, desc: trans.issue3Desc }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0 shadow-xs border border-orange-200">
                      <AlertTriangle size={16} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 mb-1 text-base">{item.title}</h4>
                      <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* National Stat Badges Dashboard */}
            <motion.div variants={scaleIn} className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500/5 to-emerald-500/5 rounded-3xl blur-3xl" />
              <div className="bg-[#f8faf9] p-8 rounded-[36px] border border-green-600/10 shadow-sm relative overflow-hidden">
                <div className="text-5xl font-black text-slate-200 absolute -right-4 -top-2 select-none uppercase tracking-widest leading-none">
                  {trans.statTitle.split(' ')[0]}
                </div>
                
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs">
                    <div className="text-3xl font-black text-red-600 mb-2 leading-none">{trans.statLoss}</div>
                    <div className="text-xs text-slate-600 font-bold leading-tight">{trans.statLossDesc}</div>
                  </div>
                  <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs">
                    <div className="text-3xl font-black text-orange-500 mb-2 leading-none">{trans.statFarmers}</div>
                    <div className="text-xs text-slate-600 font-bold leading-tight">{trans.statFarmersDesc}</div>
                  </div>
                  <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs col-span-2 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-3xl font-black text-green-700 leading-none mb-1">{trans.statMoney}</div>
                      <div className="text-xs text-slate-600 font-bold leading-tight">{trans.statMoneyDesc}</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-50 text-green-700 border border-green-100 flex items-center justify-center font-bold text-lg">
                      ₹
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── 4. 6 CORE PORTAL SERVICE CARDS ── */}
      <section id="features" className="py-28 px-6 bg-green-50">
        <div className="max-w-7xl mx-auto">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="text-center mb-20">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-black mb-6 text-green-950 leading-tight">
              {trans.servicesTitle}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-600 text-lg font-medium max-w-2xl mx-auto">
              {trans.servicesSub}
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Mandi Prices (Light Blue pastels - Rainwater Blue!) */}
            <Link href="/dashboard/mandi-prices">
              <motion.div 
                variants={fadeInUp} 
                whileHover={{ y: -6 }}
                className="bg-blue-100 border-2 border-blue-200 hover:border-blue-300 text-blue-700 rounded-[32px] p-8 h-[270px] flex flex-col justify-between cursor-pointer shadow-xs transition-all relative overflow-hidden group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-xs border border-white">
                  <TrendingUp size={28} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-black leading-tight mb-2 group-hover:underline">
                    {trans.cardMandiTitle}
                  </h3>
                  <p className="text-xs font-semibold opacity-90 leading-relaxed text-slate-700">
                    {trans.cardMandiDesc}
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* Card 2: Crop AI Disease Detection (Light Green pastels - Sprout Greenery) */}
            <Link href="/dashboard/disease-detection">
              <motion.div 
                variants={fadeInUp} 
                whileHover={{ y: -6 }}
                className="bg-green-100 border-2 border-green-200 hover:border-green-300 text-green-700 rounded-[32px] p-8 h-[270px] flex flex-col justify-between cursor-pointer shadow-xs transition-all relative overflow-hidden group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-xs border border-white">
                  <Microscope size={28} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-black leading-tight mb-2 group-hover:underline">
                    {trans.cardDiseaseTitle}
                  </h3>
                  <p className="text-xs font-semibold opacity-90 leading-relaxed text-slate-700">
                    {trans.cardDiseaseDesc}
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* Card 3: Crop Recommendation (Light Yellow pastels - Ripe Crops Yellow) */}
            <Link href="/dashboard/crop-recommendation">
              <motion.div 
                variants={fadeInUp} 
                whileHover={{ y: -6 }}
                className="bg-yellow-100 border-2 border-yellow-200 hover:border-yellow-300 text-yellow-700 rounded-[32px] p-8 h-[270px] flex flex-col justify-between cursor-pointer shadow-xs transition-all relative overflow-hidden group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-xs border border-white">
                  <Sprout size={28} className="text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-black leading-tight mb-2 group-hover:underline">
                    {trans.cardCropTitle}
                  </h3>
                  <p className="text-xs font-semibold opacity-90 leading-relaxed text-slate-700">
                    {trans.cardCropDesc}
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* Card 4: KrishiMitra Voice Chat (Rich Amber - Fertile Soil Brown) */}
            <Link href="/dashboard/assistant">
              <motion.div 
                variants={fadeInUp} 
                whileHover={{ y: -6 }}
                className="bg-amber-100 border-2 border-amber-200 hover:border-amber-300 text-amber-800 rounded-[32px] p-8 h-[270px] flex flex-col justify-between cursor-pointer shadow-xs transition-all relative overflow-hidden group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-xs border border-white">
                  <MessageCircle size={28} className="text-amber-700" />
                </div>
                <div>
                  <h3 className="text-xl font-black leading-tight mb-2 group-hover:underline">
                    {trans.cardAssistantTitle}
                  </h3>
                  <p className="text-xs font-semibold opacity-90 leading-relaxed text-slate-700">
                    {trans.cardAssistantDesc}
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* Card 5: Buyer Marketplace (Clay Peach - Soft Earth Soil) */}
            <Link href="/dashboard/marketplace">
              <motion.div 
                variants={fadeInUp} 
                whileHover={{ y: -6 }}
                className="bg-amber-50 border-2 border-amber-100 hover:border-amber-200 text-amber-800 rounded-[32px] p-8 h-[270px] flex flex-col justify-between cursor-pointer shadow-xs transition-all relative overflow-hidden group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-xs border border-white">
                  <ShoppingCart size={28} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-black leading-tight mb-2 group-hover:underline">
                    {trans.cardMarketTitle}
                  </h3>
                  <p className="text-xs font-semibold opacity-90 leading-relaxed text-slate-700">
                    {trans.cardMarketDesc}
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* Card 6: KVK Official Advisory (Patriotic tricolor style, matching dashboard dashboard page exactly!) */}
            <Link href="/dashboard">
              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="relative rounded-[32px] overflow-hidden h-[270px] flex flex-col justify-between cursor-pointer shadow-md group border border-slate-200/50"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('/cotton_govt_advisory.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                
                {/* TRICOLOR TOP RIBBON ACCENT */}
                <div className="absolute top-0 left-0 right-0 h-1.5 flex z-20">
                  <div className="flex-grow bg-[#FF9933]" />
                  <div className="flex-grow bg-[#FFFFFF]" />
                  <div className="flex-grow bg-[#128807]" />
                </div>

                {/* OFFICIAL KVK PORTAL BORDER */}
                <div className="relative z-10 w-full p-4 pt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/10 shadow-xs">
                    <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                    <div className="flex flex-col text-[8px] font-bold text-white tracking-wider leading-none">
                      <span>AGRICONNECT INDIA</span>
                      <span className="text-amber-400 font-extrabold">AGRICONNECT PORTAL</span>
                    </div>
                  </div>
                  <div className="bg-[#128807] text-white text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                    LIVE
                  </div>
                </div>

                {/* BULLETIN DESCRIPTION */}
                <div className="relative z-10 w-full p-5 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent border-t border-white/10 backdrop-blur-xs flex flex-col gap-0.5">
                  <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">
                    {trans.cardAdvisoryTitle}
                  </span>
                  <h3 className="text-sm font-black text-white leading-tight">
                    {trans.cardAdvisoryDesc}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[8px] text-slate-300 font-extrabold uppercase">
                      AgriConnect Advisory Bulletin
                    </span>
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20">
                      <Mic size={10} className="animate-bounce" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>

          </motion.div>
        </div>
      </section>

      {/* ── 5. GEMINI AI RESEARCH CAPABILITIES ── */}
      <section id="ai-capabilities" className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} 
          className="bg-white border border-green-500/10 rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-sm"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-500/5 to-transparent blur-3xl pointer-events-none" />
          
          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-700 text-xs font-bold mb-6 tracking-wider uppercase shadow-xs">
                <Bot size={14} /> Powered by Gemini
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 text-green-950 leading-tight">
                {trans.aiTitle}
              </h2>
              <p className="text-slate-600 mb-8 text-base font-medium leading-relaxed">
                {trans.aiSub}
              </p>
              <ul className="space-y-4 mb-8 text-sm font-bold text-slate-700">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-extrabold border border-green-200">✓</div>
                  {trans.aiFeature1}
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-extrabold border border-green-200">✓</div>
                  {trans.aiFeature2}
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-extrabold border border-green-200">✓</div>
                  {trans.aiFeature3}
                </li>
              </ul>
            </motion.div>
            
            {/* Visual AI Brain Mapping Mockup */}
            <motion.div variants={scaleIn} className="relative h-[300px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse" />
              
              {/* Center Brain Node */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-600 to-emerald-800 flex items-center justify-center z-20 shadow-md border-4 border-white">
                <Bot size={40} className="text-white" />
              </div>
              
              {/* Orbiting Ring Elements */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-full border border-green-500/10 rounded-full"
                  style={{ width: `${(i + 1) * 100}px`, height: `${(i + 1) * 100}px` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18 - i * 4, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-4 h-4 rounded-full bg-green-600 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow border-2 border-white" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── 6. DYNAMIC MISSION STATEMENT / CTA ── */}
      <section id="vision" className="py-24 px-6">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeInUp}
          className="max-w-4xl mx-auto bg-white border border-green-500/10 rounded-[40px] p-12 text-center relative overflow-hidden shadow-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-8 text-green-700">
              <Users size={28} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-green-950 leading-tight">
              {trans.visionTitle}
            </h2>
            <p className="text-base md:text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
              {trans.visionDesc}
            </p>
            <Link href="/register" className="inline-flex bg-gradient-to-r from-green-700 to-emerald-800 text-white px-10 py-4 rounded-2xl font-black text-lg hover:shadow-lg hover:shadow-green-700/25 transition-all hover:scale-[1.02]">
              {trans.joinBtn}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── 7. OFFICIAL MINISTRY GOVERNMENT FOOTER ── */}
      <footer className="border-t border-slate-200 bg-slate-900 text-slate-400 py-12 px-6 relative">
        {/* TRICOLOR TOP RIBBON ACCENT */}
        <div className="absolute top-0 left-0 right-0 h-[4px] flex z-20">
          <div className="flex-grow bg-[#FF9933]" />
          <div className="flex-grow bg-[#FFFFFF]" />
          <div className="flex-grow bg-[#128807]" />
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          
          <div className="flex items-center gap-3">
            {/* Custom Wheat SVG Emblem Logo in Footer */}
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow border-2 border-green-600 overflow-hidden flex-shrink-0">
              <svg className="w-full h-full p-0.5" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="52" stroke="#16a34a" strokeWidth="6" fill="#fef08a" />
                <circle cx="60" cy="60" r="42" fill="#d97706" />
                <path d="M60 95V35" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
                <path d="M60 42L45 32M60 52L45 42M60 62L45 52M60 72L45 62M60 82L45 72" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M60 42L75 32M60 52L75 42M60 62L75 52M60 72L75 62M60 82L75 72" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-white text-lg tracking-tight flex items-center gap-1">
                AgriConnect <span className="text-orange-500">India</span>
              </span>
              <p className="text-[8px] text-green-400 font-extrabold uppercase tracking-wide leading-none">
                {trans.portalSub}
              </p>
            </div>
          </div>
          
          <div className="text-xs text-slate-400 font-semibold text-center md:text-right leading-relaxed max-w-md">
            <p className="text-slate-300 font-extrabold mb-1">
              🇮🇳 {trans.coDesigned}
            </p>
            <p className="text-[10px] text-slate-500 font-bold mb-2">
              {trans.builtWith}
            </p>
            <p className="text-[9px] text-slate-600 uppercase tracking-widest font-black">
              © {new Date().getFullYear()} AgriConnect India. {trans.allRights}
            </p>
          </div>

        </div>
      </footer>

      {/* Floating KrishiMitra Assistant Shortcut */}
      <Link href="/dashboard/assistant" className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-700 to-emerald-800 text-white p-4.5 rounded-full shadow-lg shadow-green-700/30 hover:scale-110 transition-all flex items-center justify-center group border-2 border-white/20">
        <Bot size={24} className="group-hover:animate-bounce" />
        <span className="sr-only">Ask KrishiMitra</span>
      </Link>

    </main>
  );
}
