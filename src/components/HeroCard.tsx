import React from "react";

import Image from "next/image";

type HeroCardProps = {
  image: string;
  variant: "first" | "second";
  date: string;
  text: string;
};

const HeroCard: React.FC<HeroCardProps> = ({ image, variant, date, text }) => {
  const isSecond = variant === "second";

  return (
    <div className="relative w-[400px] h-[400px] rounded-[30px] overflow-hidden shadow-xl m-6 inline-block bg-white">
      <Image
        src={image}
        alt="Hero Image"
        width={400}
        height={280}
        className="h-[70%] w-full object-cover"
      />

      <div
        className={`absolute top-[55%] left-[-5px] h-[65%] w-[108%] skew-y-[-9deg] skew-x-[19deg] rounded-[30px] ${
          isSecond
            ? "bg-gradient-to-br from-yellow-700 to-yellow-300"
            : "bg-gradient-to-br from-blue-600 to-pink-500"
        }`}
      ></div>

      <div className="absolute bottom-[30%] left-8 w-20 h-20 bg-white rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/images/logo.jpg"
          alt="Logo"
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="absolute bottom-[26%] left-[150px] text-white font-bold text-base">
        {text}
      </p>

      <p className="absolute bottom-[10%] left-8 text-white font-medium">
        {date}
      </p>

      <div className="absolute bottom-[10%] right-8 border border-white text-white px-4 py-2 animate-wiggle hover:animate-none cursor-pointer">
        <a href="#">Learn More</a>
      </div>
    </div>
  );
};

export default HeroCard;
