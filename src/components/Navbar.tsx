
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-2" : "py-4"
      )}
    >
      {/* Blurred background effect */}
      <div
        className={cn(
          "absolute inset-0 backdrop-blur-lg transition-all duration-300",
          isScrolled
            ? "bg-white/70 dark:bg-gray-900/70 shadow-md"
            : "bg-white/30 dark:bg-gray-900/30"
        )}
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <MotionWrapper delay={100} animation="fade">
            <div className="flex items-center">
              <h1 className="text-xl font-bold gradient-text mr-2">TalkMatch</h1>
            </div>
          </MotionWrapper>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <MotionWrapper delay={200} animation="fade">
              <NavButton href="#features">Features</NavButton>
              <NavButton href="#how-it-works">How It Works</NavButton>
              <NavButton href="#privacy">Privacy</NavButton>
              <NavButton
                className="ml-2 bg-gradient-purple text-white px-5 py-2 rounded-full hover:shadow-lg transition-all"
                onClick={onStartClick}
              >
                Start Talking
              </NavButton>
            </MotionWrapper>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full bg-talkmatch-purple-light text-talkmatch-purple hover:bg-talkmatch-purple hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transition-all duration-300 flex flex-col items-center justify-center",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="space-y-8 text-center">
          <MobileNavButton href="#features" onClick={() => setIsMenuOpen(false)}>
            Features
          </MobileNavButton>
          <MobileNavButton href="#how-it-works" onClick={() => setIsMenuOpen(false)}>
            How It Works
          </MobileNavButton>
          <MobileNavButton href="#privacy" onClick={() => setIsMenuOpen(false)}>
            Privacy
          </MobileNavButton>
          <MobileNavButton
            className="bg-gradient-purple text-white px-8 py-3 rounded-full inline-block"
            onClick={() => {
              setIsMenuOpen(false);
              onStartClick();
            }}
          >
            Start Talking
          </MobileNavButton>
        </div>
        {/* Close button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full bg-talkmatch-purple-light text-talkmatch-purple hover:bg-talkmatch-purple hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18"></path>
            <path d="M6 6L18 18"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

// Desktop Nav Button Component
const NavButton: React.FC<{
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}> = ({ children, href, className, onClick }) => {
  return href ? (
    <a
      href={href}
      className={cn(
        "px-4 py-2 rounded-full font-medium relative group overflow-hidden",
        className
      )}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-talkmatch-purple-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full opacity-70"></span>
    </a>
  ) : (
    <button
      className={cn(
        "px-4 py-2 rounded-full font-medium relative group overflow-hidden",
        className
      )}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-talkmatch-purple-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full opacity-70"></span>
    </button>
  );
};

// Mobile Nav Button Component
const MobileNavButton: React.FC<{
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}> = ({ children, href, className, onClick }) => {
  return href ? (
    <a
      href={href}
      className={cn(
        "text-xl font-medium block py-3 px-6 rounded-full transition-colors hover:text-talkmatch-purple",
        className
      )}
      onClick={onClick}
    >
      {children}
    </a>
  ) : (
    <button
      className={cn(
        "text-xl font-medium block py-3 px-6 rounded-full transition-colors hover:text-talkmatch-purple",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Navbar;
