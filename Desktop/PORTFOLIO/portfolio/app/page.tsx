import Intro from '@/components/Intro/Intro';
import About from '@/components/About/About';
import Expertise from '@/components/Expertise/Expertise';
import Projects from '@/components/Projects/Projects';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

export default function HomePage() {
  return (
    <main>
      <Intro />
      <About />
      <Expertise />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}