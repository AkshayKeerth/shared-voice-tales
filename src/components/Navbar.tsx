
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MotionWrapper from "./MotionWrapper";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";

interface NavbarProps {
  onStartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onStartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      {/* Futuristic blurred background effect with blue glow */}
      <motion.div
        className={cn(
          "absolute inset-0 backdrop-blur-xl transition-all duration-500",
          isScrolled
            ? theme === "dark" ? "bg-talkmatch-black/80 shadow-lg" : "bg-white/80 shadow-lg"
            : theme === "dark" ? "bg-talkmatch-black/50" : "bg-white/50"
        )}
        animate={{
          backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
        }}
      >
        {/* Interactive grid background */}
        <div className="grid-background"></div>
        
        {/* Subtle gradient overlay with blue accents */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r mix-blend-overlay",
          theme === "dark" ? "from-talkmatch-blue/5 to-transparent" : "from-talkmatch-blue-dark/5 to-transparent"
        )}></div>
        
        {/* Animated border bottom */}
        <motion.div 
          className={cn(
            "absolute bottom-0 left-0 right-0 h-[1px]",
            theme === "dark" ? "bg-talkmatch-blue/30" : "bg-talkmatch-blue-dark/30"
          )}
          animate={{
            opacity: isScrolled ? 1 : 0.3,
            boxShadow: isScrolled 
              ? theme === "dark" 
                ? "0 0 8px rgba(51, 195, 240, 0.5)" 
                : "0 0 8px rgba(15, 160, 206, 0.5)"
              : "none",
          }}
        />
      </motion.div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo with animated gradient effect */}
          <motion.div 
            className="flex items-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <h1 className="text-xl font-bold mr-2 relative overflow-hidden">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-talkmatch-blue-light to-talkmatch-blue bg-[length:200%_auto] animate-background-pan">
                TalkMatch
              </span>
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-talkmatch-blue-light to-talkmatch-blue"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <motion.div className="flex items-center space-x-2" variants={itemVariants}>
              <NavButton href="#features">Features</NavButton>
              <NavButton href="#how-it-works">How It Works</NavButton>
              <NavButton href="#privacy">Privacy</NavButton>
              
              {/* Theme Toggle */}
              <ThemeToggle className="mx-2" />
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="glow-border rounded-lg overflow-hidden"
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
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile Nav Icons: Theme Toggle + Menu Button */}
          <motion.div 
            className="md:hidden flex items-center space-x-2"
            variants={itemVariants}
          >
            {/* Theme Toggle for Mobile */}
            <ThemeToggle />
            
            {/* Mobile Menu Button with futuristic style */}
            <motion.button
              onClick={toggleMenu}
              className={cn(
                "p-2 rounded-lg border transition-all duration-300",
                theme === "dark"
                  ? "bg-talkmatch-black-light text-talkmatch-blue border-talkmatch-blue/30 hover:border-talkmatch-blue/60 hover:shadow-[0_0_15px_rgba(51,195,240,0.3)]"
                  : "bg-white text-talkmatch-blue-dark border-talkmatch-blue-dark/30 hover:border-talkmatch-blue-dark/60 hover:shadow-[0_0_15px_rgba(15,160,206,0.3)]"
              )}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation Menu with futuristic animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={cn(
              "fixed inset-0 z-40 flex flex-col items-center justify-center",
              theme === "dark" ? "bg-talkmatch-black/90" : "bg-white/90"
            )}
          >
            {/* Grid background for mobile menu */}
            <div className="grid-background"></div>
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "absolute w-32 h-32 rounded-full",
                    theme === "dark" ? "bg-talkmatch-blue/5" : "bg-talkmatch-blue-dark/5"
                  )}
                  initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: Math.random() * window.innerHeight,
                    scale: 0.5
                  }}
                  animate={{ 
                    x: Math.random() * window.innerWidth, 
                    y: Math.random() * window.innerHeight,
                    scale: [0.5, 1.5, 0.5],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 10 + i * 2,
                    repeatType: "reverse"
                  }}
                />
              ))}
            </div>
            
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
              </motion.div>
            </motion.div>

            {/* Close button with futuristic style */}
            <motion.button
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "absolute top-6 right-6 p-2 rounded-lg border transition-all duration-300",
                theme === "dark"
                  ? "bg-talkmatch-black-light text-talkmatch-blue border-talkmatch-blue/30 hover:border-talkmatch-blue/60 hover:shadow-[0_0_15px_rgba(51,195,240,0.3)]"
                  : "bg-white text-talkmatch-blue-dark border-talkmatch-blue-dark/30 hover:border-talkmatch-blue-dark/60 hover:shadow-[0_0_15px_rgba(15,160,206,0.3)]"
              )}
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Desktop Nav Button Component with enhanced hover effects for futuristic theme
const NavButton: React.FC<{
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}> = ({ children, href, className, onClick }) => {
  const { theme } = useTheme();
  
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
      <span className={cn(
        "relative z-10 transition-colors duration-300", 
        theme === "dark" 
          ? "text-gray-300 hover:text-talkmatch-blue" 
          : "text-gray-600 hover:text-talkmatch-blue-dark"
      )}>
        {children}
      </span>
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

// Mobile Nav Button Component with futuristic hover and tap animations
const MobileNavButton: React.FC<{
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}> = ({ children, href, className, onClick }) => {
  const { theme } = useTheme();
  
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
        "text-xl font-medium block py-3 px-8 rounded-lg transition-all hover-underline",
        theme === "dark"
          ? "text-gray-300 hover:text-talkmatch-blue" 
          : "text-gray-600 hover:text-talkmatch-blue-dark",
        className
      )}
      onClick={onClick}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
    >
      {children}
    </motion.a>
  ) : (
    <motion.button
      className={cn(
        "text-xl font-medium block py-3 px-8 rounded-lg transition-all",
        theme === "dark"
          ? "hover:text-talkmatch-blue" 
          : "hover:text-talkmatch-blue-dark",
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
