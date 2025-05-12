
import React, { useState, useEffect } from "react";
import { ArrowRight, Rocket, Zap } from "lucide-react";
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

  // Generate particles for background effect
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1
    }));
    setParticles(newParticles);
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

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 overflow-hidden">
      {/* Advanced interactive background with grid effect and floating particles */}
      <div className="fixed inset-0 bg-talkmatch-black z-0">
        {/* Grid background with 3D perspective */}
        <div className="grid-background perspective-1000"></div>
        
        {/* Glowing particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-talkmatch-blue/30"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              filter: "blur(1px)"
            }}
            animate={{
              x: [
                Math.random() * 50 - 25,
                Math.random() * 50 - 25,
                Math.random() * 50 - 25,
              ],
              y: [
                Math.random() * 50 - 25,
                Math.random() * 50 - 25,
                Math.random() * 50 - 25,
              ],
              opacity: [0.2, 0.8, 0.2],
              boxShadow: [
                "0 0 5px rgba(51, 195, 240, 0.3)",
                "0 0 15px rgba(51, 195, 240, 0.7)",
                "0 0 5px rgba(51, 195, 240, 0.3)"
              ]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Cyberpunk-inspired radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-talkmatch-blue/5 via-transparent to-transparent opacity-70"></div>
      </div>
      
      <motion.div 
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={itemVariants} 
          className="mb-10 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold gradient-text flex items-center justify-center gap-3">
            <Rocket className="animate-float-slow text-talkmatch-blue" size={36} />
            Join a Conversation
            <Zap className="animate-pulse-glow text-talkmatch-blue" size={36} />
          </h1>
          <motion.div 
            className="h-1 w-0 bg-gradient-to-r from-talkmatch-blue-light to-talkmatch-blue mx-auto mt-3 rounded-full"
            animate={{ width: "60%" }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6 neo-card p-6"
          variants={itemVariants}
        >
          <motion.div 
            className="space-y-2"
            variants={itemVariants}
          >
            <label htmlFor="username" className="text-sm font-medium flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-talkmatch-blue mr-2 animate-pulse-glow"></span>
              Your Display Name
            </label>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="overflow-hidden"
            >
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Anonymous Panda"
                className="input-custom w-full glow-border"
                required
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className="space-y-2"
            variants={itemVariants}
          >
            <label htmlFor="topic" className="text-sm font-medium flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-talkmatch-blue mr-2 animate-pulse-glow"></span>
              What would you like to talk about?
            </label>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="overflow-hidden"
            >
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Feeling lonely, struggling with burnout, excited about my new job..."
                className="input-custom w-full min-h-[120px] resize-none glow-border"
                required
              />
            </motion.div>
            <motion.p 
              className="text-xs text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Your topic will be used to match you with others.
            </motion.p>
          </motion.div>

          <motion.div 
            className="pt-4 flex flex-col sm:flex-row sm:justify-between gap-4"
            variants={itemVariants}
          >
            <motion.button 
              type="button" 
              onClick={onBack}
              className="btn-secondary relative overflow-hidden group"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span className="relative z-10">Back</span>
              <motion.div
                className="absolute inset-0 bg-talkmatch-blue/10 transform origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
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
            
            <motion.button 
              type="submit" 
              className="btn-primary relative overflow-hidden group"
              disabled={isLoading}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-2 w-2 bg-white rounded-full"
                        animate={{
                          y: ["0%", "-100%", "0%"]
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "easeInOut",
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                  <span>Finding matches</span>
                </div>
              ) : (
                <>
                  <span className="relative z-10">Search for Matches</span>
                  <motion.div
                    className="ml-2 relative z-10"
                    animate={{ 
                      x: [0, 5, 0],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop"
                      }
                    }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </>
              )}
              
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-talkmatch-blue via-talkmatch-blue-light to-talkmatch-blue bg-[length:200%_auto] opacity-0 group-hover:opacity-100"
                animate={{
                  backgroundPosition: ["0%", "100%"]
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
              
              {/* Glow effect */}
              <motion.span
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(51, 195, 240, 0)",
                    "0 0 20px rgba(51, 195, 240, 0.7)",
                    "0 0 0px rgba(51, 195, 240, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>
        </motion.form>
        
        {/* Decorative elements */}
        <motion.div
          className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-talkmatch-blue/5"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div
          className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-talkmatch-blue/5"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 5,
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
