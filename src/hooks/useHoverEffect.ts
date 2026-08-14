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
    containerRef: React.RefObject<HTMLDivElement | null>,
    options: HoverEffectOptions
) => {
    const effectRef = useRef<any>(null);

    useEffect(() => {
        // Only run on client side
        if (typeof window === "undefined" || !containerRef.current) return;

        // Capture ref value for cleanup
        const container = containerRef.current;

        try {
            // Initialize the hover effect with performance-optimized settings
            effectRef.current = new hoverEffect({
                parent: container,
                intensity: 0.3, // Reduced for better performance
                speedIn: 1.2, // Slightly faster for snappier feel
                speedOut: 1.0,
                hover: true,
                ...options,
            });
        } catch (error) {
            console.error("Failed to initialize hover effect:", error);
        }

        return () => {
            if (effectRef.current && container) {
                const canvas = container.querySelector("canvas");
                if (canvas) {
                    canvas.remove();
                }
                effectRef.current = null;
            }
        };
    }, [containerRef, options]);

    return effectRef;
};
