
import React, { useState, useEffect } from "react";
import { PhoneOff, Mic, MicOff } from "lucide-react";
import MotionWrapper from "./MotionWrapper";

interface VoiceCallUIProps {
  onEndCall: () => void;
  caller: {
    username: string;
  };
}

const VoiceCallUI: React.FC<VoiceCallUIProps> = ({ onEndCall, caller }) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onEndCall();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onEndCall]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real app, you would implement actual mute functionality here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-talkmatch-purple/10 to-talkmatch-pink/10 -z-10"></div>
      
      {/* Audio wave animation */}
      <div className="absolute inset-0 flex items-center justify-center -z-5 opacity-30">
        <div className="relative w-[300px] h-[300px]">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-talkmatch-purple rounded-full animate-pulse-gentle"
              style={{
                animationDelay: `${i * 0.4}s`,
                transform: `scale(${0.6 + i * 0.1})`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <MotionWrapper delay={100} className="z-10">
        <h2 className="text-lg font-medium mb-2">
          Talking with <span className="gradient-text">{caller.username}</span>
        </h2>
      </MotionWrapper>

      <MotionWrapper delay={300} className="z-10">
        <div className="bg-white/80 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-lg mb-10 mt-4">
          <p className="text-4xl font-bold text-talkmatch-purple">
            {formatTime(timeLeft)}
          </p>
        </div>
      </MotionWrapper>

      <MotionWrapper delay={500} className="z-10">
        <div className="flex space-x-4 mt-6">
          <button
            onClick={toggleMute}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isMuted
                ? "bg-talkmatch-gray text-white"
                : "bg-white text-talkmatch-purple-dark"
            }`}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          
          <button
            onClick={onEndCall}
            className="bg-destructive text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
          >
            <PhoneOff size={20} />
          </button>
        </div>
      </MotionWrapper>
    </div>
  );
};

export default VoiceCallUI;
