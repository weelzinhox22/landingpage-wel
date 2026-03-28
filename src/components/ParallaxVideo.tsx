
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxVideoProps {
    src: string;
    poster?: string;
    className?: string; // Allow extra styling hooks if needed
}

export const ParallaxVideo = ({ src, poster, className = "" }: ParallaxVideoProps) => {
    const ref = useRef<HTMLDivElement>(null);

    // We track the scroll progress of the container related to the viewport
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"], // Trigger as it enters/leaves viewport
    });

    // Parallax Effect:
    // As the user scrolls down (and the section moves UP), 
    // we want the video to move slightly DOWN relative to its container to create depth.
    // "y" values: 
    // at 0% scroll (entering from bottom) -> -15% (pulled up slightly)
    // at 50% scroll (center) -> 0% (natural position)
    // at 100% scroll (leaving top) -> 15% (pushed down slightly)
    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    return (
        <div
            ref={ref}
            className={`absolute inset-0 z-0 overflow-hidden ${className}`}
        >
            <motion.div
                style={{ y }}
                className="relative w-full h-[120%] -top-[10%]" // Make container taller than parent to allow movement
            >
                <video
                    src={src}
                    poster={poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover scale-110" // Slight scale to allow movement without edges showing
                />
                {/* Dark Overlay for Text Contrast */}
                <div className="absolute inset-0 bg-black/40" />
            </motion.div>
        </div>
    );
};
