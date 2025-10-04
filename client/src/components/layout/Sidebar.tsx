

import React, { useState, useEffect } from "react";
import type { Node } from "reactflow";
import type { PlanData } from "../../services/planService";
import styles from "./Sidebar.module.css";
import CodeBlock from "../ui/CodeBlock";
import ChatInput from "../ui/ChatInput";

interface SidebarProps {
  selectedNode: Node | null;
  planData: PlanData | null;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedNode, planData }) => {
  
  const [showCode, setShowCode] = useState(false);

  
  const [activeCode, setActiveCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setShowCode(false);
    if (selectedNode) {
    
      setActiveCode(selectedNode.data.code || "// No code available.");
    }
  }, [selectedNode]);

  const handleRefinementSubmit = async (prompt: string) => {
    setIsLoading(true);
  
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

            {!showCode && (
              <button
                className={styles.generateButton}
                onClick={() => setShowCode(true)}
              >
                Generate Code 🤖
              </button>
            )}

            
            {showCode && (
              <CodeBlock codeString={activeCode} language="typescript" />
            )}
          </div>
        </div>

        
      </div>

      
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
