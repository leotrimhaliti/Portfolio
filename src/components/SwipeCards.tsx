"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useHoverEffect } from "@/hooks/useHoverEffect";

interface SwipeCardsProps {
  className?: string;
}

const SwipeCards = ({ className }: SwipeCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Check for WebGL support
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    setHasWebGL(!!gl);
  }, []);

  // Only initialize hover effect if WebGL is supported
  useHoverEffect(hasWebGL ? containerRef : { current: null }, {
    image1: "/avatar1.png",
    image2: "/newavatar.png",
    displacementImage: "/displacement.png",
    intensity: 0.3, // Optimized for performance
    speedIn: 1.2,
    speedOut: 1.0,
    imagesRatio: 233 / 175, // Match container aspect ratio (height/width)
  });

  // Ensure canvas fills container properly
  useEffect(() => {
    if (hasWebGL && containerRef.current) {
      // Small delay to ensure canvas is created
      const timeout = setTimeout(() => {
        const canvas = containerRef.current?.querySelector("canvas");
        if (canvas) {
          canvas.style.width = "100%";
          canvas.style.height = "100%";
          canvas.style.objectFit = "cover";
        }
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [hasWebGL]);

  // Fallback for devices without WebGL support
  if (hasWebGL === false) {
    return (
      <div
        className={cn(
          "relative h-[233px] w-[175px] overflow-hidden rounded-lg shadow-lg",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={isHovered ? "/newavatar.png" : "/avatar1.png"}
          alt="Avatar"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg object-cover transition-opacity duration-500"
          priority
        />
      </div>
    );
  }

  // Show first image while loading WebGL check
  if (hasWebGL === null) {
    return (
      <div
        className={cn(
          "relative h-[233px] w-[175px] overflow-hidden rounded-lg shadow-lg",
          className
        )}
      >
        <Image
          src="/avatar1.png"
          alt="Avatar"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg object-cover"
          priority
        />
      </div>
    );
  }

  // WebGL-enabled hover effect
  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[233px] w-[175px] overflow-hidden rounded-lg shadow-lg",
        className
      )}
      style={{
        cursor: "pointer",
      }}
    />
  );
};

export default SwipeCards;
