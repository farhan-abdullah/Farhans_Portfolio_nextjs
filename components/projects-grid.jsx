'use client';

import { useState, useEffect } from 'react';
import { ProjectCard } from '@/components/cards/project-card';

export function ProjectsGrid({ initialProjects, lang, dict }) {
  const [filteredProjects, setFilteredProjects] = useState(initialProjects);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredProjects(initialProjects);
    } else {
      setFilteredProjects(initialProjects.filter((project) => project.category === category));
    }
  };

  const filters = [
    { id: 'all', label: dict.projects.filter_all },
    { id: 'fullstack', label: dict.projects.filter_fullstack },
    { id: 'frontend', label: dict.projects.filter_frontend },
    { id: 'backend', label: dict.projects.filter_backend },
    { id: 'multilingual', label: dict.projects.filter_multilingual },
  ];

  return (
    <>
      {/* Filter Buttons */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-accent text-[hsl(var(--accent-foreground))]'
                  : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/80'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} lang={lang} dict={dict} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-96">
          <p className="text-muted-foreground text-center max-w-md">
            {dict.projects.no_projects_found || 'Nessun progetto trovato per questa categoria.'}
          </p>
        </div>
      )}
    </>
  );
}
