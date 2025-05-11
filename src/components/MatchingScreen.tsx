
import React from "react";
import MotionWrapper from "./MotionWrapper";

interface User {
  id: string;
  username: string;
  topic: string;
}

interface MatchingScreenProps {
  users: User[];
  onCallUser: (user: User) => void;
  onBack: () => void;
}

const MatchingScreen: React.FC<MatchingScreenProps> = ({
  users,
  onCallUser,
  onBack,
}) => {
  return (
    <div className="flex flex-col items-center min-h-[90vh] px-6 py-10">
      <MotionWrapper delay={100}>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
          Who's Talking?
        </h1>
      </MotionWrapper>

      <MotionWrapper delay={300} className="w-full max-w-3xl">
        {users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((user, index) => (
              <div
                key={user.id}
                className="glass rounded-xl p-6 card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-medium mb-2">{user.username}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {user.topic}
                </p>
                <button
                  onClick={() => onCallUser(user)}
                  className="bg-talkmatch-purple text-white px-4 py-2 rounded-full text-sm hover:bg-talkmatch-purple-dark transition-colors"
                >
                  Call
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="mb-6">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 bg-talkmatch-purple/20 rounded-full animate-pulse-gentle"></div>
                <div className="absolute inset-2 bg-talkmatch-purple/30 rounded-full animate-pulse-gentle" style={{ animationDelay: "0.2s" }}></div>
                <div className="absolute inset-4 bg-talkmatch-purple/40 rounded-full animate-pulse-gentle" style={{ animationDelay: "0.4s" }}></div>
                <div className="absolute inset-6 bg-talkmatch-purple rounded-full"></div>
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">No matches yet</h3>
            <p className="text-gray-600 mb-8">
              You'll be notified if someone else is thinking like you.
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <button onClick={onBack} className="btn-secondary">
            Back
          </button>
        </div>
      </MotionWrapper>
    </div>
  );
};

export default MatchingScreen;
