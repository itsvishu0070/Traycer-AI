import { Request, Response } from 'express';
import { loginPlan } from '../data/plans'; // We'll use our mock data for now

// @desc    Fetch a plan by its name
// @route   GET /api/plans/:planName
// @access  Public
const getPlanByName = (req: Request, res: Response) => {
  const { planName } = req.params;

  // For now, we only have one plan. In the future, we'd query the database.
  if (planName === 'login-plan') {
    res.status(200).json(loginPlan);
  } else {
    res.status(404).json({ message: 'Plan not found' });
  }
};

export { getPlanByName };




// import { Request, Response } from 'express';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// // Initialize the AI model
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// const generateAiPlan = async (req: Request, res: Response) => {
//   const { prompt } = req.body;
//   if (!prompt) {
//     return res.status(400).json({ message: 'Prompt is required' });
//   }

//   const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

//   // This is the "meta-prompt" that instructs the AI
//   const instructionPrompt = `
//     You are an expert software architect. A user has a goal for a new application.
//     Your task is to take their goal and create a JSON object representing a detailed project plan.
//     The user's goal is: "${prompt}"

//     You MUST respond with ONLY the valid JSON object and no other text, explanation, or markdown formatting.
//     The JSON object must have these exact keys: "suggestedTechStack", "folderStructure", "nodes", and "edges".

//     - "suggestedTechStack" must be an array of strings.
//     - "folderStructure" must be a formatted string representing a directory tree.
//     - "nodes" must be an array of objects, each with "id", "position" {x, y}, and a "data" object containing "label", "status", "icon", "description", and "code".
//     - "edges" must be an array of objects, each with "id", "source", and "target".

//     Generate between 4 and 8 logical steps (nodes) for the plan.
//   `;

//   try {
//     const result = await model.generateContent(instructionPrompt);
//     const response = await result.response;
//     const text = response.text();

//     // The AI's response is a string. We need to parse it into a real JSON object.
//     const planJson = JSON.parse(text);
    
//     res.status(200).json(planJson);

//   } catch (error) {
//     console.error("Error calling Gemini API or parsing JSON:", error);
//     res.status(500).json({ message: "Failed to generate AI plan. The AI may have returned an invalid format." });
//   }
// };

// export { generateAiPlan };