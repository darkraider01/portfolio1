import React from 'react';
import { Code, Plus, Trash2, ExternalLink, Github } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      githubUrl: '',
      liveUrl: '',
      imageUrl: ''
    };
    onChange([...data, newProject]);
  };

  const removeProject = (id: string) => {
    onChange(data.filter(project => project.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    onChange(data.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const updateTechnologies = (id: string, techString: string) => {
    const technologies = techString.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0);
    updateProject(id, 'technologies', technologies);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 backdrop-blur-sm bg-opacity-95">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Code className="w-6 h-6 text-blue-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        </div>
        <button
          onClick={addProject}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </button>
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No projects yet. Click "Add Project" to showcase your work.</p>
        </div>
      )}

      <div className="space-y-6">
        {data.map((project) => (
          <div key={project.id} className="border border-gray-200 rounded-lg p-6 relative">
            <button
              onClick={() => removeProject(project.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Awesome Project"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technologies *
                </label>
                <input
                  type="text"
                  value={project.technologies.join(', ')}
                  onChange={(e) => updateTechnologies(project.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, TypeScript, Node.js"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe what this project does, the problem it solves, and key features..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Github className="w-4 h-4 inline mr-1" />
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={project.githubUrl}
                  onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/username/project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ExternalLink className="w-4 h-4 inline mr-1" />
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={project.liveUrl}
                  onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://myproject.com"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};