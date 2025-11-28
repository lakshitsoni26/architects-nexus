import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../constants';
import { ExternalLink, Github, Code2, Globe } from 'lucide-react';

export const MissionLog: React.FC = () => {
    return (
        <section id="projects" className="py-32 px-4 bg-black/30 backdrop-blur-sm relative">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 border-l-4 border-cyber-primary pl-6"
                >
                    <h3 className="text-cyber-primary font-space font-bold tracking-[0.2em] text-sm mb-2">ARCHIVE_ACCESS // MODULE_03</h3>
                    <h2 className="text-5xl font-orbitron font-bold text-white">MISSION_LOG</h2>
                </motion.div>

                <div className="space-y-32">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}
                        >
                            {/* Image Side with Hover Overlay */}
                            <div className="w-full lg:w-3/5 relative group perspective-1000">
                                <div className="absolute -inset-4 bg-cyber-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

                                <div className="relative overflow-hidden rounded-xl border border-white/10 aspect-video bg-cyber-black shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:rotate-1">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm opacity-80 group-hover:opacity-40"
                                    />

                                    {/* Overlay Content */}
                                    <div className="absolute inset-0 flex flex-col items-end justify-start pt-4 pr-4 gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        {project.links?.github && (
                                            <a
                                                href={project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 group/btn bg-black/60 backdrop-blur-md border border-white/10 rounded-full pl-4 pr-2 py-1 hover:bg-cyber-primary hover:border-cyber-primary transition-all duration-300"
                                            >
                                                <span className="font-orbitron text-[10px] tracking-widest text-white group-hover/btn:text-black transition-colors">SOURCE</span>
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-black/20">
                                                    <Github className="w-4 h-4 text-white group-hover/btn:text-black transition-colors" />
                                                </div>
                                            </a>
                                        )}

                                        {(project.links?.live || project.links?.video) && (
                                            <a
                                                href={project.links.live || project.links.video}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 group/btn bg-black/60 backdrop-blur-md border border-white/10 rounded-full pl-4 pr-2 py-1 hover:bg-cyber-secondary hover:border-cyber-secondary transition-all duration-300"
                                            >
                                                <span className="font-orbitron text-[10px] tracking-widest text-white group-hover/btn:text-white transition-colors">
                                                    {project.links.video ? 'VIDEO' : 'DEMO'}
                                                </span>
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white/20">
                                                    <ExternalLink className="w-4 h-4 text-white group-hover/btn:text-white transition-colors" />
                                                </div>
                                            </a>
                                        )}
                                    </div>

                                    {/* Tech Stack Mini-bar at bottom of image */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {project.tech.slice(0, 4).map(t => (
                                                <span key={t} className="px-2 py-1 text-[10px] font-mono text-cyber-primary border border-cyber-primary/30 rounded bg-cyber-primary/10">
                                                    {t}
                                                </span>
                                            ))}
                                            {project.tech.length > 4 && (
                                                <span className="px-2 py-1 text-[10px] font-mono text-gray-400 border border-gray-700 rounded bg-black/50">
                                                    +{project.tech.length - 4}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-2/5 space-y-8">
                                <div className="flex items-center space-x-4">
                                    <span className="text-cyber-primary font-mono text-xl">0{index + 1} //</span>
                                    <h3 className="text-4xl font-orbitron font-bold text-white leading-tight">{project.title}</h3>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-cyber-primary/50 to-transparent" />
                                    <p className="text-gray-300 font-space leading-relaxed text-lg pl-6">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3 pt-4">
                                    {project.tech.map(t => (
                                        <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 font-space hover:border-cyber-primary/50 hover:text-cyber-primary transition-colors cursor-default">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};