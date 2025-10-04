import mongoose, { Schema, Document } from 'mongoose';

// Define the structure for the 'data' object inside a node
const NodeDataSchema: Schema = new Schema({
  label: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Error'], default: 'Pending' },
  icon: { type: String, required: true },
  description: String,
  code: String,
});

// Define the structure for a Node
const NodeSchema: Schema = new Schema({
  id: { type: String, required: true },
  type: { type: String, default: 'custom' },
  data: NodeDataSchema,
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
});

// Define the structure for an Edge
const EdgeSchema: Schema = new Schema({
  id: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
  animated: { type: Boolean, default: true },
});

// Define the main Plan schema
const PlanSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  nodes: [NodeSchema],
  edges: [EdgeSchema],
  // You can add the other fields we discussed here later
  // suggestedTechStack: [String],
  // folderStructure: Schema.Types.Mixed,
});

export interface IPlan extends Document {
  name: string;
  nodes: any[]; // Using any for simplicity with React Flow types
  edges: any[];
}

export default mongoose.model<IPlan>('Plan', PlanSchema);