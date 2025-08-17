// Final, conversation-driven healthcare journey data for Rohan
export const healthJourneyData = {
  member: {
    name: "Rohan",
    memberId: "MBR-2025-001",
    startDate: "2025-01-01", // Assuming a start date
    totalWeeks: 32
  },

  // Timeline data with major events and adherence levels
  weeklyTimeline: Array.from({ length: 32 }, (_, i) => {
    const week = i + 1;
    const summaries: { [key: number]: any } = {
        5: { major_event: "Returned from Jakarta", adherence_level: 0.9 },
        6: { major_event: "Returned from Tokyo", adherence_level: 0.9 },
        8: { major_event: "Follow-up scheduled", adherence_level: 1 },
        9: { major_event: "Appendectomy Surgery", adherence_level: 0.8 },
        10: { major_event: "Incision Site Infection", adherence_level: 0.8 },
        11: { major_event: "Managing GI Issues", adherence_level: 0.9 },
        12: { major_event: "Resumed Light Exercise", adherence_level: 1 },
        15: { major_event: "Returned from Tokyo", adherence_level: 0.8 },
        16: { major_event: "Returned from Jakarta", adherence_level: 0.9 },
        17: { major_event: "Allergic Reaction", adherence_level: 0.8 },
        18: { major_event: "Returned from Tokyo", adherence_level: 0.7 },
        19: { major_event: "Recovering from Cold", adherence_level: 0.8 },
        20: { major_event: "Preparing for Jakarta Trip", adherence_level: 0.9 },
        21: { major_event: "Returned from Jakarta", adherence_level: 0.8 },
        24: { major_event: "Discussed Test Panel Results", adherence_level: 0.9 },
        25: { major_event: "Managing Food Allergy", adherence_level: 0.9 },
        26: { major_event: "Post-Surgery Recovery", adherence_level: 1 },
        27: { major_event: "Minor Respiratory Infection", adherence_level: 1 },
        28: { major_event: "Returned from Tokyo", adherence_level: 0.9 },
        32: { major_event: "Preparing for Jakarta Trip", adherence_level: 1 }
    };
    return {
      week,
      adherence_level: summaries[week]?.adherence_level || 0.85 + (Math.random() * 0.1),
      major_event: summaries[week]?.major_event || null
    };
  }),

  // Blood pressure data over 32 weeks - Simulated based on initial out-of-range value
  bloodPressureData: Array.from({ length: 32 }, (_, i) => {
    const week = i + 1;
    const baseSystolic = 145 - (week * 0.7) + (Math.sin(week * 0.3) * 5);
    const baseDiastolic = 90 - (week * 0.5) + (Math.sin(week * 0.4) * 3);
    return {
      week,
      systolic: Math.round(baseSystolic + (Math.random() * 6 - 3)),
      diastolic: Math.round(baseDiastolic + (Math.random() * 4 - 2)),
      value: Math.round(baseSystolic + (Math.random() * 6 - 3))
    };
  }),

  // Adherence data over 32 weeks
  adherenceData: Array.from({ length: 32 }, (_, i) => {
    const week = i + 1;
    const timelineEntry = healthJourneyData.weeklyTimeline.find(t => t.week === week);
    return {
      week,
      value: (timelineEntry?.adherence_level || 0.85) * 100
    };
  }),
    
  // Weekly summaries with symptoms and decisions from conversations
  weeklySummaries: {
    5: { week: 5, current_symptoms: ["A bit of fatigue"], key_decisions: ["Schedule a follow-up to review progress"], adherence_level: 0.9 },
    6: { week: 6, current_symptoms: ["A little tired"], key_decisions: ["Keep monitoring blood pressure", "Schedule a follow-up"], adherence_level: 0.9 },
    7: { week: 7, current_symptoms: ["Slight headache"], key_decisions: ["Monitor blood pressure closely", "Prepare a detailed report of blood test results"], adherence_level: 0.9 },
    8: { week: 8, current_symptoms: ["A bit of fatigue"], key_decisions: ["Keep monitoring blood pressure", "Try a quinoa salad recipe"], adherence_level: 1 },
    9: { week: 9, current_symptoms: ["Discomfort from appendectomy"], key_decisions: ["Set up medication reminders", "Start with light walking when ready"], adherence_level: 0.8 },
    10: { week: 10, current_symptoms: ["Mild infection at incision site"], key_decisions: ["Postpone trip to Jakarta", "Focus on recovery before exercise"], adherence_level: 0.8 },
    11: { week: 11, current_symptoms: ["Fatigue", "Gastrointestinal issues"], key_decisions: ["Postpone trip to Jakarta", "Incorporate probiotics or yogurt into diet"], adherence_level: 0.9 },
    12: { week: 12, current_symptoms: ["A little fatigue"], key_decisions: ["Take it slow with exercise", "Focus on a balanced diet"], adherence_level: 1 },
    13: { week: 13, current_symptoms: ["Mild fatigue occasionally"], key_decisions: ["Explore healthier food options while traveling"], adherence_level: 1 },
    14: { week: 14, current_symptoms: ["Occasional mild fatigue"], key_decisions: ["Avoid high-sugar snacks", "Start light jogging"], adherence_level: 1 },
    15: { week: 15, current_symptoms: ["Fatigue from travel"], key_decisions: ["Incorporate morning walks", "Set up additional medication reminders", "Aim for 10,000 steps daily"], adherence_level: 0.8 },
    16: { week: 16, current_symptoms: ["Minor headache after trip"], key_decisions: ["Monitor blood pressure closely", "Aim for 10,000 steps goal"], adherence_level: 0.9 },
    17: { week: 17, current_symptoms: ["None reported"], key_decisions: ["Avoid shellfish", "Track diet closely", "Take antihistamines before meals"], adherence_level: 0.8 },
    18: { week: 18, current_symptoms: ["Drowsiness from antihistamines", "High blood sugar readings"], key_decisions: ["Schedule a follow-up to discuss blood sugar", "Prioritize rest and hydration"], adherence_level: 0.7 },
    19: { week: 19, current_symptoms: ["Cold", "Drowsiness from antihistamines"], key_decisions: ["Schedule a check-in once Rohan feels better", "Discuss blood sugar with doctor if symptoms persist"], adherence_level: 0.8 },
    20: { week: 20, current_symptoms: ["Drowsiness from antihistamines"], key_decisions: ["Plan meal options for Jakarta trip", "Discuss allergy management with doctor"], adherence_level: 0.9 },
    21: { week: 21, current_symptoms: ["Fatigue from work"], key_decisions: ["Track blood sugar levels", "Discuss antihistamine dosage with doctor"], adherence_level: 0.8 },
    22: { week: 22, current_symptoms: ["Mild fatigue from work"], key_decisions: ["Aim for fasting blood sugar levels between 80-130 mg/dL", "Discuss antihistamine side effects with doctor"], adherence_level: 1 },
    23: { week: 23, current_symptoms: ["Mild fatigue"], key_decisions: ["Schedule a follow-up to review progress", "Discuss antihistamine dosage with doctor"], adherence_level: 0.8 },
    24: { week: 24, current_symptoms: ["Fatigue from work"], key_decisions: ["Monitor blood pressure and blood sugar levels", "Discuss test results with doctor"], adherence_level: 0.9 },
    25: { week: 25, current_symptoms: ["Nervousness about the allergy"], key_decisions: ["Carry epinephrine auto-injector", "Find allergy-friendly restaurants in Tokyo", "Gradually increase walking routine"], adherence_level: 0.9 },
    26: { week: 26, current_symptoms: ["Fatigue", "Mild pain at incision site"], key_decisions: ["Send low sugar recipes", "Prepare a travel health plan"], adherence_level: 1 },
    27: { week: 27, current_symptoms: ["Congestion", "Mild cough"], key_decisions: ["Take time off work to recuperate", "Monitor symptoms", "Send low sugar snack ideas"], adherence_level: 1 },
    28: { week: 28, current_symptoms: ["None reported"], key_decisions: ["Prepare a travel health plan", "Check in with doctor before traveling", "Focus on managing stress and diet"], adherence_level: 0.9 },
    29: { week: 29, current_symptoms: ["No symptoms from infection"], key_decisions: ["Focus on stress management", "Stick to low sugar diet", "Pack healthy snacks"], adherence_level: 0.9 },
    30: { week: 30, current_symptoms: ["No symptoms"], key_decisions: ["Focus on managing elevated blood pressure", "Incorporate more relaxation techniques"], adherence_level: 1 },
    31: { week: 31, current_symptoms: ["No symptoms"], key_decisions: ["Continue healthy eating and exercise", "Monitor blood pressure closely", "Incorporate relaxation techniques"], adherence_level: 1 },
    32: { week: 32, current_symptoms: ["No symptoms"], key_decisions: ["Focus on managing elevated blood pressure", "Continue with low sugar diet", "Pack low sugar snacks for travel"], adherence_level: 1 }
  },

  // Device status data
  wearableStatus: {
    status: 'active' as const,
    lastUpdate: 'Just now',
    batteryLevel: 85,
    detectedIssues: ["irregular HR readings", "sync gaps"]
  },

  // Member questions data from conversations
  memberQuestions: {
    5: { week: 5, questions: ["Can you check if I missed any medication doses?", "Any tips on cutting back on carbs?", "Have you experienced any symptoms lately?"], ai_summary: "Rohan asked about medication adherence, dietary tips for reducing carbs, and reported feeling well post-travel." },
    6: { week: 6, questions: ["Should I be worried about my blood pressure readings?", "When can we schedule that follow-up to review everything?"], ai_summary: "Rohan expressed concern about his blood pressure and was keen to schedule a follow-up to review his health updates." },
    7: { week: 7, questions: ["Can you remind me about my medication?", "Should I be worried about my blood pressure?", "I wanted to ask about my blood test results."], ai_summary: "Rohan asked for medication reminders, expressed concern about his blood pressure, and was eager to review his blood test results." },
    8: { week: 8, questions: ["Should I be worried about my blood pressure readings?", "Any new recipes you want to try?"], ai_summary: "Rohan was concerned about his blood pressure and open to trying new healthy recipes to support his diet." },
    9: { week: 9, questions: ["How do I manage my medication reminders while I'm recovering?", "When can I start light walking again?", "What’s a good blood sugar range to aim for post-surgery?"], ai_summary: "Post-surgery, Rohan asked for help with medication reminders, guidance on resuming exercise, and his target blood sugar range." },
    10: { week: 10, questions: ["When do you have your follow-up appointment?", "What was my blood sugar reading?", "Any plans for travel coming up?"], ai_summary: "Rohan discussed his upcoming follow-up, his recent blood sugar reading, and the need to postpone travel to focus on recovery." },
    11: { week: 11, questions: ["How’s the stress from work treating you?", "Have you thought about scheduling your travel plans yet?", "Do you have any tips for managing the gastrointestinal issues?"], ai_summary: "Rohan discussed his work stress, the decision to postpone travel, and asked for advice on managing digestive issues from antibiotics." },
    12: { week: 12, questions: ["What kind of exercises are you doing?", "Any plans for travel soon?", "What’s a good blood sugar range I should aim for now?"], ai_summary: "Rohan discussed his return to light exercise, his thoughts on rescheduling travel, and his target blood sugar range." },
    13: { week: 13, questions: ["Any thoughts on travel plans?", "What should I do if I start experiencing any unusual symptoms?"], ai_summary: "Rohan discussed rescheduling his travel and asked for guidance on how to handle any unusual symptoms." },
    14: { week: 14, questions: ["How's your exercise routine going?", "Any symptoms you've experienced recently?", "Can we discuss the test panel results soon?"], ai_summary: "Rohan reported starting light jogging, feeling well, and expressed a desire to review his test panel results." },
    15: { week: 15, questions: ["Any tips on incorporating more walking?", "How to manage medication reminders when busy?", "Any suggestions for meals that can help with my blood sugar?"], ai_summary: "Rohan asked for tips on increasing his walking, managing medication reminders, and for meal suggestions to help his blood sugar." },
    16: { week: 16, questions: ["Do you think my headache is related to my blood pressure?", "How are my blood sugar levels looking after the recent travel?"], ai_summary: "Rohan inquired if his headache could be linked to his blood pressure and asked about his post-travel blood sugar levels." },
    17: { week: 17, questions: ["Any tips on maintaining my routine while I'm in Tokyo?", "How to interpret my blood sugar numbers?"], ai_summary: "Rohan asked for advice on maintaining his health routine while traveling and for help interpreting his blood sugar readings." },
    18: { week: 18, questions: ["How have my blood sugar readings been?", "What should I be aiming for with average blood sugar levels?", "How to manage fatigue?"], ai_summary: "Rohan was concerned about his blood sugar levels, his targets, and asked for strategies to manage his fatigue." },
    19: { week: 19, questions: ["Should my average blood sugar levels be changing?", "What should my target blood sugar levels be?"], ai_summary: "While recovering from a cold, Rohan asked about expected changes in his blood sugar levels and his specific targets." },
    20: { week: 20, questions: ["What should my target blood sugar levels be again?", "What to do about my antihistamine dosage making me drowsy?", "Need any recipe ideas?"], ai_summary: "Rohan asked to confirm his blood sugar targets, mentioned drowsiness from antihistamines, and was open to new low-sugar recipes." },
    21: { week: 21, questions: ["What should I be targeting for blood sugar?", "How are you managing your antihistamine?", "Need any quick and easy low-sugar recipes?"], ai_summary: "Rohan asked about his blood sugar targets, discussed managing his antihistamine, and requested easy low-sugar recipes." },
    22: { week: 22, questions: ["What should I be targeting for blood sugar?", "How’s the antihistamine working for you?", "Should my blood sugar be changing as I improve my diet?"], ai_summary: "Rohan inquired about his blood sugar targets, the effects of his antihistamine, and how his diet improvements should affect his levels." },
    23: { week: 23, questions: ["What should I be targeting for blood sugar?", "How’s the antihistamine working for you?", "Should my blood sugar be changing as I improve my diet?"], ai_summary: "Rohan asked about his blood sugar targets, the effects of his antihistamine, and how his diet improvements should affect his levels." },
    24: { week: 24, questions: ["What should I be targeting for blood sugar?", "Can we go over my recent test panel results?", "Should I be concerned about my blood pressure?"], ai_summary: "Rohan asked about his blood sugar targets and was keen to discuss his recent test results, particularly his high blood pressure." },
    25: { week: 25, questions: ["Any tips on managing blood sugar?", "Should I increase my light walking routine?", "Can you send reminders while I'm traveling?"], ai_summary: "Rohan asked for tips on managing his blood sugar, increasing his exercise, and requested medication reminders for his upcoming trip." },
    26: { week: 26, questions: ["Any suggestions for low-sugar snacks?", "Any travel plans coming up?", "Should I be concerned about the fatigue?"], ai_summary: "While recovering from surgery, Rohan asked for snack ideas, discussed future travel, and expressed concern about his fatigue." },
    27: { week: 27, questions: ["Any suggestions for snacks?", "Should I still go to Tokyo with this infection?", "Can you remind me about the low sugar recipes?"], ai_summary: "While sick, Rohan asked for snack ideas, advice on his upcoming travel, and a reminder for low-sugar recipes." },
    28: { week: 28, questions: ["Any tips for staying active during my trip?", "Do you think I should check in with my doctor before traveling?", "I’d like to discuss my last test panel results."], ai_summary: "Rohan asked for tips on staying active while traveling, whether to see his doctor pre-trip, and wanted to review his latest test results." },
    29: { week: 29, questions: ["Can you send more recipe ideas?", "Have you thought about packing any snacks?", "Can we go over my last test panel results?"], ai_summary: "Rohan requested more recipes, discussed packing snacks for travel, and wanted to review his test results." },
    30: { week: 30, questions: ["Any favorite new recipes?", "I wanted to check in on my recent test panel results.", "What else should I do for my elevated blood pressure?"], ai_summary: "Rohan shared his cooking success, asked to review his test results, and sought more advice for his high blood pressure." },
    31: { week: 31, questions: ["How’s your exercise routine going?", "My last test showed my blood pressure was still elevated. What should I do?", "Any other concerns?"], ai_summary: "Rohan discussed his exercise routine and asked for further advice on managing his elevated blood pressure and stress." },
    32: { week: 32, questions: ["Can you send more recipe ideas for my trip?", "I wanted to discuss my recent test panel results.", "Have you thought about packing any snacks for your trip?"], ai_summary: "Rohan requested travel-friendly recipes, wanted to discuss his test results, and was planning healthy snacks for his trip." }
  },

  // Chart interventions for deep dive view
  interventions: [
    { week: 9, title: "Appendectomy Surgery", description: "Underwent emergency appendectomy." },
    { week: 10, title: "Recovery Focus", description: "Postponed travel to focus on recovery." },
    { week: 11, title: "Dietary Adjustment", description: "Incorporated probiotics into diet." },
    { week: 15, title: "Activity Increase", description: "Began incorporating morning walks and aiming for 10,000 steps." },
    { week: 17, title: "Allergy Management", description: "Started avoiding shellfish and carrying an epinephrine auto-injector." },
    { week: 24, title: "Health Review", description: "Discussed recent test panel results with the medical team." },
    { week: 30, title: "Stress Management", description: "Began incorporating more relaxation techniques to manage elevated blood pressure." }
  ]
};

