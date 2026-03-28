
import { motion } from 'framer-motion';
import { ParallaxVideo } from '@/components/ParallaxVideo';
import { ArrowRight, Menu } from 'lucide-react';

/**
 * SCROLLYLANDING PAGE
 * 
 * Implements a full-screen, scroll-snap based landing page with 5 distinct sections.
 * Uses 'ParallaxVideo' for background depth effects.
 */

// Shared animation variants for text entrance
const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, delay: 0.2 }
    }
};

const ScrollyLanding = () => {
    return (
        // Main Container: CSS Scroll Snap enforced
        <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-[#020525] text-white selection:bg-white selection:text-black">

            {/* ---------------- SECTION 1: HERO ---------------- */}
            <section className="relative h-screen w-full snap-start flex items-center justify-center overflow-hidden">
                <ParallaxVideo src="/videos/hero.mp4" />

                {/* Fixed Navbar (Glassmorphism) - visible across sections effectively, but placed here for flow */}
                <motion.nav
                    variants={navVariants}
                    initial="hidden"
                    animate="visible"
                    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md bg-white/5 border-b border-white/10"
                >
                    <div className="text-xl font-bold font-['Syne'] tracking-wide">SEGESTA</div>
                    <div className="hidden md:flex gap-8 text-sm font-['Inter'] tracking-widest uppercase">
                        <a href="#mission" className="hover:text-gray-300 transition-colors">Mission</a>
                        <a href="#advantages" className="hover:text-gray-300 transition-colors">Advantages</a>
                        <a href="#process" className="hover:text-gray-300 transition-colors">Process</a>
                        <a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a>
                    </div>
                    <button className="md:hidden">
                        <Menu className="w-6 h-6" />
                    </button>
                </motion.nav>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="relative z-10 text-center"
                >
                    <motion.h1
                        variants={textVariants}
                        className="text-[12vw] md:text-[15vw] font-['Syne'] font-extrabold leading-none tracking-tighter"
                    >
                        SEGESTA
                    </motion.h1>
                    <motion.p
                        variants={{ ...textVariants, visible: { ...textVariants.visible, transition: { delay: 0.2 } } }}
                        className="text-lg md:text-xl font-['Inter'] font-light tracking-[0.2em] mt-4 uppercase text-white/80"
                    >
                        Beyond the Structure
                    </motion.p>
                </motion.div>
            </section>


            {/* ---------------- SECTION 2: MISSION ---------------- */}
            <section id="mission" className="relative h-screen w-full snap-start flex items-center px-6 md:px-20 overflow-hidden">
                <ParallaxVideo src="/videos/mission.mp4" />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                    className="relative z-10 max-w-xl p-8 md:p-12 backdrop-blur-2xl bg-white/10 border border-white/10 rounded-2xl shadow-2xl"
                >
                    <motion.h2
                        variants={textVariants}
                        className="text-4xl md:text-6xl font-['Syne'] font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
                    >
                        Our Mission
                    </motion.h2>
                    <motion.div variants={textVariants} className="space-y-6 font-['Inter'] text-lg text-gray-200 leading-relaxed font-light">
                        <p>
                            We craft digital experiences that transcend the ordinary. Every pixel is calculated, every interaction is intentional.
                        </p>
                        <p>
                            Founded on the belief that beauty and function are inseparable, we push the boundaries of what the web can be.
                        </p>
                    </motion.div>
                </motion.div>
            </section>


            {/* ---------------- SECTION 3: ADVANTAGES ---------------- */}
            <section id="advantages" className="relative h-screen w-full snap-start flex items-center justify-end px-6 md:px-20 overflow-hidden">
                <ParallaxVideo src="/videos/advantages.mp4" />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                    className="relative z-10 max-w-xl p-8 md:p-12 backdrop-blur-2xl bg-black/30 border border-white/10 rounded-2xl shadow-2xl text-right"
                >
                    <motion.h2
                        variants={textVariants}
                        className="text-4xl md:text-6xl font-['Syne'] font-bold mb-6 text-white"
                    >
                        Advantages
                    </motion.h2>
                    <motion.ul
                        variants={textVariants}
                        className="space-y-4 font-['Inter'] text-xl text-gray-200 font-light"
                    >
                        {[
                            "Immersive Performance",
                            "Cutting-edge Tech Stack",
                            "Award-Winning Design",
                            "Seamless Scalability"
                        ].map((item, idx) => (
                            <motion.li
                                key={idx}
                                className="flex items-center justify-end gap-3"
                            >
                                {item}
                                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
            </section>


            {/* ---------------- SECTION 4: THE PROCESS ---------------- */}
            <section id="process" className="relative h-screen w-full snap-start flex flex-col items-center justify-center overflow-hidden">
                <ParallaxVideo src="/videos/process.mp4" />

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-['Syne'] font-bold mb-16 text-white"
                    >
                        The Process
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                        {[
                            { step: "01", title: "Discover", desc: "Understanding the core vision." },
                            { step: "02", title: "Design", desc: "Crafting the visual language." },
                            { step: "03", title: "Develop", desc: "Bringing code to life." },
                        ].map((phase, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2, duration: 0.6 }}
                                className="group relative p-8 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                            >
                                <div className="text-4xl font-['Syne'] font-bold text-white/20 mb-4 group-hover:text-blue-400/50 transition-colors">{phase.step}</div>
                                <h3 className="text-2xl font-bold mb-2 font-['Syne']">{phase.title}</h3>
                                <p className="font-['Inter'] text-gray-400 group-hover:text-gray-200">{phase.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ---------------- SECTION 5: CONTACT ---------------- */}
            <section id="contact" className="relative h-screen w-full snap-start flex flex-col items-center justify-end pb-32 overflow-hidden">
                <ParallaxVideo src="/videos/contact.mp4" />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="relative z-10 text-center"
                >
                    <motion.h2
                        variants={textVariants}
                        className="text-5xl md:text-8xl font-['Syne'] font-bold mb-8 text-white tracking-tight"
                    >
                        Let's Talk
                    </motion.h2>

                    <motion.button
                        variants={textVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center gap-3 px-12 py-6 bg-white text-black rounded-full font-['Syne'] font-bold text-lg uppercase tracking-wider overflow-hidden hover:bg-neutral-200 transition-colors"
                    >
                        Get In Touch
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 flex gap-8 justify-center font-['Inter'] text-sm text-gray-400 uppercase tracking-widest"
                    >
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    </motion.div>
                </motion.div>
            </section>

        </div>
    );
};

export default ScrollyLanding;
