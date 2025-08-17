// Converted and enriched healthcare journey data for Rohan
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
        8: { major_event: "Rohan's trip to Jakarta", adherence_level: 1 },
        9: { major_event: "Rohan's appendectomy surgery", adherence_level: 0.8 },
        10: { major_event: "Follow-up appointment scheduled for next week", adherence_level: 0.9 },
        11: { major_event: "Rohan's ongoing recovery from health issues", adherence_level: 1 },
        12: { major_event: "Rohan's recovery progress and initiation of light exercise", adherence_level: 1 },
        13: { major_event: "Rohan checked his blood sugar levels and reported a reading of 105 mg/dL", adherence_level: 1 },
        14: { major_event: null, adherence_level: 1 },
        15: { major_event: "Rohan returned from a trip to Tokyo", adherence_level: 0.8 },
        16: { major_event: "Rohan's trip to Jakarta", adherence_level: 0.9 },
        17: { major_event: "Rohan's allergic reaction", adherence_level: 0.8 },
        18: { major_event: "Rohan's trip to Tokyo", adherence_level: 0.7 },
        19: { major_event: "Rohan caught a cold and took sick days to recover", adherence_level: 0.8 },
        20: { major_event: "Rohan's upcoming trip to Jakarta", adherence_level: 0.9 },
        21: { major_event: "Rohan's trip to Jakarta", adherence_level: 0.8 },
        22: { major_event: "Rohan's trip to Jakarta", adherence_level: 1 },
        23: { major_event: "Rohan's trip to Jakarta and maintaining healthy habits", adherence_level: 0.8 },
        24: { major_event: "Discussion of recent test panel results", adherence_level: 0.9 },
        25: { major_event: "Rohan's allergic reaction and subsequent management", adherence_level: 0.9 },
        26: { major_event: "Rohan had surgery and is recovering.", adherence_level: 1 },
        27: { major_event: "Rohan's minor respiratory infection and management of his health.", adherence_level: 1 },
        28: { major_event: "upcoming trip to Tokyo", adherence_level: 0.9 },
        29: { major_event: "upcoming trip to Tokyo", adherence_level: 0.9 },
        30: { major_event: "Rohan's trip to Tokyo", adherence_level: 1 },
        31: { major_event: "Trip to Tokyo", adherence_level: 1 },
        32: { major_event: "upcoming trip to Jakarta", adherence_level: 1 }
    };
    return {
      week,
      adherence_level: summaries[week]?.adherence_level || 0.8 + (Math.random() * 0.2), // Default for weeks without summary
      major_event: summaries[week]?.major_event || null
    };
  }),

  // Blood pressure data over 32 weeks - Simulated based on initial out-of-range value
  bloodPressureData: Array.from({ length: 32 }, (_, i) => {
    const week = i + 1;
    // Simulate improving trend with some variations from 145/90
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
    const summaryAdherence = {
        8: 1, 9: 0.8, 10: 0.9, 11: 1, 12: 1, 13: 1, 14: 1, 15: 0.8, 16: 0.9, 17: 0.8, 18: 0.7, 19: 0.8, 20: 0.9, 21: 0.8, 22: 1, 23: 0.8, 24: 0.9, 25: 0.9, 26: 1, 27: 1, 28: 0.9, 29: 0.9, 30: 1, 31: 1, 32: 1
    };
    return {
      week,
      value: (summaryAdherence[week as keyof typeof summaryAdherence] || 0.85 + (Math.random() * 0.1)) * 100
    };
  }),
    
  // NEW SECTION: Weekly Conversation Summaries
  weeklyConversations: {
    8: { week: 8, rationale: "Rohan reported fatigue after his trip to Jakarta. He also asked about managing his diet and medication while traveling. Based on this, the Elyx team decided to schedule a follow-up to review his bloodwork and suggested trying a new quinoa salad recipe for a healthy travel meal." },
    9: { week: 9, rationale: "Following his appendectomy, Rohan was experiencing mild pain. He asked about the risks of HIIT cardio with his condition. The team decided to focus on recovery, helped him set medication reminders, and recommended starting with only light walking when he felt ready." },
    11: { week: 11, rationale: "Rohan reported ongoing fatigue and new gastrointestinal issues. He asked for dietary recommendations to help. In response, the team decided to postpone his upcoming travel to allow for full recovery and recommended incorporating probiotics to manage the digestive symptoms." },
    15: { week: 15, rationale: "After returning from Tokyo, Rohan reported feeling fatigued. He asked about managing his diet while traveling. The team recommended incorporating daily morning walks to boost energy, setting more reminders for medication, and focusing on high-fiber meals to manage blood sugar." },
    18: { week: 18, rationale: "Rohan reported drowsiness from his antihistamines and high blood sugar readings after his trip to Tokyo. This prompted the team to decide on scheduling a follow-up to discuss his blood sugar, while also advising him to monitor his diet closely and prioritize rest." },
    24: { week: 24, rationale: "Rohan expressed concern about a drop in his daily step count after starting a new medication and asked about managing stress during travel. This led to the decision to monitor his blood pressure and blood sugar closely and to schedule a follow-up to discuss his recent test panel results in detail." },
    26: { week: 26, rationale: "Rohan was recovering from surgery and experiencing fatigue and mild pain. He asked about managing his diet and medication during this period. The Elyx team decided to send low-sugar recipes and prepare a comprehensive travel health plan for his future trips." },
    32: { week: 32, rationale: "Rohan noted that his average daily step count had decreased and asked for exercises to mitigate this. He also inquired about dietary adjustments to support his medication. This led to the decision to focus on managing his blood pressure and packing healthy, low-sugar snacks for his upcoming travel." }
  },

  // Weekly summaries with symptoms and decisions
  weeklySummaries: {
    8: { week: 8, current_symptoms: ["Fatigue from travel"], key_decisions: ["Schedule a follow-up to review blood test results", "Try a quinoa salad recipe"], adherence_level: 1 },
    9: { week: 9, current_symptoms: ["mild pain"], key_decisions: ["Rohan will set medication reminders with Ruby's help", "Rohan will start light walking when he feels up to it"], adherence_level: 0.8 },
    10: { week: 10, current_symptoms: ["Mild discomfort at incision site"], key_decisions: ["Postponing travel to Jakarta", "Focusing on recovery before exercise"], adherence_level: 0.9 },
    11: { week: 11, current_symptoms: ["fatigue", "gastrointestinal issues"], key_decisions: ["Postponing trip to Jakarta until fully recovered", "Incorporating probiotics or yogurt into diet"], adherence_level: 1 },
    12: { week: 12, current_symptoms: ["a little fatigue"], key_decisions: ["Rohan decided to take it slow with exercise", "Rohan is focusing on a balanced diet", "Rohan is considering rescheduling his trip to Jakarta"], adherence_level: 1 },
    13: { week: 13, current_symptoms: ["mild fatigue"], key_decisions: ["Rohan is considering rescheduling his trip to Jakarta", "Rohan will explore healthier food options while traveling"], adherence_level: 1 },
    14: { week: 14, current_symptoms: ["occasional mild fatigue"], key_decisions: ["Rohan is considering rescheduling his trip to Jakarta until he feels fully ready.", "Rohan wants to avoid high-sugar snacks while traveling."], adherence_level: 1 },
    15: { week: 15, current_symptoms: ["Fatigue from travel"], key_decisions: ["Incorporate morning walks", "Set up additional medication reminders in the morning", "Aim for at least 10,000 steps daily", "Focus on high-fiber meals for blood sugar management"], adherence_level: 0.8 },
    16: { week: 16, current_symptoms: ["Headaches have subsided since starting to walk more"], key_decisions: ["Incorporate more high-fiber meals", "Monitor blood pressure closely", "Aim for 10,000 steps goal"], adherence_level: 0.9 },
    17: { week: 17, current_symptoms: ["none reported, feeling much better"], key_decisions: ["Rohan will avoid shellfish", "Rohan will track his diet closely", "Rohan will use his wearable device to track activity", "Rohan will take antihistamines before meals"], adherence_level: 0.8 },
    18: { week: 18, current_symptoms: ["drowsiness from antihistamines", "high blood sugar readings", "fatigue"], key_decisions: ["Schedule a follow-up to discuss blood sugar readings", "Monitor diet and check labels", "Prioritize rest and hydration"], adherence_level: 0.7 },
    19: { week: 19, current_symptoms: ["cold", "drowsiness from antihistamines"], key_decisions: ["Schedule a check-in once Rohan feels better", "Discuss blood sugar levels with the doctor if symptoms persist"], adherence_level: 0.8 },
    20: { week: 20, current_symptoms: ["Drowsiness from antihistamines"], key_decisions: ["Plan meal options and exercise routines for Jakarta trip", "Discuss allergy management with doctor", "Schedule follow-up after trip"], adherence_level: 0.9 },
    21: { week: 21, current_symptoms: ["fatigue from work"], key_decisions: ["Rohan will track blood sugar levels and discuss antihistamine dosage with his doctor."], adherence_level: 0.8 },
    22: { week: 22, current_symptoms: ["mild fatigue from work"], key_decisions: ["Aim for fasting blood sugar levels between 80-130 mg/dL", "Discuss antihistamine side effects with doctor", "Continue tracking blood sugar levels and medication reminders"], adherence_level: 1 },
    23: { week: 23, current_symptoms: ["mild fatigue"], key_decisions: ["Schedule a follow-up to review progress", "Discuss antihistamine dosage with doctor"], adherence_level: 0.8 },
    24: { week: 24, current_symptoms: ["Fatigue from work"], key_decisions: ["Monitor blood pressure and blood sugar levels", "Discuss test results with doctor"], adherence_level: 0.9 },
    25: { week: 25, current_symptoms: ["nervousness about the allergy"], key_decisions: ["Rohan will carry his epinephrine auto-injector", "Rohan will try to find allergy-friendly restaurants in Tokyo", "Rohan will gradually increase his walking routine", "Ruby will send medication reminders during Rohan's travel"], adherence_level: 0.9 },
    26: { week: 26, current_symptoms: ["fatigue", "mild pain at the incision site"], key_decisions: ["Sending low sugar recipes", "Preparing a travel health plan"], adherence_level: 1 },
    27: { week: 27, current_symptoms: ["congestion", "mild cough"], key_decisions: ["Rohan decided to take time off work to recuperate.", "Rohan will monitor his symptoms and consider checking in with his doctor if the cough persists.", "Ruby will send low sugar recipes and snack ideas."], adherence_level: 1 },
    28: { week: 28, current_symptoms: ["None reported, congestion is gone"], key_decisions: ["Prepare a travel health plan", "Check in with doctor before traveling", "Focus on managing stress and diet"], adherence_level: 0.9 },
    29: { week: 29, current_symptoms: ["no symptoms from infection"], key_decisions: ["focus on stress management", "stick to low sugar diet", "pack healthy snacks"], adherence_level: 0.9 },
    30: { week: 30, current_symptoms: ["No symptoms from previous infection"], key_decisions: ["Focus on managing elevated blood pressure", "Incorporate more relaxation techniques"], adherence_level: 1 },
    31: { week: 31, current_symptoms: ["No symptoms"], key_decisions: ["Continue healthy eating and exercise routine", "Monitor blood pressure closely", "Incorporate relaxation techniques"], adherence_level: 1 },
    32: { week: 32, current_symptoms: ["no symptoms"], key_decisions: ["focus on managing elevated blood pressure", "continue with low sugar diet and exercise", "pack low sugar snacks for travel"], adherence_level: 1 }
  },

  // Device status data
  wearableStatus: {
    status: 'active' as const,
    lastUpdate: 'Just now',
    batteryLevel: 85,
    detectedIssues: ["irregular HR readings", "sync gaps"]
  },

  // Member questions data
  memberQuestions: {
    8: { week: 8, questions: ["Given my recent travel and the stress of adjusting to a different time zone, I've noticed an increase in my symptoms. Can we discuss how this could affect my current medication regimen, and are there any specific adjustments or additional strategies you would recommend for managing this situation?", "I've been tracking my activity levels and sleep patterns with my wearable device, and I've observed a correlation between less physical activity and a decline in my overall well-being. What evidence-based exercises or lifestyle changes do you suggest to help mitigate this, especially considering my chronic condition?"], ai_summary: "Inquired about managing travel stress impact on medication and requested exercise recommendations based on wearable data." },
    9: { week: 9, questions: ["I've been tracking my blood sugar levels closely over the past few weeks, and I noticed a spike after my recent travel. Can we discuss how travel stress and changes in diet might impact my glucose levels? I’d also like your advice on adjusting my medication during such times.", "I've been trying to incorporate more physical activity into my routine, but I've read mixed reviews on high-intensity interval training (HIIT) for someone with my chronic condition. Can you clarify the potential risks and benefits of HIIT versus steady-state cardio in my case, especially considering my recent test results?"], ai_summary: "Concerned about travel's effect on blood sugar and sought advice on HIIT vs. steady-state cardio." },
    11: { week: 11, questions: ["I've noticed that my energy levels have been fluctuating since I started the new medication regimen. Could we discuss the potential side effects of these medications and how they might be impacting my daily activities and exercise routine?", "With my recent travel and changes in diet, I've experienced some digestive issues. What evidence-based dietary adjustments would you recommend to help manage these symptoms while still supporting my overall wellness goals?"], ai_summary: "Concerned about medication side effects on energy and asked for dietary advice for digestive issues." },
    15: { week: 15, questions: ["I’ve been reading about the potential benefits of a low-FODMAP diet for managing my symptoms. Based on my recent test results, do you think this approach could be effective for me, and how might it interact with my current medications?", "I noticed that my wearable device recorded an increase in my heart rate during my recent travel, which was quite stressful. Can we discuss how stress management techniques, like mindfulness or specific breathing exercises, could be integrated into my current therapy plan to help mitigate these spikes?"], ai_summary: "Inquired about the low-FODMAP diet and integrating stress management techniques for heart rate spikes." },
    18: { week: 18, questions: ["I've noticed some fluctuations in my blood sugar levels since I started traveling more frequently. Could the changes in my diet and activity levels during these trips be affecting my insulin sensitivity? What strategies can I implement to better manage my levels while on the go?", "I've been reading about the potential benefits of incorporating high-intensity interval training (HIIT) into my exercise routine for managing my chronic condition. Do you think this approach could be appropriate for me, or would it be better to stick with my current low-impact exercises? What evidence supports the efficacy of HIIT for someone with my health profile?"], ai_summary: "Asked for strategies to manage blood sugar during travel and inquired about the suitability of HIIT." },
    24: { week: 24, questions: ["Given my recent increase in stress levels due to travel, I've noticed a spike in my symptoms. Could we discuss whether adjusting my medication dosage or incorporating stress management techniques into my routine might be beneficial?", "I've been tracking my daily activity with my wearable device, and I've noticed that my step count has decreased significantly since I started a new medication. Could we explore whether this change is linked to the medication, and what specific exercises could help maintain my physical activity levels?"], ai_summary: "Asked about medication adjustments for stress and the link between new medication and decreased activity." },
    26: { week: 26, questions: ["I've been tracking my heart rate variability with my wearable device, and I've noticed some fluctuations that coincide with my recent travel stress. Can you help me understand how these fluctuations might affect my chronic condition and if I should adjust my medication or therapy plan accordingly?", "I recently read a study suggesting that incorporating more anti-inflammatory foods into my diet can significantly improve symptoms related to my condition. Can you provide guidance on which specific foods or dietary changes would be most beneficial for me, and how they might interact with the medications I'm currently taking?"], ai_summary: "Asked about the impact of HRV fluctuations on his condition and for guidance on an anti-inflammatory diet." },
    32: { week: 32, questions: ["I've been tracking my daily steps with my wearable device, and I noticed that my average has decreased since my last trip. Given that I have been more sedentary, could you suggest specific exercises or stretches that could help mitigate any negative effects on my condition?", "I've been reading about the potential side effects of my current medication and how they might interact with certain dietary choices. Can we discuss any evidence-based dietary adjustments I could make that would support my ongoing treatment and overall wellness?"], ai_summary: "Asked for exercise suggestions to counter sedentary periods and for dietary advice related to medication." }
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
    
  // Get the new conversation summary
  const conversation = healthJourneyData.weeklyConversations[week as keyof typeof healthJourneyData.weeklyConversations] || {
    week,
    rationale: "No specific conversation summary available for this week."
  };

  return {
    weeklySummary: summary,
    deviceStatus: {
      ...healthJourneyData.wearableStatus,
      last_sync: week === 32 ? 'Just now' : `${(32 - week) * 7} days ago`
    },
    memberQuestions: questions,
    conversationRationale: conversation // Add this to the returned data
  };
};
