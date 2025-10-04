// import React, { useState, useEffect } from "react";
// import type { Node } from "reactflow";
// import type { PlanData } from "../../services/planService";
// import styles from "./Sidebar.module.css";
// import CodeBlock from "../ui/CodeBlock";

// interface SidebarProps {
//   selectedNode: Node | null;
//   planData: PlanData | null;
// }

// const Sidebar: React.FC<SidebarProps> = ({ selectedNode, planData }) => {
//   const [showCode, setShowCode] = useState(false);

//   useEffect(() => {
//     setShowCode(false);
//   }, [selectedNode]);

//   if (!selectedNode) {
//     // This check is a safeguard, but visibility is handled by App.tsx
//     return null;
//   }

//   return (
//     <aside className={styles.sidebar}>
//       {/* ADD THIS WRAPPER DIV */}
//       <div className={styles.scrollableContent}>
//         {/* --- TASK DETAILS SECTION --- */}
//         <div className={styles.section}>
//           <div className={styles.header}>
//             <span className={styles.icon}>{selectedNode.data.icon}</span>
//             <h2 className={styles.title}>{selectedNode.data.label}</h2>
//           </div>
//           <div className={styles.content}>
//             <h3>Description</h3>
//             <p>
//               {selectedNode.data.description || "No description available."}
//             </p>
//             <h3>Code</h3>
//             {!showCode && (
//               <button
//                 className={styles.generateButton}
//                 onClick={() => setShowCode(true)}
//               >
//                 Generate Code 🤖
//               </button>
//             )}
//             {showCode && (
//               <CodeBlock
//                 codeString={selectedNode.data.code || "// No code available."}
//                 language="typescript"
//               />
//             )}
//           </div>
//         </div>

//         {/* --- PROJECT OVERVIEW SECTION --- */}
//         {/* {planData && (
//           <div className={styles.section}>
//             <div className={styles.header}>
//               <h2 className={styles.title}>Project Overview</h2>
//             </div>
//             <div className={styles.content}>
//               <h3>Tech Stack</h3>
//               <div className={styles.techStack}>
//                 {planData.suggestedTechStack.map((tech) => (
//                   <span key={tech} className={styles.techTag}>
//                     {tech}
//                   </span>
//                 ))}
//               </div>
              
//             </div>
//           </div>
//         )} */}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;


import React, { useState, useEffect } from "react";
import type { Node } from "reactflow";
import type { PlanData } from "../../services/planService";
import styles from "./Sidebar.module.css";
import CodeBlock from "../ui/CodeBlock";
import ChatInput from "../ui/ChatInput"; // Import the chat component

interface SidebarProps {
  selectedNode: Node | null;
  planData: PlanData | null;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedNode, planData }) => {
  // Your original state for the button is kept
  const [showCode, setShowCode] = useState(false);

  // ADDITION 1: State to hold the code string, so the AI can change it
  const [activeCode, setActiveCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ADDITION 2: This effect syncs the state with the selected node
  useEffect(() => {
    setShowCode(false); // Hide code block for new node, just like before
    if (selectedNode) {
      // Set the active code from the new node's data
      setActiveCode(selectedNode.data.code || "// No code available.");
    }
  }, [selectedNode]);

  // ADDITION 3: Handler for the new chat input
  const handleRefinementSubmit = async (prompt: string) => {
    setIsLoading(true);
    // In a real app, you would call your backend AI service here
    // For now, we'll just simulate the AI's response after 1.5 seconds
    setTimeout(() => {
      const refinedCode = `${activeCode}\n\n/*-- AI Refinement for: "${prompt}" --*/`;
      setActiveCode(refinedCode);
      setIsLoading(false);
    }, 1500);
  };

  if (!selectedNode) {
    return null;
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.scrollableContent}>
        {/* --- TASK DETAILS SECTION --- */}
        <div className={styles.section}>
          <div className={styles.header}>
            <span className={styles.icon}>{selectedNode.data.icon}</span>
            <h2 className={styles.title}>{selectedNode.data.label}</h2>
          </div>
          <div className={styles.content}>
            <h3>Description</h3>
            <p>
              {selectedNode.data.description || "No description available."}
            </p>
            <h3>Code</h3>

            {/* THIS IS YOUR ORIGINAL BUTTON LOGIC, UNCHANGED */}
            {!showCode && (
              <button
                className={styles.generateButton}
                onClick={() => setShowCode(true)}
              >
                Generate Code 🤖
              </button>
            )}

            {/* The CodeBlock is still shown conditionally, but now reads from our state */}
            {showCode && (
              <CodeBlock codeString={activeCode} language="typescript" />
            )}
          </div>
        </div>

        {/* --- PROJECT OVERVIEW SECTION --- */}
        {/* Your commented-out code for this section remains here */}
      </div>

      {/* --- NEW CHAT SECTION AT THE BOTTOM --- */}
      <div className={styles.refinementSection}>
        Make code better or add features:
        <ChatInput
          onPromptSubmit={handleRefinementSubmit}
          isLoading={isLoading}
        />
      </div>
    </aside>
  );
};

export default Sidebar;