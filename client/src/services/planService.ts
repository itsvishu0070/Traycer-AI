import axios from 'axios';
// CHANGE: The import path for types has changed
import type { Node, Edge } from 'reactflow';


// Read the variable from the environment file
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface PlanData {
  name: string;
  nodes: Node[];
  edges: Edge[];
  suggestedTechStack: string[];
  folderStructure: string;
}

// Function to fetch a pre-made plan by its name
export const getPlanByName = async (planName: string): Promise<PlanData> => {
  try {
    const response = await axios.get(`${API_URL}/plans/${planName}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch plan "${planName}":`, error);
    // Return a default state on error that MATCHES the PlanData type
    return { 
      name: 'Error', 
      nodes: [], 
      edges: [],
      suggestedTechStack: [], // Add this
      folderStructure: 'Could not load folder structure.', // Add this
    };
  }
};


