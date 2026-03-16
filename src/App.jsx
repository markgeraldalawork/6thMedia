import React, { useEffect, lazy, Suspense, useState } from 'react';
import AOS from 'aos';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Intro from './components/Intro';
import LoadingIntro from './components/LoadingIntro';
import InfiniteMenu from './components/ServicesMenu';
import PageTransition from './components/PageTransition';
import menuImage1 from './assets/menu01.jpeg';
import menuImage2 from './assets/menu02.jpg';
import menuImage3 from './assets/menu03.jpg';
import menuImage4 from './assets/menu04.webp';
import menuImage5 from './assets/menu05.jpg';
import menuImage6 from './assets/menu06.jpg';
import menuImage7 from './assets/menu07.jpg';
import menuImage8 from './assets/menu08.jpg';
import menuImage9 from './assets/menu09.jpg';
import menuImage10 from './assets/menu10.jpg';  
import menuImage11 from './assets/menu11.jpg';
import menuImage12 from './assets/menu12.jpg';
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
  },
  {
    image: menuImage8,
    title:'Studio',
    description: 'Portrait'
  },
  {
    image: menuImage9,
    title:'Studio',
    description: 'Family'
  },
  {
    image: menuImage10,
    title:'Studio',
    description: 'Portrait'
  },
  {
    image: menuImage11,
    title:'Studio',
    description: 'Portrait'
  },
  {
    image: menuImage12,
    title:'Studio',
    description: 'Creative'
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

  // return (
  //   <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen">
  //     {/* Intro overlay */}
  //     {!introDone && <LoadingIntro onDone={() => setIntroDone(true)} />}

  //     {/* Main content wrapped in PageTransition */}
  //     {/* {introDone && (
  //       <PageTransition> */} 
  //         <Navbar />
  //         <Hero />
  //         <main>
  //           <About />

  //           <Suspense fallback={<div className="text-center py-10 text-gray-400">Loading portfolio...</div>}>
  //             <Portfolio />
  //           </Suspense>
  //         <div className="relative w-[100vw] mx-auto h-[900px] flex justify-center items-center bg-transparent" >
  //           <InfiniteMenu items={items}/>
  //         </div>
  //             {/* <Services /> */}
  //           <Contact />
  //         </main>
  //         <Footer />
  //       {/* </PageTransition>
  //     )} */}
  //   </div>
  // );




  return (
  <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen">
    
    {!introDone && <Intro onDone={() => setIntroDone(true)} />}

    {introDone && (
      <>
        <Navbar />
        <Hero />
        <main>
          <About />

          <Suspense fallback={<div className="text-center py-10 text-gray-400">Loading portfolio...</div>}>
            <Portfolio />
          </Suspense>

          <div className="relative w-[100vw] mx-auto h-[900px] flex justify-center items-center bg-transparent">
            <InfiniteMenu items={items}/>
          </div>

          <Contact />
        </main>

        <Footer />
      </>
    )}

  </div>
);
}
