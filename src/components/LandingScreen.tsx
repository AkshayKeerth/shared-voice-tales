
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import { Card, CardContent } from "./ui/card";
import MicVoice from "./MicVoice";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

interface LandingScreenProps {
  onStartClick: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onStartClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  
  // Handle mouse movement for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Advanced 3D background animation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size with higher resolution for retina displays
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    
    // Initial setup
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create particles with depth effect
    const particlesArray: AdvancedParticle[] = [];
    const particleCount = 150; // Increased for more density
    
    class AdvancedParticle {
      x: number;
      y: number;
      z: number;
      size: number;
      speed: number;
      color: string;
      opacity: number;
      directionX: number;
      directionY: number;
      
      constructor() {
        this.z = Math.random() * 10; // Depth for 3D effect
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speed = (0.2 - this.z * 0.02) * 0.8; // Slower particles appear further away
        this.opacity = Math.max(0.05, (10 - this.z) / 10); // More transparent if further away
        this.color = `rgba(51, 195, 240, ${this.opacity})`;
        
        // Random direction
        this.directionX = (Math.random() - 0.5) * 2;
        this.directionY = (Math.random() - 0.5) * 2;
      }
      
      update(mouseX: number, mouseY: number) {
        // Move particles based on their direction
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
        
        // Subtle mouse influence
        this.x += mouseX * (0.2 - this.z * 0.02) * 0.5;
        this.y += mouseY * (0.2 - this.z * 0.02) * 0.5;
        
        // Boundary check
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Add subtle glow effect
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(51, 195, 240, 0.3)';
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new AdvancedParticle());
    }
    
