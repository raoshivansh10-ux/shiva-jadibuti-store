"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Download, ShoppingBag, Heart, User } from 'lucide-react';
import { generateProductCataloguePDF } from '@/utils/pdfGenerator';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import './PillNav.css';

export interface PillNavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface PillNavProps {
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  onOpenQuoteModal?: (productName?: string) => void;
  initialLoadAnimation?: boolean;
}

export const PillNav = ({
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#172925',
  pillColor = '#213833',
  hoveredPillTextColor = '#172925',
  pillTextColor = '#D0D9D8',
  onMobileMenuClick,
  onOpenQuoteModal,
  initialLoadAnimation = true
}: PillNavProps) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlistItems, setIsWishlistOpen } = useWishlist();
  const { user, setIsAuthModalOpen, setAuthMode } = useAuth();
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
  const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1 });
    }

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;

      if (logo) {
        gsap.set(logo, { scale: 0.8, opacity: 0 });
        gsap.to(logo, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease
        });
      }

      if (navItems) {
        gsap.set(navItems, { opacity: 0 });
        gsap.to(navItems, {
          opacity: 1,
          duration: 0.6,
          ease
        });
      }
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center'
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }

    onMobileMenuClick?.();
  };

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor
  } as React.CSSProperties;

  return (
    <div className="pill-nav-container">
      <nav className={`pill-nav ${className}`} aria-label="Primary Navigation" style={cssVars}>
        
        {/* Brand Pill Logo */}
        <a
          className="pill-logo flex items-center space-x-2 px-2.5"
          href="/"
          aria-label="Shiva Jadibuti Store Home"
          ref={logoRef}
        >
          <img
            src="/images/logo.png"
            alt="Shiva Jadibuti Store Logo"
            className="w-7 h-7 object-contain p-0.5 rounded-full border border-white/20 shadow-sm bg-white shrink-0"
          />
          <div className="flex flex-col text-left">
            <span className="pill-logo-text">SHIVA JADIBUTI</span>
            <span className="pill-logo-subtext">EST. 1994</span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href || `item-${i}`} role="none">
                <a
                  role="menuitem"
                  href={item.href}
                  className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                  aria-label={item.ariaLabel || item.label}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={el => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover" aria-hidden="true">
                      {item.label}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-1.5">
          {/* Wishlist Heart Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="p-2 rounded-full bg-[#213833] hover:bg-rose-500/20 text-[#98B4A1] hover:text-rose-400 transition-all border border-white/[0.08] relative cursor-pointer"
            title="View Favorites / Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${totalWishlistItems > 0 ? "fill-rose-400 text-rose-400" : ""}`} />
            {totalWishlistItems > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-extrabold flex items-center justify-center">
                {totalWishlistItems}
              </span>
            )}
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 rounded-full bg-[#213833] hover:bg-[#769489] text-[#98B4A1] hover:text-[#172925] transition-all border border-white/[0.08] relative cursor-pointer"
            title="View Shopping Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#769489] text-[#172925] text-[8px] font-extrabold flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* User Account / Profile Button */}
          <button
            onClick={() => {
              if (user) {
                setIsAuthModalOpen(true);
              } else {
                setAuthMode("login");
                setIsAuthModalOpen(true);
              }
            }}
            className="p-2 rounded-full bg-[#213833] hover:bg-[#769489] text-[#98B4A1] hover:text-[#172925] transition-all border border-white/[0.08] cursor-pointer"
            title={user ? `Account (${user.name})` : "Sign In / Register"}
          >
            <User className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => generateProductCataloguePDF()}
            className="p-2 rounded-full bg-[#213833] hover:bg-[#769489] text-[#98B4A1] hover:text-[#172925] transition-all border border-white/[0.08]"
            title="Download PDF Catalog"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onOpenQuoteModal?.()}
            className="pill-action-btn"
          >
            Get Quote
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {/* Mobile Drawer Popover */}
      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars}>
        <ul className="mobile-menu-list">
          {items.map((item, i) => (
            <li key={item.href || `mobile-item-${i}`} className="w-full">
              <a
                href={item.href}
                className={`mobile-menu-link w-full${activeHref === item.href ? ' is-active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-2 w-full flex flex-col space-y-2 items-center">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenQuoteModal?.();
              }}
              className="w-full py-3.5 rounded-full bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-widest text-center transition-all cursor-pointer"
            >
              Get Quote
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                generateProductCataloguePDF();
              }}
              className="w-full py-2.5 text-xs text-[#98B4A1] hover:text-[#D0D9D8] tracking-widest uppercase flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#769489]" />
              <span>Download PDF Catalog</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
