
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import MotionWrapper from "./MotionWrapper";

interface JoinScreenProps {
  onSubmit: (username: string, topic: string) => void;
  onBack: () => void;
}

const JoinScreen: React.FC<JoinScreenProps> = ({ onSubmit, onBack }) => {
  const [username, setUsername] = useState("");
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-6">
      <MotionWrapper delay={100}>
        <h1 className="text-3xl md:text-4xl font-bold mb-10 gradient-text">
          Join a Conversation
        </h1>
      </MotionWrapper>

      <MotionWrapper delay={300} className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Your Display Name
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Anonymous Panda"
              className="input-custom w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium">
              What would you like to talk about?
            </label>
            <textarea
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Feeling lonely, struggling with burnout, excited about my new job..."
              className="input-custom w-full min-h-[120px] resize-none"
              required
            />
            <p className="text-xs text-gray-500">
              Your topic will be used to match you with others.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row sm:justify-between gap-4">
            <button 
              type="button" 
              onClick={onBack}
              className="btn-secondary"
            >
              Back
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-2 w-2 bg-white rounded-full animate-wave"
                        style={{
                          animationDelay: `${i * 0.1}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                  <span>Finding matches</span>
                </div>
              ) : (
                <>
                  Search for Matches
                  <ArrowRight className="ml-2" size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </MotionWrapper>
    </div>
  );
};

export default JoinScreen;
