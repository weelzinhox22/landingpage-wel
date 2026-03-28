import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Mail, Github, Linkedin, Instagram } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";



const NavItem = ({ 
  link, 
  isActive, 
  onClick 
}: { 
  link: { href: string; label: string }; 
  isActive: boolean; 
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void 
}) => {
  return (
    <li className="nav-item">
      <a
        href={link.href}
        onClick={onClick}
        className={`cursor-target relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
          isActive 
            ? "text-white" 
            : "text-gray-400"
        }`}
      >
        <span className={`relative z-10 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:drop-shadow-[0_0_5px_rgba(236,72,153,0.5)] ${isActive ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : ""}`}>
          {link.label}
        </span>
      </a>
    </li>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  
  const navRef = useRef<HTMLUListElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    });

    gsap.from(".nav-item", {
      y: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.5,
      ease: "back.out(1.7)"
    });
  }, { scope: headerRef });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      setActiveLink(location.hash);
    }
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "#home", label: "home" },
    { href: "#projects", label: "projetos" },
    { href: "#about", label: "sobre" },
  ];

  const routeLinks = [
    { href: "/downloads", label: "downloads" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setActiveLink(hash);
    setIsMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.hash = hash;
        }
      }, 100);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', hash);
      }
    }
  };

  const getHref = (hash: string) => {
    return location.pathname === '/' ? hash : `/${hash}`;
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          {/* Logo / Terminal Identity */}
          <a 
            href={getHref("#home")}
            onClick={(e) => handleNavClick(e, "#home")}
            className="cursor-target group flex items-center relative z-50"
          >
            <img 
              src="/assets/logonavbar.png" 
              alt="Studio Oryon" 
              className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-white/5 rounded-full px-6 py-2 border border-white/5 backdrop-blur-sm relative">
            <ul ref={navRef} className="flex items-center gap-8 relative z-10">
              {navLinks.map((link) => (
                <NavItem 
                  key={link.href}
                  link={{ ...link, href: getHref(link.href) }}
                  isActive={activeLink === link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                />
              ))}
              {routeLinks.map((link) => (
                <li key={link.href} className="nav-item">
                  <Link
                    to={link.href}
                    className={`cursor-target relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                      location.pathname === link.href ? "text-white" : "text-gray-400"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className={`relative z-10 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:drop-shadow-[0_0_5px_rgba(236,72,153,0.5)] ${
                      location.pathname === link.href ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : ""
                    }`}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://wa.me/5511955821293?text=Olá%20Studio%20Oryon!%20Vim%20através%20do%20seu%20site."  
              target="_blank" 
              rel="noopener noreferrer"
              className="cursor-target bg-white text-black font-bold rounded-full px-6 py-2 hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2 group text-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <Mail size={14} className="group-hover:rotate-12 transition-transform" />
              <span className="font-mono text-xs group-hover:tracking-widest transition-all">Iniciar Projeto</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3 relative z-50">
            <button
              className="cursor-target text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Full-Screen Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[100] bg-black flex flex-col md:hidden h-[100dvh] overflow-y-auto"
            >
              {/* Menu Header: Logo & Close Button */}
              <div className="flex items-center justify-between w-full px-6 py-5 border-b border-white/10">
                <motion.img 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  src="/assets/logonavbar.png" 
                  alt="Studio Oryon" 
                  className="h-8 w-auto object-contain opacity-90"
                />
                <motion.button 
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90, transition: { duration: 0.3 } }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white/50 hover:text-white transition-colors"
                >
                  <X size={32} />
                </motion.button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 flex flex-col justify-center items-center w-full px-6 py-10 gap-12">
                
                {/* Navigation Links */}
                <ul className="flex flex-col items-center gap-8 w-full">
                  {navLinks.map((link, index) => (
                    <motion.li 
                      key={link.href}
                      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 20, filter: "blur(10px)", transition: { duration: 0.3, delay: index * 0.05 } }}
                      transition={{ 
                        delay: 0.3 + index * 0.1, 
                        duration: 0.7, 
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                    >
                      <a
                        href={link.href}
                        className="text-4xl font-bold text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 transition-all tracking-tight font-heading"
                        onClick={(e) => handleNavClick(e, link.href)}
                      >
                        {link.label.toUpperCase()}
                      </a>
                    </motion.li>
                  ))}
                  {routeLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 20, filter: "blur(10px)", transition: { duration: 0.3, delay: (navLinks.length + index) * 0.05 } }}
                      transition={{
                        delay: 0.3 + (navLinks.length + index) * 0.1,
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      <Link
                        to={link.href}
                        className="text-4xl font-bold text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 transition-all tracking-tight font-heading"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label.toUpperCase()}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                
                {/* CTA & Socials */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                  transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
                  className="flex flex-col items-center gap-8 w-full"
                >
                  <a 
                    href="https://wa.me/5511955821293?text=Olá%20Studio%20Oryon!%20Vim%20através%20do%20seu%20site." 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full max-w-xs py-4 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  >
                    <Mail size={20} />
                    INICIAR PROJETO
                  </a>

                  <div className="flex gap-10 pt-4 border-t border-white/10 w-full justify-center">
                    <a href="https://instagram.com/studiooryon" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-300">
                      <Instagram size={24} />
                    </a>
                    <a href="mailto:devwesleysc@gmail.com" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-300">
                      <Mail size={24} />
                    </a>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
