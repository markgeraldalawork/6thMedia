import React, { useEffect, lazy, Suspense, useState } from 'react';
import AOS from 'aos';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Intro from './components/Intro';
import InfiniteMenu from './components/ServicesMenu';
import PageTransition from './components/PageTransition';
import menuImage1 from './assets/menu01.jpeg';
import menuImage2 from './assets/menu02.jpg';
import menuImage3 from './assets/menu03.jpg';
import menuImage4 from './assets/menu04.webp';
import menuImage5 from './assets/menu05.jpg';
import menuImage6 from './assets/menu06.jpg';
import menuImage7 from './assets/menu07.jpg';
import { image, menu } from 'framer-motion/client';

// 🧩 Lazy-load Portfolio (code-split)
const Portfolio = lazy(() => import('./components/Portfolio'));

export default function App() {

  const [introDone, setIntroDone] = useState(false); // <- missing state

const items = [
  {
  image: menuImage1,
  title: 'Events',
  description: 'Wedding'
  },
  {
  image: menuImage2,
  title: 'Studio',
  description: 'Birthday'
  },  
  {
    image:  menuImage3,
    title: 'Studio',
    description: 'Portrait'
  },
  {
    image: menuImage4,
    title: 'Studio',
    description: 'Portrait'
  },
  {
    image: menuImage5,
    title: 'Studio',
    description: 'Portrait'
  },
  {
    image:menuImage6,
    title: 'Events',
    description: 'Wedding'
  },
  {
    image: menuImage7,
    title:'Events',
    description: 'Birthday'
  }
];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Intro overlay */}
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}

      {/* Main content wrapped in PageTransition */}
      {/* {introDone && (
        <PageTransition> */} 
          <Navbar />
          <Hero />
          <main>
            <About />

            <Suspense fallback={<div className="text-center py-10 text-gray-400">Loading portfolio...</div>}>
              <Portfolio />
            </Suspense>
<div style={{ height: '800px', position: 'relative' }} >
  <InfiniteMenu items={items}/>
</div>
              {/* <Services /> */}
            <Contact />
          </main>
          <Footer />
        {/* </PageTransition>
      )} */}
    </div>
  );
}
