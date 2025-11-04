import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Project {
  _id: string;
  title: string;
  description: string;
  stack: string;
  githubLink?: string;
  demoLink?: string;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get<Project>(`/api/projects/${id}`);
        setProject(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch project details');
        setIsLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-console-text flex items-center justify-center">
        Loading project details...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-black text-console-text flex items-center justify-center">
        {error || 'Project not found'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-console-text p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl text-console-highlight mb-6">{project.title}</h2>
        
        <div className="bg-gray-900 p-6 rounded-lg">
          <p className="mb-4">{project.description}</p>
          
          <div className="mb-4">
            <h4 className="text-console-highlight mb-2">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.split(',').map((tech) => (
                <span 
                  key={tech.trim()} 
                  className="bg-console-text text-black px-2 py-1 rounded text-sm"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-4">
            {project.githubLink && (
              <a 
                href={project.githubLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-console-highlight text-black px-4 py-2 rounded hover:opacity-80"
              >
                GitHub
              </a>
            )}
            {project.demoLink && (
              <a 
                href={project.demoLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-console-text px-4 py-2 rounded hover:bg-gray-800"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <Link 
            to="/projects" //critical point!!!
            className="text-console-text hover:text-console-highlight"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;