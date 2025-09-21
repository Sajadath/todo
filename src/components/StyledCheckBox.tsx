import React, { useState } from "react";

const StyledCheckBox = ({
  onChange,
  checked,
}: {
  onChange: () => void;
  checked: boolean;
}) => {
  const [hover, setHover] = useState(false);

  const containerStyle: React.CSSProperties = {
    display: "inline-block",
    position: "relative",
    cursor: "pointer",

    WebkitTapHighlightColor: "transparent",
    transform: "translate3d(0, 0, 0)",
  };

  const beforeStyle: React.CSSProperties = {
    content: '""',
    position: "absolute",
    top: "-15px",
    left: "-15px",

    borderRadius: "50%",
    background: "rgba(34, 50, 84, 0)",
    opacity: hover ? 1 : 0,
    transition: "opacity 0.2s ease",
  };

  const svgStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: hover || checked ? "#329e49" : "#c8d4ca",
    strokeWidth: 1.5,
    transform: "translate3d(0, 0, 0)",
    transition: "all 0.2s ease",
  };

  const pathStyle: React.CSSProperties = {
    strokeDasharray: 60,
    strokeDashoffset: checked ? 60 : 0,
    transition: checked ? "all 0.3s linear" : "all 0.2s ease",
  };

  const polylineStyle: React.CSSProperties = {
    strokeDasharray: 22,
    strokeDashoffset: checked ? 42 : 66,
    transition: checked ? "all 0.2s linear 0.15s" : "all 0.2s ease",
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onChange}
    >
      <div style={beforeStyle}></div>
      <svg viewBox="0 0 18 18" height="18px" width="18px" style={svgStyle}>
        <path
          d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"
          style={pathStyle}
        />
        <polyline points="1 9 7 14 15 4" style={polylineStyle} />
      </svg>
    </div>
  );
};

export default StyledCheckBox;
