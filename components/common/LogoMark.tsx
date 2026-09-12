import React from "react";

export const LogoMark = ({
  size,
  className = "",
}: {
  size?: number;
  className?: string;
}) => {
  return (
    <span
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        width: size ? `${size}px` : undefined,
        height: size ? `${(size * 112) / 126}px` : undefined,
        aspectRatio: "126 / 112",
        maskImage: "url(/logo.png)",
        WebkitMaskImage: "url(/logo.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
      aria-label="Student Saarthi Logo"
      role="img"
    />
  );
};

export default LogoMark;
