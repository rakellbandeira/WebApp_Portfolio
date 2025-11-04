import React from 'react';
import profileImage from '../assets/rakell_profile.png';

const AboutMe: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-console-text p-8 flex items-center justify-center">
      <div className="max-w-2xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-48 h-48 rounded-full border-4 border-console-highlight overflow-hidden">
            <img 
              src={profileImage} alt="Rakell Bandeira" className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h2 className="text-3xl text-console-highlight mb-4">About Me</h2>
        <p className="text-lg">
          I'm Rakell, a passionate software development student focused on 
          creating intuitive and powerful applications, with a keen interest 
          in interfaces and aesthetic solutions that create meaningful impact.
        </p>
        <div className="mt-6 space-x-4">
          <a 
            href="/download-cv" 
            className="bg-console-highlight text-black px-4 py-2 rounded hover:opacity-80"
          >
            Download CV
          </a>
          <a 
            href="https://linkedin.com/in/rakell" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border border-console-text px-4 py-2 rounded hover:bg-gray-800"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;