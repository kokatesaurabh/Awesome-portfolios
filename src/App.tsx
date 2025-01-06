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
  );
}

export default App;