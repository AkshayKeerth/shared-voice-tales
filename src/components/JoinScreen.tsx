
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Rocket, Zap, Search, Loader } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import { motion } from "framer-motion";

interface JoinScreenProps {
  onSubmit: (username: string, topic: string) => void;
  onBack: () => void;
}

const JoinScreen: React.FC<JoinScreenProps> = ({ onSubmit, onBack }) => {
  const [username, setUsername] = useState("");
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);
  const [scanLines, setScanLines] = useState<Array<{id: number, y: number, height: number, opacity: number}>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate particles for background effect
  useEffect(() => {
    const newParticles = Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1
    }));
    setParticles(newParticles);

    // Generate scan lines for cyberpunk effect
    const newScanLines = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      y: (i * 100) / 15,
      height: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.2 + 0.1
    }));
    setScanLines(newScanLines);

    // Setup canvas effects
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(51, 195, 240, 0.03)');
        gradient.addColorStop(1, 'rgba(15, 160, 206, 0.03)');
        
        const drawGridPattern = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw main grid
          ctx.beginPath();
          ctx.lineWidth = 0.3;
          ctx.strokeStyle = 'rgba(51, 195, 240, 0.2)';
          
          // Vertical lines
          for (let x = 0; x <= canvas.width; x += 30) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
          }
          
          // Horizontal lines
          for (let y = 0; y <= canvas.height; y += 30) {
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
          }
          
          ctx.stroke();
          
          // Draw glowing dots at intersections
          for (let x = 0; x <= canvas.width; x += 90) {
            for (let y = 0; y <= canvas.height; y += 90) {
              if (Math.random() > 0.7) {
                const radius = Math.random() * 1.5 + 0.5;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(51, 195, 240, 0.7)';
                ctx.fill();
                
                // Add glow
                const glow = ctx.createRadialGradient(x, y, 0, x, y, radius * 4);
                glow.addColorStop(0, 'rgba(51, 195, 240, 0.4)');
                glow.addColorStop(1, 'rgba(51, 195, 240, 0)');
                
                ctx.beginPath();
                ctx.arc(x, y, radius * 4, 0, Math.PI * 2);
                ctx.fillStyle = glow;
                ctx.fill();
              }
            }
          }
          
          // Add subtle noise
          for (let i = 0; i < 200; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 0.5;
            const opacity = Math.random() * 0.1;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.fill();
          }
          
          requestAnimationFrame(drawGridPattern);
        };
        
        drawGridPattern();
      }
    }
    
    // Handle resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && topic.trim()) {
      setIsLoading(true);
      // Simulate loading for a better UX
      setTimeout(() => {
        onSubmit(username, topic);
        setIsLoading(false);
      }, 1500);
    }
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 0 20px rgba(51, 195, 240, 0.7)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  // Text typing effect
  const typingVariants = {
    hidden: { width: "0%" },
    visible: { 
      width: "100%", 
      transition: { 
        duration: 0.8, 
        ease: "easeInOut" 
      } 
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 overflow-hidden">
      {/* Advanced 3D grid background canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Scan lines overlay for cyberpunk effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {scanLines.map((line) => (
          <motion.div
            key={line.id}
            className="absolute w-full"
            style={{
              top: `${line.y}%`,
              height: `${line.height}px`,
              background: `rgba(51, 195, 240, ${line.opacity})`,
              backdropFilter: "blur(0.3px)",
            }}
            initial={{ opacity: line.opacity }}
            animate={{ 
              opacity: [line.opacity, line.opacity * 2, line.opacity],
              y: [0, 1, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 1 + Math.random() * 3,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Grid background with 3D perspective */}
      <div className="fixed inset-0 bg-talkmatch-black z-0">
        <div className="grid-background perspective-1000"></div>
        
        {/* Enhanced glowing particles with varied effects */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-talkmatch-blue/30"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              filter: `blur(${particle.size / 2}px)`
            }}
            animate={{
              x: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              y: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              opacity: [0.2, 0.8, 0.2],
              boxShadow: [
                "0 0 5px rgba(51, 195, 240, 0.3)",
                "0 0 15px rgba(51, 195, 240, 0.7)",
                "0 0 5px rgba(51, 195, 240, 0.3)"
              ],
              scale: [
                1,
                1 + Math.random() * 0.5,
                1
              ]
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Improved radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-talkmatch-blue/10 via-transparent to-transparent opacity-70"></div>
      </div>
      
      {/* Main content with enhanced animations */}
      <motion.div 
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={itemVariants} 
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold gradient-text flex items-center justify-center gap-3 relative">
            {/* Decorative elements behind text */}
            <motion.div 
              className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-talkmatch-blue/5 z-[-1]"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, 0] 
              }}
              transition={{ duration: 7, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -right-10 -top-5 w-20 h-20 rounded-full bg-talkmatch-blue/5 z-[-1]"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, -15, 0] 
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
            />
            
            <motion.div
              animate={{
                rotate: [0, 360],
                filter: ["drop-shadow(0 0 5px rgba(51, 195, 240, 0.3))", "drop-shadow(0 0 15px rgba(51, 195, 240, 0.7))", "drop-shadow(0 0 5px rgba(51, 195, 240, 0.3))"]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                filter: { duration: 3, repeat: Infinity, repeatType: "reverse" }
              }}
            >
              <Rocket className="animate-float-slow text-talkmatch-blue" size={36} />
            </motion.div>
            <span className="z-10">Search for Matches</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                filter: ["drop-shadow(0 0 5px rgba(51, 195, 240, 0.3))", "drop-shadow(0 0 15px rgba(51, 195, 240, 0.7))", "drop-shadow(0 0 5px rgba(51, 195, 240, 0.3))"]
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity, repeatType: "reverse" },
                filter: { duration: 3, repeat: Infinity, repeatType: "reverse" }
              }}
            >
              <Search className="animate-pulse-glow text-talkmatch-blue" size={30} />
            </motion.div>
          </h1>
          
          {/* Animated underline with gradient */}
          <motion.div 
            className="h-1 w-0 bg-gradient-to-r from-talkmatch-blue-light to-talkmatch-blue mx-auto mt-3 rounded-full relative overflow-hidden"
            animate={{ width: "70%" }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <motion.div 
              className="absolute inset-0 bg-white/30"
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Enhanced form card with futuristic effects */}
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6 rounded-xl backdrop-blur-xl bg-black/40 border border-talkmatch-blue/20 p-6 shadow-[0_0_25px_rgba(51,195,240,0.1)]"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Decorative tech corner elements */}
          <div className="absolute -top-1 -right-1 w-10 h-10 border-t-2 border-r-2 rounded-tr-lg border-talkmatch-blue/70"></div>
          <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-2 border-l-2 rounded-bl-lg border-talkmatch-blue/70"></div>
          
          {/* Scanning animation at the top */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-talkmatch-blue to-transparent"
            animate={{
              y: ["0%", "100%", "0%"],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="space-y-2 relative"
            variants={itemVariants}
          >
            <label htmlFor="username" className="text-sm font-medium flex items-center group">
              {/* Animated indicator dot */}
              <motion.span 
                className="inline-block w-2 h-2 rounded-full bg-talkmatch-blue mr-2"
                animate={{
                  scale: [1, 1.5, 1],
                  boxShadow: [
                    "0 0 5px rgba(51, 195, 240, 0.3)",
                    "0 0 15px rgba(51, 195, 240, 0.7)",
                    "0 0 5px rgba(51, 195, 240, 0.3)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                Your Display Name
              </motion.span>
            </label>
            
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="overflow-hidden relative"
            >
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Anonymous Panda"
                className="bg-black/50 border border-talkmatch-blue/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-talkmatch-blue/50 focus:outline-none transition-all duration-300 w-full text-gray-100 placeholder:text-gray-500"
                required
              />
              
              {/* Interactive highlight effect */}
              <motion.div 
                className="absolute inset-0 rounded-xl border border-talkmatch-blue/40 pointer-events-none opacity-0"
                animate={{
                  opacity: [0, 0.5, 0],
                  boxShadow: [
                    "0 0 0px rgba(51, 195, 240, 0)",
                    "0 0 15px rgba(51, 195, 240, 0.3)",
                    "0 0 0px rgba(51, 195, 240, 0)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className="space-y-2 relative"
            variants={itemVariants}
          >
            <label htmlFor="topic" className="text-sm font-medium flex items-center">
              {/* Animated indicator dot */}
              <motion.span 
                className="inline-block w-2 h-2 rounded-full bg-talkmatch-blue mr-2"
                animate={{
                  scale: [1, 1.5, 1],
                  boxShadow: [
                    "0 0 5px rgba(51, 195, 240, 0.3)",
                    "0 0 15px rgba(51, 195, 240, 0.7)",
                    "0 0 5px rgba(51, 195, 240, 0.3)"
                  ]
                }}
                transition={{
                  duration: 2,
                  delay: 0.3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                What would you like to talk about?
              </motion.span>
            </label>
            
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="overflow-hidden relative"
            >
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Feeling lonely, struggling with burnout, excited about my new job..."
                className="bg-black/50 border border-talkmatch-blue/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-talkmatch-blue/50 focus:outline-none transition-all duration-300 w-full min-h-[120px] resize-none text-gray-100 placeholder:text-gray-500"
                required
              />
              
              {/* Interactive highlight effect */}
              <motion.div 
                className="absolute inset-0 rounded-xl border border-talkmatch-blue/40 pointer-events-none opacity-0"
                animate={{
                  opacity: [0, 0.5, 0],
                  boxShadow: [
                    "0 0 0px rgba(51, 195, 240, 0)",
                    "0 0 15px rgba(51, 195, 240, 0.3)",
                    "0 0 0px rgba(51, 195, 240, 0)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 0.2
                }}
              />
            </motion.div>
            
            {/* Enhanced hint text */}
            <motion.p 
              className="text-xs text-gray-500 pl-4 border-l border-talkmatch-blue/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.span 
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                className="inline-block overflow-hidden whitespace-nowrap"
              >
                Your topic will be used to match you with others.
              </motion.span>
            </motion.p>
          </motion.div>

          <motion.div 
            className="pt-4 flex flex-col sm:flex-row sm:justify-between gap-4"
            variants={itemVariants}
          >
            {/* Back button with enhanced effects */}
            <motion.button 
              type="button" 
              onClick={onBack}
              className="backdrop-blur-md bg-black/50 border border-talkmatch-blue/30 text-talkmatch-blue px-8 py-3 rounded-lg font-medium shadow-sm transition-all duration-300 flex items-center justify-center hover:border-talkmatch-blue/60 relative overflow-hidden group"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span className="relative z-10">Back</span>
              
              {/* Interactive hover effect */}
              <motion.div
                className="absolute inset-0 bg-talkmatch-blue/10 transform origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Pulse glow effect */}
              <motion.span
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(51, 195, 240, 0)",
                    "0 0 15px rgba(51, 195, 240, 0.3)",
                    "0 0 0px rgba(51, 195, 240, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
            
            {/* Search button with enhanced loading states and effects */}
            <motion.button 
              type="submit" 
              className="bg-gradient-to-r from-talkmatch-blue to-talkmatch-blue-dark text-white px-8 py-3 rounded-lg font-medium shadow-md transition-all duration-300 flex items-center justify-center relative overflow-hidden"
              disabled={isLoading}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader size={18} className="text-white" />
                  </motion.div>
                  <span>Finding matches</span>
                </div>
              ) : (
                <>
                  <Search className="mr-2" size={18} />
                  <span className="relative z-10">Search for Matches</span>
                  <motion.div
                    className="ml-2 relative z-10"
                    animate={{ 
                      x: [0, 5, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </>
              )}
              
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-talkmatch-blue via-talkmatch-blue-light to-talkmatch-blue bg-[length:200%_auto]"
                animate={{
                  backgroundPosition: ["0%", "100%"]
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
              
              {/* Glowing border effect */}
              <motion.div 
                className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-talkmatch-blue to-talkmatch-blue-light opacity-0 group-hover:opacity-100 blur"
                animate={{
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
            </motion.button>
          </motion.div>
        </motion.form>
        
        {/* Floating decorative elements */}
        <motion.div
          className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-r from-talkmatch-blue/10 to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 45, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div
          className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-gradient-to-r from-talkmatch-blue/10 to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, -45, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </motion.div>
    </div>
  );
};

export default JoinScreen;
