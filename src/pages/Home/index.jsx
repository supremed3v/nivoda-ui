import React from "react";
import { motion } from "framer-motion";
import { Hero } from "../../components/Hero";
import { DiamondsSection } from "../../components/DiamondsSection";
import { AboutSection } from "../../components/AboutSection";
import { FadeInWhenVisible } from "../../components/libs/FadeInWhenVIsible";

const fadeInVariants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0 },
};

const slideInVariants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -20 },
};

export const Home = () => {
  return (
    <>
      <FadeInWhenVisible animationVariants={fadeInVariants}>
        <Hero />
      </FadeInWhenVisible>
      <FadeInWhenVisible animationVariants={slideInVariants}>
        <AboutSection />
      </FadeInWhenVisible>
      <FadeInWhenVisible animationVariants={fadeInVariants}>
        <section className="text-gray-400 body-font pb-10 bg-slate-100">
          <div className="container px-5 py-8 mx-auto">
            <h1 className="text-5xl font-bold title-font text-black mb-12 text-center">
              Some of our finest diamonds
            </h1>
          </div>
          <DiamondsSection />
        </section>
      </FadeInWhenVisible>
    </>
  );
};
