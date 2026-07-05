import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis'; 
import emailjs from '@emailjs/browser'; 
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// --- SEED CONTENT DATABASE DATA ---
const initialProjects = [
  { 
    title: "METHOD 31°",
    role: "Brand Identity & Packaging Design",
    year: "2026", 
    client: "Personal project",
    desc: "A premium skincare brand crafted with a clean, minimalist aesthetic that reflects modern luxury and effortless sophistication. Designed to inspire trust through refined visuals, purposeful design, and an elevated skincare experience.",
    imageUrl: "/METHOD 31/m31-1.webp",
    gallery: [
      "/METHOD 31/m31-1.webp",     
      "/METHOD 31/m31-2.webp", 
      "/METHOD 31/m31-3.webp",
      "/METHOD 31/m31-5.webp",
      "/METHOD 31/m31-6.webp",
      "/METHOD 31/m31-8.webp",
      "/METHOD 31/m31-10.webp",
      "/METHOD 31/m31-11.webp",
      "/METHOD 31/m31-12.webp",
    ]
  },
  { 
    title: "MAISON",
    role: "Brand Identity & Visual Identity ",
    year: "2026", 
    client: "Personal project",
    desc: "A premium perfume brand crafted with a minimalist aesthetic, blending modern luxury with timeless elegance to create a memorable and elevated brand experience.",
    imageUrl: "/MAISON/m1.webp",
    gallery: [
      "/MAISON/m1.webp",     
      "/MAISON/m2.webp", 
      "/MAISON/m3.webp",
      "/MAISON/m4.webp",
      "/MAISON/m5.webp",
      "/MAISON/m6.webp",
      "/MAISON/m7.webp",
      "/MAISON/m8.webp",
      "/MAISON/m9.webp",
      "/MAISON/m10.webp",
    ]
  },
  { 
    title: "BODY & SOUL",
    role: "Brand Identity & Logo Design",
    year: "2026", 
    client: "Personal project",
    desc: "A Korean skincare brand crafted with a clean, calming aesthetic that reflects the essence of modern K beauty. Designed to embody simplicity, gentle formulations, and effortless elegance through refined branding and a cohesive visual identity.",
    imageUrl: "/BODY & SOUL/bs1.webp",
    gallery: [
      "/BODY & SOUL/bs1.webp",     
      "/BODY & SOUL/bs2.webp", 
      "/BODY & SOUL/bs3.webp",
      "/BODY & SOUL/bs4.webp",
      "/BODY & SOUL/bs5.webp",
      "/BODY & SOUL/bs6.webp",
      "/BODY & SOUL/bs7.webp",
      "/BODY & SOUL/bs8.webp",
      "/BODY & SOUL/bs9.webp",
      "/BODY & SOUL/bs10.webp",
      "/BODY & SOUL/bs11.webp",
    ]
  },
  { 
    title: "BARE EARTH",
    role: "Brand Identity & Logo Design",
    year: "2026", 
    client: "Personal project",
    desc: "A premium body care brand inspired by nature, blending earthy tones, minimalist design, and modern luxury. Crafted to evoke a sense of calm, self care, and effortless elegance through a refined and cohesive visual identity.",
    imageUrl: "/BARE EARTH/be1.webp",
    gallery: [
      "/BARE EARTH/be1.webp",     
      "/BARE EARTH/be2.webp", 
      "/BARE EARTH/be3.webp",
      "/BARE EARTH/be4.webp",
      "/BARE EARTH/be5.webp",
      "/BARE EARTH/be6.webp",
      "/BARE EARTH/be7.webp",
      "/BARE EARTH/be8.webp",
      "/BARE EARTH/be9.webp",
    ]
  },
  { 
    title: "RHODE REIMAGINED",
    role: "Brand Strategy & Rebranding",
    year: "2026", 
    client: "Personal project",
    desc: "A conceptual rebrand transforming Rhode from a beauty label into a contemporary New York fashion model agency. Designed with a bold editorial aesthetic, minimalist typography, and a refined monochrome visual identity that captures confidence, sophistication, and high fashion.",
    imageUrl: "/RHODE/r1.webp",
    gallery: [
      "/RHODE/r1.webp",     
      "/RHODE/r2.webp", 
      "/RHODE/r3.webp",
      "/RHODE/r4.webp",
      "/RHODE/r5.webp",
      "/RHODE/r6.webp",
      "/RHODE/r7.webp",
      "/RHODE/r8.webp",
      "/RHODE/r9.webp",
      "/RHODE/r10.webp",
      "/RHODE/r11.webp",
      "/RHODE/r12.webp",
    ]
  },
  { 
    title: "REFORMR",
    role: "Brand Strategy & Visual Identity",
    year: "2026", 
    client: "Personal project",
    desc: "A conceptual identity for a modern Pilates studio that blends movement, mindfulness, and luxury into a timeless brand experience. Inspired by contemporary editorial design, the identity embraces clean typography, muted palettes, and sophisticated layouts to create a visual language that feels calm, confident, and aspirational.",
    imageUrl: "/PILATES/p1.webp",
    gallery: [
      "/PILATES/p1.webp",     
      "/PILATES/p2.webp", 
      "/PILATES/p3.webp",
      "/PILATES/p4.webp",
      "/PILATES/p5.webp",
      "/PILATES/p6.webp",
      "/PILATES/p7.webp",
    ]
  }
];

