import React from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import Features from '../components/features';
import About from '../components/about';
import Contact from '../components/contact';
import Footer from '../components/footer';

const Home = () => (
  <div style={{ background: '#080a1a', minHeight: '100vh' }}>
    <Navbar />
    {/* sections — id must match Navbar link names lowercased */}
    <Hero />        {/* id="home"    */}
    <Features />    {/* id="features" */}
    <About />       {/* id="about"   */}
    <Contact />     {/* id="contact" */}
    <Footer />
  </div>
);

export default Home;
