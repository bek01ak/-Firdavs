/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, type WheelEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowLeft, FlaskConical, Atom, Binary, Microscope, Globe, Cpu, Sparkles, Zap, Shield, Target, Calculator, Ruler, FunctionSquare, Magnet, Orbit, Waves } from 'lucide-react';

const LABS = [
  {
    id: 1,
    title: "Matematika",
    description: "Abstrakt tuzilmalar, mantiqiy qonuniyatlar va sonlar olami sirlari.",
    icon: <Calculator className="w-6 h-6" />,
    color: "from-blue-500/20 to-cyan-500/20",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
    symbols: ["π", "∑", "∞", "√", "∫", "Δ"]
  },
  {
    id: 2,
    title: "Fizika",
    description: "Koinotning fundamental qonunlari, energiya va materiya transformatsiyasi.",
    icon: <Magnet className="w-6 h-6" />,
    color: "from-red-500/20 to-orange-500/20",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80",
    symbols: ["E=mc²", "F=ma", "λ", "Ω", "G", "h"]
  },
  {
    id: 3,
    title: "Bio-Genetika",
    description: "Irsiyat va o'zgaruvchanlik qonuniyatlarini zamonaviy usullar bilan o'rganish.",
    icon: <FlaskConical className="w-6 h-6" />,
    color: "from-emerald-500/20 to-teal-500/20",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80",
    symbols: ["DNA", "RNA", "ATGC"]
  },
  {
    id: 4,
    title: "AI & Ma'lumotlar",
    description: "Sun'iy intellekt va katta ma'lumotlar tahlili laboratoriyasi.",
    icon: <Binary className="w-6 h-6" />,
    color: "from-purple-500/20 to-pink-500/20",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    symbols: ["01", "AI", "ML"]
  }
];