    // Connect particles with lines - with depth perception
    function connectParticles(mouseX: number, mouseY: number) {
      if (!ctx) return;
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          // Check if particles are on similar depth planes (z-axis)
          const zDiff = Math.abs(particlesArray[a].z - particlesArray[b].z);
          if (zDiff > 2) continue; // Skip if depth difference is too large
          
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Base connection distance on average particle depth
          const avgDepth = (particlesArray[a].z + particlesArray[b].z) / 2;
          const connectionDistance = 150 - avgDepth * 10;
          
          // Draw lines between nearby particles
          if (distance < connectionDistance) {
            // Opacity based on distance and depth
            const opacity = 0.15 * (1 - distance/connectionDistance) * (10 - avgDepth)/10;
            
            // Check if mouse is near this connection
            const midX = (particlesArray[a].x + particlesArray[b].x) / 2;
            const midY = (particlesArray[a].y + particlesArray[b].y) / 2;
            const mouseDistance = Math.sqrt((midX - mouseX * canvas.width) ** 2 + (midY - mouseY * canvas.height) ** 2);
            const mouseInfluence = Math.max(0, 1 - mouseDistance / 200);
            
            // Enhanced color with mouse influence
            ctx.strokeStyle = `rgba(51, 195, 240, ${opacity + mouseInfluence * 0.2})`;
            ctx.lineWidth = Math.max(0.1, 0.5 - avgDepth * 0.03);
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    let animationFrameId: number;
    // Animation loop with mouse interactivity
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(mousePosition.x, mousePosition.y);
        particlesArray[i].draw();
      }
      
      // Connect particles with reactive lines
      connectParticles(mousePosition.x + 0.5, mousePosition.y + 0.5);
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  // Data for wavy animation effect
  const calculateTranslateY = (index: number) => {
    return Math.sin(scrollY / 100 + index * 0.5) * 10;
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-talkmatch-black text-white relative overflow-hidden" ref={sceneRef}>
      {/* Enhanced interactive canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* 3D digital grid overlay */}
      <div className="absolute inset-0 z-0">
        <div className="grid-background"></div>
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(51, 195, 240, 0.03) 1px, transparent 1px), 
                              linear-gradient(to bottom, rgba(51, 195, 240, 0.03) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
          animate={{
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 100
          }}
        />
      </div>
      
      {/* Animated cosmic dust particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`cosmic-dust-${i}`}
            className="absolute rounded-full bg-talkmatch-blue/10"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              filter: 'blur(40px)',
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.1 + Math.random() * 0.2
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight, 
                Math.random() * window.innerHeight
              ],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Digital circuit lines */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-5" xmlns="http://www.w3.org/2000/svg">
        <pattern id="circuit-pattern-main" width="200" height="200" patternUnits="userSpaceOnUse">
          <path d="M20 20 H120 V120 H20 Z" fill="none" stroke="rgba(51, 195, 240, 0.5)" strokeWidth="0.5" />
          <path d="M100 0 V200 M0 100 H200" fill="none" stroke="rgba(51, 195, 240, 0.3)" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="3" fill="rgba(51, 195, 240, 0.5)" />
          <circle cx="20" cy="20" r="2" fill="rgba(51, 195, 240, 0.5)" />
          <circle cx="120" cy="120" r="2" fill="rgba(51, 195, 240, 0.5)" />
          <path d="M20 100 H80 M100 20 V80" fill="none" stroke="rgba(51, 195, 240, 0.3)" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuit-pattern-main)" />
      </svg>
      
      <Navbar onStartClick={onStartClick} />

      {/* Hero Section with advanced 3D effects */}
      <section className="w-full relative py-28 px-6 mt-16">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-talkmatch-black via-talkmatch-black-light/30 to-talkmatch-black z-0"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d"
          }}
          animate={{
            rotateX: mousePosition.y * -5,
            rotateY: mousePosition.x * 5,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 100
          }}
        />
        
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center relative z-10">
          <MotionWrapper delay={100}>
            <div className="mb-4">
              <div className="relative inline-block">
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-talkmatch-blue to-talkmatch-blue-light rounded-full blur opacity-30"
                  animate={{ 
                    opacity: [0.2, 0.5, 0.2],
                    scale: [0.95, 1.05, 0.95],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                {/* 3D text effect */}
                <motion.h1
                  className="relative font-bold text-4xl md:text-5xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-talkmatch-blue-light to-talkmatch-blue"
                  style={{
                    textShadow: "0 0 20px rgba(51, 195, 240, 0.5)"
                  }}
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(51, 195, 240, 0.3)",
                      "0 0 30px rgba(51, 195, 240, 0.5)",
                      "0 0 20px rgba(51, 195, 240, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  TalkMatch
                </motion.h1>
                
                {/* Animated glow lines beneath logo */}
                <motion.div
                  className="absolute -bottom-4 left-0 right-0 h-0.5"
                  animate={{
                    background: [
                      "linear-gradient(90deg, rgba(51, 195, 240, 0) 0%, rgba(51, 195, 240, 0.8) 50%, rgba(51, 195, 240, 0) 100%)",
                      "linear-gradient(90deg, rgba(51, 195, 240, 0) 10%, rgba(51, 195, 240, 0.8) 60%, rgba(51, 195, 240, 0) 90%)",
                      "linear-gradient(90deg, rgba(51, 195, 240, 0) 20%, rgba(51, 195, 240, 0.8) 70%, rgba(51, 195, 240, 0) 100%)",
                      "linear-gradient(90deg, rgba(51, 195, 240, 0) 30%, rgba(51, 195, 240, 0.8) 80%, rgba(51, 195, 240, 0) 90%)",
                      "linear-gradient(90deg, rgba(51, 195, 240, 0) 40%, rgba(51, 195, 240, 0.8) 90%, rgba(51, 195, 240, 0) 100%)",
                      "linear-gradient(90deg, rgba(51, 195, 240, 0) 50%, rgba(51, 195, 240, 0.8) 100%, rgba(51, 195, 240, 0) 100%)",
                      "linear-gradient(90deg, rgba(51, 195, 240, 0) 0%, rgba(51, 195, 240, 0.8) 50%, rgba(51, 195, 240, 0) 100%)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={300}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 mt-6 text-gray-200">
              Talk to someone who just 
              <motion.span 
                className="ml-2 glow-text inline-block"
                animate={{
                  textShadow: [
                    "0 0 8px rgba(51, 195, 240, 0.7)",
                    "0 0 16px rgba(51, 195, 240, 0.9)",
                    "0 0 8px rgba(51, 195, 240, 0.7)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                gets it.
              </motion.span>
            </h2>
            <motion.p 
              className="text-lg md:text-xl max-w-lg mb-12 text-gray-400"
              animate={{
                y: [0, -3, 0, 3, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              Share what's on your mind and instantly voice match with someone feeling the same — anonymously.
            </motion.p>
          </MotionWrapper>

          <MotionWrapper delay={500}>
            <motion.button
              onClick={onStartClick}
              className="btn-primary group shadow-[0_0_15px_rgba(51,195,240,0.3)] hover:shadow-[0_0_30px_rgba(51,195,240,0.6)] relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start Talking Now</span>
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1 relative z-10" size={20} />
              
              {/* Button background animation */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-talkmatch-blue via-talkmatch-blue-light to-talkmatch-blue"
                initial={{
                  backgroundPosition: "0% 50%",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Animated particles */}
              {[...Array(8)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{
                    x: "50%",
                    y: "50%",
                    opacity: 0
                  }}
                  animate={{
                    x: [
                      "50%", 
                      `${Math.random() * 100}%`
                    ],
                    y: [
                      "50%", 
                      `${Math.random() * 100}%`
                    ],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: i * 0.1
                  }}
                />
              ))}
            </motion.button>
          </MotionWrapper>
          
          {/* Enhanced decorative elements */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-talkmatch-blue/50 to-transparent"
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              boxShadow: [
                '0 0 5px rgba(51, 195, 240, 0.2)',
                '0 0 20px rgba(51, 195, 240, 0.6)',
                '0 0 5px rgba(51, 195, 240, 0.2)'
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          
          {/* Floating tech elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`tech-element-${i}`}
                className="absolute w-16 h-16 rounded-lg border border-talkmatch-blue/20 bg-talkmatch-black-light/30"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                initial={{ opacity: 0.2, rotate: 0, scale: 0.8 }}
                animate={{ 
                  y: [0, -20, 0, 20, 0],
                  rotate: [0, 10, 0, -10, 0],
                  opacity: [0.2, 0.4, 0.2],
                  scale: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section with 3D hover effects */}
      <section id="how-it-works" className="w-full py-20 px-6 bg-talkmatch-black-light relative">
        <div className="grid-background"></div>
        
        {/* 3D perspective container */}
        <motion.div 
          className="max-w-5xl mx-auto relative z-10"
          style={{ perspective: "1000px" }}
          animate={{
            rotateX: mousePosition.y * -2,
            rotateY: mousePosition.x * 2
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 50
          }}
        >
          <MotionWrapper>
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-12 text-center gradient-text"
              animate={{
                textShadow: [
                  "0 0 10px rgba(51, 195, 240, 0.2)",
                  "0 0 20px rgba(51, 195, 240, 0.4)",
                  "0 0 10px rgba(51, 195, 240, 0.2)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              How It Works
            </motion.h2>
          </MotionWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step, index) => (
              <MotionWrapper delay={200 * index} key={index}>
                <motion.div 
                  className="flex flex-col items-center text-center neo-card p-8 hover:shadow-[8px_8px_0px_0px_rgba(51,195,240,0.5)]"
                  whileHover={{ 
                    y: -10, 
                    boxShadow: "10px 10px 0px 0px rgba(51,195,240,0.5)",
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  style={{
                    y: calculateTranslateY(index)
                  }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-talkmatch-black rounded-full flex items-center justify-center mb-4 glow-border"
                    animate={{
                      boxShadow: [
                        "0 0 5px rgba(51, 195, 240, 0.3)",
                        "0 0 15px rgba(51, 195, 240, 0.5)",
                        "0 0 5px rgba(51, 195, 240, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.3
                    }}
                  >
                    <motion.span 
                      className="text-2xl font-bold text-talkmatch-blue"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [1, 0.8, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {step}
                    </motion.span>
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {step === 1 && "Enter a Topic"}
                    {step === 2 && "Find a Match"}
                    {step === 3 && "Talk for 5 Minutes"}
                  </h3>
                  <p className="text-gray-400">
                    {step === 1 && "Type what you're thinking or feeling right now."}
                    {step === 2 && "Get paired with someone feeling similarly."}
                    {step === 3 && "A private voice call, no strings attached."}
                  </p>
                  
                  {/* Animated circuit pattern */}
                  <motion.div 
                    className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden"
                    animate={{
                      backgroundPosition: ['0px 0px', '100px 100px']
                    }}
                    transition={{
                      ease: "linear",
                      duration: 20,
                      repeat: Infinity
                    }}
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M20 20 H80 V80 H20 Z\' fill=\'none\' stroke=\'%2333C3F0\' stroke-width=\'1\'/%3E%3Cpath d=\'M50 0 V100 M0 50 H100\' fill=\'none\' stroke=\'%2333C3F0\' stroke-width=\'1\'/%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'5\' fill=\'%2333C3F0\'/%3E%3C/svg%3E")'
                    }}
                  />
                </motion.div>
              </MotionWrapper>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Key Features Section with advanced styling */}
      <section id="features" className="w-full py-20 px-6 bg-talkmatch-black relative">
        <div className="grid-background"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <MotionWrapper>
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-12 text-center gradient-text"
              animate={{
                textShadow: [
                  "0 0 10px rgba(51, 195, 240, 0.2)",
                  "0 0 20px rgba(51, 195, 240, 0.4)",
                  "0 0 10px rgba(51, 195, 240, 0.2)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Key Features
            </motion.h2>
          </MotionWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Anonymous by default", icon: <UserCheck size={24} /> },
              { title: "No profiles, no signups", icon: <ShieldCheck size={24} /> },
              { title: "Voice-only, no video or typing", icon: <MicVoice size={24} /> },
              { title: "Smart keyword matching", icon: <ArrowRight size={24} /> },
              { title: "5-minute conversation limit", icon: <ArrowRight size={24} /> },
              { title: "Works on all devices", icon: <ArrowRight size={24} /> },
            ].map((feature, index) => (
              <MotionWrapper delay={200 * index} key={index}>
                <motion.div
                  whileHover={{ 
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="h-full"
                >
                  <Card className="glass h-full bg-talkmatch-black-light/50 border border-talkmatch-blue/20 hover:border-talkmatch-blue/70 transition-all duration-300 hover:shadow-[0_0_20px_rgba(51,195,240,0.3)] relative overflow-hidden">
                    {/* Animated border */}
                    <motion.span 
                      className="absolute inset-0 border border-talkmatch-blue/0"
                      animate={{
                        borderColor: ['rgba(51, 195, 240, 0)', 'rgba(51, 195, 240, 0.5)', 'rgba(51, 195, 240, 0)']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                    
                    <CardContent className="p-6 flex items-start gap-4">
                      <motion.div 
                        className="w-10 h-10 rounded-full bg-talkmatch-black flex items-center justify-center flex-shrink-0 border border-talkmatch-blue/30"
                        whileHover={{
                          rotate: 360,
                          borderColor: 'rgba(51, 195, 240, 0.8)',
                        }}
                        transition={{ duration: 0.8 }}
                      >
                        <motion.span 
                          className="text-talkmatch-blue"
                          animate={{
                            scale: [1, 1.15, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.2
                          }}
                        >
                          {feature.icon}
                        </motion.span>
                      </motion.div>
                      <div>
                        <motion.h3 
                          className="font-medium mb-2 text-white"
                          initial={{ opacity: 0.9 }}
                          whileHover={{
                            opacity: 1,
                            color: "#33C3F0",
                            textShadow: "0 0 8px rgba(51, 195, 240, 0.6)"
                          }}
                        >
                          {feature.title}
                        </motion.h3>
                        <p className="text-sm text-gray-400">
                          {feature.title === "Anonymous by default" && "Your identity stays completely private."}
                          {feature.title === "No profiles, no signups" && "Jump straight into conversations."}
                          {feature.title === "Voice-only, no video or typing" && "Real human connection through voice."}
                          {feature.title === "Smart keyword matching" && "Find people who share your thoughts."}
                          {feature.title === "5-minute conversation limit" && "Brief, meaningful exchanges."}
                          {feature.title === "Works on all devices" && "Desktop, tablet, and mobile friendly."}
                        </p>
                      </div>
                    </CardContent>
                    
                    {/* Animated corner accent */}
                    <motion.div 
                      className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-talkmatch-blue/30"
                      animate={{
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                  </Card>
                </motion.div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section with enhanced glassmorphism */}
      <section id="privacy" className="w-full py-20 px-6 bg-talkmatch-black-light relative">
        <div className="grid-background"></div>
        
        {/* Additional animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-full h-full"
            animate={{
              backgroundPosition: ["0px 0px", "100px 100px"]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundImage: `radial-gradient(circle, rgba(51, 195, 240, 0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px"
            }}
          />
        </div>
        
        <motion.div 
          className="max-w-5xl mx-auto relative z-10"
          style={{ perspective: "1000px" }}
        >
          <MotionWrapper>
            <div className="text-center mb-10">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-4 gradient-text"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(51, 195, 240, 0.2)",
                    "0 0 20px rgba(51, 195, 240, 0.4)",
                    "0 0 10px rgba(51, 195, 240, 0.2)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Built for Comfort. Designed for Privacy.
              </motion.h2>
              <motion.p 
                className="text-gray-400 max-w-lg mx-auto"
                animate={{ 
                  y: [0, -3, 0, 3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Your safety and privacy are our top priorities.
              </motion.p>
            </div>
          </MotionWrapper>
          
          <motion.div 
            className="glass p-8 rounded-lg max-w-2xl mx-auto border border-talkmatch-blue/20 hover:border-talkmatch-blue/40 transition-all duration-500 shadow-[0_0_20px_rgba(51,195,240,0.1)] hover:shadow-[0_0_40px_rgba(51,195,240,0.3)]"
            whileHover={{ 
              y: -10,
              rotateY: 2,
              transition: { type: "spring", stiffness: 200, damping: 20 }
            }}
            animate={{
              rotateX: mousePosition.y * -5,
              rotateY: mousePosition.x * 5
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 50
            }}
          >
            {/* Animated border glow effect */}
            <motion.span 
              className="absolute inset-0 rounded-lg opacity-0"
              animate={{ 
                opacity: [0, 0.5, 0],
                boxShadow: ["0 0 0px rgba(51, 195, 240, 0)", "0 0 20px rgba(51, 195, 240, 0.3)", "0 0 0px rgba(51, 195, 240, 0)"],
              }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
            />
            
            <MotionWrapper delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { 
                    title: "No data is stored", 
                    description: "Conversations vanish forever once ended",
                    delay: 0
                  },
                  { 
                    title: "No personal info collected", 
                    description: "Just an anonymous username",
                    delay: 0.2
                  },
                  { 
                    title: "Calls are not recorded", 
                    description: "Your conversations stay between you",
                    delay: 0.4
                  },
                  { 
                    title: "Automatic 5-minute limit", 
                    description: "Brief connections for your comfort",
                    delay: 0.6
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      damping: 20,
                      delay: item.delay
                    }}
                    whileHover={{
                      scale: 1.03,
                      transition: { type: "spring", stiffness: 400, damping: 17 }
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-talkmatch-black flex items-center justify-center flex-shrink-0 border border-talkmatch-blue/30">
                      <motion.span
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }}
                      >
                        <ShieldCheck size={18} className="text-talkmatch-blue" />
                      </motion.span>
                    </div>
                    <div>
                      <motion.p 
                        className="font-medium text-white"
                        whileHover={{
                          color: "#33C3F0",
                          textShadow: "0 0 8px rgba(51, 195, 240, 0.4)"
                        }}
                      >
                        {item.title}
                      </motion.p>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </MotionWrapper>
            
            {/* Digital circuitry overlay */}
            <motion.div
              className="absolute inset-0 rounded-lg opacity-5 pointer-events-none overflow-hidden"
              animate={{
                opacity: [0.05, 0.08, 0.05]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M20 20 H80 V80 H20 Z" fill="none" stroke="#33C3F0" strokeWidth="1" />
                  <path d="M50 20 V80" fill="none" stroke="#33C3F0" strokeWidth="1" />
                  <path d="M20 50 H80" fill="none" stroke="#33C3F0" strokeWidth="1" />
                  <circle cx="50" cy="50" r="3" fill="#33C3F0" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#circuit)" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials Section with enhanced futuristic cards */}
      <section className="w-full py-20 px-6 bg-talkmatch-black relative">
        <div className="grid-background"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <MotionWrapper>
            <div className="text-center mb-10">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-4 gradient-text"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(51, 195, 240, 0.2)",
                    "0 0 20px rgba(51, 195, 240, 0.4)",
                    "0 0 10px rgba(51, 195, 240, 0.2)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                What People Are Saying
              </motion.h2>
            </div>
          </MotionWrapper>

          <div className="max-w-xl mx-auto">
            <MotionWrapper delay={200}>
              {[
                {
                  quote: "I just needed to say it out loud. This app helped more than I expected.",
                  author: "Anonymous User"
                },
                {
                  quote: "Found someone who understood exactly what I was going through. Five minutes of genuine connection.",
                  author: "Anonymous User"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="mb-6 last:mb-0"
                  whileHover={{
                    y: -5,
                    transition: { type: "spring", stiffness: 300, damping: 10 }
                  }}
                  style={{ y: calculateTranslateY(index) }}
                >
                  <Card className="bg-talkmatch-black-light/50 border border-talkmatch-blue/20 hover:border-talkmatch-blue/50 shadow-[0_0_20px_rgba(51,195,240,0.1)] hover:shadow-[0_0_30px_rgba(51,195,240,0.3)] transition-all duration-500 relative overflow-hidden">
                    {/* Animated corner accents */}
                    <motion.div
                      className="absolute top-0 left-0 w-6 h-6 border-t border-l border-talkmatch-blue/50"
                      animate={{
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                    <motion.div
                      className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-talkmatch-blue/50"
                      animate={{
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5 + 0.5
                      }}
                    />
                    
                    <CardContent className="p-8">
                      <motion.p 
                        className="italic mb-4 text-gray-300"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ 
                          opacity: 1,
                          color: "#ffffff"
                        }}
                      >
                        "{testimonial.quote}"
                      </motion.p>
                      <motion.p 
                        className="text-right font-medium text-talkmatch-blue"
                        animate={{
                          color: ["#33C3F0", "#8EC5FC", "#33C3F0"]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        - {testimonial.author}
                      </motion.p>
                    </CardContent>
                    
                    {/* Digital tech pattern overlay */}
                    <motion.div
                      className="absolute inset-0 opacity-5 pointer-events-none"
                      animate={{
                        opacity: [0.03, 0.06, 0.03]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 H80 V80 H20 Z' fill='none' stroke='%2333C3F0' stroke-width='1'/%3E%3Cpath d='M50 20 V80' fill='none' stroke='%2333C3F0' stroke-width='1'/%3E%3Cpath d='M20 50 H80' fill='none' stroke='%2333C3F0' stroke-width='1'/%3E%3Ccircle cx='50' cy='50' r='3' fill='%2333C3F0'/%3E%3C/svg%3E")`
                      }}
                    />
                  </Card>
                </motion.div>
              ))}
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Footer with enhanced futuristic design */}
      <footer className="w-full py-10 px-6 bg-talkmatch-black-light relative border-t border-talkmatch-blue/20">
        <div className="grid-background"></div>
        
        {/* Animated circuit lines */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 H40 V40 H10 Z' fill='none' stroke='%2333C3F0' stroke-width='0.5'/%3E%3Cpath d='M25 10 V40' fill='none' stroke='%2333C3F0' stroke-width='0.5'/%3E%3Cpath d='M10 25 H40' fill='none' stroke='%2333C3F0' stroke-width='0.5'/%3E%3Ccircle cx='25' cy='25' r='1.5' fill='%2333C3F0'/%3E%3C/svg%3E")`
          }}
        />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <MotionWrapper>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.div 
                className="mb-6 md:mb-0"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.h2 
                  className="text-xl font-bold gradient-text relative inline-block"
                  animate={{
                    textShadow: ["0 0 10px rgba(51, 195, 240, 0.2)", "0 0 20px rgba(51, 195, 240, 0.4)", "0 0 10px rgba(51, 195, 240, 0.2)"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  TalkMatch
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-talkmatch-blue/40 to-transparent"
                    animate={{
                      scaleX: [0, 1, 0],
                      transformOrigin: ["left", "right", "left"]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.h2>
                <p className="text-gray-400 text-sm mt-1">Just talk. No pressure. No trace.</p>
              </motion.div>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                {["Home", "Start Talking", "Terms", "Privacy"].map((item, index) => (
                  item === "Start Talking" ? (
                    <motion.button 
                      key={index}
                      onClick={onStartClick}
                      className="text-gray-400 hover:text-talkmatch-blue transition-colors hover-underline relative"
                      whileHover={{
                        scale: 1.05,
                        color: "#33C3F0",
                        textShadow: "0 0 8px rgba(51, 195, 240, 0.4)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                      <motion.span
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-talkmatch-blue/50 scale-x-0"
                        variants={{
                          hover: { scaleX: 1 },
                          initial: { scaleX: 0 }
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  ) : (
                    <motion.a 
                      key={index}
                      href="#"
                      className="text-gray-400 hover:text-talkmatch-blue transition-colors hover-underline relative"
                      whileHover={{
                        scale: 1.05,
                        color: "#33C3F0",
                        textShadow: "0 0 8px rgba(51, 195, 240, 0.4)"
                      }}
                    >
                      {item}
                      <motion.span
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-talkmatch-blue/50 scale-x-0"
                        variants={{
                          hover: { scaleX: 1 },
                          initial: { scaleX: 0 }
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  )
                ))}
              </div>
            </div>
            <div className="text-center mt-8 text-xs text-gray-500">
              <motion.p
                animate={{
                  y: [0, -3, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Built with <motion.span 
                  className="text-talkmatch-blue"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >❤️</motion.span> by TalkMatch
              </motion.p>
              
              {/* Decorative line */}
              <motion.div
                className="w-20 h-px bg-talkmatch-blue/30 mx-auto mt-4"
                animate={{
                  width: ["20%", "40%", "20%"],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </MotionWrapper>
        </div>
      </footer>
    </div>
  );
};

export default LandingScreen;
