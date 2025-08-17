// Sample healthcare journey data for Rohan
export const healthJourneyData = {
  member: {
    name: "Rohan",
    memberId: "MBR-2024-001",
    startDate: "2024-01-01",
    totalWeeks: 32
  },

  // Timeline data with major events and adherence levels
  weeklyTimeline: Array.from({ length: 32 }, (_, i) => {
    const week = i + 1;
    const adherence = 0.6 + (Math.sin(week * 0.2) * 0.2) + (Math.random() * 0.3);
    
    const events = {
      3: "Initial surgery for appendicitis",
      8: "Started new medication regimen", 
      12: "Travel to family gathering",
      16: "Nutritionist consultation and diet plan",
      20: "Emergency room visit for chest pain",
      24: "Physical therapy program initiation",
      28: "Routine cardiology follow-up",
      31: "Medication dosage adjustment"
    };

    return {
      week,
      adherence_level: Math.min(1, Math.max(0.4, adherence)),
      major_event: events[week as keyof typeof events]
    };
  }),

  // Blood pressure data over 32 weeks
  bloodPressureData: Array.from({ length: 32 }, (_, i) => {
    const week = i + 1;
    // Simulate improving trend with some variations
    const baseSystolic = 150 - (week * 1.2) + (Math.sin(week * 0.3) * 8);
    const baseDiastolic = 95 - (week * 0.8) + (Math.sin(week * 0.4) * 5);
    
    return {
      week,
      systolic: Math.max(110, Math.min(170, Math.round(baseSystolic + (Math.random() * 10 - 5)))),
      diastolic: Math.max(70, Math.min(110, Math.round(baseDiastolic + (Math.random() * 8 - 4)))),
      value: Math.round(baseSystolic + (Math.random() * 10 - 5)) // for sparkline
    };
  }),

  // Adherence data over 32 weeks
  adherenceData: Array.from({ length: 32 }, (_, i) => {
    const week = i + 1;
    const adherenceLevel = healthJourneyData?.weeklyTimeline?.[i]?.adherence_level || 0.8;
    return {
      week,
      value: Math.round(adherenceLevel * 100)
    };
  }),

  // Weekly summaries with symptoms and decisions
  weeklySummaries: {
    1: {
      week: 1,
      current_symptoms: ["Mild abdominal pain", "Fatigue", "Loss of appetite"],
      key_decisions: [
        "Prescribed pain medication for post-surgical recovery",
        "Recommended light activity and rest",
        "Scheduled follow-up in 1 week"
      ],
      adherence_level: 0.85
    },
    8: {
      week: 8,
      current_symptoms: ["Occasional dizziness", "Mild nausea"],
      key_decisions: [
        "Started ACE inhibitor for blood pressure management",
        "Recommended blood pressure monitoring twice daily",
        "Adjusted diet to reduce sodium intake"
      ],
      major_event: "Started new medication regimen",
      adherence_level: 0.78
    },
    16: {
      week: 16,
      current_symptoms: ["Improved energy levels", "Occasional headaches"],
      key_decisions: [
        "Incorporated Mediterranean diet plan",
        "Added daily 30-minute walks",
        "Introduced probiotics for digestive health"
      ],
      major_event: "Nutritionist consultation and diet plan",
      adherence_level: 0.92
    },
    20: {
      week: 20,
      current_symptoms: ["Chest discomfort", "Shortness of breath", "Anxiety"],
      key_decisions: [
        "Emergency evaluation ruled out cardiac event",
        "Adjusted medication timing",
        "Referred to cardiologist for comprehensive evaluation"
      ],
      major_event: "Emergency room visit for chest pain",
      adherence_level: 0.65
    },
    24: {
      week: 24,
      current_symptoms: ["Joint stiffness", "Muscle weakness"],
      key_decisions: [
        "Started physical therapy program",
        "Added calcium and vitamin D supplements",
        "Modified exercise routine for joint health"
      ],
      major_event: "Physical therapy program initiation",
      adherence_level: 0.88
    },
    32: {
      week: 32,
      current_symptoms: [],
      key_decisions: [
        "Maintained current medication regimen",
        "Continued regular exercise program",
        "Scheduled quarterly follow-up appointments"
      ],
      adherence_level: 0.95
    }
  },

  // Device status data
  wearableStatus: {
    status: 'active' as const,
    lastUpdate: '2 hours ago',
    batteryLevel: 78,
    detectedIssues: []
  },

  // Member questions data
  memberQuestions: {
    1: {
      week: 1,
      questions: [
        "How long will the recovery take?",
        "Can I return to my normal diet soon?",
        "When can I resume exercising?"
      ],
      ai_summary: "Patient focused on recovery timeline and lifestyle resumption post-surgery."
    },
    8: {
      week: 8,
      questions: [
        "Why do I feel dizzy with the new medication?",
        "Should I take the medicine with food?",
        "What are the long-term effects?"
      ],
      ai_summary: "Concerns about medication side effects and proper administration."
    },
    16: {
      week: 16,
      questions: [
        "Can I eat more fruits on this diet?",
        "How much protein should I have daily?",
        "Are there any foods I should completely avoid?"
      ],
      ai_summary: "Patient engaged with nutritional guidance and seeking diet optimization."
    },
    20: {
      week: 20,
      questions: [
        "Was this a heart attack?",
        "Should I stop my medications?",
        "Is it safe to exercise now?"
      ],
      ai_summary: "High anxiety following ER visit, seeking reassurance about cardiac health."
    },
    24: {
      week: 24,
      questions: [
        "How often should I do physical therapy?",
        "Can I do these exercises at home?",
        "Will the joint pain improve?"
      ],
      ai_summary: "Patient committed to physical therapy and understanding long-term benefits."
    },
    32: {
      week: 32,
      questions: [
        "How often should I have checkups now?",
        "Can I travel long distances?",
        "Should I continue all my current medications?"
      ],
      ai_summary: "Patient confident in health improvement, planning for sustained wellness."
    }
  },

  // Chart interventions for deep dive view
  interventions: [
    {
      week: 3,
      title: "Post-Surgical Recovery",
      description: "Initiated comprehensive recovery protocol following appendectomy"
    },
    {
      week: 8,
      title: "Hypertension Management", 
      description: "Started ACE inhibitor therapy to control elevated blood pressure"
    },
    {
      week: 12,
      title: "Travel Preparation",
      description: "Adjusted medication schedule for family travel"
    },
    {
      week: 16,
      title: "Nutritional Intervention",
      description: "Implemented Mediterranean diet with nutritionist guidance"
    },
    {
      week: 20,
      title: "Emergency Care",
      description: "Emergency evaluation and medication timing adjustment"
    },
    {
      week: 24,
      title: "Physical Rehabilitation",
      description: "Started structured physical therapy for mobility improvement"
    },
    {
      week: 28,
      title: "Cardiac Assessment",
      description: "Comprehensive cardiology evaluation and treatment optimization"
    },
    {
      week: 31,
      title: "Dosage Optimization",
      description: "Fine-tuned medication dosages based on patient response"
    }
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
      last_sync: week === 32 ? '2 hours ago' : `${32 - week + 1} days ago`
    },
    memberQuestions: questions
  };
};