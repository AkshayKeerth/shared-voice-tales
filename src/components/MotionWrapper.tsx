
import React, { useState, useEffect, useRef } from "react";

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: "fade" | "slide" | "scale" | "fade-up";
}

const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 500,
  animation = "fade-up",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only set isVisible to true if the element is intersecting
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setIsVisible(true);
          }, delay);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animation) {
        case "fade":
          return "opacity-0";
        case "slide":
          return "opacity-0 translate-x-8";
        case "scale":
          return "opacity-0 scale-95";
        case "fade-up":
        default:
          return "opacity-0 translate-y-8";
      }
    }
    return "opacity-100 translate-y-0 translate-x-0 scale-100";
  };

  // Use a string template for duration to ensure proper formatting
  const durationStyle = isVisible ? `${duration}ms` : '0ms';

  return (
    <div
      ref={ref}
      className={`transition-all ${getAnimationClass()} ${className}`}
      style={{ 
        transitionDuration: durationStyle,
        transitionDelay: `${delay}ms` 
      }}
    >
      {children}
    </div>
  );
};

export default MotionWrapper;
