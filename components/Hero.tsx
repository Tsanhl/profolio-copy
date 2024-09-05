import React from "react";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { FaSmile } from "react-icons/fa";
import { FloatingNav } from "./ui/FloatingNavbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { GlobeDemo } from "./ui/GridGlobe";
import MagicButton2 from "./ui/MagicButton2";
import { HeroAnimatedModal } from "./ui/HeroAnimated-modal";

const Hero = () => {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Experience",
      link: "#experience",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden" id="home">
      {/* Background Globe */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <GlobeDemo />
      </div>

      {/* Floating Navigation */}
      <FloatingNav navItems={navItems} />

      {/* Main Content */}
      <div className="flex justify-center items-center relative z-10 h-full w-full px-4 md:px-0">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center mt-[-80px] md:mt-[-105px] space-y-4">
          <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Welcome
          </h2>

          <TextGenerateEffect
            words="Hi, Everyone!"
            className="text-center text-[32px] md:text-5xl lg:text-6xl leading-tight"
          />

          <div className="flex flex-col md:flex-row items-center justify-center text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl space-y-2 md:space-y-0 md:space-x-2">
            <p className="inline-block">
              I&apos;m a Law student from Durham University.
            </p>

            <a
              href="https://docs.google.com/document/d/10GzXIHOlGmGNMqhXEf1hO9lRcOoYZaDtgMwM9m-RWqY/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-0 md:ml-2"
            >
              <MagicButton2
                title="CV"
                icon={<FaSmile />}
                size="small"
                position="right"
              />
            </a>
          </div>

          <div className="flex space-x-4 mt-4">
            <HeroAnimatedModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
