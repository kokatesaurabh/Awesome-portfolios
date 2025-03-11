<<<<<<< HEAD
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Loading } from './components/Loading';
import { Cursor } from './components/Cursor';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Competitions } from './sections/Competitions';
import { Contact } from './sections/Contact';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Cursor />
      <AnimatePresence>
        {loading ? (
          <Loading onComplete={() => setLoading(false)} />
        ) : (
          <main className="bg-black min-h-screen">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Competitions />
            <Contact />
          </main>
        )}
      </AnimatePresence>
    </>
=======
import React, { useState, Suspense } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Competitions from './components/Competitions';
import WorkExperience from './components/WorkExperience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import LaunchScreen from './components/LaunchScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [launchComplete, setLaunchComplete] = useState(false);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  if (!launchComplete) {
    return <LaunchScreen onComplete={() => setLaunchComplete(true)} />;
  }

  return (
    <div className="bg-darkest text-white min-h-screen">
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <Suspense fallback={<LoadingScreen onComplete={() => {}} />}>
        <div className="relative">
          <Navbar />
          <div id="home">
            <Hero />
          </div>
          <div id="about">
            <About />
          </div>
          <div id="skills">
            <Skills />
          </div>
          <div id="projects">
            <Projects />
          </div>
          <div id="experience">
            <WorkExperience />
          </div>
          <div id="competitions">
            <Competitions />
          </div>
          <div id="contact">
            <Contact />
          </div>
          <Footer />
        </div>
      </Suspense>
    </div>
>>>>>>> 2a8cb33 (Initial commit for my project)
  );
}

export default App;