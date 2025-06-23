'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types/project';
import ProjectCard from '../ProjectCard/ProjectCard';
import styles from './Projects.module.scss';

const placeholderProjects: Project[] = [
  {
    title: 'Project One',
    description: 'A brief, no-fluff description of what this project is, what problem it solves, and the value it delivered.',
    technologies: ['Next.js', 'TypeScript', 'SCSS', 'Framer Motion'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Project Two',
    description: 'This one was a complex backend challenge focused on performance and scalability. The goal was simple: make it fast and reliable.',
    technologies: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    repoUrl: '#',
  },
  {
    title: 'Project Three',
    description: 'A client-facing platform for data visualization. The main challenge was creating a highly interactive and intuitive user interface.',
    technologies: ['React', 'D3.js', 'GraphQL', 'Jest'],
    liveUrl: '#',
  },
];

const Projects = () => {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

  return (
    <section id='projects' className={styles.projects}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Selected Work</h2>
        <motion.div 
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
          {placeholderProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;