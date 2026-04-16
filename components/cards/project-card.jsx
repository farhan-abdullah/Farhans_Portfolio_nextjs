import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function ProjectCard({ project, lang }) {
  return (
    <Link href={`/${lang}/projects/${project.slug}`}>
      <div className="group overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-all hover:border-accent hover:shadow-lg">
        {/* Cover Image */}
        {project.cover?.url && (
          <div className="relative h-48 overflow-hidden bg-[hsl(var(--muted))]">
            <Image
              src={project.cover.url}
              alt={project.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          {/* Category Badge */}
          <div className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1">
            <span className="text-xs font-medium text-accent uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {project.title}
          </h3>

          {/* Tagline */}
          {project.tagline && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {project.tagline}
            </p>
          )}

          {/* Tech Stack */}
          {project.stack && project.stack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.stack.slice(0, 3).map((item, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] rounded px-2 py-1"
                >
                  {item.tech}
                </span>
              ))}
              {project.stack.length > 3 && (
                <span className="text-xs text-muted-foreground">+{project.stack.length - 3}</span>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-medium text-accent">
            Ver más <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
