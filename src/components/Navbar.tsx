
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MotionWrapper from "./MotionWrapper";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onStartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onStartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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
      {/* Blurred background effect with enhanced glow */}
      <motion.div
        className={cn(
          "absolute inset-0 backdrop-blur-lg transition-all duration-500",
          isScrolled
            ? "bg-white/70 dark:bg-gray-900/70 shadow-lg"
            : "bg-white/30 dark:bg-gray-900/30"
        )}
        animate={{
          backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
        }}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-talkmatch-purple-light/20 to-talkmatch-pink/10 mix-blend-overlay"></div>
      </motion.div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo with subtle animation */}
          <motion.div 
            className="flex items-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <h1 className="text-xl font-bold mr-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-talkmatch-purple to-talkmatch-purple-dark">
                TalkMatch
              </span>
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <motion.div className="flex items-center space-x-2" variants={itemVariants}>
              <NavButton href="#features">Features</NavButton>
              <NavButton href="#how-it-works">How It Works</NavButton>
              <NavButton href="#privacy">Privacy</NavButton>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <NavButton
                  className="ml-2 px-6 py-2.5 bg-gradient-to-r from-talkmatch-purple to-talkmatch-purple-dark text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-talkmatch-purple/30"
                  onClick={onStartClick}
                >
                  Start Talking
                </NavButton>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile Menu Button with animation */}
          <motion.div 
            className="md:hidden"
            variants={itemVariants}
          >
            <motion.button
              onClick={toggleMenu}
              className="p-2 rounded-full bg-talkmatch-purple-light text-talkmatch-purple hover:bg-talkmatch-purple hover:text-white transition-all duration-300"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation Menu with improved animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-40 bg-gradient-to-br from-white/95 to-talkmatch-purple-light/95 dark:from-gray-900/95 dark:to-talkmatch-purple-dark/95 backdrop-blur-md flex flex-col items-center justify-center"
          >
            <motion.div 
              className="space-y-8 text-center"
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
                  className="bg-gradient-to-r from-talkmatch-purple to-talkmatch-purple-dark text-white px-8 py-3 rounded-full inline-block shadow-lg"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onStartClick();
                  }}
                >
                  Start Talking
                </MobileNavButton>
              </motion.div>
            </motion.div>

            {/* Close button with animation */}
            <motion.button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-talkmatch-purple-light text-talkmatch-purple hover:bg-talkmatch-purple hover:text-white transition-colors"
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
        "px-4 py-2 rounded-full font-medium relative overflow-hidden",
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
      <motion.span
        className="absolute inset-0 rounded-full bg-talkmatch-purple-light opacity-0"
        variants={{
          hover: { opacity: 0.7, scale: 1 },
          initial: { opacity: 0, scale: 0 }
        }}
        initial="initial"
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      />
    </motion.a>
  ) : (
    <motion.button
      className={cn(
        "px-4 py-2 rounded-full font-medium relative overflow-hidden",
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
      <motion.span
        className="absolute inset-0 rounded-full bg-talkmatch-purple-light opacity-0"
        variants={{
          hover: { opacity: 0.7, scale: 1 },
          initial: { opacity: 0, scale: 0 }
        }}
        initial="initial"
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      />
    </motion.button>
  );
};

// Mobile Nav Button Component with hover and tap animations
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
        "text-xl font-medium block py-3 px-8 rounded-full transition-all hover:text-talkmatch-purple",
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
        "text-xl font-medium block py-3 px-8 rounded-full transition-all hover:text-talkmatch-purple",
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
