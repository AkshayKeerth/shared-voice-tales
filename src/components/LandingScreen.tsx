
import React from "react";
import { ArrowRight, ShieldCheck, MicVoice, UserCheck } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import { Card, CardContent } from "./ui/card";

interface LandingScreenProps {
  onStartClick: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onStartClick }) => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-talkmatch-purple-light to-talkmatch-purple/30 py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center">
          <MotionWrapper delay={100}>
            <div className="mb-4">
              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-talkmatch-purple to-talkmatch-pink rounded-full blur opacity-30"></div>
                <h1 className="relative font-bold text-4xl md:text-5xl lg:text-7xl gradient-text">
                  TalkMatch
                </h1>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={300}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 mt-6 text-gray-800">
              Talk to someone who just gets it.
            </h2>
            <p className="text-lg md:text-xl max-w-lg mb-12 text-gray-700">
              Share what's on your mind and instantly voice match with someone feeling the same — anonymously.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={500}>
            <button
              onClick={onStartClick}
              className="btn-primary group"
            >
              Start Talking Now
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
            </button>
          </MotionWrapper>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <MotionWrapper>
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">How It Works</h2>
          </MotionWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MotionWrapper delay={200}>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-talkmatch-purple-light rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-talkmatch-purple">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Enter a Topic</h3>
                <p className="text-gray-600">Type what you're thinking or feeling right now.</p>
              </div>
            </MotionWrapper>

            <MotionWrapper delay={400}>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-talkmatch-purple-light rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-talkmatch-purple">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Find a Match</h3>
                <p className="text-gray-600">Get paired with someone feeling similarly.</p>
              </div>
            </MotionWrapper>

            <MotionWrapper delay={600}>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-talkmatch-purple-light rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-talkmatch-purple">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Talk for 5 Minutes</h3>
                <p className="text-gray-600">A private voice call, no strings attached.</p>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="w-full py-20 px-6 bg-gradient-to-b from-white to-talkmatch-purple-light/30">
        <div className="max-w-5xl mx-auto">
          <MotionWrapper>
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Key Features</h2>
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
                <Card className="card-hover h-full">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-talkmatch-purple-light flex items-center justify-center flex-shrink-0">
                      <span className="text-talkmatch-purple">{feature.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">
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

      {/* Privacy Section */}
      <section className="w-full py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <MotionWrapper>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Built for Comfort. Designed for Privacy.</h2>
              <p className="text-gray-600 max-w-lg mx-auto">Your safety and privacy are our top priorities.</p>
            </div>
          </MotionWrapper>
          
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
            <MotionWrapper delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-talkmatch-purple-light flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={18} className="text-talkmatch-purple" />
                  </div>
                  <div>
                    <p className="font-medium">No data is stored</p>
                    <p className="text-sm text-gray-600">Conversations vanish forever once ended</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-talkmatch-purple-light flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={18} className="text-talkmatch-purple" />
                  </div>
                  <div>
                    <p className="font-medium">No personal info collected</p>
                    <p className="text-sm text-gray-600">Just an anonymous username</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-talkmatch-purple-light flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={18} className="text-talkmatch-purple" />
                  </div>
                  <div>
                    <p className="font-medium">Calls are not recorded</p>
                    <p className="text-sm text-gray-600">Your conversations stay between you</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-talkmatch-purple-light flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={18} className="text-talkmatch-purple" />
                  </div>
                  <div>
                    <p className="font-medium">Automatic 5-minute limit</p>
                    <p className="text-sm text-gray-600">Brief connections for your comfort</p>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Optional) */}
      <section className="w-full py-20 px-6 bg-gradient-to-b from-white to-talkmatch-purple-light/30">
        <div className="max-w-5xl mx-auto">
          <MotionWrapper>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">What People Are Saying</h2>
            </div>
          </MotionWrapper>

          <div className="max-w-xl mx-auto">
            <MotionWrapper delay={200}>
              <Card className="mb-6 glass">
                <CardContent className="p-8">
                  <p className="italic mb-4">"I just needed to say it out loud. This app helped more than I expected."</p>
                  <p className="text-right font-medium">- Anonymous User</p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-8">
                  <p className="italic mb-4">"Found someone who understood exactly what I was going through. Five minutes of genuine connection."</p>
                  <p className="text-right font-medium">- Anonymous User</p>
                </CardContent>
              </Card>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-10 px-6 bg-white border-t">
        <div className="max-w-5xl mx-auto">
          <MotionWrapper>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-xl font-bold gradient-text">TalkMatch</h2>
                <p className="text-gray-600 text-sm mt-1">Just talk. No pressure. No trace.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a href="#" className="text-gray-600 hover:text-talkmatch-purple transition-colors">Home</a>
                <button onClick={onStartClick} className="text-gray-600 hover:text-talkmatch-purple transition-colors">Start Talking</button>
                <a href="#" className="text-gray-600 hover:text-talkmatch-purple transition-colors">Terms</a>
                <a href="#" className="text-gray-600 hover:text-talkmatch-purple transition-colors">Privacy</a>
              </div>
            </div>
            <div className="text-center mt-8 text-xs text-gray-500">
              <p>Built with ❤️ by TalkMatch</p>
            </div>
          </MotionWrapper>
        </div>
      </footer>
    </div>
  );
};

export default LandingScreen;
