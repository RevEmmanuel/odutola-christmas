import { MotionConfig } from "framer-motion";
import { FloatingRsvp, Footer, MusicToggle } from "@/components/Chrome";
import Family from "@/components/Family";
import Feast from "@/components/Feast";
import Films from "@/components/Films";
import Hero from "@/components/Hero";
import { IntroProvider } from "@/components/Intro";
import Memories from "@/components/Memories";
import Nav from "@/components/Nav";
import Programme from "@/components/Programme";
import Rsvp from "@/components/Rsvp";
import { About, CountdownSection, Motto } from "@/components/Story";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <IntroProvider>
        <Nav />
        <main id="main">
          <Hero />
          <CountdownSection />
          <About />
          <Motto />
          <Programme />
          <Memories />
          <Films />
          <Feast />
          <Family />
          <Rsvp />
        </main>
        <Footer />
        <FloatingRsvp />
        <MusicToggle />
      </IntroProvider>
    </MotionConfig>
  );
}