// Helper functions to get specific data
export const getCurrentMetrics = () => {
  const latestBP = healthJourneyData.bloodPressureData[31]; // Week 32
  const latestAdherence = healthJourneyData.adherenceData[31];
  
  return {
    bloodPressure: {
      systolic: latestBP.systolic,
      diastolic: latestBP.diastolic,
      data: healthJourneyData.bloodPressureData.slice(-8), // Last 8 weeks for sparkline
      status: latestBP.systolic <= 130 && latestBP.diastolic <= 80 ? 'excellent' as const : 
              latestBP.systolic <= 140 && latestBP.diastolic <= 90 ? 'good' as const : 
              latestBP.systolic <= 160 && latestBP.diastolic <= 100 ? 'warning' as const : 'critical' as const
    },
    adherence: {
      level: latestAdherence.value / 100,
      data: healthJourneyData.adherenceData.slice(-8),
      status: latestAdherence.value >= 90 ? 'excellent' as const :
              latestAdherence.value >= 80 ? 'good' as const :
              latestAdherence.value >= 70 ? 'warning' as const : 'critical' as const
    },
    wearableStatus: healthJourneyData.wearableStatus
  };
};

export const getWeeklyData = (week: number) => {
  const summary = healthJourneyData.weeklySummaries[week as keyof typeof healthJourneyData.weeklySummaries] || {
    week,
    current_symptoms: [],
    key_decisions: ["No specific decisions recorded for this week"],
    adherence_level: healthJourneyData.weeklyTimeline[week - 1]?.adherence_level || 0.8
  };

  const questions = healthJourneyData.memberQuestions[week as keyof typeof healthJourneyData.memberQuestions] || {
    week,
    questions: [],
    ai_summary: "No questions recorded for this week."
  };

  return {
    weeklySummary: summary,
    deviceStatus: {
      ...healthJourneyData.wearableStatus,
      last_sync: week === 32 ? 'Just now' : `${(32 - week) * 7} days ago`
    },
    memberQuestions: questions
  };
};
