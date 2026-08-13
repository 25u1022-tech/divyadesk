import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Mail, Linkedin, Palette, Coffee, PenTool, Code2, User, Monitor, Database, Wrench } from 'lucide-react';
import type { HotspotItem } from '../types';
import { useAppStore } from '../store/useAppStore';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemAnim = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export const AboutContent = () => (
  <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col md:flex-row gap-6">
    <motion.div variants={itemAnim} className="w-full md:w-1/3 flex flex-col items-center gap-4">
      <div className="w-40 h-48 md:w-48 md:h-56 rounded-2xl border-[3px] border-desk-border overflow-hidden bg-[#F2E8DF] shadow-[4px_4px_0px_0px_var(--desk-border)] relative flex items-center justify-center">
        <img 
          src="/image.png" 
          alt="Divya Mandi" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    </motion.div>
    <div className="w-full md:w-2/3 space-y-5 text-[#4A3C38]">
      <motion.h2 variants={itemAnim} className="font-heading font-bold text-3xl md:text-4xl leading-tight">
        Hello, I'm Divya Mandi.
      </motion.h2>
      <motion.p variants={itemAnim} className="leading-relaxed text-sm md:text-base opacity-90">
        I'm Divya Mandi, a Computer Science Engineering student at B.M.S. College of Engineering who enjoys building things at the intersection of technology and creativity. I'm interested in software development, web development, and AI/ML, and I love turning ideas into useful and thoughtfully designed experiences.
      </motion.p>
      <motion.p variants={itemAnim} className="leading-relaxed text-sm md:text-base opacity-90">
        I'm currently exploring DSA, full-stack development, and AI-powered applications while constantly learning and experimenting with new technologies. Outside of coding, I love watercolor painting and creating art.
      </motion.p>
    </div>
  </motion.div>
);

const ProjectCard = ({ title, description, icon, iconBorder, tags, github, demo }: any) => (
  <motion.div variants={itemAnim} className="group flex flex-col border-[3px] border-desk-border bg-white rounded-md overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-[4px_4px_0_0_var(--desk-border)]">
    <div className="h-48 flex items-center justify-center border-b-[2px] border-desk-border/10 bg-white shrink-0">
      <div className={`w-28 h-28 rounded-full border-[2.5px] border-dashed ${iconBorder} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
        {icon}
      </div>
    </div>
    <div className="p-5 flex flex-col flex-1">
      <h3 className="font-heading font-bold text-2xl text-[#4A3C38] leading-tight mb-1">{title}</h3>
      
      <div className="relative min-h-[1.25rem] mb-5">
        <div className="text-xs italic text-[#A0A0A0] absolute inset-0 transition-opacity duration-300 group-hover:opacity-0 flex items-center">
          Hover to expand &rarr;
        </div>
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
          <div className="overflow-hidden">
            <p className="text-sm text-[#4A3C38]/90 leading-relaxed pb-2 pt-1">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 mt-auto">
        {tags.map((tag: string) => (
          <span key={tag} className="px-2 py-1 bg-[#F0F5FF] border border-[#D0E2FF] text-[#4A3C38] text-[9.5px] font-bold rounded tracking-wider">
            {tag}
          </span>
        ))}
      </div>
      <div className="pt-4 border-t border-gray-100 flex gap-5">
        <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase hover:underline text-[#4A3C38]">
          <Github className="w-4 h-4" /> GITHUB
        </a>
        <a href={demo || "#"} target={demo ? "_blank" : undefined} rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase ${demo ? 'hover:underline text-[#4A3C38]' : 'text-[#C4C4C4] pointer-events-none'}`}>
          <ExternalLink className="w-4 h-4" /> LIVE DEMO
        </a>
      </div>
    </div>
  </motion.div>
);

export const ProjectsContent = () => (
  <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <ProjectCard 
      title="Drift Oracle"
      description="An MLOps pipeline that detects real-world data drift in a credit-risk model using PSI, and automatically retrains a Challenger model only when drift is confirmed. Everything is tracked end-to-end in MLflow."
      icon={<Monitor className="w-12 h-12 text-[#7EB2F9]" strokeWidth={2} />}
      iconBorder="border-[#D6B2FF]"
      tags={['PYTHON', 'XGBOOST', 'MLFLOW', 'SCIKIT-LEARN', 'PANDAS']}
      github="https://github.com/divya-m06/drift-oracle"
      demo={null}
    />
    <ProjectCard 
      title="AI Resume Builder"
      description="Full-stack hackathon app using Groq API for LLM-generated resume content. React + Vite + Tailwind frontend on Vercel with FastAPI & Supabase PostgreSQL backend on Render."
      icon={<User className="w-12 h-12 text-[#FF7EA5]" strokeWidth={2} />}
      iconBorder="border-[#FFB2D9]"
      tags={['REACT', 'GROQ API', 'SUPABASE', 'TAILWIND']}
      github="https://github.com/divya-m06/AI-Resume-Builder"
      demo="https://smartai-resumebuilder.vercel.app/"
    />
    <ProjectCard 
      title={
        <span className="flex items-center gap-3">
          Vault 
          <span className="text-[10px] px-2 py-0.5 bg-yellow-100 text-yellow-800 border border-yellow-200 rounded tracking-wider">WIP</span>
        </span>
      }
      description="Offline-first encrypted file & password manager. React + Vite + Dexie.js + IndexedDB for local storage with full CRUD, dashboard, and settings. (In Progress)"
      icon={<Code2 className="w-12 h-12 text-[#7ED5FF]" strokeWidth={2} />}
      iconBorder="border-[#B2E3FF]"
      tags={['REACT', 'VITE', 'DEXIE.JS', 'INDEXEDDB', 'ENCRYPTION']}
      github="https://github.com/divya-m06/vault"
      demo={null}
    />
  </motion.div>
);

