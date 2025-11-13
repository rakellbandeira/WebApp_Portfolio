import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/axiosConfig';

// interface matching the Project model
interface Project {
  _id: string;
  title: string;
  description: string;
  stack: string[];
  githubLink?: string;
  demoLink?: string;
  featured?: boolean;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //In case of error
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching projects from:', apiClient.defaults.baseURL + '/api/projects');
        
        const response = await apiClient.get<Project[]>('/api/projects');
        console.log('Projects fetched successfully:', response.data);
        setProjects(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
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
        <div className="text-center">
          <p className="text-console-highlight mb-4">{error}</p>
          <p className="text-sm text-gray-400">Check the browser console for more details</p>
        </div>
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
                {project.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Technologies: {Array.isArray(project.stack) ? project.stack.join(', ') : project.stack}
              </p>
              {project.githubLink && (
                <a 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-console-highlight text-sm hover:underline mt-2 inline-block"
                >
                  GitHub
                </a>
              )}
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