const smile = {
  id: 1,
  title: "Concern with your smile",
  questions: [
    {
      id: 1,
      question: "are your two upper front teeth too long or too wide?",
      diagnosis: "aesthetic problem",
      treatment: "cosmetic correction"
    },
   {
      id: 2,
      question: "Is there any space between your front teeth?",
      diagnosis: "Aesthetic problem",
      treatment: "Cosmetic correction, orthodontic treatment"
    },
   {
      id: 3,
      question: "Do you notice any stains on your teeth?",
      diagnosis: "Discoloration of tooth",
      treatment: "Polishing"
    },
    {
      id: 4,
      question: "In a wide smile, are any of your teeth of a different size or different color?",
      diagnosis: "Aesthetic problem",
      treatment: "Cosmetic correction"
    },
    {
      id: 5,
      question: "Do any of your front teeth 'stick out'?",
      diagnosis: "Aesthetic problem",
      treatment: "Cosmetic correction"
    },
    {
      id: 6,
      question: "Are your lower six front teeth crooked and uneven in appearance?",
      diagnosis: "Malocclusion",
      treatment: "Orthodontic correction"
    },
    {
      id: 7,
      question: "Do your crowns / fillings/ laminates look artificial or a different color than your natural teeth?",
      diagnosis: "Aesthetic problem",
      treatment: "Cosmetic correction"
    },
    {
      id: 8,
      question: "When you smile broadly, do you feel that too much of your gums show?",
      diagnosis: "Aesthetic problem",
      treatment: "Cosmetic correction"
    },
    {
      id: 9,
      question: "Do your gums curve around your teeth in any other shape than a ' half moon shape '?",
      diagnosis: "Aesthetic problem",
      treatment: "Cosmetic correction"
    },
    {
      id: 10,
      question: "Do you feel your smile appears unaesthetic for any reason?",
      diagnosis: "Aesthetic problem",
      treatment: "Cosmetic correction"
    },
  ]
}

const gum_bleeding = {
  id: 2,
  title: "Gum Bleeding",
  questions: [
    {
      id: 1,
      question: "Bleeding gums?",
      diagnosis: "Gingivitis",
      treatment: "Scaling"
    },
    {
      id: 2,
      question: "Do you feel your gums are red and swollen?",
      diagnosis: "Gingivitis",
      treatment: "Scaling"
    },
    {
      id: 3,
      question: "Do you have any sensitive, tender gums?",
      diagnosis: "Gingivitis",
      treatment: "Scaling"
    },
    {
      id: 4,
      question: "Is your breath is not fresh as it can be?",
      diagnosis: "Gingivitis",
      treatment: "Scaling"
    },
  ]
}

const bad_breath = {
  id: 3,
  title: "Bad Breath",
  questions: [
    {
      id: 1,
      question: "Persistent bad breath?",
      diagnosis: "Periodontitis",
      treatment: "Scaling"
    },
    {
      id: 2,
      question: "Pus in the gums?",
      diagnosis: "Gingivitis with periodontitis",
      treatment: "Scaling"
    },
    {
      id: 3,
      question: "Have you suffer from diseases, DM/ sinusitis/ IBS?",
      diagnosis: "Bad breath due to systemic disease",
      treatment: "Consult for concern disease.    "
    },
    {
      id: 4,
      question: "Loose or mobile teeth?",
      diagnosis: "Periodontitis",
      treatment: "Root planning"
    },
  ]
}

const tooth_sensitivity = {
  id: 4,
  title: "Tooth Sensitivity",
  questions: [
    {
      id: 1,
      question: "Have you had sensitive teeth?",
      diagnosis: "Hypersensitivity",
      treatment: "Desensitizing toothpaste"
    },
    {
      id: 2,
      question: "Gum receding or pulling away from the teeth?",
      diagnosis: "Hypersensitivity",
      treatment: "Desensitizing toothpaste"
    },
    {
      id: 3,
      question: "Are your teeth sensitive to cold air, ice water, and sweets or brushing?",
      diagnosis: "Hypersensitivity",
      treatment: "Restoration"
    },
    {
      id: 4,
      question: "Do you brush your teeth with a hard toothbrush or brush with overly hard force? Y or N  ?",
      diagnosis: "Hypersensitivity",
      treatment: "Restoration"
    },

  ]
}

const yellow_teeth = {
  id: 5,
  title: "Yellow Teeth",
  questions: [
    {
      id: 1,
      question: "Do you have yellow or darker tooth?",
      diagnosis: "Discoloration of tooth",
      treatment: "Bleaching"
    },
    {
      id: 2,
      question: "Do you have old restoration?",
      diagnosis: "Mal-restoration",
      treatment: "Revised restoration"
    },
    {
      id: 3,
      question: "Any habit, like smoking, drinking tea or coffee?",
      diagnosis: "Staining of tooth",
      treatment: "Polishing"
    },
    {
      id: 4,
      question: "Tooth is not cleaning by brushing & flossing twice a day?",
      diagnosis: "Staining of tooth",
      treatment: "Polishing"
    },
  ]
}

