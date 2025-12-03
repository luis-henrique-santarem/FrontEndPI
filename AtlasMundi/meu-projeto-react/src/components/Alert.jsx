import React, { useState } from "react";

export default function Alert({ message, onClose }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  function handleClose() {
    setVisible(false);
    if (onClose) onClose();
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <span style={styles.text}>{message}</span>
        <button style={styles.button} onClick={handleClose}>
          OK
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
    zIndex: 9999,
  },
  box: {
    background: "#222",
    padding: "12px 18px",
    borderRadius: "6px",
    display: "flex",
    gap: "12px",
    alignItems: "center",
    color: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
  },
  button: {
    background: "#4CAF50",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    color: "white",
    fontWeight: "bold",
  },
  text: {
    fontSize: "14px",
  },
};
