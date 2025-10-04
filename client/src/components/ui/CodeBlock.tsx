import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  codeString: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ codeString, language }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Reset button text after 2 seconds
  };

  return (
    <div className={styles.codeBlockContainer}>
      <div className={styles.header}>
        <span className={styles.language}>{language}</span>
        <button onClick={handleCopy} className={styles.copyButton}>
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: "0 0 8px 8px",
          background: "#1E1E1E",
        }}
        codeTagProps={{
          style: {
            fontFamily: '"Fira Code", monospace',
          },
        }}
        showLineNumbers={true}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
