import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Define an interface matching the Project model
interface Project {
  _id: string;
  title: string;
  description: string;
  stack: string;
  githubLink?: string;
  demoLink?: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //In case of error in fetching data
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        
        const response = await axios.get<Project[]>('/api/projects'); //critical point!!!
        setProjects(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch projects');
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-console-text flex items-center justify-center">
        Loading projects...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-console-text flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-console-text p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl text-console-highlight mb-6">My Projects</h2>
        
        <div className="space-y-4">
          {projects.map((project) => (
            <div 
              key={project._id} 
              className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Link 
                to={`/projects/${project._id}`} 
                className="block"
              >
                <h3 className="text-xl text-console-text hover:text-console-highlight">
                  {project.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-400 mt-2">
                Technologies: {project.stack}
              </p>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center text-gray-500">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;