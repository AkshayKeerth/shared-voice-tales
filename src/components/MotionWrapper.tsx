
import React, { useState, useEffect } from "react";

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default MotionWrapper;
