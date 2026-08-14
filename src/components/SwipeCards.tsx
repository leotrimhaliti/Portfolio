"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useHoverEffect } from "@/hooks/useHoverEffect";

interface SwipeCardsProps {
  className?: string;
}

const emptySubscribe = () => () => {};

let webGLSupport: boolean | null = null;
function detectWebGL(): boolean | null {
  if (webGLSupport === null) {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    webGLSupport = !!gl;
  }
  return webGLSupport;
}

const SwipeCards = ({ className }: SwipeCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const hoverOptions = useMemo(
    () => ({
      image1: "/avatar1.png",
      image2: "/newavatar.png",
      displacementImage: "/displacement.png",
      intensity: 0.3,
      speedIn: 1.2,
      speedOut: 1.0,
      imagesRatio: 1,
    }),
    [],
  );

  // Check for WebGL support (null during SSR)
  const hasWebGL = useSyncExternalStore(
    emptySubscribe,
    detectWebGL,
    () => null,
  );

  // Only initialize hover effect if WebGL is supported
  useHoverEffect(hasWebGL ? containerRef : { current: null }, hoverOptions);

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
          "relative h-[200px] w-[200px] overflow-hidden rounded-lg shadow-lg",
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
          "relative h-[200px] w-[200px] overflow-hidden rounded-lg shadow-lg",
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
        "relative h-[200px] w-[200px] overflow-hidden rounded-lg shadow-lg",
        className
      )}
      style={{
        cursor: "pointer",
      }}
    />
  );
};

export default SwipeCards;
