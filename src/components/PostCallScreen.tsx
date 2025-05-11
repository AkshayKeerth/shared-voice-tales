
import React from "react";
import { Phone, X } from "lucide-react";
import MotionWrapper from "./MotionWrapper";

interface PostCallScreenProps {
  onTalkAgain: () => void;
  onExit: () => void;
}

const PostCallScreen: React.FC<PostCallScreenProps> = ({
  onTalkAgain,
  onExit,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-6">
      <MotionWrapper delay={100}>
        <div className="mb-6">
          <div className="bg-gradient-calm w-20 h-20 rounded-full flex items-center justify-center mx-auto">
            <Phone className="text-talkmatch-purple" size={32} />
          </div>
        </div>
      </MotionWrapper>

      <MotionWrapper delay={300}>
        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-center">
          Thanks for sharing your thoughts
        </h1>
      </MotionWrapper>

      <MotionWrapper delay={500}>
        <p className="text-gray-600 mb-10 text-center max-w-md">
          We hope you had a meaningful conversation. Want to connect again?
        </p>
      </MotionWrapper>

      <MotionWrapper delay={700}>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onTalkAgain}
            className="btn-primary"
          >
            Talk to Someone Else
          </button>
          <button
            onClick={onExit}
            className="btn-secondary"
          >
            Exit
          </button>
        </div>
      </MotionWrapper>
    </div>
  );
};

export default PostCallScreen;
