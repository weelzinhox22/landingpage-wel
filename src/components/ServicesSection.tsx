import { useEffect, useRef, useState } from "react";
import { Globe, Palette, Rocket, Brain } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: "Desenvolvimento Web",
    description: "Sites e aplicações web modernas com React, TypeScript e tecnologias de ponta.",
    number: "01",
  },
  {
    icon: Palette,
    title: "Web Design & UI",
    description: "Design estratégico que vai além da estética. Interfaces intuitivas e sistemas consistentes.",
    number: "02",
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    description: "Páginas de conversão otimizadas com foco em resultados e alta performance.",
    number: "03",
  },
  {
    icon: Brain,
    title: "UX & Performance",
    description: "Experiências digitais otimizadas com pesquisa de usuário e testes de usabilidade.",
    number: "04",
  },
];

// Preview Component for Web Development
const WebDevPreview = ({ isVisible }: { isVisible: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && containerRef.current) {
      const container = containerRef.current;
      let scrollPosition = 0;
      const maxScroll = container.scrollHeight - container.clientHeight;
      let direction = 1;
      let isPaused = false;

      const scrollInterval = setInterval(() => {
        if (!isPaused) {
          scrollPosition += direction * 4;
          
          if (scrollPosition >= maxScroll) {
            direction = -1;
            isPaused = true;
            setTimeout(() => {
              isPaused = false;
            }, 1000);
          } else if (scrollPosition <= 0 && direction === -1) {
            direction = 1;
            isPaused = true;
            setTimeout(() => {
              isPaused = false;
            }, 1000);
          }
          
          container.scrollTop = scrollPosition;
        }
      }, 30);

      return () => clearInterval(scrollInterval);
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[600px] bg-white overflow-y-auto"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="min-h-[1400px] bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="text-2xl font-bold text-gray-900">DevApp</div>
            <nav className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Services</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-8 py-24 max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">Modern Web Development</h1>
          <p className="text-2xl text-gray-600 mb-4">Built with React, TypeScript, and Next.js</p>
          <p className="text-lg text-gray-500 mb-8">Create fast, scalable, and maintainable web applications</p>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-semibold">
              Get Started
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition font-semibold">
              View Docs
            </button>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="px-8 py-16 bg-white max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['React', 'TypeScript', 'Next.js', 'Node.js'].map((tech, i) => (
              <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">{tech}</div>
                <div className="text-sm text-gray-600">Latest version</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="px-8 py-16 bg-gray-50 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Fast Performance', desc: 'Optimized for speed with code splitting and lazy loading' },
              { title: 'Type Safety', desc: 'TypeScript ensures fewer bugs and better developer experience' },
              { title: 'SEO Optimized', desc: 'Server-side rendering for better search engine rankings' },
              { title: 'Responsive Design', desc: 'Works perfectly on all devices and screen sizes' },
              { title: 'Scalable Architecture', desc: 'Built to grow with your business needs' },
              { title: 'Modern UI/UX', desc: 'Beautiful interfaces that users love to interact with' }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">{i + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Development Process */}
        <section className="px-8 py-16 bg-white max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Development Process</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: 'Planning', desc: 'Requirements & architecture' },
              { step: 'Development', desc: 'Agile sprints & code review' },
              { step: 'Testing', desc: 'Quality assurance & bug fixes' },
              { step: 'Deployment', desc: 'CI/CD & production launch' }
            ].map((item, i) => (
              <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.step}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Code Example */}
        <section className="px-8 py-16 bg-gray-900 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Clean & Maintainable Code</h2>
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <pre className="text-green-400 text-sm overflow-x-auto">
{`import React from 'react';
import { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {label}
    </button>
  );
};

export default Button;`}
            </pre>
          </div>
          <p className="text-gray-400 text-sm">TypeScript ensures type safety and better code quality</p>
        </section>

        {/* API Integration */}
        <section className="px-8 py-16 bg-gray-50 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">API Integration</h2>
          <div className="grid grid-cols-3 gap-6">
            {['REST APIs', 'GraphQL', 'WebSocket'].map((api, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-blue-100 rounded-lg mb-4"></div>
                <h3 className="font-bold text-gray-900 mb-2">{api}</h3>
                <p className="text-sm text-gray-600">Seamless integration with modern APIs</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-8 py-16 bg-white max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Clients Say</h2>
          <div className="grid grid-cols-2 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'CEO, TechCorp', quote: 'The team delivered an exceptional product that exceeded our expectations.' },
              { name: 'Michael Chen', role: 'CTO, StartupX', quote: 'Fast, reliable, and beautifully designed. Highly recommended!' }
            ].map((testimonial, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-lg border-l-4 border-blue-600">
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-8 py-20 bg-blue-600 text-white max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 opacity-90">Let's build something amazing together</p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-gray-100 transition">
            Get In Touch
          </button>
        </section>

        {/* Footer */}
        <footer className="px-8 py-12 bg-gray-100 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {['Company', 'Services', 'Resources', 'Legal'].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold text-gray-900 mb-4">{col}</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {[1, 2, 3].map((item) => (
                    <li key={item}><a href="#" className="hover:text-gray-900">Link {item}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 text-sm">© 2026 DevApp. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

// Preview Component for Web Design
const WebDesignPreview = ({ isVisible }: { isVisible: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && containerRef.current) {
      const container = containerRef.current;
      let scrollPosition = 0;
      const maxScroll = container.scrollHeight - container.clientHeight;
      let direction = 1;
      let isPaused = false;

      const scrollInterval = setInterval(() => {
        if (!isPaused) {
          scrollPosition += direction * 4;
          
          if (scrollPosition >= maxScroll) {
            direction = -1;
            isPaused = true;
            setTimeout(() => {
              isPaused = false;
            }, 1000);
          } else if (scrollPosition <= 0 && direction === -1) {
            direction = 1;
            isPaused = true;
            setTimeout(() => {
              isPaused = false;
            }, 1000);
          }
          
          container.scrollTop = scrollPosition;
        }
      }, 30);

      return () => clearInterval(scrollInterval);
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[600px] bg-white overflow-y-auto"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="min-h-[1800px]">
        {/* Hero with gradient */}
        <section className="bg-gradient-to-br from-purple-600 to-pink-600 px-8 py-32 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-7xl font-bold mb-6">Beautiful Design</h1>
            <p className="text-2xl mb-4 opacity-95">Creating interfaces that users love</p>
            <p className="text-lg mb-10 opacity-80">Strategic design that transforms user experiences</p>
            <div className="flex gap-4 justify-center">
              <button className="bg-white text-purple-600 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
                View Portfolio
              </button>
              <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition">
                Get Started
              </button>
            </div>
          </div>
        </section>

        {/* Services Cards */}
        <section className="px-8 py-24 bg-white max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Services</h2>
          <p className="text-center text-gray-600 mb-12">Comprehensive design solutions for every need</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'UI/UX Design', desc: 'Intuitive interfaces that guide users seamlessly' },
              { title: 'Brand Identity', desc: 'Creating memorable visual identities for your brand' },
              { title: 'Design Systems', desc: 'Consistent design language across all platforms' },
              { title: 'Prototyping', desc: 'Interactive prototypes to test and refine concepts' }
            ].map((service, i) => (
              <div key={i} className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:shadow-xl transition">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{i + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <a href="#" className="text-purple-600 font-semibold text-sm hover:underline">Learn more →</a>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="px-8 py-20 bg-gray-50 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Design Process</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Research', 'Ideate', 'Design', 'Test'].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step}</h3>
                <p className="text-sm text-gray-600">Detailed process to ensure quality results</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="px-8 py-20 bg-white max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Projects', value: '500+' },
              { label: 'Happy Clients', value: '200+' },
              { label: 'Awards', value: '50+' },
              { label: 'Years Experience', value: '10+' }
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-xl">
                <div className="text-5xl font-bold text-purple-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-8 py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-white max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Elevate Your Brand?</h2>
          <p className="text-xl mb-8 opacity-95">Let's create something beautiful together</p>
          <button className="bg-white text-purple-600 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-xl">
            Start Your Project
          </button>
        </section>

        {/* Footer */}
        <footer className="px-8 py-12 bg-gray-900 text-white max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {['Design', 'Company', 'Resources'].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-4">{col}</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  {[1, 2, 3].map((item) => (
                    <li key={item}><a href="#" className="hover:text-white">Link {item}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm">© 2026 DesignStudio. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

// Preview Component for Landing Pages
const LandingPagePreview = ({ isVisible }: { isVisible: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && containerRef.current) {
      const container = containerRef.current;
      let scrollPosition = 0;
      const maxScroll = container.scrollHeight - container.clientHeight;
      let direction = 1;
      let isPaused = false;

      const scrollInterval = setInterval(() => {
        if (!isPaused) {
          scrollPosition += direction * 4;
          
          if (scrollPosition >= maxScroll) {
            direction = -1;
            isPaused = true;
            setTimeout(() => {
              isPaused = false;
            }, 1000);
          } else if (scrollPosition <= 0 && direction === -1) {
            direction = 1;
            isPaused = true;
            setTimeout(() => {
              isPaused = false;
            }, 1000);
          }
          
          container.scrollTop = scrollPosition;
        }
      }, 30);

      return () => clearInterval(scrollInterval);
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[600px] bg-white overflow-y-auto"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="min-h-[1800px]">
        {/* Hero CTA */}
        <section className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-40 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-8xl font-bold mb-6">Convert More Visitors</h1>
            <p className="text-3xl mb-4 opacity-95">The perfect landing page for your product</p>
            <p className="text-lg mb-10 opacity-80">Increase conversions with optimized design and strategy</p>
            <button className="bg-white text-orange-600 px-14 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition shadow-2xl mb-4">
              Start Free Trial
            </button>
            <p className="text-sm opacity-80">No credit card required • 14-day free trial</p>
          </div>
        </section>

        {/* Features */}
        <section className="px-8 py-24 bg-white max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Everything You Need</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              { title: 'Fast Setup', desc: 'Get started in minutes, not days' },
              { title: 'Custom Design', desc: 'Tailored to your brand and goals' },
              { title: 'High Conversion', desc: 'Proven strategies that work' }
            ].map((feature, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 text-2xl font-bold">✓</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="px-8 py-20 bg-gray-50 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Why Choose Us?</h2>
          <div className="space-y-10">
            {[
              { title: 'Proven Results', desc: 'Increase your conversion rate by up to 300% with our tested strategies and design patterns.' },
              { title: 'Expert Team', desc: 'Work with experienced designers and developers who understand conversion optimization.' },
              { title: 'Fast Delivery', desc: 'Get your landing page live in days, not weeks. Quick turnaround without compromising quality.' }
            ].map((benefit, i) => (
              <div key={i} className="flex gap-8 items-start bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-24 h-24 bg-orange-100 rounded-2xl flex-shrink-0 flex items-center justify-center">
                  <span className="text-orange-600 text-3xl font-bold">{i + 1}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Proof */}
        <section className="px-8 py-24 bg-white max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Trusted by 10,000+ Companies</h2>
          <div className="grid grid-cols-4 gap-8 mb-12 opacity-60">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 font-semibold">Logo {i}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-gray-600">
              <span className="text-4xl">⭐</span>
              <span className="text-2xl font-bold text-gray-900">4.9/5</span>
              <span className="text-gray-600">from 2,500+ reviews</span>
            </div>
          </div>
        </section>

        {/* Conversion Metrics */}
        <section className="px-8 py-16 bg-gray-50 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Conversion Optimization</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { metric: 'Average Conversion', value: '12.5%', desc: 'Industry leading rates' },
              { metric: 'Page Load Time', value: '0.9s', desc: 'Lightning fast' },
              { metric: 'Mobile Optimization', value: '100%', desc: 'Fully responsive' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">{item.value}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.metric}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Teaser */}
        <section className="px-8 py-20 bg-gradient-to-br from-orange-50 to-red-50 max-w-4xl mx-auto rounded-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 mb-8">One price. All features. No surprises.</p>
            <div className="bg-white p-8 rounded-2xl shadow-lg inline-block">
              <div className="text-5xl font-bold text-gray-900 mb-2">$99<span className="text-2xl text-gray-600">/month</span></div>
              <p className="text-gray-600 mb-6">Everything included</p>
              <button className="bg-orange-500 text-white px-10 py-3 rounded-lg font-bold hover:bg-orange-600 transition">
                Get Started
              </button>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-8 py-32 bg-gray-900 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-2xl mb-10 opacity-80">Join thousands of satisfied customers today</p>
            <div className="flex gap-4 justify-center">
              <button className="bg-orange-500 text-white px-14 py-5 rounded-full text-xl font-bold hover:bg-orange-600 transition shadow-xl">
                Get Started Now
              </button>
              <button className="border-2 border-white text-white px-14 py-5 rounded-full text-xl font-bold hover:bg-white/10 transition">
                Schedule Demo
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Preview Component for UX & Performance
const UXPerformancePreview = ({ isVisible }: { isVisible: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && containerRef.current) {
      const container = containerRef.current;
      let scrollPosition = 0;
      const maxScroll = container.scrollHeight - container.clientHeight;
      let direction = 1;
      let isPaused = false;

      const scrollInterval = setInterval(() => {
        if (!isPaused) {
          scrollPosition += direction * 4;
          
          if (scrollPosition >= maxScroll) {
            direction = -1;
            isPaused = true;
            setTimeout(() => {
              isPaused = false;
            }, 1000);
          } else if (scrollPosition <= 0 && direction === -1) {
            direction = 1;
            isPaused = true;
            setTimeout(() => {
              isPaused = false;
            }, 1000);
          }
          
          container.scrollTop = scrollPosition;
        }
      }, 30);

      return () => clearInterval(scrollInterval);
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[600px] bg-white overflow-y-auto"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="min-h-[1800px]">
        {/* Dashboard Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="text-2xl font-bold text-gray-900">Analytics Dashboard</div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Metrics */}
        <section className="px-8 py-16 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Performance Metrics</h1>
            <p className="text-lg text-gray-600 mb-10">Real-time insights into your website performance</p>
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Load Time', value: '0.8s', change: '+15%', trend: 'up' },
                { label: 'Page Score', value: '98', change: '+5%', trend: 'up' },
                { label: 'Active Users', value: '12.5k', change: '+22%', trend: 'up' },
                { label: 'Bounce Rate', value: '2.1%', change: '-8%', trend: 'down' }
              ].map((metric, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-600 mb-2 font-medium">{metric.label}</div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{metric.value}</div>
                  <div className={`text-xs font-semibold ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change} from last month
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Analytics Chart */}
        <section className="px-8 py-16 bg-white max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">User Analytics</h2>
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 h-80 flex items-center justify-center border border-gray-200">
            <div className="text-center">
              <div className="w-40 h-40 border-4 border-gray-300 border-t-blue-600 rounded-full mx-auto mb-4 animate-spin"></div>
              <p className="text-gray-600 font-medium">Real-time analytics chart</p>
              <p className="text-sm text-gray-500 mt-2">Tracking user behavior and engagement</p>
            </div>
          </div>
        </section>

        {/* User Journey */}
        <section className="px-8 py-16 bg-gray-50 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Optimized User Journey</h2>
          <p className="text-gray-600 mb-10">Each step optimized for maximum conversion</p>
          <div className="space-y-4">
            {[
              { step: 'Homepage', desc: 'First impression optimized', score: 98 },
              { step: 'Product Page', desc: 'Clear information architecture', score: 96 },
              { step: 'Checkout', desc: 'Streamlined conversion process', score: 97 },
              { step: 'Confirmation', desc: 'Clear success messaging', score: 99 }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-xl">{i + 1}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{item.step}</div>
                    <div className="text-sm text-gray-600">{item.desc}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-green-600 font-bold text-xl">✓ {item.score}%</div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* A/B Testing */}
        <section className="px-8 py-16 bg-white max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">A/B Testing Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { variant: 'Variant A', conversion: '3.2%', users: '5,234' },
              { variant: 'Variant B', conversion: '4.8%', users: '5,189', winner: true }
            ].map((test, i) => (
              <div key={i} className={`p-6 rounded-xl border-2 ${test.winner ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">{test.variant}</h3>
                  {test.winner && <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">WINNER</span>}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-bold text-gray-900">{test.conversion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Users</span>
                    <span className="font-bold text-gray-900">{test.users}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="px-8 py-20 bg-gradient-to-br from-blue-50 to-green-50 max-w-6xl mx-auto rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Performance Recommendations</h2>
          <div className="space-y-4">
            {[
              'Optimize images for faster load times',
              'Implement lazy loading for below-fold content',
              'Reduce JavaScript bundle size',
              'Enable browser caching for static assets'
            ].map((rec, i) => (
              <div key={i} className="bg-white p-5 rounded-xl flex items-center gap-4 shadow-sm">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  {i + 1}
                </div>
                <span className="text-gray-800 font-medium">{rec}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const previewRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          }
        });
      }

      if (cardsRef.current && cardsRef.current.children.length > 0) {
        gsap.from(Array.from(cardsRef.current.children), {
          opacity: 0,
          y: 50,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            once: true,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Preview animations removed - only click preview now

  const handleCardClick = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const previewComponents = [
    <WebDevPreview key="webdev" isVisible={activeIndex === 0} />,
    <WebDesignPreview key="webdesign" isVisible={activeIndex === 1} />,
    <LandingPagePreview key="landing" isVisible={activeIndex === 2} />,
    <UXPerformancePreview key="ux" isVisible={activeIndex === 3} />,
  ];

  return (
    <section
      ref={sectionRef}
      id="servicos"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 bg-background overflow-visible"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="mb-20">
            <h2
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-[0.95] tracking-tight uppercase text-center"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, letterSpacing: '-0.02em' }}
            >
            Serviços
          </h2>
        </div>

          {/* Services List */}
          <div ref={cardsRef} className="relative space-y-4 overflow-visible">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
            <div
              key={index}
                  className={`relative group transition-all duration-300 ${
                    activeIndex === index ? 'z-50' : 'z-10'
                  }`}
                  onClick={() => handleCardClick(index)}
                  style={{ opacity: 1, transform: 'translateY(0)' }}
                >
                  <div className="bg-white rounded-2xl p-8 md:p-12 cursor-pointer transition-all duration-300 hover:shadow-2xl" style={{ backgroundColor: '#ffffff' }}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      {/* Left Side - Number and Content */}
                      <div className="flex items-start gap-8 flex-1">
                        <div className="text-6xl md:text-7xl font-bold text-black/20 flex-shrink-0" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {service.number}
              </div>
                        <div className="flex-1">
                          <h3
                            className="text-2xl md:text-3xl font-bold text-black mb-3 uppercase tracking-tight"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                          >
                {service.title}
              </h3>
                          <p
                            className="text-black/60 text-base md:text-lg leading-relaxed mb-4"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                          >
                {service.description}
              </p>
                          <button
                            className="text-black/80 text-sm font-medium uppercase tracking-wider hover:text-black transition-colors flex items-center gap-2"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {activeIndex === index ? 'Fechar preview' : 'Ver preview completo'}
                            <span className="text-lg">→</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preview on Click (fixed below card) */}
                  {activeIndex === index && (
                    <div className="mt-6 w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
                      {previewComponents[index]}
                    </div>
                  )}
                </div>
              );
            })}
            </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
