import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Creating a React Functional Component
const LanguageSelector: React.FC = () => {

    //using the state hook, the first is the value, initialized to a default state and the second is a function that can be called to update it.
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  //using the navigate hook, this stores teh result in a variable, making it possible to call : navigate('/some-path')
  const navigate = useNavigate();

  const handleContinue = () => {
    // Store language selection if needed
    localStorage.setItem('appLanguage', selectedLanguage);
    // Navigate to console welcome page
    navigate('/console');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-console-text text-2xl mb-4">Choose your language</h2>
        <select 
          className="w-full p-2 mb-4 bg-gray-700 text-console-text"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Spanish">Spanish</option>
        </select>
        <button 
          className="bg-console-highlight text-white px-4 py-2 rounded"
          onClick={handleContinue}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;