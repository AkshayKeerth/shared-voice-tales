
import React, { useEffect, useRef } from "react";
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
  
  // Interactive background animation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initial setup
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create particles
    const particlesArray: Particle[] = [];
    const particleCount = 100;
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(51, 195, 240, ${Math.random() * 0.2})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
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
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }
    
    // Connect particles with lines
    function connectParticles() {
      if (!ctx) return;
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.strokeStyle = `rgba(51, 195, 240, ${0.1 * (1 - distance/120)})`;
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Animation loop
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      connectParticles();
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-talkmatch-black text-white relative overflow-hidden">
      {/* Interactive canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <Navbar onStartClick={onStartClick} />

      {/* Hero Section with futuristic design */}
      <section className="w-full relative py-28 px-6 mt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-talkmatch-black via-talkmatch-black-light/30 to-talkmatch-black z-0"></div>
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center relative z-10">
          <MotionWrapper delay={100}>
            <div className="mb-4">
              <div className="relative inline-block">
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-talkmatch-blue to-talkmatch-blue-light rounded-full blur opacity-30"
                  animate={{ 
                    opacity: [0.2, 0.5, 0.2],
                    scale: [0.95, 1.05, 0.95]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <h1 className="relative font-bold text-4xl md:text-5xl lg:text-7xl gradient-text">
                  TalkMatch
                </h1>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={300}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 mt-6 text-gray-200">
              Talk to someone who just <span className="glow-text">gets it.</span>
            </h2>
            <p className="text-lg md:text-xl max-w-lg mb-12 text-gray-400">
              Share what's on your mind and instantly voice match with someone feeling the same — anonymously.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={500}>
            <motion.button
              onClick={onStartClick}
              className="btn-primary group shadow-[0_0_15px_rgba(51,195,240,0.3)] hover:shadow-[0_0_20px_rgba(51,195,240,0.5)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Talking Now
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
            </motion.button>
          </MotionWrapper>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute pointer-events-none bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-talkmatch-blue/50 to-transparent"
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              boxShadow: [
                '0 0 5px rgba(51, 195, 240, 0.2)',
                '0 0 15px rgba(51, 195, 240, 0.4)',
                '0 0 5px rgba(51, 195, 240, 0.2)'
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>
      </section>

      {/* How It Works Section with futuristic elements */}
      <section id="how-it-works" className="w-full py-20 px-6 bg-talkmatch-black-light relative">
        <div className="grid-background"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <MotionWrapper>
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center gradient-text">How It Works</h2>
          </MotionWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MotionWrapper delay={200}>
              <div className="flex flex-col items-center text-center neo-card p-8">
                <div className="w-16 h-16 bg-talkmatch-black rounded-full flex items-center justify-center mb-4 glow-border">
                  <span className="text-2xl font-bold text-talkmatch-blue">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Enter a Topic</h3>
                <p className="text-gray-400">Type what you're thinking or feeling right now.</p>
              </div>
            </MotionWrapper>

            <MotionWrapper delay={400}>
              <div className="flex flex-col items-center text-center neo-card p-8">
                <div className="w-16 h-16 bg-talkmatch-black rounded-full flex items-center justify-center mb-4 glow-border">
                  <span className="text-2xl font-bold text-talkmatch-blue">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Find a Match</h3>
                <p className="text-gray-400">Get paired with someone feeling similarly.</p>
              </div>
            </MotionWrapper>

            <MotionWrapper delay={600}>
              <div className="flex flex-col items-center text-center neo-card p-8">
                <div className="w-16 h-16 bg-talkmatch-black rounded-full flex items-center justify-center mb-4 glow-border">
                  <span className="text-2xl font-bold text-talkmatch-blue">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Talk for 5 Minutes</h3>
                <p className="text-gray-400">A private voice call, no strings attached.</p>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Key Features Section with advanced styling */}
      <section id="features" className="w-full py-20 px-6 bg-talkmatch-black relative">
        <div className="grid-background"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <MotionWrapper>
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center gradient-text">Key Features</h2>
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
                <Card className="glass h-full bg-talkmatch-black-light/50 border border-talkmatch-blue/20 hover:border-talkmatch-blue/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(51,195,240,0.2)]">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-talkmatch-black flex items-center justify-center flex-shrink-0 border border-talkmatch-blue/30">
                      <span className="text-talkmatch-blue">{feature.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-white">{feature.title}</h3>
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
                </Card>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section with futuristic glassmorphism */}
      <section id="privacy" className="w-full py-20 px-6 bg-talkmatch-black-light relative">
        <div className="grid-background"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <MotionWrapper>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">Built for Comfort. Designed for Privacy.</h2>
              <p className="text-gray-400 max-w-lg mx-auto">Your safety and privacy are our top priorities.</p>
            </div>
          </MotionWrapper>
          
          <div className="glass p-8 rounded-lg max-w-2xl mx-auto border border-talkmatch-blue/20 hover:border-talkmatch-blue/40 transition-all duration-300 shadow-[0_0_20px_rgba(51,195,240,0.1)] hover:shadow-[0_0_30px_rgba(51,195,240,0.2)]">
            <MotionWrapper delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-talkmatch-black flex items-center justify-center flex-shrink-0 border border-talkmatch-blue/30">
                    <ShieldCheck size={18} className="text-talkmatch-blue" />
                  </div>
                  <div>
                    <p className="font-medium text-white">No data is stored</p>
                    <p className="text-sm text-gray-400">Conversations vanish forever once ended</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-talkmatch-black flex items-center justify-center flex-shrink-0 border border-talkmatch-blue/30">
                    <ShieldCheck size={18} className="text-talkmatch-blue" />
                  </div>
                  <div>
                    <p className="font-medium text-white">No personal info collected</p>
                    <p className="text-sm text-gray-400">Just an anonymous username</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-talkmatch-black flex items-center justify-center flex-shrink-0 border border-talkmatch-blue/30">
                    <ShieldCheck size={18} className="text-talkmatch-blue" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Calls are not recorded</p>
                    <p className="text-sm text-gray-400">Your conversations stay between you</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-talkmatch-black flex items-center justify-center flex-shrink-0 border border-talkmatch-blue/30">
                    <ShieldCheck size={18} className="text-talkmatch-blue" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Automatic 5-minute limit</p>
                    <p className="text-sm text-gray-400">Brief connections for your comfort</p>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Testimonials Section with futuristic cards */}
      <section className="w-full py-20 px-6 bg-talkmatch-black relative">
        <div className="grid-background"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <MotionWrapper>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">What People Are Saying</h2>
            </div>
          </MotionWrapper>

          <div className="max-w-xl mx-auto">
            <MotionWrapper delay={200}>
              <Card className="mb-6 bg-talkmatch-black-light/50 border border-talkmatch-blue/20 hover:border-talkmatch-blue/50 shadow-[0_0_20px_rgba(51,195,240,0.1)] hover:shadow-[0_0_30px_rgba(51,195,240,0.2)] transition-all duration-300">
                <CardContent className="p-8">
                  <p className="italic mb-4 text-gray-300">"I just needed to say it out loud. This app helped more than I expected."</p>
                  <p className="text-right font-medium text-talkmatch-blue">- Anonymous User</p>
                </CardContent>
              </Card>

              <Card className="bg-talkmatch-black-light/50 border border-talkmatch-blue/20 hover:border-talkmatch-blue/50 shadow-[0_0_20px_rgba(51,195,240,0.1)] hover:shadow-[0_0_30px_rgba(51,195,240,0.2)] transition-all duration-300">
                <CardContent className="p-8">
                  <p className="italic mb-4 text-gray-300">"Found someone who understood exactly what I was going through. Five minutes of genuine connection."</p>
                  <p className="text-right font-medium text-talkmatch-blue">- Anonymous User</p>
                </CardContent>
              </Card>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Footer with futuristic design */}
      <footer className="w-full py-10 px-6 bg-talkmatch-black-light relative border-t border-talkmatch-blue/20">
        <div className="grid-background"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <MotionWrapper>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-xl font-bold gradient-text">TalkMatch</h2>
                <p className="text-gray-400 text-sm mt-1">Just talk. No pressure. No trace.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-talkmatch-blue transition-colors hover-underline">Home</a>
                <button onClick={onStartClick} className="text-gray-400 hover:text-talkmatch-blue transition-colors hover-underline">Start Talking</button>
                <a href="#" className="text-gray-400 hover:text-talkmatch-blue transition-colors hover-underline">Terms</a>
                <a href="#" className="text-gray-400 hover:text-talkmatch-blue transition-colors hover-underline">Privacy</a>
              </div>
            </div>
            <div className="text-center mt-8 text-xs text-gray-500">
              <p>Built with <span className="text-talkmatch-blue">❤️</span> by TalkMatch</p>
            </div>
          </MotionWrapper>
        </div>
      </footer>
    </div>
  );
};

export default LandingScreen;
