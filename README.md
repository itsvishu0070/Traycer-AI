Traycer AI
A sophisticated UI prototype that acts as a visual planning layer for AI coding agents. This project was built as a simplified reverse-engineering of the core concepts behind Traycer AI, with a primary focus on a "next-level" UI/UX and a dynamic, interactive user flow.



Plan Generation & Visualization
Upon submitting a prompt, the application generates a plan, displaying a textual list of steps in the chat panel and a full, interactive flowchart in the main canvas.

Inspecting & Refining Details
Clicking on any node in the flowchart opens a detailed sidebar on the right. This sidebar shows descriptions, code snippets, and even includes its own chat input to refine the specific step with AI.

 Features

 Fluid Three-Column Layout: A professional layout separating the chat/plan, the visual canvas, and the contextual details.

 Interactive Flowchart: Visualizes the project plan as an interactive, zoomable flowchart using React Flow.

 "Next-Level" UI/UX: A premium, "glassmorphism" aesthetic with a shifting aurora background, custom-styled nodes, and smooth animations.

 In-Context Refinement: A dedicated chat input in the details sidebar allows users to iteratively modify and improve specific code snippets or steps.

 Scrollable Panels: Both the left and right panels are independently scrollable to handle large amounts of content.

Tech Stack
Frontend
React (with Vite)

TypeScript

React Flow for the flowchart visualization

CSS Modules for component-scoped styling

Axios for API communication

Backend
Node.js

Express.js for the REST API

MongoDB with Mongoose for the database

Google Gemini API for AI plan generation

dotenv for environment variable management

Getting Started
Follow these instructions to get a local copy up and running.

Prerequisites
Node.js (v18 or later)

npm

MongoDB (A local instance or a free cloud account from MongoDB Atlas)

Installation
Clone the repository:

Bash

git clone https://your-repository-url.com/
cd Traycer-AI
Setup the Backend:

Bash

# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file in the /server directory
touch .env
Now, open the .env file and add your secret keys:

Code snippet

PORT=5000
MONGO_URI="your_mongodb_connection_string"
Setup the Frontend:

Bash

# Navigate back to the root and into the client directory
cd ../client

# Install dependencies
npm install

# Create a .env.local file in the /client directory
touch .env.local
Now, open the .env.local file and add the URL for your backend:

Code snippet

VITE_API_URL=http://localhost:5000/api
Running the Application
You will need two separate terminals to run both the backend and frontend servers.

Start the Backend Server:

In a terminal, navigate to the server directory.

Run the command:

Bash

npm run dev
Your backend should be running on http://localhost:5000.

Start the Frontend Client:

In a new terminal, navigate to the client directory.

Run the command: npm run dev
Your frontend application will open in your browser at http://localhost:5173 (or another available port).

Bash

npm run dev
