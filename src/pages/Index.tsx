
import React, { useState, useEffect } from "react";
import LandingScreen from "../components/LandingScreen";
import JoinScreen from "../components/JoinScreen";
import MatchingScreen from "../components/MatchingScreen";
import CallAlert from "../components/CallAlert";
import VoiceCallUI from "../components/VoiceCallUI";
import PostCallScreen from "../components/PostCallScreen";

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: "1",
    username: "Thoughtful Mind",
    topic: "Feeling overwhelmed with all that's happening in the world lately."
  },
  {
    id: "2",
    username: "Quiet Listener",
    topic: "Struggling with burnout at work and trying to find balance."
  },
  {
    id: "3",
    username: "Kind Soul",
    topic: "Excited about my new career path but also nervous about the change."
  },
  {
    id: "4",
    username: "Deep Thinker",
    topic: "Missing human connection in this increasingly digital world."
  }
];

// App states
type AppState = "landing" | "join" | "matching" | "calling" | "postcall";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("landing");
  const [username, setUsername] = useState("");
  const [topic, setTopic] = useState("");
  const [users, setUsers] = useState(MOCK_USERS);
  const [currentCaller, setCurrentCaller] = useState({ username: "" });
  const [showCallAlert, setShowCallAlert] = useState(false);
  
  // Simulate an incoming call after a delay
  useEffect(() => {
    if (appState === "matching") {
      const timer = setTimeout(() => {
        setCurrentCaller({ username: "Anonymous User" });
        setShowCallAlert(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const handleStartClick = () => {
    setAppState("join");
  };

  const handleJoinSubmit = (username: string, topic: string) => {
    setUsername(username);
    setTopic(topic);
    setAppState("matching");
    
    // Filter users based on topic keywords (simple simulation)
    const keywords = topic.toLowerCase().split(" ");
    const filteredUsers = MOCK_USERS.filter(user => 
      keywords.some(keyword => 
        user.topic.toLowerCase().includes(keyword) && keyword.length > 3
      )
    );
    
    setUsers(filteredUsers.length > 0 ? filteredUsers : []);
  };

  const handleCallUser = (user: any) => {
    setCurrentCaller(user);
    setAppState("calling");
  };

  const handleAcceptCall = () => {
    setShowCallAlert(false);
    setAppState("calling");
  };

  const handleDeclineCall = () => {
    setShowCallAlert(false);
  };

  const handleEndCall = () => {
    setAppState("postcall");
  };

  const handleTalkAgain = () => {
    setAppState("join");
  };

  const handleExit = () => {
    setAppState("landing");
  };

  const handleBack = () => {
    switch (appState) {
      case "join":
        setAppState("landing");
        break;
      case "matching":
        setAppState("join");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-talkmatch-purple-light/40">
      {appState === "landing" && <LandingScreen onStartClick={handleStartClick} />}
      
      {appState === "join" && (
        <JoinScreen onSubmit={handleJoinSubmit} onBack={handleBack} />
      )}
      
      {appState === "matching" && (
        <MatchingScreen 
          users={users} 
          onCallUser={handleCallUser} 
          onBack={handleBack} 
        />
      )}
      
      {appState === "calling" && (
        <VoiceCallUI 
          onEndCall={handleEndCall}
          caller={currentCaller}
        />
      )}
      
      {appState === "postcall" && (
        <PostCallScreen 
          onTalkAgain={handleTalkAgain} 
          onExit={handleExit} 
        />
      )}
      
      <CallAlert 
        isOpen={showCallAlert} 
        onAccept={handleAcceptCall} 
        onDecline={handleDeclineCall}
        caller={currentCaller}
      />
    </div>
  );
};

export default Index;
