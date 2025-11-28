import { useEffect, useRef } from "react";
import hoverEffect from "hover-effect";

export interface HoverEffectOptions {
    intensity?: number;
    intensity1?: number;
    intensity2?: number;
    angle?: number;
    angle1?: number;
    angle2?: number;
    speedIn?: number;
    speedOut?: number;
    hover?: boolean;
    easing?: string;
    image1: string;
    image2: string;
    displacementImage: string;
    imagesRatio?: number;
}

/**
 * Custom hook to integrate the hover effect library with React
 * Optimized for performance on lower-end devices
 */
export const useHoverEffect = (
    containerRef: React.RefObject<HTMLDivElement>,
    options: HoverEffectOptions
) => {
    const effectRef = useRef<any>(null);

    useEffect(() => {
        // Only run on client side
        if (typeof window === "undefined" || !containerRef.current) return;

        try {
            // Initialize the hover effect with performance-optimized settings
            effectRef.current = new hoverEffect({
                parent: containerRef.current,
                intensity: 0.3, // Reduced for better performance
                speedIn: 1.2, // Slightly faster for snappier feel
                speedOut: 1.0,
                hover: true,
                ...options,
            });
        } catch (error) {
            console.error("Failed to initialize hover effect:", error);
        }

        // Cleanup function
        return () => {
            if (effectRef.current && containerRef.current) {
                // Clean up WebGL resources
                const canvas = containerRef.current.querySelector("canvas");
                if (canvas) {
                    const gl = canvas.getContext("webgl") || canvas.getContext("webgl2");
                    if (gl) {
                        const loseContext = gl.getExtension("WEBGL_lose_context");
                        if (loseContext) {
                            loseContext.loseContext();
                        }
                    }
                    canvas.remove();
                }
                effectRef.current = null;
            }
        };
    }, [containerRef, options]);

    return effectRef;
};
