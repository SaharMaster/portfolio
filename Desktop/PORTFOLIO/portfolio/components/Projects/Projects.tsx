'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types/project';
import ProjectCard from '../ProjectCard/ProjectCard';
import styles from './Projects.module.scss';

const placeholderProjects: Project[] = [
  {
    title: 'Personal organisation tool',
    description: 'A prototype of my full-stack personal project. Plan your tasks in a different ways using elegant sticky note design',
    technologies: ['Next.js', 'TypeScript', 'SCSS', 'React', '<beckend tech>', '<DB tech>', '<testing tech>'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'IOS application',
    description: 'This project was a guide to swift development. <Description, later>',
    technologies: ['Swift', '<DB tech>', '<other tech>'],
    repoUrl: '#',
  },
  {
    title: 'Python Machine learning project',
    description: 'Purely personal interest in ML technologies made me start this project. <Description, later>',
    technologies: ['Python', 'PyTorch', 'TensorFlow', '<DB tech>'],
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