
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MotionWrapper from "./MotionWrapper";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface NavbarProps {
  onStartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onStartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "py-2" : "py-4"
      )}
    >
      {/* Advanced futuristic blurred background with reactive glow */}
      <motion.div
        className="absolute inset-0 backdrop-blur-xl transition-all duration-500 bg-talkmatch-black/80 overflow-hidden"
        animate={{
          backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
        }}
      >
        {/* 3D grid background */}
        <div className="grid-background"></div>
        
        {/* Animated glow overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-talkmatch-blue/5 to-transparent mix-blend-overlay"
          animate={{
            background: [
              "linear-gradient(to right, rgba(51, 195, 240, 0.05), transparent)",
              "linear-gradient(to right, rgba(51, 195, 240, 0.1), transparent)",
              "linear-gradient(to right, rgba(51, 195, 240, 0.05), transparent)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Reactive mouse glow effect */}
        <motion.div 
          className="absolute w-[300px] h-[300px] rounded-full bg-talkmatch-blue/5 pointer-events-none"
          animate={{
            x: mousePosition.x - 150,
            y: mousePosition.y - 150,
            opacity: 0.15
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.6 }}
        />
        
        {/* Cyberpunk-inspired circuit lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M20 20 H80 V80 H20 Z" fill="none" stroke="rgba(51, 195, 240, 0.3)" strokeWidth="1" />
            <path d="M50 0 V100 M0 50 H100" fill="none" stroke="rgba(51, 195, 240, 0.2)" strokeWidth="1" />
            <circle cx="50" cy="50" r="5" fill="rgba(51, 195, 240, 0.3)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
        
        {/* Animated border bottom with pulse effect */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-talkmatch-blue/30"
          animate={{
            opacity: isScrolled ? [0.3, 1, 0.3] : [0.1, 0.4, 0.1],
            boxShadow: isScrolled 
              ? ["0 0 5px rgba(51, 195, 240, 0.3)", "0 0 15px rgba(51, 195, 240, 0.6)", "0 0 5px rgba(51, 195, 240, 0.3)"]
              : ["0 0 2px rgba(51, 195, 240, 0.2)", "0 0 8px rgba(51, 195, 240, 0.4)", "0 0 2px rgba(51, 195, 240, 0.2)"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo with more advanced animation */}
          <motion.div 
            className="flex items-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <h1 className="text-xl font-bold mr-2 relative overflow-hidden">
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-talkmatch-blue-light to-talkmatch-blue bg-[length:200%_auto]"
                animate={{
                  backgroundPosition: ["0% center", "200% center"]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                TalkMatch
              </motion.span>
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-talkmatch-blue-light to-talkmatch-blue"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8 }}
              />
              <motion.span
                className="absolute -inset-1 rounded-lg"
                animate={{ 
                  boxShadow: ["0 0 5px rgba(51, 195, 240, 0)", "0 0 15px rgba(51, 195, 240, 0.3)", "0 0 5px rgba(51, 195, 240, 0)"],
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
            </h1>
          </motion.div>

          {/* Desktop Navigation with enhanced effects */}
          <div className="hidden md:flex items-center space-x-2">
            <motion.div className="flex items-center space-x-2" variants={itemVariants}>
              <NavButton href="#features">Features</NavButton>
              <NavButton href="#how-it-works">How It Works</NavButton>
              <NavButton href="#privacy">Privacy</NavButton>
              
              {/* Enhanced Start Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative overflow-hidden glow-border rounded-lg"
              >
                <NavButton
                  className="ml-2 px-6 py-2.5 bg-gradient-blue text-white rounded-lg hover:shadow-[0_0_15px_rgba(51,195,240,0.5)]"
                  onClick={onStartClick}
                >
                  <span className="relative z-10">Start Talking</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-talkmatch-blue to-talkmatch-blue-light opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </NavButton>
                
                {/* Animated particles around the button */}
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute w-1 h-1 bg-talkmatch-blue/80 rounded-full"
                    initial={{
                      x: "50%",
                      y: "50%",
                      opacity: 0
                    }}
                    animate={{
                      x: ["50%", `${30 + Math.random() * 40}%`],
                      y: ["50%", `${30 + Math.random() * 40}%`],
                      opacity: [0, 0.8, 0]
                    }}
                    transition={{
                      duration: 2 + i * 0.6,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      delay: i * 0.2
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile Menu Button with enhanced futuristic style */}
          <motion.div 
            className="md:hidden flex items-center"
            variants={itemVariants}
          >
            <motion.button
              onClick={toggleMenu}
              className="p-2 rounded-lg border border-talkmatch-blue/30 bg-talkmatch-black-light text-talkmatch-blue hover:border-talkmatch-blue/60 hover:shadow-[0_0_15px_rgba(51,195,240,0.3)]"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
              <motion.span
                className="absolute -inset-1 rounded-lg opacity-0"
                animate={{ 
                  opacity: [0, 0.5, 0],
                  boxShadow: ["0 0 5px rgba(51, 195, 240, 0)", "0 0 10px rgba(51, 195, 240, 0.3)", "0 0 5px rgba(51, 195, 240, 0)"],
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation Menu with enhanced futuristic animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-talkmatch-black/90"
          >
            {/* Enhanced grid background with 3D perspective for mobile menu */}
            <div className="grid-background"></div>
            
            {/* 3D Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-1000">
              <motion.div 
                className="absolute w-full h-full"
                animate={{ 
                  rotateX: [0, 5, 0, -5, 0],
                  rotateY: [0, 5, 0, -5, 0],
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-32 h-32 rounded-full bg-talkmatch-blue/5"
                    initial={{ 
                      x: Math.random() * window.innerWidth, 
                      y: Math.random() * window.innerHeight,
                      scale: 0.5,
                      rotateZ: 0
                    }}
                    animate={{ 
                      x: Math.random() * window.innerWidth, 
                      y: Math.random() * window.innerHeight,
                      scale: [0.5, 1.5, 0.5],
                      opacity: [0.2, 0.4, 0.2],
                      rotateZ: [0, 180, 360]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 15 + i * 2,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </div>
            
            {/* Digital circuit pattern overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" xmlns="http://www.w3.org/2000/svg">
              <pattern id="circuit-pattern-mobile" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M20 20 H80 V80 H20 Z" fill="none" stroke="rgba(51, 195, 240, 0.3)" strokeWidth="1" />
                <path d="M50 0 V100 M0 50 H100" fill="none" stroke="rgba(51, 195, 240, 0.2)" strokeWidth="1" />
                <circle cx="50" cy="50" r="5" fill="rgba(51, 195, 240, 0.3)" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#circuit-pattern-mobile)" />
            </svg>
            
            <motion.div 
              className="space-y-8 text-center relative z-10"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 }
                }
              }}
            >
              <MobileNavButton href="#features" onClick={() => setIsMenuOpen(false)}>
                Features
              </MobileNavButton>
              <MobileNavButton href="#how-it-works" onClick={() => setIsMenuOpen(false)}>
                How It Works
              </MobileNavButton>
              <MobileNavButton href="#privacy" onClick={() => setIsMenuOpen(false)}>
                Privacy
              </MobileNavButton>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <MobileNavButton
                  className="bg-gradient-blue text-white px-8 py-3 rounded-lg inline-block shadow-[0_0_15px_rgba(51,195,240,0.3)] hover:shadow-[0_0_20px_rgba(51,195,240,0.5)]"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onStartClick();
                  }}
                >
                  Start Talking
                </MobileNavButton>
                <motion.div
                  className="absolute -inset-2 rounded-xl opacity-0"
                  animate={{ 
                    opacity: [0, 0.3, 0],
                    boxShadow: ["0 0 5px rgba(51, 195, 240, 0)", "0 0 20px rgba(51, 195, 240, 0.4)", "0 0 5px rgba(51, 195, 240, 0)"],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                />
              </motion.div>
            </motion.div>

            {/* Enhanced Close button with futuristic animation */}
            <motion.button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-lg border border-talkmatch-blue/30 bg-talkmatch-black-light text-talkmatch-blue hover:border-talkmatch-blue/60 hover:shadow-[0_0_15px_rgba(51,195,240,0.3)]"
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
              <motion.span
                className="absolute inset-0 rounded-lg"
                animate={{ 
                  boxShadow: ["0 0 0px rgba(51, 195, 240, 0)", "0 0 10px rgba(51, 195, 240, 0.5)", "0 0 0px rgba(51, 195, 240, 0)"],
                }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Desktop Nav Button Component with enhanced hover effects
const NavButton: React.FC<{
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}> = ({ children, href, className, onClick }) => {  
  return href ? (
    <motion.a
      href={href}
      className={cn(
        "px-4 py-2 rounded-lg font-medium relative overflow-hidden hover-underline",
        className
      )}
      onClick={onClick}
      whileHover="hover"
      whileTap="tap"
      variants={{
        hover: { y: -2 },
        tap: { y: 0 }
      }}
    >
      <span className="relative z-10 transition-colors duration-300 text-gray-300 hover:text-talkmatch-blue">
        {children}
      </span>
      <motion.span 
        className="absolute bottom-0 left-0 h-0.5 bg-talkmatch-blue/50 w-0"
        variants={{
          hover: { width: "100%" },
          idle: { width: 0 }
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  ) : (
    <motion.button
      className={cn(
        "px-4 py-2 rounded-lg font-medium relative overflow-hidden",
        className
      )}
      onClick={onClick}
      whileHover="hover"
      whileTap="tap"
      variants={{
        hover: { y: -2 },
        tap: { y: 0 }
      }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// Mobile Nav Button Component with enhanced futuristic hover effects
const MobileNavButton: React.FC<{
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}> = ({ children, href, className, onClick }) => {
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    hover: { scale: 1.05, y: -5 },
    tap: { scale: 0.95 }
  };

  return href ? (
    <motion.a
      href={href}
      className={cn(
        "text-xl font-medium block py-3 px-8 rounded-lg transition-all",
        "text-gray-300 hover:text-talkmatch-blue relative",
        className
      )}
      onClick={onClick}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
    >
      {children}
      <motion.span 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-talkmatch-blue/50 w-0"
        variants={{
          hover: { width: "80%" },
          visible: { width: 0 }
        }}
      />
    </motion.a>
  ) : (
    <motion.button
      className={cn(
        "text-xl font-medium block py-3 px-8 rounded-lg transition-all",
        "hover:text-talkmatch-blue relative",
        className
      )}
      onClick={onClick}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
    >
      {children}
    </motion.button>
  );
};

export default Navbar;