const pricingPackages = [
  {
    title: "Starter Brand Identity",
    price: "₹25,000",
    subtitle: "Best for new beauty brands",
    features: [
      { name: "Includes", desc: "Creative moodboard, Primary wordmark, Secondary logo, Color palette, Typograph, Brand statement" },
      { name: "Mockups", desc: "2 brand mockups, 1 model photography mockup with product" },
      { name: "Print Design", desc: "Choice of: Business card/Loyalty card/Thank you card/Brand poster" },
      { name: "Mini Brand Guidelines", desc: "Provided by designer" },
      { name: "Revisions", desc: "2 rounds included (Additional: ₹2,000/round)" },
      { name: "Timeline", desc: "2 to 3 weeks" }
    ]
  },
  {
    title: "Premium Brand Identity",
    price: "₹40,000",
    subtitle: "Best for launch ready and growing beauty brands",
    features: [
      { name: "Includes", desc: "Moodboard, Primary wordmark, Secondary logo, Submark, Icon, Color palette, Typography, Brand statement & visual tone" },
      { name: "Mockups", desc: "3 brand mockups, 2 model photography mockups with product" },
      { name: "Print Designs", desc: "Business card, Loyalty card, Thank you card, Brand poster" },
      { name: "Label Design", desc: "Product label design (Front Visual design only)" },
      { name: "Extended Brand Guidelines", desc: "Provided by designer" },
      { name: "Revisions", desc: "2 rounds included (Additional: ₹2,500/round)" },
      { name: "Timeline", desc: "4 to 6 weeks" }
    ]
  },
  {
    title: "Logo Identity",
    price: "₹15,000",
    subtitle: "Social Media Design Packages",
    features: [
      { name: "Includes", desc: "Primary Wordmark, Secondary Logo, Brand Icon, Submark, Color Palette, Typography" },
      { name: "Mini Brand Guidelines", desc: "Provided by designer" },
      { name: "Revisions", desc: "2 rounds included" },
      { name: "Timeline", desc: "2 to 3 weeks" }
    ]
  },
  {
    title: "Social Media Design",
    price: "₹15,000",
    subtitle: "Social Media Design Packages",
    note: "(custom design only)",
    features: [
      { name: "Includes", desc: "3 Custom Instagram Post Designs, 3 Custom Instagram Story Designs, 3 Custom Highlight Cover Designs" },
      { name: "Revisions", desc: "2 round included" },
      { name: "Timeline", desc: "2 to 3 weeks" }
    ]
  }
];

// --- CORE UI COMPONENTS ---
function CustomCursor() {
  const cursorRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return; 
    const moveCursor = (e) => gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
    const handleHover = () => gsap.to(cursor, { scale: 3, backgroundColor: "transparent", border: "1px solid rgba(42, 40, 38, 0.4)", duration: 0.3 });
    const handleLeave = () => gsap.to(cursor, { scale: 1, backgroundColor: "#2A2826", border: "none", duration: 0.3 });
    window.addEventListener('mousemove', moveCursor);
    const attachEvents = () => {
      document.querySelectorAll('a, button, .project-row, .inline-image-pill, .project-inner-img, input, textarea, .custom-select-trigger, .custom-option, .pricing-card, .work-grid-item').forEach(el => {
        el.addEventListener('mouseenter', handleHover);
        el.addEventListener('mouseleave', handleLeave);
      });
    };
    attachEvents();
    setTimeout(attachEvents, 1000); 
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);
  return <div ref={cursorRef} className="custom-cursor"></div>;
}

function Magnetic({ children }) {
  const wrapperRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = wrapperRef.current;
    if(!el) return;
    const move = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.4;
      const y = (e.clientY - top - height / 2) * 0.4;
      gsap.to(el, { x, y, duration: 1, ease: 'power3.out' });
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
    };
  }, []);
  return <div ref={wrapperRef} className="magnetic-wrap">{children}</div>;
}

