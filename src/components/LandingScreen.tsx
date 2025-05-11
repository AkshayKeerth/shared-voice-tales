
import React from "react";
import { ArrowRight } from "lucide-react";
import MotionWrapper from "./MotionWrapper";

interface LandingScreenProps {
  onStartClick: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onStartClick }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
      <MotionWrapper delay={100}>
        <div className="mb-4">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-talkmatch-purple to-talkmatch-pink rounded-full blur opacity-30"></div>
            <h1 className="relative font-bold text-4xl md:text-5xl lg:text-6xl gradient-text">
              TalkMatch
            </h1>
          </div>
        </div>
      </MotionWrapper>

      <MotionWrapper delay={300}>
        <p className="text-lg md:text-xl max-w-lg mb-12 text-gray-700">
          Talk to someone who just gets it. No signups. Just a shared voice.
        </p>
      </MotionWrapper>

      <MotionWrapper delay={500}>
        <button
          onClick={onStartClick}
          className="btn-primary group"
        >
          Start Talking
          <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
        </button>
      </MotionWrapper>

      <MotionWrapper delay={700} className="mt-20 max-w-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass p-4 rounded-xl card-hover">
            <p className="font-medium text-sm">Anonymous</p>
          </div>
          <div className="glass p-4 rounded-xl card-hover">
            <p className="font-medium text-sm">5-Minute Chats</p>
          </div>
          <div className="glass p-4 rounded-xl card-hover">
            <p className="font-medium text-sm">Topic-Matched</p>
          </div>
        </div>
      </MotionWrapper>
    </div>
  );
};

export default LandingScreen;
