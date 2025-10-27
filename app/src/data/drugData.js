export const drugData = [
  {
    id: '1',
    name: 'Cocaine',
    type: 'Stimulant',
    riskLevel: 'high',
    shortDescription: 'Highly addictive stimulant that affects the brain.',
    longDescription: 'Cocaine is a powerfully addictive stimulant drug made from the leaves of the coca plant native to South America. It produces short-term euphoria, energy, and talkativeness. However, it can also cause paranoia and is highly addictive with severe withdrawal symptoms.',
    effects: [
      'Increased energy and alertness',
      'Euphoria and confidence',
      'Increased heart rate and blood pressure',
      'Anxiety and paranoia',
      'Decreased appetite'
    ],
    risks: [
      'Heart attacks and strokes',
      'Respiratory failure',
      'Severe addiction',
      'Nasal septum damage',
      'Financial ruin'
    ],
    image: require('../../../assets/images/cocaine.png'),
  },
  {
    id: '2',
    name: 'Heroin',
    type: 'Opioid',
    riskLevel: 'high',
    shortDescription: 'Highly addictive opioid drug that produces intense euphoria.',
    longDescription: 'Heroin is an illegal, highly addictive opioid drug synthesized from morphine. It produces intense euphoria but carries extreme risks including fatal overdose. Heroin abuse has reached epidemic levels in many countries.',
    effects: [
      'Intense euphoria',
      'Drowsiness and sedation',
      'Nausea and vomiting',
      'Confusion and clouded thinking'
    ],
    risks: [
      'Fatal overdose',
      'Infectious diseases from needle sharing',
      'Collapsed veins',
      'Liver and kidney disease'
    ],
    image: require('../../../assets/images/heroin.png'),
  },
  {
    id: '3',
    name: 'Marijuana (Cannabis)',
    type: 'Cannabis',
    riskLevel: 'medium',
    shortDescription: 'Psychoactive drug from the Cannabis plant.',
    longDescription: 'Marijuana is a psychoactive drug from the Cannabis plant used for medical and recreational purposes. While considered less dangerous than many other drugs, it can still cause dependency and mental health issues, especially in young users.',
    effects: [
      'Altered senses and perception',
      'Mood changes and relaxation',
      'Impaired memory and coordination',
      'Increased appetite'
    ],
    risks: [
      'Impaired brain development in adolescents',
      'Breathing problems from smoking',
      'Mental health issues in predisposed individuals',
      'Addiction with heavy use'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '4',
    name: 'MDMA (Ecstasy)',
    type: 'Stimulant/Hallucinogen',
    riskLevel: 'high',
    shortDescription: 'Synthetic drug that alters mood and perception.',
    longDescription: 'MDMA, commonly known as Ecstasy, is a synthetic drug that alters mood and perception. It is popular in party settings but can cause dangerous increases in body temperature and heart problems.',
    effects: [
      'Increased energy and empathy',
      'Emotional warmth and closeness',
      'Distorted time perception',
      'Enhanced sensory perception'
    ],
    risks: [
      'Severe dehydration',
      'Heat stroke and hyperthermia',
      'Heart failure',
      'Long-term memory problems'
    ],
    image: require('../../../assets/images/mdma.png'),
  },
  {
    id: '5',
    name: 'Methamphetamine',
    type: 'Stimulant',
    riskLevel: 'high',
    shortDescription: 'Highly addictive stimulant that severely damages the brain.',
    longDescription: 'Methamphetamine is an extremely addictive stimulant that affects the central nervous system. It causes severe dental problems ("meth mouth"), skin sores, and significant brain damage with prolonged use.',
    effects: [
      'Intense euphoria',
      'Increased energy and alertness',
      'Decreased appetite',
      'Aggressive or violent behavior'
    ],
    risks: [
      'Severe dental decay',
      'Psychosis and paranoia',
      'Heart damage and stroke',
      'Extreme weight loss'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '6',
    name: 'Fentanyl',
    type: 'Opioid',
    riskLevel: 'high',
    shortDescription: 'Extremely potent synthetic opioid.',
    longDescription: 'Fentanyl is a synthetic opioid 50-100 times more potent than morphine. It is legally used for severe pain management but has become a major contributor to opioid overdose deaths when used illegally.',
    effects: [
      'Extreme euphoria',
      'Pain relief',
      'Drowsiness and sedation',
      'Respiratory depression'
    ],
    risks: [
      'Rapid fatal overdose',
      'Respiratory arrest',
      'Extreme addiction potential',
      'Unpredictable potency in street drugs'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '7',
    name: 'LSD (Acid)',
    type: 'Hallucinogen',
    riskLevel: 'medium',
    shortDescription: 'Powerful hallucinogenic drug that alters perception.',
    longDescription: 'LSD is a potent hallucinogenic drug that causes significant alterations in perception, mood, and thought. While not considered addictive, it can cause frightening experiences and long-term psychological issues.',
    effects: [
      'Visual and auditory hallucinations',
      'Altered sense of time',
      'Spiritual experiences',
      'Mood swings'
    ],
    risks: [
      "'Bad trips' causing panic",
      'Hallucinogen Persisting Perception Disorder',
      'Accidental injury during use',
      'Triggering latent mental illness'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '8',
    name: 'Psilocybin (Magic Mushrooms)',
    type: 'Hallucinogen',
    riskLevel: 'medium',
    shortDescription: 'Naturally occurring hallucinogenic compound in mushrooms.',
    longDescription: 'Psilocybin is a naturally occurring psychedelic compound found in certain mushroom species. It produces effects similar to LSD but is generally considered to have a shorter duration and different character of effects.',
    effects: [
      'Visual distortions and hallucinations',
      'Euphoria and spiritual experiences',
      'Altered thinking processes',
      'Time distortion'
    ],
    risks: [
      'Poisoning from misidentified mushrooms',
      'Anxiety and panic attacks',
      'Dangerous behavior while impaired',
      'Worsening of mental health conditions'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '9',
    name: 'Alcohol',
    type: 'Depressant',
    riskLevel: 'medium',
    shortDescription: 'Legal depressant that affects the central nervous system.',
    longDescription: 'Alcohol is a legal depressant that slows down vital functions and impairs coordination, judgment, and reaction time. While socially accepted, it carries significant health risks and addiction potential.',
    effects: [
      'Relaxation and reduced inhibitions',
      'Impaired coordination and judgment',
      'Slurred speech',
      'Memory impairment'
    ],
    risks: [
      'Liver cirrhosis and disease',
      'Alcohol addiction (alcoholism)',
      'Increased cancer risk',
      'Brain damage and memory loss'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '10',
    name: 'Nicotine (Tobacco)',
    type: 'Stimulant',
    riskLevel: 'medium',
    shortDescription: 'Highly addictive stimulant found in tobacco products.',
    longDescription: 'Nicotine is the primary addictive component in tobacco products. While the immediate effects are mild compared to other drugs, nicotine is extremely addictive and tobacco use is a leading cause of preventable death worldwide.',
    effects: [
      'Mild stimulation and alertness',
      'Reduced appetite',
      'Increased heart rate',
      'Relaxation in regular users'
    ],
    risks: [
      'Lung cancer and respiratory diseases',
      'Heart disease and stroke',
      'Extreme addiction potential',
      'Premature aging and skin damage'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '11',
    name: 'Prescription Opioids',
    type: 'Opioid',
    riskLevel: 'high',
    shortDescription: 'Pain-relieving medications with high addiction potential.',
    longDescription: 'Prescription opioids like oxycodone, hydrocodone, and morphine are powerful pain relievers that carry high addiction risks. They are valuable for medical use but have contributed significantly to the opioid crisis.',
    effects: [
      'Pain relief',
      'Euphoria and relaxation',
      'Drowsiness and sedation',
      'Respiratory depression'
    ],
    risks: [
      'Severe addiction and dependence',
      'Respiratory failure in overdose',
      'Withdrawal symptoms',
      'Gateway to heroin use'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '12',
    name: 'Benzodiazepines',
    type: 'Depressant',
    riskLevel: 'medium',
    shortDescription: 'Prescription tranquilizers for anxiety and sleep.',
    longDescription: 'Benzodiazepines are prescription medications used to treat anxiety, insomnia, and seizures. They are effective when used as prescribed but carry risks of dependence and dangerous withdrawal symptoms.',
    effects: [
      'Reduced anxiety and tension',
      'Sedation and drowsiness',
      'Muscle relaxation',
      'Memory impairment'
    ],
    risks: [
      'Physical dependence and addiction',
      'Dangerous withdrawal seizures',
      'Memory problems with long-term use',
      'Overdose risk when mixed with alcohol'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '13',
    name: 'Adderall (Amphetamines)',
    type: 'Stimulant',
    riskLevel: 'medium',
    shortDescription: 'Prescription stimulant for ADHD often misused.',
    longDescription: 'Adderall and other prescription stimulants are used to treat ADHD but are often misused for cognitive enhancement or recreational purposes. Misuse can lead to serious cardiovascular and psychological problems.',
    effects: [
      'Increased focus and concentration',
      'Elevated mood and energy',
      'Decreased appetite',
      'Insomnia'
    ],
    risks: [
      'Heart problems and high blood pressure',
      'Anxiety and paranoia',
      'Addiction and dependence',
      'Psychosis with high doses'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '14',
    name: 'Ketamine',
    type: 'Dissociative Anesthetic',
    riskLevel: 'high',
    shortDescription: 'Medical anesthetic used recreationally for dissociative effects.',
    longDescription: 'Ketamine is a medical anesthetic that produces dissociative effects at lower doses. It has legitimate medical uses but carries risks when used recreationally, including bladder damage and psychological problems.',
    effects: [
      'Dissociation from body and environment',
      'Visual and auditory distortions',
      'Impaired motor function',
      'Pain relief'
    ],
    risks: [
      'Urinary tract and bladder damage',
      'Memory and attention problems',
      'Accidental injury while impaired',
      'Psychological dependence'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '15',
    name: 'GHB',
    type: 'Depressant',
    riskLevel: 'high',
    shortDescription: 'Central nervous system depressant often used as a date rape drug.',
    longDescription: 'GHB is a central nervous system depressant that has been used medically but is more commonly associated with recreational use and drug-facilitated sexual assault. It is extremely dangerous when mixed with alcohol.',
    effects: [
      'Euphoria and relaxation',
      'Increased sociability',
      'Drowsiness and sedation',
      'Memory loss'
    ],
    risks: [
      'Respiratory depression and coma',
      'Extremely dangerous when mixed with alcohol',
      'Used in drug-facilitated assaults',
      'Addiction and withdrawal'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '16',
    name: 'Inhalants',
    type: 'Various',
    riskLevel: 'high',
    shortDescription: 'Household chemicals inhaled for intoxicating effects.',
    longDescription: 'Inhalants include various household and industrial chemicals that produce psychoactive effects when inhaled. They are particularly dangerous because they can cause sudden death and permanent organ damage.',
    effects: [
      'Brief euphoria and dizziness',
      'Slurred speech and confusion',
      'Hallucinations',
      'Loss of coordination'
    ],
    risks: [
      'Sudden sniffing death syndrome',
      'Permanent brain damage',
      'Liver and kidney damage',
      'Heart failure'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '17',
    name: 'Synthetic Cannabinoids',
    type: 'Synthetic',
    riskLevel: 'high',
    shortDescription: 'Laboratory-made chemicals similar to THC.',
    longDescription: 'Synthetic cannabinoids are human-made mind-altering chemicals that are sprayed on dried plant material. They are often marketed as safe alternatives to marijuana but are actually much more dangerous and unpredictable.',
    effects: [
      'Relaxation and altered perception',
      'Elevated mood',
      'Altered perception of reality',
      'Psychotic symptoms'
    ],
    risks: [
      'Severe anxiety and paranoia',
      'Psychosis and hallucinations',
      'Rapid heart rate and heart attacks',
      'Kidney damage and seizures'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '18',
    name: 'Bath Salts',
    type: 'Stimulant',
    riskLevel: 'high',
    shortDescription: 'Synthetic cathinones with intense stimulant effects.',
    longDescription: '"Bath salts" are synthetic cathinones that produce intense stimulant effects similar to amphetamines and cocaine. They are extremely dangerous and have been associated with violent behavior and severe medical complications.',
    effects: [
      'Intense euphoria and energy',
      'Increased sociability and sex drive',
      'Paranoia and agitation',
      'Hallucinations'
    ],
    risks: [
      'Extreme paranoia and violence',
      'Heart attacks and strokes',
      'Severe dehydration',
      'Suicidal thoughts and behavior'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '19',
    name: 'PCP (Angel Dust)',
    type: 'Dissociative',
    riskLevel: 'high',
    shortDescription: 'Powerful dissociative drug causing out-of-body experiences.',
    longDescription: 'PCP is a dissociative drug originally developed as an anesthetic but discontinued due to serious side effects. It can cause users to feel detached from reality and exhibit superhuman strength and violent behavior.',
    effects: [
      'Feelings of detachment from reality',
      'Hallucinations and delusions',
      'Numbness and lack of pain',
      'Violent or erratic behavior'
    ],
    risks: [
      'Psychosis and long-term mental illness',
      'Self-injury or suicide',
      'Violent behavior toward others',
      'Seizures and coma'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '20',
    name: 'DMT',
    type: 'Hallucinogen',
    riskLevel: 'medium',
    shortDescription: 'Powerful, short-acting psychedelic compound.',
    longDescription: 'DMT is a powerful psychedelic compound that occurs naturally in many plants and animals. It produces intense but short-lived visual and auditory hallucinations, often described as spiritual or otherworldly experiences.',
    effects: [
      'Intense visual and auditory hallucinations',
      'Altered sense of time and reality',
      'Spiritual or mystical experiences',
      'Rapid onset and short duration'
    ],
    risks: [
      'Psychological distress during experience',
      'Accidental injury while impaired',
      'Worsening of mental health conditions',
      'Legal consequences'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '21',
    name: 'Codeine',
    type: 'Opioid',
    riskLevel: 'medium',
    shortDescription: 'Opioid pain reliever often misused in cough syrup.',
    longDescription: 'Codeine is an opioid pain medication often used in prescription cough syrups. It has legitimate medical uses but is frequently misused, particularly in the form of "lean" or "purple drank" when mixed with soda.',
    effects: [
      'Mild to moderate pain relief',
      'Euphoria and relaxation',
      'Drowsiness and sedation',
      'Cough suppression'
    ],
    risks: [
      'Respiratory depression',
      'Addiction and dependence',
      'Liver damage from acetaminophen in formulations',
      'Dangerous interactions with other depressants'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '22',
    name: 'Tramadol',
    type: 'Opioid',
    riskLevel: 'medium',
    shortDescription: 'Synthetic opioid pain reliever with serotonin effects.',
    longDescription: 'Tramadol is a synthetic opioid pain reliever that also affects serotonin levels. It is considered to have lower abuse potential than other opioids but still carries risks of addiction and dangerous side effects.',
    effects: [
      'Pain relief',
      'Mild euphoria',
      'Serotonin-related mood effects',
      'Drowsiness'
    ],
    risks: [
      'Seizures, especially in high doses',
      'Serotonin syndrome when mixed with other drugs',
      'Addiction and withdrawal',
      'Dangerous interactions with antidepressants'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '23',
    name: 'Kratom',
    type: 'Opioid-like',
    riskLevel: 'medium',
    shortDescription: 'Natural plant with opioid-like and stimulant effects.',
    longDescription: 'Kratom is a tropical tree native to Southeast Asia whose leaves contain compounds that can have psychotropic effects. It is used traditionally for pain relief and energy but carries addiction risks and uncertain safety profile.',
    effects: [
      'Pain relief at higher doses',
      'Stimulant effects at lower doses',
      'Mild euphoria',
      'Anxiety relief'
    ],
    risks: [
      'Addiction and withdrawal symptoms',
      'Liver toxicity',
      'Unregulated product quality',
      'Dangerous when mixed with other drugs'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '24',
    name: 'Salvia',
    type: 'Hallucinogen',
    riskLevel: 'medium',
    shortDescription: 'Natural plant producing intense, short-lived hallucinations.',
    longDescription: 'Salvia divinorum is a plant native to Mexico that produces intense but short-lived hallucinogenic effects when consumed. It is legal in some areas but can cause frightening experiences and dangerous behavior.',
    effects: [
      'Intense, short-lived hallucinations',
      'Altered perception of reality',
      'Uncontrollable laughter',
      'Out-of-body experiences'
    ],
    risks: [
      'Accidental injury during impaired state',
      'Psychological distress',
      'Unpredictable effects',
      'Legal issues in some jurisdictions'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '25',
    name: 'Ayahuasca',
    type: 'Hallucinogen',
    riskLevel: 'medium',
    shortDescription: 'Traditional Amazonian brew with DMT-containing plants.',
    longDescription: 'Ayahuasca is a traditional Amazonian psychoactive brew used for spiritual and healing purposes. It contains DMT and MAO inhibitors, producing intense visionary experiences that can last several hours.',
    effects: [
      'Intense visual and spiritual experiences',
      'Emotional release and introspection',
      'Nausea and vomiting (part of traditional use)',
      'Altered sense of time and self'
    ],
    risks: [
      'Dangerous drug interactions (especially with antidepressants)',
      'Psychological trauma from intense experiences',
      'Physical risks from unregulated preparations',
      'Exploitation in commercial ceremonies'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '26',
    name: 'Mescaline',
    type: 'Hallucinogen',
    riskLevel: 'medium',
    shortDescription: 'Natural psychedelic from peyote and other cacti.',
    longDescription: 'Mescaline is a naturally occurring psychedelic alkaloid found in several cactus species, most notably peyote. It has been used traditionally in Native American religious ceremonies and produces effects similar to LSD.',
    effects: [
      'Visual hallucinations and enhanced colors',
      'Altered thinking and perception',
      'Spiritual experiences',
      'Nausea during onset'
    ],
    risks: [
      'Psychological distress during experience',
      'Dangerous behavior while impaired',
      'Legal issues with possession',
      'Conservation concerns with wild peyote'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '27',
    name: 'DXM (Dextromethorphan)',
    type: 'Dissociative',
    riskLevel: 'medium',
    shortDescription: 'Cough suppressant with dissociative effects in high doses.',
    longDescription: 'DXM is a common ingredient in over-the-counter cough medicines that produces dissociative effects similar to ketamine or PCP when taken in high doses. It is easily accessible but carries significant risks.',
    effects: [
      'Euphoria and dissociation',
      'Altered perception of reality',
      'Visual and auditory enhancements',
      'Impaired motor function'
    ],
    risks: [
      'Dangerous interactions with other medications',
      'Serotonin syndrome',
      'Liver damage from other ingredients in formulations',
      'Unpredictable effects at different doses'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '28',
    name: 'Nitrous Oxide',
    type: 'Depressant',
    riskLevel: 'medium',
    shortDescription: 'Inhaled gas producing brief euphoria and dissociation.',
    longDescription: 'Nitrous oxide, commonly known as "laughing gas," is a medical anesthetic that produces brief euphoric and dissociative effects when inhaled recreationally. While effects are short-lived, it carries risks of oxygen deprivation and nerve damage.',
    effects: [
      'Brief euphoria and laughter',
      'Dizziness and lightheadedness',
      'Sound distortion',
      'Mild visual hallucinations'
    ],
    risks: [
      'Oxygen deprivation leading to brain damage',
      'Vitamin B12 deficiency with chronic use',
      'Frostbite from compressed gas',
      'Unconsciousness and accidental injury'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '29',
    name: 'Steroids',
    type: 'Performance Enhancing',
    riskLevel: 'medium',
    shortDescription: 'Synthetic substances similar to male sex hormones.',
    longDescription: 'Anabolic steroids are synthetic substances similar to the male sex hormone testosterone. They are used medically for certain conditions but are often misused to enhance muscle growth and athletic performance, carrying serious health risks.',
    effects: [
      'Increased muscle mass and strength',
      'Improved athletic performance',
      'Increased aggression ("roid rage")',
      'Acne and male-pattern baldness'
    ],
    risks: [
      'Heart attacks and strokes',
      'Liver damage and cancer',
      'Infertility and sexual dysfunction',
      'Severe mood disorders'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '30',
    name: 'Caffeine',
    type: 'Stimulant',
    riskLevel: 'low',
    shortDescription: 'Mild stimulant found in coffee, tea, and energy drinks.',
    longDescription: 'Caffeine is the world\'s most widely consumed psychoactive substance. While generally safe in moderation, excessive consumption can cause health problems, and some people develop dependence with withdrawal symptoms.',
    effects: [
      'Increased alertness and energy',
      'Improved concentration',
      'Temporary relief from fatigue',
      'Increased heart rate and blood pressure'
    ],
    risks: [
      'Anxiety and insomnia with high doses',
      'Physical dependence and withdrawal',
      'Heart palpitations in sensitive individuals',
      'Digestive issues'
    ],
    image: require('../../../assets/images/marijuana.png'),
  }
];