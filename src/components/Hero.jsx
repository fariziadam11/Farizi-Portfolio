import React, { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown, Code } from 'lucide-react';

const Hero = () => {
  const { darkMode } = useTheme();
  const heroRef = useRef(null);
  // Parallax effect for scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const fullName = "Farizi Adam";
  const fullSubtitle = "Software Engineer | Web Developer";   

  return (
    <section 
      ref={heroRef} 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Simple gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${darkMode ? 'from-gray-900 via-gray-800 to-blue-900/80' : 'from-blue-100 via-white to-purple-100'} -z-10`}></div>

      {/* Main content with enhanced parallax effect */}
      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full" 
      >
        <div className="flex flex-col items-center space-y-6 md:space-y-8 text-center">
          {/* Animated name reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative inline-block"
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
            >
              {fullName}
            </motion.h1>
            <motion.div 
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            />
          </motion.div>
          
          {/* Animated subtitle */}
          <motion.h2 
            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {fullSubtitle}
          </motion.h2>
          
          {/* Enhanced social links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8"
          >
            <motion.a 
              href="https://github.com/fariziadam11" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="text-gray-700 dark:text-gray-300" size={18} />
              <span className="font-medium">GitHub</span>
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/fariziadam" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Linkedin className="text-blue-600 dark:text-blue-400" size={18} />
              <span className="font-medium">LinkedIn</span>
            </motion.a>
            <motion.a 
              href="mailto:contact@fariziadam.com" 
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="text-red-500 dark:text-red-400" size={18} />
              <span className="font-medium">Email</span>
            </motion.a>
            <motion.a 
              href="/CV Farizi Adam.pdf" 
              download="CV Farizi Adam.pdf"
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="text-white" size={18} />
              <span className="font-medium">Resume</span>
            </motion.a>
          </motion.div>

          {/* Code snippet card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-6 sm:mt-8 max-w-xs sm:max-w-sm md:max-w-md w-full dark:bg-gray-900 bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 dark:bg-gray-800 bg-white">
              <div className="flex space-x-1">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full"></div>
              </div> 
              <div className="text-xs text-gray-400 dark:text-gray-400 flex items-center">
                <Code size={12} className="mr-1" /> portfolio.jsx
              </div>
            </div>
            <div className="p-3 sm:p-4 text-left font-mono text-xs sm:text-sm text-green-400">
              <div><span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = {"{"}</div>
              <div className="pl-4"><span className="text-yellow-400">name</span>: <span className="text-green-300">"Farizi Adam"</span>,</div>
              <div className="pl-4"><span className="text-yellow-400">skills</span>: [<span className="text-green-300">"React"</span>, <span className="text-green-300">"JavaScript"</span>, <span className="text-green-300">"UI/UX"</span>],</div>
              <div className="pl-4"><span className="text-yellow-400">passion</span>: <span className="text-green-300">"Building amazing web experiences"</span></div>
              <div>{"}"};</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;