import axios from 'axios';

import type { Node, Edge } from 'reactflow';



const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface PlanData {
  name: string;
  nodes: Node[];
  edges: Edge[];
  suggestedTechStack: string[];
  folderStructure: string;
}


export const getPlanByName = async (planName: string): Promise<PlanData> => {
  try {
    const response = await axios.get(`${API_URL}/plans/${planName}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch plan "${planName}":`, error);
    
    return { 
      name: 'Error', 
      nodes: [], 
      edges: [],
      suggestedTechStack: [], 
      folderStructure: 'Could not load folder structure.', 
    };
  }
};


