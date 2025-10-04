
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

// This component now only receives planData and setSelectedNode
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

  // This useEffect now LISTENS for changes to the planData prop
  useEffect(() => {
    if (planData) {
      const formattedNodes = planData.nodes.map((node) => ({
        ...node,
        type: "custom",
      }));
      setNodes(formattedNodes);
      setEdges(planData.edges);
      // We need a slight delay for fitView to work correctly after nodes are set
      setTimeout(() => fitView({ duration: 800 }), 100);
    }
  }, [planData, setNodes, setEdges, fitView]);

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const onPaneClick = () => {
    setSelectedNode(null);
  };

  // --- THIS IS THE CORRECTED PART ---
  // The main container with the background is now ALWAYS rendered.
  // We use a conditional inside it to switch between the placeholder and the flowchart.
  return (
    <div className={styles.canvasContainer}>
      {!planData ? (
        // If no plan, show the placeholder
        <div className={styles.placeholder}>
          <h2>Your flowchart will appear here</h2>
          <p>Give a prompt in the chat panel to get started.</p>
        </div>
      ) : (
        // If there is a plan, show the ReactFlow component
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

// The wrapper is still needed for the hooks to work
const PlanCanvasWrapper: React.FC<PlanCanvasProps> = (props) => (
  <ReactFlowProvider>
    <PlanCanvas {...props} />
  </ReactFlowProvider>
);

export default PlanCanvasWrapper;