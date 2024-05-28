import React from "react";
import { DescProps } from "../../interface";

export const Description: React.FC<DescProps> = ({
  yellowText,
  mainHeader,
  text,
  children,
}) => {
  return (
    <section className="py-20 px-44 max-sm:px-4 max-md:px-12 max-lg:px-20 max-xl:px-28 max-2xl:px-36">
      <div className="flex justify-between max-lg:flex-col max-lg:gap-6 max-lg:w-full">
        <div className="flex flex-col justify-between gap-6">
          <header className="YellowText max-xl:text-3xl max-2xl:text-4xl">
            {yellowText}
          </header>
          <header className="PrimaryText max-xl:text-4xl">{mainHeader}</header>
        </div>
        <div className="flex items-end mb-5 max-lg:justify-end">
          <text className="Text italic tracking-wide">{text}</text>
        </div>
      </div>
      {children}
    </section>
  );
};