import React from "react";
import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorder";

const Experience = () => {
  return (
    <div id="experience" className="py-20 w-full flex flex-col items-center  mt-20 relative">
      <h1 className="heading">
        My <span className="text-white">experience</span>
      </h1>

      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: `calc(1.75rem * 0.96)`,
            }}
            className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex flex-col items-center p-3 py-6 md:p-5 lg:p-10 gap-2 text-center">
              <h1 className="text-xl md:text-2xl font-bold">
                {card.title}
              </h1>
              <p className="text-white-100 mt-3 font-semibold">
                {card.desc}
              </p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Experience;