function FloatingSymbols({ symbols }: { symbols: string[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {symbols.map((symbol, i) => (
        <motion.div
          key={`${symbol}-${i}`}
          initial={{ 
            opacity: 0, 
            x: Math.random() * 100 - 50 + "%", 
            y: "110%" 
          }}
          animate={{ 
            opacity: [0, 0.5, 0], 
            y: "-10%",
            rotate: 360
          }}
          transition={{ 
            duration: 10 + Math.random() * 10, 
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute text-uz-gold/20 font-display font-bold text-4xl"
          style={{ left: Math.random() * 100 + "%" }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
}

const BENTO_ITEMS = [
  { title: "Innovatsiya", icon: <Sparkles className="w-5 h-5" />, desc: "Eng so'nggi texnologiyalar", size: "lg" },
  { title: "Tezkorlik", icon: <Zap className="w-5 h-5" />, desc: "Yuqori tezlikdagi tahlillar", size: "sm" },
  { title: "Xavfsizlik", icon: <Shield className="w-5 h-5" />, desc: "Ma'lumotlar himoyasi", size: "sm" },
  { title: "Aniq Natija", icon: <Target className="w-5 h-5" />, desc: "99.9% aniqlikdagi tadqiqotlar", size: "md" },
];

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        followerRef.current.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={followerRef} className="custom-cursor-follower hidden md:block" />
    </>
  );
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaY) > 50) {
      if (e.deltaY > 0) {
        setCurrentIndex((prev) => (prev + 1) % LABS.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + LABS.length) % LABS.length);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-[200vh] w-full bg-black selection:bg-uz-gold/30">
      <CustomCursor />

      {/* Parallax Background */}
      <motion.div 
        style={{ y: bgY }}
        animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="fixed inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?auto=format&fit=crop&w=1920&q=80" 
          alt="Registan" 
          className="h-full w-full object-cover opacity-30 scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-uz-blue/90 via-black/70 to-black" />
        <div className="absolute inset-0 ganch-pattern opacity-20" />
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="h-12 w-12 glass flex items-center justify-center atlas-glow">
            <span className="font-display font-bold text-uz-gold text-2xl">Z</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold tracking-[0.3em] uppercase text-white">Zuild Lab</span>
            <span className="text-[8px] uppercase tracking-[0.5em] text-uz-gold/60">Innovatsiya Markazi</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden md:flex items-center gap-12"
        >
          {['Laboratoriyalar', 'Tadqiqotlar', 'Haqimizda', 'Aloqa'].map((item, i) => (
            <a key={item} href="#" className="relative group text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-uz-gold transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Info */}
          <motion.div 
            style={{ y: textY }}
            className="lg:col-span-5 space-y-12"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 glass text-[10px] uppercase tracking-[0.3em] text-uz-gold mb-6 atlas-glow">
                  <Sparkles className="w-3 h-3" /> O'zbekiston Kelajagi
                </span>
                <h1 className="font-display text-6xl md:text-8xl font-light leading-[0.9] tracking-tighter mb-8">
                  Yangi <br /> 
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-uz-gold to-white/40">O'lchov</span>
                </h1>
                <p className="text-white/40 text-lg leading-relaxed max-w-md font-light tracking-wide">
                  Milliy qadriyatlar va global texnologiyalar kesishgan nuqtada biz yangi davrni boshlamoqdamiz.
                </p>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex items-center gap-8"
            >
              <button className="relative px-10 py-5 glass overflow-hidden group atlas-glow">
                <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold">Tadqiqotni Boshlash</span>
                <div className="absolute inset-0 bg-uz-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-display font-bold text-white">2.5k+</span>
                <span className="text-[8px] uppercase tracking-widest text-white/30">Muvaffaqiyatli Loyihalar</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: 3D Slider */}
          <div 
            className="lg:col-span-7 relative h-[600px] w-full flex items-center justify-center"
            onWheel={handleWheel}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, rotateY: 45, scale: 0.8, x: 200 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1, x: 0 }}
                exit={{ opacity: 0, rotateY: -45, scale: 0.8, x: -200 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-lg aspect-[4/5] glass overflow-hidden atlas-glow group relative"
              >
                <FloatingSymbols symbols={LABS[currentIndex].symbols} />
                <img 
                  src={LABS[currentIndex].image} 
                  alt={LABS[currentIndex].title}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-[2s]"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent`} />
                
                <div className="absolute inset-0 p-16 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 glass flex items-center justify-center text-uz-gold"
                    >
                      {LABS[currentIndex].icon}
                    </motion.div>
                    <div className="text-right">
                      <span className="block text-4xl font-display font-bold text-white/10">0{currentIndex + 1}</span>
                      <span className="text-[8px] uppercase tracking-widest text-uz-gold">Laboratoriya</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="font-display text-4xl font-bold tracking-tight text-white">
                      {LABS[currentIndex].title}
                    </h3>
                    <p className="text-white/50 text-base leading-relaxed font-light">
                      {LABS[currentIndex].description}
                    </p>
                    <div className="h-px w-full bg-white/10" />
                    <button className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black text-uz-gold group/btn">
                      Batafsil <div className="w-8 h-px bg-uz-gold group-hover/btn:w-12 transition-all" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Floating Navigation Dots */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4">
              {LABS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-1 transition-all duration-500 ${i === currentIndex ? 'h-12 bg-uz-gold' : 'h-4 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl font-light mb-4 tracking-tight">Afzalliklarimiz</h2>
            <div className="w-20 h-1 bg-uz-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[600px]">
            {BENTO_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass p-8 flex flex-col justify-between group hover:bg-white/5 transition-all duration-500 atlas-glow
                  ${item.size === 'lg' ? 'md:col-span-2 md:row-span-2' : ''}
                  ${item.size === 'md' ? 'md:col-span-2' : ''}
                `}
              >
                <div className="w-12 h-12 glass flex items-center justify-center text-uz-gold group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-white/40 text-sm font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 opacity-50">
            <div className="h-8 w-8 glass flex items-center justify-center">
              <span className="font-display font-bold text-uz-gold text-sm">Z</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em]">© 2026 Zuild Lab. Barcha huquqlar himoyalangan.</span>
          </div>
          <div className="flex gap-12">
            {['Instagram', 'Telegram', 'LinkedIn'].map(social => (
              <a key={social} href="#" className="text-[10px] uppercase tracking-widest text-white/30 hover:text-uz-gold transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Decorative Side Elements */}
      <div className="fixed left-8 bottom-8 z-50 flex flex-col gap-4 opacity-30">
        <div className="w-px h-32 bg-gradient-to-t from-uz-gold to-transparent" />
        <span className="[writing-mode:vertical-rl] rotate-180 text-[8px] uppercase tracking-[0.5em]">Toshkent, O'zbekiston</span>
      </div>
    </div>
  );
}
