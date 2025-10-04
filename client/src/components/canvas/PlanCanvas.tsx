
import React, { useMemo, useEffect } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import type { Node } from "reactflow";
import "reactflow/dist/style.css";

import type { PlanData } from "../../services/planService";
import CustomNode from "./CustomNode";
import styles from "./PlanCanvas.module.css";

interface PlanCanvasProps {
  planData: PlanData | null;
  setSelectedNode: (node: Node | null) => void;
}

const PlanCanvas: React.FC<PlanCanvasProps> = ({
  planData,
  setSelectedNode,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  
  useEffect(() => {
    if (planData) {
      const formattedNodes = planData.nodes.map((node) => ({
        ...node,
        type: "custom",
      }));
      setNodes(formattedNodes);
      setEdges(planData.edges);
      
      setTimeout(() => fitView({ duration: 800 }), 100);
    }
  }, [planData, setNodes, setEdges, fitView]);

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const onPaneClick = () => {
    setSelectedNode(null);
  };


  return (
    <div className={styles.canvasContainer}>
      {!planData ? (
        
        <div className={styles.placeholder}>
          <h2>Your flowchart will appear here</h2>
          <p>Give a prompt in the chat panel to get started.</p>
        </div>
      ) : (
     
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          fitView
        />
      )}
    </div>
  );
};


const PlanCanvasWrapper: React.FC<PlanCanvasProps> = (props) => (
  <ReactFlowProvider>
    <PlanCanvas {...props} />
  </ReactFlowProvider>
);

export default PlanCanvasWrapper;
