import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import Projects from '../components/Projects';

const ConsoleWelcome: React.FC = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [showProjects, setShowProjects] = useState(false);
  //const navigate = useNavigate();

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    switch(command.toLowerCase().trim()) {
      case 'about rakell':
        setShowProjects(false);
        setOutput(`Hi, I'm Rakell, a passionate software development student focused on creating intuitive and powerful web applications.`);
        setCommand('');
        break;
      case 'projects':
        setShowProjects(true);
        setOutput('');
        setCommand('');
        break;
      case 'contact':
        setShowProjects(false);
        setOutput(`Type your email and message to contact me.`);
        setCommand('');
        break;
      default:
        setShowProjects(false);
        setOutput('Invalid command. Try "about rakell", "projects", or "contact"');
    }
  };

  if (showProjects) {
    return <Projects />;
  }

  return (
    <div className="min-h-screen bg-black p-4 font-console text-console-text">
      <div className="console-window bg-gray-900 p-4 rounded">
        <p>PS C:\Users\Rakell\Documents\Portfolio</p>
        <p>Welcome to my portfolio application v1.0</p>
        <p>Type 'about rakell' to get to know more about me.</p>
        <p>Type 'projects' to see my past projects.</p>
        <p>Type 'contact' to email me something.</p>

        <form onSubmit={handleCommandSubmit} className="mt-4">
          <span>&gt;run </span>
          <input 
            type="text" 
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="bg-black text-console-text border-none outline-none ml-2 w-3/4"
            placeholder="Enter command"
            autoFocus
          />
         
        </form>

        {output && (
          <div className="mt-4 text-console-highlight">
            <p>{output}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsoleWelcome;