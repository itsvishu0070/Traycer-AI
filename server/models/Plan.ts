import mongoose, { Schema, Document } from 'mongoose';


const NodeDataSchema: Schema = new Schema({
  label: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Error'], default: 'Pending' },
  icon: { type: String, required: true },
  description: String,
  code: String,
});


const NodeSchema: Schema = new Schema({
  id: { type: String, required: true },
  type: { type: String, default: 'custom' },
  data: NodeDataSchema,
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
});


const EdgeSchema: Schema = new Schema({
  id: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
  animated: { type: Boolean, default: true },
});


const PlanSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  nodes: [NodeSchema],
  edges: [EdgeSchema],
  
});

export interface IPlan extends Document {
  name: string;
  nodes: any[]; 
  edges: any[];
}

export default mongoose.model<IPlan>('Plan', PlanSchema);