const SkillCard = ({ title, icon, iconBorder, tags }: any) => (
  <motion.div variants={itemAnim} className="group flex flex-col border-[3px] border-desk-border bg-white rounded-md overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-[4px_4px_0_0_var(--desk-border)]">
    <div className="h-48 flex items-center justify-center border-b-[2px] border-desk-border/10 bg-white shrink-0">
      <div className={`w-28 h-28 rounded-full border-[2.5px] border-dashed ${iconBorder} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
        {icon}
      </div>
    </div>
    <div className="p-5 flex flex-col flex-1">
      <h3 className="font-heading font-bold text-2xl text-[#4A3C38] leading-tight mb-5">{title}</h3>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag: string) => (
          <span key={tag} className="px-2 py-1 bg-[#F0F5FF] border border-[#D0E2FF] text-[#4A3C38] text-[9.5px] font-bold rounded tracking-wider">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export const SkillsContent = () => (
  <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <SkillCard 
      title="Languages & Frameworks"
      icon={<Code2 className="w-12 h-12 text-[#7EB2F9]" strokeWidth={2} />}
      iconBorder="border-[#D6B2FF]"
      tags={['JAVA', 'C', 'PYTHON', 'REACT', 'FASTAPI', 'TAILWIND CSS', 'VITE']}
    />
    <SkillCard 
      title="Backend & Data"
      icon={<Database className="w-12 h-12 text-[#FF7EA5]" strokeWidth={2} />}
      iconBorder="border-[#FFB2D9]"
      tags={['POSTGRESQL', 'MYSQL']}
    />
    <SkillCard 
      title="Tools & Ecosystem"
      icon={<Wrench className="w-12 h-12 text-[#7ED5FF]" strokeWidth={2} />}
      iconBorder="border-[#B2E3FF]"
      tags={['VERCEL', 'RENDER', 'GIT & GITHUB', 'AWS']}
    />
  </motion.div>
);

export const ContactContent = () => {
  const { addToast } = useAppStore();

  const copyEmail = () => {
    navigator.clipboard.writeText('divyamandi3@gmail.com');
    addToast('Email copied to clipboard!', '💌');
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col items-center gap-6 py-8 text-desk-border">
      <motion.p variants={itemAnim} className="text-lg text-center max-w-md font-medium">
        Feel free to reach out for collaborations, opportunities, or just to say hi!
      </motion.p>
      
      <motion.div variants={itemAnim} className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <button 
          onClick={copyEmail}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-desk-accent-tan text-desk-border font-heading font-bold text-lg rounded-xl border-2 border-desk-border shadow-[4px_4px_0_0_var(--desk-border)] hover:-translate-y-1 transition-all cursor-pointer"
        >
          <Mail className="w-5 h-5" /> Email
        </button>
        <a 
          href="https://linkedin.com/in/divya-mandi" target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-desk-accent-blue text-desk-border font-heading font-bold text-lg rounded-xl border-2 border-desk-border shadow-[4px_4px_0_0_var(--desk-border)] hover:-translate-y-1 transition-all"
        >
          <Linkedin className="w-5 h-5" /> LinkedIn
        </a>
      </motion.div>
      
      <motion.div variants={itemAnim} className="w-full max-w-sm">
        <a 
          href="https://github.com/divya-mo6" target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-desk-bg text-desk-border font-heading font-bold text-lg rounded-xl border-2 border-desk-border shadow-[4px_4px_0_0_var(--desk-border)] hover:-translate-y-1 transition-all"
        >
          <Github className="w-5 h-5" /> GitHub
        </a>
      </motion.div>
    </motion.div>
  );
};

export const deskItems: HotspotItem[] = [
  {
    id: 'projects',
    title: 'Projects',
    type: 'content',
    icon: Code2,
    content: <ProjectsContent />,
    color: 'bg-desk-accent-blue'
  },
  {
    id: 'about',
    title: 'About Me',
    type: 'content',
    icon: User,
    content: <AboutContent />,
    color: 'bg-desk-accent-pink'
  },
  {
    id: 'skills',
    title: 'Skills',
    type: 'content',
    icon: PenTool,
    content: <SkillsContent />,
    color: 'bg-desk-accent-green'
  },
  {
    id: 'contact',
    title: 'Contact',
    type: 'content',
    icon: Mail,
    content: <ContactContent />,
    color: 'bg-desk-accent-tan'
  },
  {
    id: 'paint',
    title: 'Paint',
    type: 'action',
    icon: Palette,
    color: 'bg-desk-bg'
  }
];
