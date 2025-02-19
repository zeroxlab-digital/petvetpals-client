"use server"

export async function checkSymptoms(symptoms) {
  // Simulate AI processing
  await new Promise((resolve) => setTimeout(resolve, 3000))

  // Mock result
  return {
    syndrome: "Canine Cognitive Dysfunction",
    probability: 0.85,
    recommendations: [
      "Schedule a vet appointment",
      "Adjust diet to include brain-healthy foods",
      "Increase mental stimulation activities",
    ],
  }
}

export async function getChatResponse(message) {
  // Simulate AI processing
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock AI response
  return "Based on the symptoms you've described, it could be a sign of arthritis. However, I recommend consulting with a veterinarian for a proper diagnosis."
}