function Footer({ navigate }) {
  return (
    <section className="footer-section">
      <div className="footer-content">
        <div className="footer-header">
          <h2 className="footer-huge-text">Let's work</h2>
          <h2 className="footer-huge-text">together</h2>
        </div>
        <div className="footer-interaction">
          <div className="footer-line-container">
            <div className="footer-line"></div>
            <div className="get-in-touch-wrapper">
              <Magnetic>
                <button className="get-in-touch-btn" onClick={() => navigate('Contact')}>Get in touch</button>
              </Magnetic>
            </div>
          </div>
          <div className="footer-pill-buttons">
            <Magnetic><a href="mailto:studiokiki.co@gmail.com" className="pill-btn">studiokiki.co@gmail.com</a></Magnetic>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-col"><span className="col-title">VERSION</span><p>2026 © Edition</p></div>
          <div className="footer-col socials">
            <span className="col-title">SOCIALS</span>
            <div className="social-links">
              <Magnetic><a href="https://www.instagram.com/kiki.studioco/">Instagram</a></Magnetic>
              <Magnetic><a href="https://www.linkedin.com/in/kirthika-asari-5690743a2/">LinkedIn</a></Magnetic>
              <Magnetic><a href="https://www.behance.net/kirthikaasari">Behance</a></Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- PAGE COMPONENTS ---
function Home({ projects, navigate }) {
  const modalContainer = useRef(null);
  const cursorView = useRef(null);
  const aboutImageCompositionRef = useRef(null);
  const [modal, setModal] = useState({ active: false, index: 0 });
  const displayedProjects = projects.slice(0, 3);
  const showMoreButton = projects.length > 3;
  const helloText = "Hello".split('');
  const imKikiText = "I'm Kirthika".split('');

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('.hero-line h1, .inline-image-pill, .hero-badge', 
      { y: 200, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
    );
    if (!window.matchMedia("(pointer: coarse)").matches) {
      let xMoveContainer, yMoveContainer, xMoveCursor, yMoveCursor;
      if (modalContainer.current && cursorView.current) {
        xMoveContainer = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" });
        yMoveContainer = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" });
        xMoveCursor = gsap.quickTo(cursorView.current, "left", { duration: 0.5, ease: "power3" });
        yMoveCursor = gsap.quickTo(cursorView.current, "top", { duration: 0.5, ease: "power3" });
      }
      const handleMouseMove = (e) => {
        if (xMoveContainer) xMoveContainer(e.clientX);
        if (yMoveContainer) yMoveContainer(e.clientY);
        if (xMoveCursor) xMoveCursor(e.clientX);
        if (yMoveCursor) yMoveCursor(e.clientY);
      }
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    if (aboutImageCompositionRef.current) {
      gsap.fromTo('.text-top .type-char', 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.01, stagger: 0.15, ease: 'none',
          scrollTrigger: {
            trigger: aboutImageCompositionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
      gsap.fromTo('.text-bottom .type-char', 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.01, stagger: 0.1, ease: 'none', delay: 0.8, 
          scrollTrigger: {
            trigger: aboutImageCompositionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    gsap.to('.marquee-inner', { xPercent: -50, ease: "none", duration: 55, repeat: -1 });
    return () => ScrollTrigger.getAll().forEach(t => t.kill()); 
  }, []);

  useEffect(() => {
    if (modal.active && modalContainer.current && cursorView.current && !window.matchMedia("(pointer: coarse)").matches) {
      gsap.to([modalContainer.current, cursorView.current], { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" });
    } else if (modalContainer.current && cursorView.current) {
      gsap.to([modalContainer.current, cursorView.current], { scale: 0, opacity: 0, duration: 0.4, ease: "power3.out" });
    }
  }, [modal.active]);

  return (
    <>
    <div className="mobile-reorder-wrap">
      <section className="hero">
        <div className="hero-typographic-layout">
          <div className="hero-line row-inline">
            <h1 className="serif-italic">FREELANCE</h1>
            <div className="hero-badge">
               <svg viewBox="0 0 100 100" className="badge-spin">
                 <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                 <text><textPath href="#circlePath" fill="currentColor" letterSpacing="2">A CREATIVE ENDEAVOR ·</textPath></text>
                 <circle cx="50" cy="50" r="15" fill="currentColor"/>
               </svg>
            </div>
          </div>
          <div className="hero-line"><h1 className="sans-bold">BRAND</h1></div>
          <div className="hero-line row-inline">
            <h1 className="sans-bold">DES</h1>
            <div className="inline-image-pill">
              <img src={displayedProjects[0]?.imageUrl || "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1000"} alt="Abstract Design" />
            </div>
            <h1 className="sans-bold">GNER</h1>
          </div>
        </div>
      </section>

      <section className="about-section-wrapper">
        <div className="about-layout-split">
          <div className="about-left-col">
            <div className="about-image-composition" ref={aboutImageCompositionRef}>
              <h2 className="about-typing-text text-top">
                {helloText.map((char, i) => (
                  <span className="type-char" key={i}>{char === " " ? "\u00A0" : char}</span>
                ))}
              </h2>
              <div className="about-portrait-frame">
                <img src="about3.png" alt="Kirthika Asari" className="about-portrait-img" />
              </div>
              <div className="glass-spin-badge">
                <svg viewBox="0 0 100 100">
                  <path id="circlePathBadge" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                  <text><textPath href="#circlePathBadge" fill="currentColor" letterSpacing="1.5">Brand Designer • Brand Designer • </textPath></text>
                </svg>
              </div>
              <h2 className="about-typing-text text-bottom">
                {imKikiText.map((char, i) => (
                  <span className="type-char" key={i}>{char === " " ? "\u00A0" : char}</span>
                ))}
              </h2>
            </div>
          </div>
          <div className="about-right-col">
            <div className="about-quote-box">
              <p className="about-paragraph">
                Hi, I’m Kirthika Asari, a Brand Designer specializing in beauty, fashion, and lifestyle brands. If you’re building a brand that deserves to look as premium as your vision, you’re in the right place. From thoughtful logos to cohesive visual identities, I create purposeful designs that help brands launch with confidence, stand out in a competitive market, and leave a lasting impression.
              </p>
              {/* <p className="about-paragraph" style={{ marginTop: '1.5rem' }}>
                My approach merges classic design principles with modern digital innovation. I believe that every touchpoint of a brand—from the packaging to the web experience—should feel intentional, tactile, and completely cohesive.
              </p> */}
            </div>
          </div>
        </div>
      </section>
    </div>

      <div className="about-marquee-container">
        <div className="marquee-inner">
          <div className="marquee-part">
            <h1 className="about-marquee-text">Kirthika Asari —</h1>
            <h1 className="about-marquee-text">Kirthika Asari —</h1>
            <h1 className="about-marquee-text">Kirthika Asari —</h1>
            <h1 className="about-marquee-text">Kirthika Asari —</h1>
            <h1 className="about-marquee-text">Kirthika Asari —</h1>
            <h1 className="about-marquee-text">Kirthika Asari —</h1>
          </div>
          <div className="marquee-part">
            <h1 className="about-marquee-text">Kirthika Asari —</h1>
            <h1 className="about-marquee-text">Kirthika Asari —</h1>
            <h1 className="about-marquee-text">Kirthika Asari —</h1>
            <h1 className="about-marquee-text">Kirthika Asari —</h1>
            <h1 className="about-marquee-text">Kirthika Asari —</h1>
            <h1 className="about-marquee-text">Kirthika Asari —</h1>
          </div>
        </div>
      </div>

      <section className="work-section">
        <div className="work-header">
          <h2>Recent Works</h2>
        </div>
        {projects.length > 0 ? (
          <div className="project-list-wrapper" 
               onMouseEnter={() => setModal({active: true, index: modal.index})} 
               onMouseLeave={() => setModal({active: false, index: modal.index})}>
            {displayedProjects.map((proj, i) => (
              <div key={i} className="project-row" 
                   onMouseEnter={() => setModal({active: true, index: i})}
                   onClick={() => navigate(proj.title)}>
                <h3 className="project-row-title">{proj.title}</h3>
                <p className="project-row-role">{proj.role}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ opacity: 0.5, fontStyle: 'italic', marginTop: '2rem' }}>No projects available right now. Please upload a project via the admin hub.</p>
        )}
        {showMoreButton && (
          <div className="more-works-container">
            <Magnetic><button className="pill-btn inverted-pill" onClick={() => navigate('Work')}>More works</button></Magnetic>
          </div>
        )}
      </section>

      <section className="services-preview">
        <div className="services-preview-content">
          <div className="services-preview-left">
            <h3>From logos to complete visual identities, I create premium branding that reflects your vision and leaves a lasting impression.</h3>
            <p className="services-italic-prompt">Ready to elevate your brand?</p>
          </div>
          <div className="services-preview-right" style={{ alignItems: 'center', margin: 'auto 0' }}>
            <Magnetic><button className="circular-btn" onClick={() => navigate('Services')}>service</button></Magnetic>
          </div>
        </div>
      </section>

      {projects.length > 0 && (
        <div ref={modalContainer} className="project-modal">
          <div className="project-modal-slider" style={{ transform: `translateY(-${modal.index * 100}%)` }}>
            {displayedProjects.map((proj, i) => (
              <div key={i} className="modal-img-container"><img src={proj.imageUrl} alt={proj.title} /></div>
            ))}
          </div>
        </div>
      )}
      <div ref={cursorView} className="project-cursor-view">View</div>
    </>
  );
}

function WorkPage({ projects, navigate }) {
  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [projects]);

  return (
    <section className="work-full-page">
      <div className="work-full-header">
        <h1 className="huge-text">Selected<br/>Works.</h1>
        <p>A curated collection of brand identities, digital experiences, and art direction.</p>
      </div>
      <div className="work-grid">
        {projects.map((proj, i) => (
          <div key={i} className="work-grid-item" onClick={() => navigate(proj.title)}>
            <div className="work-item-img-wrap">
              <img src={proj.imageUrl} alt={proj.title} className="work-item-img" />
            </div>
            <div className="work-item-meta">
              <h3 className="work-item-title">{proj.title}</h3>
              <p className="work-item-role">{proj.role}</p>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p style={{ opacity: 0.5, fontStyle: 'italic', marginTop: '2rem' }}>Check back soon for new case studies!</p>
        )}
      </div>
    </section>
  );
}

function ProjectInnerPage({ project, navigate }) {
  const viewportRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const rotTarget = useRef(0);
  const rotCurrent = useRef({ val: 0 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let cylinderImages = [...project.gallery];
  if (cylinderImages.length > 0) {
      while (cylinderImages.length < 8) {
        cylinderImages = [...cylinderImages, ...project.gallery];
      }
  }

  const numItems = cylinderImages.length;
  const theta = 360 / numItems;
  const radiusBase = '22vw';
  const radiusCSS = `calc(${radiusBase} / ${Math.tan(Math.PI / numItems)})`;

  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleWheel = (e) => {
      // Only apply 3D math on desktop
      if (isMobile) return;
      e.preventDefault(); 
      e.stopPropagation(); 
      rotTarget.current -= e.deltaY * 0.15; 
      gsap.to(rotCurrent.current, {
        val: rotTarget.current,
        duration: 1.2, 
        ease: "power3.out",
        onUpdate: () => setRotation(rotCurrent.current.val)
      });
    };

    const handleTouchStart = (e) => {
      if (isMobile) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      gsap.killTweensOf(rotCurrent.current); 
      rotTarget.current = rotCurrent.current.val;
    };

    const handleTouchMove = (e) => {
      if (isMobile) return;
      e.preventDefault(); 
      e.stopPropagation(); 
      const deltaX = e.touches[0].clientX - startX;
      const deltaY = e.touches[0].clientY - startY;
      rotTarget.current += (deltaX * 0.3 + deltaY * 0.3);
      rotCurrent.current.val = rotTarget.current; 
      setRotation(rotCurrent.current.val); 
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    
    const viewport = viewportRef.current;
    if (viewport && !isMobile) {
      viewport.addEventListener('wheel', handleWheel, { passive: false });
      viewport.addEventListener('touchstart', handleTouchStart, { passive: false });
      viewport.addEventListener('touchmove', handleTouchMove, { passive: false });
      return () => {
        viewport.removeEventListener('wheel', handleWheel);
        viewport.removeEventListener('touchstart', handleTouchStart);
        viewport.removeEventListener('touchmove', handleTouchMove);
      }
    }
  }, [isMobile]);

  const normalizedRotation = ((rotation % 360) + 360) % 360;
  let activeIndex = Math.round((360 - normalizedRotation) / theta) % numItems;
  if (activeIndex < 0) activeIndex += numItems;

  return (
    <section className="inner-project-container">
      <div className="split-layout">
        
        <div className="split-left">
          <div className="project-detail-meta-wrap">
            <h1 className="inner-project-main-title">{project.title}</h1>
            <p className="inner-project-paragraph-desc">{project.desc}</p>
            
            <div className="meta-split-table">
              <div className="meta-split-row">
                <span className="meta-label">Client</span>
                <span className="meta-value">{project.client}</span>
              </div>
              <div className="meta-split-row">
                <span className="meta-label">Role</span>
                <span className="meta-value">{project.role}</span>
              </div>
              <div className="meta-split-row">
                <span className="meta-label">Year</span>
                <span className="meta-value">{project.year}</span>
              </div>
            </div>
          </div>
          
          <button className="back-to-work-link desktop-back" onClick={() => navigate('Work')}>
            ← Back to all work
          </button>
        </div>

        <div className="split-right viewport-3d" ref={viewportRef} data-lenis-prevent={isMobile ? "false" : "true"}>
          {isMobile ? (
            /* --- NEW MOBILE AMAZON-STYLE HORIZONTAL SWIPER --- */
            <div className="work-gallery-slider">
              {project.gallery.map((imgUrl, index) => (
                <img 
                  key={index} 
                  src={imgUrl} 
                  alt={`${project.title} screenshot ${index + 1}`} 
                  className="slider-image"
                />
              ))}
            </div>
          ) : (
            /* --- DESKTOP 3D CYLINDER --- */
            <div className="scene-3d">
              <div 
                className="carousel-3d" 
                style={{ transform: `translateZ(calc(-1 * ${radiusCSS})) rotateY(${rotation}deg)` }}
              >
                {cylinderImages.map((imgUrl, idx) => {
                  const itemAngle = idx * theta;
                  const isActive = idx === activeIndex;
                  return (
                    <div 
                      key={idx} 
                      className={`carousel-card-3d ${isActive ? 'active' : ''}`}
                      style={{ transform: `rotateY(${itemAngle}deg) translateZ(${radiusCSS})` }}
                    >
                      <img src={imgUrl} alt={`${project.title} showcase ${idx}`} className="slider-inline-photo" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <button className="back-to-work-link mobile-back" onClick={() => navigate('Work')}>
          ← Back to all work
        </button>

      </div>
    </section>
  );
}

function ServicesPage({ navigate }) {
  return (
    <section className="services-full-page">
      <div className="services-header">
        <h1 className="huge-text">Packages.</h1>
        <p>A focused suite of offerings designed to elevate your brand in the digital and physical world.</p>
      </div>
      <div className="pricing-grid">
        {pricingPackages.map((pkg, i) => (
          <div key={i} className={`pricing-card ${pkg.isPopular ? 'popular' : ''}`}>
            {pkg.isPopular && <div className="popular-badge">Most Popular</div>}
            <div className="pricing-card-header">
              <h3 className="pricing-title">{pkg.title}</h3>
              <div className="pricing-price">{pkg.price}</div>
              <p className="pricing-subtitle">{pkg.subtitle}</p>
              {pkg.note && <p className="pricing-subtitle" style={{ marginTop: '0.2rem', fontStyle: 'italic' }}>{pkg.note}</p>}
            </div>
            <div className="pricing-features">
              {pkg.features.map((feat, j) => (
                <div key={j} className="feature-item">
                  <div className="feature-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div className="feature-text">
                    <span className="feature-name">{feat.name}</span>
                    <p className="feature-desc">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="pricing-btn" onClick={() => navigate('Contact')}>Select Package</button>
          </div>
        ))}
      </div>
    </section>
  );
}

function SmoothDropdown({ selectedOptions, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleSelect = (opt) => {
    if (selectedOptions.includes(opt)) {
      onChange(selectedOptions.filter(item => item !== opt));
    } else {
      onChange([...selectedOptions, opt]);
    }
  };
  const displayText = selectedOptions.length === 0 
    ? "Select packages..." 
    : selectedOptions.length > 2 
      ? `${selectedOptions.length} packages selected` 
      : selectedOptions.join(', ');

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div className={`custom-select-trigger ${isOpen ? 'open' : ''} ${selectedOptions.length > 0 ? 'selected' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span className="truncate-text">{displayText}</span>
        <span className="arrow"></span>
      </div>
      <div className={`custom-options-container ${isOpen ? 'open' : ''}`}>
        {options.map((opt, i) => {
          const isSelected = selectedOptions.includes(opt);
          return (
            <div key={i} className={`custom-option ${isSelected ? 'active' : ''}`} onClick={() => handleSelect(opt)}>
              <div className="checkbox">{isSelected && <span className="check">✓</span>}</div>
              {opt}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ContactPage() {
  const form = useRef(); 
  const [formData, setFormData] = useState({ name: '', email: '', project_type: [], message: '' });
  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleDropdownChange = (newSelection) => setFormData({ ...formData, project_type: newSelection });

  const sendEmail = (e) => {
    e.preventDefault();
    if(formData.project_type.length === 0) {
      setStatus('Please select at least one service.');
      return;
    }
    setIsSending(true);
    setStatus('Sending your inquiry...');

    emailjs.sendForm('service_c8j52so', 'template_zii3oa2', form.current, 'PdKcjFSEW6TuictaI')
      .then((result) => {
          setStatus('Inquiry sent successfully! I will be in touch soon.');
          setIsSending(false);
          setFormData({ name: '', email: '', project_type: [], message: '' });
          setTimeout(() => setStatus(''), 6000);
      }, (error) => {
          setStatus('Oops! Something went wrong. Please try again.');
          setIsSending(false);
          console.log(error.text);
      });
  };

  return (
    <section className="contact-page-wrapper">
      <div className="contact-layout">
        <div className="contact-left">
          <h1 className="huge-text">Let's<br/>Connect.</h1>
          <p>Fill out the form below with the details of your project, and I will get back to you to discuss the next steps.</p>
        </div>
        <div className="contact-right">
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="form-group-row">
              <div className="form-group" style={{width: '50%'}}>
                <label>Your Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="contact-input" required placeholder="John Doe" />
              </div>
              <div className="form-group" style={{width: '50%'}}>
                <label>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="contact-input" required placeholder="hello@example.com" />
              </div>
            </div>
            <div className="form-group" style={{width: '100%', position: 'relative', zIndex: 10}}>
              <label>Packages Needed *</label>
              <input type="hidden" name="project_type" value={formData.project_type.join(', ')} required />
              <SmoothDropdown 
                selectedOptions={formData.project_type} 
                onChange={handleDropdownChange} 
                options={[
                  "Starter Brand Identity", 
                  "Premium Brand Identity", 
                  "Logo Identity", 
                  "Social Media Design"
                ]} 
              />
            </div>
            <div className="form-group">
              <label>Project Details *</label>
              <textarea name="message" value={formData.message} onChange={handleChange} className="contact-input" required placeholder="Tell me about your brand, your goals, and your timeline..."></textarea>
            </div>
            <div className="form-footer">
              <Magnetic>
                <button type="submit" className="pill-btn inverted-pill submit-btn" disabled={isSending}>
                  {isSending ? 'Sending...' : 'Send Inquiry'}
                </button>
              </Magnetic>
              {status && <p className="submit-status">{status}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function AdminPortal({ onAddProject }) {
  const [project, setProject] = useState({ title: '', role: '', year: '', client: '', desc: '', imageUrl: '', galleryStr: '' });
  const [msg, setMsg] = useState('');
  const inputChange = (e) => setProject({ ...project, [e.target.name]: e.target.value });

  const handlePublish = (e) => {
    e.preventDefault();
    if (!project.title || !project.imageUrl) return;
    const galleryArray = project.galleryStr.split(',').map(url => url.trim()).filter(url => url.length > 0);
    const finalGallery = galleryArray.length > 0 ? galleryArray : [project.imageUrl];
    onAddProject({
      title: project.title,
      role: project.role || "Brand System",
      year: project.year || "2026",
      client: project.client || "Independent",
      desc: project.desc || "Bespoke creative design solution.",
      imageUrl: project.imageUrl,
      gallery: finalGallery
    });
    setMsg('Project published directly to live matrix pipeline!');
    setProject({ title: '', role: '', year: '', client: '', desc: '', imageUrl: '', galleryStr: '' });
    setTimeout(() => setMsg(''), 5000);
  };

  return (
    <section className="admin-wrapper">
      <div className="admin-container-box">
        <div className="admin-header-row">
          <h1 className="admin-title">Upload Hub</h1>
          <p>Input text metadata parameters and public hotlink image paths to scale Kiki's portfolio index.</p>
        </div>
        <form onSubmit={handlePublish} className="admin-form">
          <div className="admin-row-grid">
            <div className="admin-field"><label>Project Title</label><input type="text" name="title" value={project.title} onChange={inputChange} required placeholder="e.g. Lumina Cosmetics" /></div>
            <div className="admin-field"><label>Role / Scope</label><input type="text" name="role" value={project.role} onChange={inputChange} placeholder="e.g. Identity & Art Direction" /></div>
          </div>
          <div className="admin-row-grid">
            <div className="admin-field"><label>Client Name</label><input type="text" name="client" value={project.client} onChange={inputChange} placeholder="e.g. Lumina Group" /></div>
            <div className="admin-field"><label>Year</label><input type="text" name="year" value={project.year} onChange={inputChange} placeholder="e.g. 2026" /></div>
          </div>
          <div className="admin-field"><label>Overview Description</label><textarea name="desc" value={project.desc} onChange={inputChange} placeholder="Write the creative design concept narrative..."></textarea></div>
          <div className="admin-field">
            <label>Thumbnail / Primary Image Route (Portrait 4:5)</label>
            <input type="text" name="imageUrl" value={project.imageUrl} onChange={inputChange} required placeholder="Paste absolute link path or local static index location..." />
          </div>
          <div className="admin-field">
            <label>3D Cylinder Track Gallery Images (Separated by Commas)</label>
            <textarea name="galleryStr" value={project.galleryStr} onChange={inputChange} placeholder="http://link1.jpg, http://link2.jpg, http://link3.jpg"></textarea>
          </div>
          <button type="submit" className="admin-submit-btn">Publish Project</button>
          {msg && <p className="admin-success-alert">{msg}</p>}
        </form>
      </div>
    </section>
  );
}

// --- MAIN APP ROUTER ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [transitionText, setTransitionText] = useState('Kiki');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const lenisRef = useRef(null);

  const [dynamicProjects, setDynamicProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('kiki_projects_v3');
      return saved ? JSON.parse(saved) : initialProjects;
    } catch (e) {
      return initialProjects;
    }
  });

  const handleAddNewProject = (newProj) => {
    const updated = [newProj, ...dynamicProjects];
    setDynamicProjects(updated);
    localStorage.setItem('kiki_projects_v3', JSON.stringify(updated));
  };

  useEffect(() => {
    const handleUrlPathCheck = () => {
      const path = window.location.pathname;
      if (path === '/upload' || path === '/upload/') {
        setCurrentPage('Admin');
      }
    };
    handleUrlPathCheck();
    window.addEventListener('popstate', handleUrlPathCheck);
    return () => window.removeEventListener('popstate', handleUrlPathCheck);
  }, []);

useEffect(() => {
    try {
      if (!window.matchMedia("(pointer: coarse)").matches) {
        lenisRef.current = new Lenis({ duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
        function raf(time) { lenisRef.current?.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
      }
    } catch (error) { console.warn("Smooth scroll skipped"); }

    gsap.to('.page-transition', { yPercent: -100, duration: 1.2, ease: 'power4.inOut', delay: 0.8 });
    return () => { if (lenisRef.current) lenisRef.current.destroy(); };
  }, []);

const handleNavClick = (pageName) => {
    setIsMobileMenuOpen(false); 
    if (pageName === currentPage) return;
    setTransitionText(pageName);
    
    ScrollTrigger.getAll().forEach(t => t.kill());
    
    gsap.fromTo('.page-transition', 
      { yPercent: 100 }, 
      { yPercent: 0, duration: 0.8, ease: 'power4.inOut', onComplete: () => {
        
        // 1. FREEZE Lenis so it stops fighting the scroll reset
        if (lenisRef.current) lenisRef.current.stop();

        // 2. Tell React to swap the page content
        setCurrentPage(pageName);
        if (pageName !== 'Admin' && window.location.pathname === '/upload') {
          window.history.pushState({}, '', '/');
        }
        
        // 3. Wait 100ms to guarantee React has painted the new DOM elements
        setTimeout(() => {
          // Brute force all browser scroll levels to absolute zero
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          
          // Reset Lenis's internal memory and wake it back up
          if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
            lenisRef.current.start(); 
          }
          
          ScrollTrigger.refresh();
          
          // 4. Reveal the new page seamlessly at the top
          gsap.to('.page-transition', { yPercent: -100, duration: 0.8, ease: 'power4.inOut' });
        }, 100); 
      }}
    );
  };

  const matchingProject = dynamicProjects.find(p => p.title === currentPage);

  return (
    <div className="portfolio-container" ref={containerRef}>
      <div className="noise-overlay"></div>
      <CustomCursor />
      <div className="page-transition"><h2>{transitionText}</h2></div>
      
      <nav className={`navbar ${isMobileMenuOpen ? 'menu-open' : ''}`}>
        <div className="logo" onClick={() => handleNavClick('Home')} style={{cursor: 'pointer'}}>© Designs by Kiki</div>
        <div className="nav-links desktop-only">
          <a onClick={() => handleNavClick('Work')} style={{cursor: 'pointer'}}>Work</a>
          <a onClick={() => handleNavClick('Services')} style={{cursor: 'pointer'}}>Services</a>
          <a onClick={() => handleNavClick('Contact')} style={{cursor: 'pointer'}}>Contact</a>
        </div>
        <button 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-links">
          <a onClick={() => handleNavClick('Work')}>Work</a>
          <a onClick={() => handleNavClick('Services')}>Services</a>
          <a onClick={() => handleNavClick('Contact')}>Contact</a>
        </div>
      </div>

      <main>
        {currentPage === 'Home' && <Home projects={dynamicProjects} navigate={handleNavClick} />}
        {currentPage === 'Work' && <WorkPage projects={dynamicProjects} navigate={handleNavClick} />}
        {currentPage === 'Services' && <ServicesPage navigate={handleNavClick} />}
        {currentPage === 'Contact' && <ContactPage />}
        {currentPage === 'Admin' && <AdminPortal onAddProject={handleAddNewProject} />}
        {matchingProject && <ProjectInnerPage project={matchingProject} navigate={handleNavClick} />}
      </main>
      <Footer navigate={handleNavClick} />
    </div>
  );
}
