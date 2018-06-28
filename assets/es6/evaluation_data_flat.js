const all = [
    {
      id: 1,
      title: "Concern with your smile",
      question: "are your two upper front teeth too long or too wide?",
      diagnosis: "aesthetic problem",
      treatment: "cosmetic correction"
    },
   {
      id: 2,
      title: "Concern with your smile",
      question: "Is there any space between your front teeth?",
      diagnosis: "Aesthetic problem",
      treatment: "Cosmetic correction, orthodontic treatment"
    },
   {
      id: 3,
      title: "Concern with your smile",
      question: "Do you notice any stains on your teeth?",
      diagnosis: "Discoloration of tooth",
      treatment: "Polishing"
    },
    {
      id: 4,
      title: "Concern with your smile",
      question: "In a wide smile, are any of your teeth of a different size or different color?",
      diagnosis: "Aesthetic problem",
      treatment: "Cosmetic correction"
    },
    {
      id: 5,
      title: "Concern with your smile",
      question: "Do any of your front teeth 'stick out'?",
      diagnosis: "Aesthetic problem",
      treatment: "Cosmetic correction"
    },
    {
      id: 6,
      title: "Concern with your smile",
      question: "Are your lower six front teeth crooked and uneven in appearance?",
      diagnosis: "Malocclusion",
      treatment: "Orthodontic correction"
    },
    {
      id: 7,
      title: "Concern with your smile",
      question: "Do your crowns / fillings/ laminates look artificial or a different color than your natural teeth?",
      diagnosis: "Aesthetic problem",
      treatment: "Cosmetic correction"
    },
    {
      id: 8,
      title: "Concern with your smile",
      question: "When you smile broadly, do you feel that too much of your gums show?",
      diagnosis: "Aesthetic problem",
      treatment: "Cosmetic correction"
    },
    {
      id: 9,
      title: "Concern with your smile",
      question: "Do your gums curve around your teeth in any other shape than a ' half moon shape '?",
      diagnosis: "Aesthetic problem",
      treatment: "Cosmetic correction"
    },
    {
      id: 10,
      title: "Concern with your smile",
      question: "Do you feel your smile appears unaesthetic for any reason?",
      diagnosis: "Aesthetic problem",
      treatment: "Cosmetic correction"
    },
    {
      id: 11,
      title: "Gum Bleeding",
      question: "Bleeding gums?",
      diagnosis: "Gingivitis",
      treatment: "Scaling"
    },
    {
      id: 12,
      title: "Gum Bleeding",
      question: "Do you feel your gums are red and swollen?",
      diagnosis: "Gingivitis",
      treatment: "Scaling"
    },
    {
      id: 13,
      title: "Gum Bleeding",
      question: "Do you have any sensitive, tender gums?",
      diagnosis: "Gingivitis",
      treatment: "Scaling"
    },
    {
      id: 14,
      title: "Gum Bleeding",
      question: "Is your breath is not fresh as it can be?",
      diagnosis: "Gingivitis",
      treatment: "Scaling"
    },
    {
      id: 15,
      title: "Bad Breath",
      question: "Persistent bad breath?",
      diagnosis: "Periodontitis",
      treatment: "Scaling"
    },
    {
      id: 16,
      title: "Bad Breath",
      question: "Pus in the gums?",
      diagnosis: "Gingivitis with periodontitis",
      treatment: "Scaling"
    },
    {
      id: 17,
      title: "Bad Breath",
      question: "Have you suffer from diseases, DM/ sinusitis/ IBS?",
      diagnosis: "Bad breath due to systemic disease",
      treatment: "Consult for concern disease.    "
    },
    {
      id: 18,
      title: "Bad Breath",
      question: "Loose or mobile teeth?",
      diagnosis: "Periodontitis",
      treatment: "Root planning"
    },
    {
      id: 19,
      title: "Tooth Sensitivity",
      question: "Have you had sensitive teeth?",
      diagnosis: "Hypersensitivity",
      treatment: "Desensitizing toothpaste"
    },
    {
      id: 20,
      title: "Tooth Sensitivity",
      question: "Gum receding or pulling away from the teeth?",
      diagnosis: "Hypersensitivity",
      treatment: "Desensitizing toothpaste"
    },
    {
      id: 21,
      title: "Tooth Sensitivity",
      question: "Are your teeth sensitive to cold air, ice water, and sweets or brushing?",
      diagnosis: "Hypersensitivity",
      treatment: "Restoration"
    },
    {
      id: 22,
      title: "Tooth Sensitivity",
      question: "Do you brush your teeth with a hard toothbrush or brush with overly hard force? Y or N  ?",
      diagnosis: "Hypersensitivity",
      treatment: "Restoration"
    },
    {
      id: 23,
      title: "Yellow Teeth",
      question: "Do you have yellow or darker tooth?",
      diagnosis: "Discoloration of tooth",
      treatment: "Bleaching"
    },
    {
      id: 24,
      title: "Yellow Teeth",
      question: "Do you have old restoration?",
      diagnosis: "Mal-restoration",
      treatment: "Revised restoration"
    },
    {
      id: 25,
      title: "Yellow Teeth",
      question: "Any habit, like smoking, drinking tea or coffee?",
      diagnosis: "Staining of tooth",
      treatment: "Polishing"
    },
    {
      id: 26,
      title: "Yellow Teeth",
      question: "Tooth is not cleaning by brushing & flossing twice a day?",
      diagnosis: "Staining of tooth",
      treatment: "Polishing"
    },
    {
      id: 27,
      title: 'Pain',
      question: "Pain with cold?",
      diagnosis: "Reversible pulpitis",
      treatment: "Restoration"
    },
    {
      id: 28,
      title: 'Pain',
      question: "Pain with hot & cold both?",
      diagnosis: "Irreversible pulpitis",
      treatment: "Root canal therapy"
    },
    {
      id: 29,
      title: 'Pain',
      question: "Spontaneous pain?",
      diagnosis: "Irreversible pulpitis",
      treatment: "Root canal therapy"
    },
    {
      id: 30,
      title: 'Pain',
      question: "Pain last more than 30 seconds?",
      diagnosis: "Irreversible pulpitis",
      treatment: "Root canal therapy"
    },
    {
      id: 31,
      title: 'Pain',
      question: "Pain last less than 30 seconds?",
      diagnosis: "Reversible pulpitis",
      treatment: "Restoration"
    },
    {
      id: 32,
      title: "Pain spread to ear & forehead?",
      question: "Pain starts from jaw joint?",
      diagnosis: "TMD",
      treatment: "Medication & therapy"
    },
    {
      id: 33,
      title: "Pain spread to ear & forehead?",
      question: "Pain starts from cavity tooth?",
      diagnosis: "Irreversible pulpitis",
      treatment: "Root canal therapy"
    },
    {
      id: 34,
      title: 'Pain',
      nestedQuestion: true,
      question: "Pain spread to ear & forehead?",
    },
    {
      id: 35,
      title: "Pain - Difficulty in chewing & biting?",
      question: "Pain starts from jaw joint?",
      diagnosis: "TMD",
      treatment: "Medication & therapy"
    },
    {
      id: 36,
      question: "Pain related to cavity teeth?",
      title: "Pain - Difficulty in chewing & biting?",
      diagnosis: "TMD",
      treatment: "Medication & therapy"
    },
    {
      id: 37,
      question: "Pain related to wisdom teeth?",
      title: "Pain - Difficulty in chewing & biting?",
      diagnosis: "Pericoronitis",
      treatment: "Extraction of wisdom teeth"
    },
    
    {
      id: 38,
      title: "Pain",
      question: "Do you have any sores or lumps in or near your mouth?",
      diagnosis: "Apthous ulcer",
      treatment: "Medication"
    },
    {
      id: 39,
      title: "Pain",
      question: "pain /clicking in the jaw joint?",
      diagnosis: "TMD",
      treatment: "Medication & therapy"
    },
    {
      id: 40,
      question: "Pain starts from jaw joint?",
      title: "Pain: Are you aware if you are clenching or grinding your teeth?",
      diagnosis: "TMD",
      treatment: "Medication & therapy"
    },
    {
      id: 41,
      title: "Pain: Are you aware if you are clenching or grinding your teeth?",
      question: "Pain related to individual tooth?",
      diagnosis: "Crack tooth syndrome",
      treatment: "Root canal therapy"
    },
    {
      id: 42,
      title: "Comfort",
      question: "Burning sensation of tongue/ mouth?",
      diagnosis: "Burning mouth syndrome",
      treatment: "Medication"
    },
    {
      id: 43,
      title: "Comfort",
      question: "Altered taste ?",
      diagnosis: "Tongue pathology",
      treatment: "Medication"
    },
    {
      id: 44,
      title: "Comfort",
      question: "Roughness /sharpness of teeth?",
      diagnosis: "Edges or cusps fracture",
      treatment: "Grinding & polishing"
    },
    {
      id: 45,
      title: "Comfort",
      question: "Roughness/ sharpness of existing filling?",
      diagnosis: "Fracture restoration",
      treatment: "Revised restoration"
    },
    {
      id: 46,
      title: "Comfort",
      question: "Food trapping between your teeth?",
      diagnosis: "Periodontal pocket",
      treatment: "Periodontal curettage"
    },
    {
      id: 47,
      title: "Comfort",
      question: "Cavity on your teeth?",
      diagnosis: "Dental caries",
      treatment: "Restoration"
    },
    {
      id: 48,
      title: "Comfort",
      question: "Concerned with existing crown/ bridge?",
      diagnosis: "Bad prosthesis",
      treatment: "Revised prosthesis"
    },
    {
      id: 49,
      title: "Comfort",
      question: "Concerned with existing denture/false tooth?",
      diagnosis: "Bad prosthesis",
      treatment: "Revised prosthesis"
    },
    {
      id: 50,
      title: "Comfort",
      question: "Concerned with missing teeth",
      diagnosis: "Malocclusion",
      treatment: "Prosthesis"
    },

];

