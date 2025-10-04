

// import React from "react";
// import { Handle, Position } from "reactflow";
// import type { NodeProps } from "reactflow";
// import styles from "./CustomNode.module.css";

// type NodeData = {
//   label: string;
//   status: "Pending" | "In Progress" | "Completed" | "Error";
//   icon: string;
// };

// // The 'selected' prop is provided by React Flow automatically
// const CustomNode: React.FC<NodeProps<NodeData>> = ({ data, selected }) => {
//   const statusClassName = styles[data.status.toLowerCase().replace(" ", "")];
//   // Create a new class for the colored left border
//   const statusNodeClassName =
//     styles[`${data.status.toLowerCase().replace(" ", "")}Node`];

//   // Combine the class names
//   const nodeClasses = `
//     ${styles.nodeWrapper} 
//     ${statusNodeClassName} 
//     ${selected ? styles.selected : ""}
//   `;

//   return (
//     <div className={nodeClasses.trim()}>
//       <div className={styles.icon}>{data.icon}</div>
//       <div className={styles.label}>{data.label}</div>
//       <div className={`${styles.statusBadge} ${statusClassName}`}>
//         {data.status}
//       </div>
//       <Handle type="target" position={Position.Top} className={styles.handle} />
//       <Handle
//         type="source"
//         position={Position.Bottom}
//         className={styles.handle}
//       />
//     </div>
//   );
// };

// export default CustomNode;


import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";
import styles from "./CustomNode.module.css";

// Add 'step' to the NodeData type
type NodeData = {
  step: number;
  label: string;
  status: "Pending" | "In Progress" | "Completed" | "Error";
  icon: string;
};

const CustomNode: React.FC<NodeProps<NodeData>> = ({ data, selected }) => {
  const statusClassName = styles[data.status.toLowerCase().replace(" ", "")];
  const statusNodeClassName =
    styles[`${data.status.toLowerCase().replace(" ", "")}Node`];

  const nodeClasses = `
    ${styles.nodeWrapper} 
    ${statusNodeClassName} 
    ${selected ? styles.selected : ""}
  `;

  return (
    <div className={nodeClasses.trim()}>
      {/* ADD THE STEP NUMBER ELEMENT */}
      <div className={styles.stepNumber}>{data.step}</div>

      <div className={styles.icon}>{data.icon}</div>
      <div className={styles.label}>{data.label}</div>
      <div className={`${styles.statusBadge} ${statusClassName}`}>
        {data.status}
      </div>
      <Handle type="target" position={Position.Top} className={styles.handle} />
      <Handle
        type="source"
        position={Position.Bottom}
        className={styles.handle}
      />
    </div>
  );
};

export default CustomNode;