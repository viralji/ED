export interface YogaSutra {
  chapter: number;
  sutraNumber: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
  commentary: string;
  keywords: string[];
  practicalApplication: string;
}

export const patanjaliSutras: YogaSutra[] = [
  // Samadhi Pada (Chapter 1)
  {
    chapter: 1,
    sutraNumber: 1,
    sanskrit: "अथ योगानुशासनम्",
    transliteration: "atha yogānuśāsanam",
    translation: "Now begins the instruction of yoga.",
    commentary: "This opening sutra establishes the sacred nature of yoga as a complete discipline for spiritual transformation. The word 'atha' (now) implies readiness and auspiciousness for undertaking this profound journey.",
    keywords: ["beginning", "instruction", "discipline", "sacred timing"],
    practicalApplication: "Recognize that yoga requires dedicated commitment and the right mental attitude to begin this transformative practice."
  },
  {
    chapter: 1,
    sutraNumber: 2,
    sanskrit: "योगश्चित्तवृत्तिनिरोधः",
    transliteration: "yogaś citta-vṛtti-nirodhaḥ",
    translation: "Yoga is the cessation of fluctuations of the mind.",
    commentary: "This is the fundamental definition of yoga. Citta (mind-stuff) includes all mental activities - thoughts, emotions, memories. Vritti (fluctuations) are the constant modifications of consciousness. Nirodha means cessation or restraint.",
    keywords: ["mind control", "mental fluctuations", "consciousness", "cessation"],
    practicalApplication: "Practice observing your thoughts without judgment. Begin with short meditation sessions to witness the mind's constant activity."
  },
  {
    chapter: 1,
    sutraNumber: 3,
    sanskrit: "तदा द्रष्टुः स्वरूपेऽवस्थानम्",
    transliteration: "tadā draṣṭuḥ svarūpe'vasthānam",
    translation: "Then the seer abides in their own true nature.",
    commentary: "When the mind becomes still, the true Self is revealed. The seer (drashta) is the pure consciousness that observes all mental activities. In stillness, we rest in our essential nature.",
    keywords: ["true nature", "seer", "pure consciousness", "self-realization"],
    practicalApplication: "In moments of mental stillness during meditation, rest in the awareness that is simply witnessing - this is your true nature."
  },
  {
    chapter: 1,
    sutraNumber: 4,
    sanskrit: "वृत्तिसारूप्यमितरत्र",
    transliteration: "vṛtti-sārūpyam itaratra",
    translation: "At other times, one identifies with the fluctuations of the mind.",
    commentary: "When not established in yoga, consciousness becomes colored by mental modifications. We mistake ourselves for our thoughts, emotions, and experiences rather than recognizing our true nature.",
    keywords: ["identification", "mental modifications", "false self", "ego"],
    practicalApplication: "Notice when you say 'I am angry' versus 'anger is present.' Practice dis-identifying from temporary mental states."
  },
  {
    chapter: 1,
    sutraNumber: 14,
    sanskrit: "स तु दीर्घकालनैरन्तर्यसत्कारासेवितो दृढभूमिः",
    transliteration: "sa tu dīrgha-kāla-nairantarya-satkārāsevito dṛḍha-bhūmiḥ",
    translation: "Practice is firmly grounded when it is cultivated continuously for a long period with dedication.",
    commentary: "Consistent, devoted practice over extended time creates the foundation for spiritual growth. Three elements are essential: long duration, uninterrupted continuity, and sincere devotion.",
    keywords: ["consistent practice", "dedication", "long-term commitment", "devotion"],
    practicalApplication: "Commit to daily spiritual practice, even if brief. Consistency matters more than duration in establishing a firm foundation."
  },
  // Sadhana Pada (Chapter 2)
  {
    chapter: 2,
    sutraNumber: 29,
    sanskrit: "यमनियमासनप्राणायामप्रत्याहारधारणाध्यानसमाधयोऽष्टावङ्गानि",
    transliteration: "yama-niyamāsana-prāṇāyāma-pratyāhāra-dhāraṇā-dhyāna-samādhayo'ṣṭāvaṅgāni",
    translation: "The eight limbs of yoga are: ethical restraints, observances, postures, breath control, withdrawal of senses, concentration, meditation, and absorption.",
    commentary: "This sutra outlines the complete eight-fold path of yoga, providing a systematic approach to spiritual development from ethical foundation to ultimate realization.",
    keywords: ["eight limbs", "systematic practice", "spiritual path", "complete yoga"],
    practicalApplication: "Approach yoga holistically, beginning with ethical principles and gradually incorporating all eight limbs into your practice."
  },
  {
    chapter: 2,
    sutraNumber: 30,
    sanskrit: "अहिंसासत्यास्तेयब्रह्मचर्यापरिग्रहा यमाः",
    transliteration: "ahiṃsā-satya-asteya-brahmacaryāparigrāhā yamāḥ",
    translation: "The ethical restraints are: non-violence, truthfulness, non-stealing, celibacy/energy conservation, and non-possessiveness.",
    commentary: "The five yamas form the ethical foundation of yoga practice. They purify our interactions with others and create harmony in relationships.",
    keywords: ["ethics", "non-violence", "truthfulness", "restraints", "moral foundation"],
    practicalApplication: "Begin with ahimsa - practice non-violence in thought, word, and deed. Extend compassion to all beings including yourself."
  },
  {
    chapter: 2,
    sutraNumber: 46,
    sanskrit: "स्थिरसुखमासनम्",
    transliteration: "sthira-sukham āsanam",
    translation: "Posture should be steady and comfortable.",
    commentary: "The ideal physical posture balances effort with ease, stability with comfort. This principle applies to all yoga practices - finding the middle way between strain and laxity.",
    keywords: ["balance", "steady posture", "comfort", "middle way"],
    practicalApplication: "In your physical practice, find the balance between effort and ease. Apply this principle to all areas of life."
  },
  {
    chapter: 2,
    sutraNumber: 47,
    sanskrit: "प्रयत्नशैथिल्यानन्तसमापत्तिभ्याम्",
    transliteration: "prayatna-śaithilya-ananta-samāpattibhyām",
    translation: "By relaxing effort and focusing on the infinite, the posture is mastered.",
    commentary: "Perfection in posture comes not through force but through relaxation of unnecessary effort and meditation on the infinite. This teaches us about effortless action.",
    keywords: ["effortless action", "relaxation", "infinite", "mastery"],
    practicalApplication: "In any practice or activity, release unnecessary tension while maintaining awareness. Contemplate the vastness of existence."
  },
  // Selected sutras from other chapters for comprehensive coverage
  {
    chapter: 3,
    sutraNumber: 3,
    sanskrit: "तदेवार्थमात्रनिर्भासं स्वरूपशून्यमिव समाधिः",
    transliteration: "tad evārtha-mātra-nirbhāsaṃ svarūpa-śūnyam iva samādhiḥ",
    translation: "When only the object shines forth, as if devoid of one's own form, that is absorption (samadhi).",
    commentary: "In the highest states of meditation, the sense of separation between meditator and object dissolves. Only pure awareness of the object remains.",
    keywords: ["absorption", "unity", "dissolution of ego", "pure awareness"],
    practicalApplication: "In deep concentration, allow yourself to merge completely with the object of meditation, losing self-consciousness."
  },
  {
    chapter: 4,
    sutraNumber: 34,
    sanskrit: "पुरुषार्थशून्यानां गुणानां प्रतिप्रसवः कैवल्यं स्वरूपप्रतिष्ठा वा चितिशक्तेरिति",
    transliteration: "puruṣārtha-śūnyānāṃ guṇānāṃ pratiprasavaḥ kaivalyaṃ svarūpa-pratiṣṭhā vā citi-śakter iti",
    translation: "Liberation is the return of the qualities of nature to their source when they no longer serve the purpose of the Self, or it is the power of consciousness established in its own nature.",
    commentary: "The final goal of yoga - complete liberation (kaivalya) - is achieved when all mental modifications cease to serve the ego, and pure consciousness recognizes its eternal nature.",
    keywords: ["liberation", "kaivalya", "pure consciousness", "final goal"],
    practicalApplication: "Recognize that all experiences are temporary modifications of consciousness. Rest in the unchanging awareness that witnesses all change."
  }
];

export const getRelevantSutras = (keywords: string[]): YogaSutra[] => {
  return patanjaliSutras.filter(sutra => 
    sutra.keywords.some(keyword => 
      keywords.some(searchKeyword => 
        keyword.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        searchKeyword.toLowerCase().includes(keyword.toLowerCase())
      )
    )
  );
};

export const getSutraByNumber = (chapter: number, sutraNumber: number): YogaSutra | undefined => {
  return patanjaliSutras.find(sutra => sutra.chapter === chapter && sutra.sutraNumber === sutraNumber);
};

export const getRandomSutra = (): YogaSutra => {
  return patanjaliSutras[Math.floor(Math.random() * patanjaliSutras.length)];
};