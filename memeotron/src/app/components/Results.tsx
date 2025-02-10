"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Meme } from "@/util/types";

interface ResultsProps {
  result: Meme;
  uploadedImage?: File | null;
}

export default function Results({ result, uploadedImage }: ResultsProps) {
  const [revealed, setRevealed] = useState(false);

  // Conditionally show the meme name
  const displayedName = revealed ? (result.imageName || "some meme") : "???";

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-8 px-4 bg-white">
      {/* Heading */}
      <h1 className="font-fredoka text-custom-blue text-4xl md:text-5xl text-center mb-8">
        You look like... <strong className="ml-2">{displayedName}</strong>
      </h1>

      {/* Side-by-side images */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
        
        {/* Uploaded image (left) */}
        {uploadedImage && (
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 border-8 border-custom-blue rounded-md overflow-hidden">
              <Image
                src={URL.createObjectURL(uploadedImage)}
                alt="Your uploaded image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Matched meme (right) */}
        <div className="flex flex-col items-center">
          <div className="relative w-64 h-64 border-8 border-custom-blue transition-colors hover:border-blue-700 rounded-md overflow-hidden">
            {!revealed && (
              <button
  onClick={() => setRevealed(true)}
  className="absolute inset-0 bg-custom-blue text-white text-lg font-medium 
             flex items-center justify-center hover:bg-blue-700 border hover:border-blue-700 border-custom-blue 
             transition-colors"
>
  <p className="text-3xl">Reveal</p>
</button>
            )}
            {revealed && (
              <Image
                src={result.filePath}
                alt="Matched meme image"
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/* "Go again" Button */}
      <div className="mt-8">
        <button
          onClick={() => window.location.reload()}
          className="text-black hover:text-blue-700 transition-colors"
        >
          Go again
        </button>
      </div>
    </div>
  );
}
