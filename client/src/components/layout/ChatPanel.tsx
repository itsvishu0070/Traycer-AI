import React, { useEffect, useRef } from "react";
import type { PlanData } from "../../services/planService";
import ChatInput from "../ui/ChatInput";
import styles from "./ChatPanel.module.css";

interface ChatPanelProps {
  planData: PlanData | null;
  onPromptSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  planData,
  onPromptSubmit,
  isLoading,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top when new plan loads
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [planData]);

  return (
    <div className={styles.chatPanel}>
      <div className={styles.planSteps} ref={scrollRef}>
        {/* If there is no plan yet AND it's not loading, show the placeholder */}
        {!planData && !isLoading && (
          <div className={styles.placeholder}>
            <p>Your generated plan will appear here.</p>
          </div>
        )}

        {/* If there IS a plan, show the steps */}
        {planData && (
          <>
            <h2 className={styles.title}>Plan Steps</h2>
            <ol className={styles.stepsList}>
              {planData.nodes.map((node) => (
                <li key={node.id}>{node.data.label}</li>
              ))}
            </ol>
          </>
        )}

        {/* If it is loading, show a thinking message */}
        {isLoading && (
          <div className={styles.loading}>
            <p> Thinking...</p>
          </div>
        )}
      </div>
      <ChatInput onPromptSubmit={onPromptSubmit} isLoading={isLoading} />
    </div>
  );
};

export default ChatPanel;
