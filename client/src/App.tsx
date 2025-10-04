
import React, { useState } from "react";
import type { Node } from "reactflow";
import type { PlanData } from "./services/planService";
import { getPlanByName } from "./services/planService";

import Header from "./components/layout/Header";
import ChatPanel from "./components/layout/ChatPanel";
import PlanCanvas from "./components/canvas/PlanCanvas";
import Sidebar from "./components/layout/Sidebar";
import styles from "./App.module.css";
import "./index.css";

function App() {
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    setPlanData(null); 
    setSelectedNode(null);

   
    const delay = new Promise((resolve) => setTimeout(resolve, 1500));

    
    const [data] = await Promise.all([getPlanByName("login-plan"), delay]);

    setPlanData(data);
    setIsLoading(false);
  };

  return (
    <div className={styles.appShell}>
      <Header />
      <div className={styles.mainContent}>
        <ChatPanel
          planData={planData}
          onPromptSubmit={handlePromptSubmit}
          isLoading={isLoading} 
        />
        <div className={styles.canvasContainer}>
          <PlanCanvas planData={planData} setSelectedNode={setSelectedNode} />
        </div>
        <div className={styles.detailsSidebar}>
          {selectedNode && (
            <Sidebar selectedNode={selectedNode} planData={planData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
