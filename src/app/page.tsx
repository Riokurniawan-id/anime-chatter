"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { animeCharacters } from "@/lib/characters";

function BokehLayer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-10 blur-2xl animate-pulse"
          style={{
            width: `${Math.random() * 60 + 20}px`,
            height: `${Math.random() * 60 + 20}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center min-h-screen p-1 sm:p-8 bg-gray-900 overflow-x-hidden">
      {/* 🌌 Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-90" />

        {/* Inline SVG Anime Silhouette */}
        {/* Bokeh dots (client-only) */}
        <BokehLayer />
      </div>

      {/* Konten Utama */}
      <header className="mb-12 text-center z-20">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-300 to-white">
          AniChatter
        </h1>

        <p className="mt-2 text-lg text-white">
          Next-gen AI Character Interaction
        </p>
      </header>

      <div className="flex flex-wrap justify-center md:gap-5">
        {animeCharacters.map((character) => (
          <Card
            key={character.id}
            className="relative max-w-96 h-[400px] rounded-3xl overflow-hidden shadow-lg shadow-red-600/60 group mb-10 bg-red-600"
          >
            <img
              src={character.image}
              alt={character.name}
              width={320}
              height={280}
              className="h-[70%] w-full object-cover"
            />

            <div className="absolute top-[55%] left-[-10px] w-[114%] h-[65%] skew-y-[-9deg] skew-x-[19deg] rounded-3xl z-0 bg-gradient-to-br from-red-500 to-red-800" />

            <div className="absolute bottom-[30%] left-6 w-20 h-20 bg-white rounded-2xl shadow-lg overflow-hidden z-10">
              <img
                src={character.logo}
                alt="Logo"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>

            <CardContent className="absolute bottom-[26%] left-[150px] z-10">
              <CardTitle className="text-white font-bold text-lg">
                {character.name}
              </CardTitle>
            </CardContent>

            <div className="absolute bottom-[10%] left-6 text-white text-sm z-10 max-w-[60%]">
              {character.description}
            </div>

            <CardFooter className="absolute bottom-[-4%] right-8 z-10">
              <Link href={`/chat/${character.id}`}>
                <Button className="border border-red-500 bg-white text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 animate-shake">
                  Chat Now
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className=" z-50 text-sm text-red-400 font-semibold select-none pointer-events-none">
        © 2025 Rio Kurniawan. All rights reserved.
      </div>
    </main>
  );
}