const pain = {
  id: 6,
  title: 'Pain',
  questions: [
    {
      id: 1,
      question: "Pain with cold?",
      diagnosis: "Reversible pulpitis",
      treatment: "Restoration"
    },
    {
      id: 2,
      question: "Pain with hot & cold both?",
      diagnosis: "Irreversible pulpitis",
      treatment: "Root canal therapy"
    },
    {
      id: 3,
      question: "Spontaneous pain?",
      diagnosis: "Irreversible pulpitis",
      treatment: "Root canal therapy"
    },
    {
      id: 4,
      question: "Pain last more than 30 seconds?",
      diagnosis: "Irreversible pulpitis",
      treatment: "Root canal therapy"
    },
    {
      id: 5,
      question: "Pain last less than 30 seconds?",
      diagnosis: "Reversible pulpitis",
      treatment: "Restoration"
    },
    {
      id: 6,
      nestedQuestion: true,
      question: "Pain spread to ear & forehead?",
      questions: [
        {
          id: 1,
          question: "Pain starts from jaw joint?",
          diagnosis: "TMD",
          treatment: "Medication & therapy"
        },
        {
          id: 2,
          question: "Pain starts from cavity tooth?",
          diagnosis: "Irreversible pulpitis",
          treatment: "Root canal therapy"
        },
      ] ,
    },
    {
      id: 7,
      question: "Difficulty in chewing & biting?",
      nestedQuestion: true,
      questions: [
          {
            id: 1,
            question: "Pain starts from jaw joint?",
            diagnosis: "TMD",
            treatment: "Medication & therapy"
          },
          {
            id: 2,
            question: "Pain related to cavity teeth?",
            diagnosis: "TMD",
            treatment: "Medication & therapy"
          },
          {
            id: 3,
            question: "Pain related to wisdom teeth?",
            diagnosis: "Pericoronitis",
            treatment: "Extraction of wisdom teeth"
          },
      ]
    },
    {
      id: 8,
      question: "Do you have any sores or lumps in or near your mouth?",
      diagnosis: "Apthous ulcer",
      treatment: "Medication"
    },
    {
      id: 9,
      question: "pain /clicking in the jaw joint?",
      diagnosis: "TMD",
      treatment: "Medication & therapy"
    },
    {
      id: 10,
      question: "Are you aware if you are clenching or grinding your teeth?",
      nestedQuestion: true,
      questions: [
        {
          id: 1,
          question: "Pain starts from jaw joint?",
          diagnosis: "TMD",
          treatment: "Medication & therapy"
        },
        {
          id: 2,
          question: "Pain related to individual tooth?",
          diagnosis: "Crack tooth syndrome",
          treatment: "Root canal therapy"
        },
      ]
    },

  ]
}

const discomfort = {
  id: 7,
  title: "Comfort",
  questions: [
    {
      id: 1,
      question: "Burning sensation of tongue/ mouth?",
      diagnosis: "Burning mouth syndrome",
      treatment: "Medication"
    },
    {
      id: 2,
      question: "Altered taste ?",
      diagnosis: "Tongue pathology",
      treatment: "Medication"
    },
    {
      id: 3,
      question: "Roughness /sharpness of teeth?",
      diagnosis: "Edges or cusps fracture",
      treatment: "Grinding & polishing"
    },
    {
      id: 4,
      question: "Roughness/ sharpness of existing filling?",
      diagnosis: "Fracture restoration",
      treatment: "Revised restoration"
    },
    {
      id: 5,
      question: "Food trapping between your teeth?",
      diagnosis: "Periodontal pocket",
      treatment: "Periodontal curettage"
    },
    {
      id: 6,
      question: "Cavity on your teeth?",
      diagnosis: "Dental caries",
      treatment: "Restoration"
    },
    {
      id: 7,
      question: "Concerned with existing crown/ bridge?",
      diagnosis: "Bad prosthesis",
      treatment: "Revised prosthesis"
    },
    {
      id: 8,
      question: "Concerned with existing denture/false tooth?",
      diagnosis: "Bad prosthesis",
      treatment: "Revised prosthesis"
    },
    {
      id: 9,
      question: "Concerned with missing teeth",
      diagnosis: "Malocclusion",
      treatment: "Prosthesis"
    },
  ]
}



const all = [smile, gum_bleeding, bad_breath, tooth_sensitivity, yellow_teeth, pain, discomfort];

export default all;
