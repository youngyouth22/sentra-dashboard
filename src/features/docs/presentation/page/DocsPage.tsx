import { useEffect, useRef, useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { ApiDocsUrl, GatewayBaseUrl } from '@/core/api/endpoints';
import { RoutePaths } from '@/core/routes/route-paths';
import { useTheme } from '@/core/context/ThemeProvider';
import Logo from '@/assets/images/logo.svg';
import ErrorHero from '@/core/components/errorPage/Hero';

// ─── Types ───────────────────────────────────────────────────────────────────
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Redoc: any;
  }
}

// ─── Theme tokens ─────────────────────────────────────────────────────────────
// ─── Theme tokens ─────────────────────────────────────────────────────────────
const DARK: Record<string, string> = {
  bg: '#000000',
  headerBg: 'rgba(0,0,0,0.85)',
  headerBorder: '#18181b',
  sep: '#27272a',
  textPrimary: '#fafafa',
  textSecondary: '#a1a1aa',
  sidebarBg: '#000000',
  sidebarText: '#a1a1aa',
  sidebarActiveText: '#ffffff',
  sidebarActiveBg: '#18181b',
  rightPanel: '#09090b',
  codeBg: '#09090b',
  codeColor: '#e4e4e7',
  nestedBg: '#09090b',
  border: '#18181b',
  typeColor: '#a1a1aa',
  titleColor: '#71717a',
  rSuccess: '#022c22', rError: '#2c0707',
  rRedirect: '#2c2007', rInfo: '#18181b',
};

const LIGHT: Record<string, string> = {
  bg: '#ffffff',
  headerBg: 'rgba(255,255,255,0.90)',
  headerBorder: '#e4e4e7',
  sep: '#e4e4e7',
  textPrimary: '#000000',
  textSecondary: '#52525b',
  sidebarBg: '#ffffff',
  sidebarText: '#52525b',
  sidebarActiveText: '#000000',
  sidebarActiveBg: '#f4f4f5',
  rightPanel: '#fafafa',
  codeBg: '#f4f4f5',
  codeColor: '#18181b',
  nestedBg: '#fafafa',
  border: '#e4e4e7',
  typeColor: '#52525b',
  titleColor: '#71717a',
  rSuccess: '#f0fdf4', rError: '#fef2f2',
  rRedirect: '#fffbeb', rInfo: '#f4f4f5',
};

function buildRedocOptions(dark: boolean) {
  const t = dark ? DARK : LIGHT;
  const primaryColor = dark ? '#ffffff' : '#000000';

  return {
    theme: {
      colors: {
        primary: { main: primaryColor },
        success: { main: '#10b981' },
        warning: { main: '#f59e0b' },
        error:   { main: '#ef4444' },
        text:    { primary: t.textPrimary, secondary: t.textSecondary },
        border:  { dark: t.border, light: t.border },
        responses: {
          success:  { color: '#10b981', backgroundColor: t.rSuccess },
          error:    { color: '#ef4444', backgroundColor: t.rError },
          redirect: { color: '#f59e0b', backgroundColor: t.rRedirect },
          info:     { color: primaryColor, backgroundColor: t.rInfo },
        },
        http: {
          get: '#10b981', post: primaryColor, put: '#f59e0b',
          options: '#71717a', patch: '#52525b', delete: '#ef4444',
          basic: '#a1a1aa', link: primaryColor, head: '#71717a',
        },
      },
      schema: {
        nestedBackground: t.nestedBg,
        typeNameColor: t.typeColor,
        typeTitleColor: t.titleColor,
        requireLabelColor: '#ef4444',
      },
      sidebar: {
        width: '280px',
        backgroundColor: t.sidebarBg,
        textColor: t.sidebarText,
        activeTextColor: t.sidebarActiveText,
        groupItems: { activeBackgroundColor: t.sidebarActiveBg },
        level1Items: { activeBackgroundColor: t.sidebarActiveBg },
      },
      rightPanel: { backgroundColor: t.rightPanel, width: '40%' },
      codeBlock:  { backgroundColor: t.codeBg },
      typography: {
        fontSize: '15px',
        lineHeight: '1.6',
        fontFamily: "'Geist Variable', 'Inter', system-ui, sans-serif",
        headings: {
          fontFamily: "'Geist Variable', 'Inter', system-ui, sans-serif",
          fontWeight: '600',
        },
        code: {
          fontSize: '13px',
          fontFamily: "'Geist Mono', 'Fira Code', monospace",
          backgroundColor: t.codeBg,
          color: t.codeColor,
          wrap: true,
        },
      },
    },
    hideDownloadButton: false,
    expandResponses: '200,201',
    hideHostname: false,
    pathInMiddlePanel: true,
    nativeScrollbars: false,
    scrollYOffset: 64,
    sortPropsAlphabetically: false,
    showExtensions: false,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function DocsPage() {
  // `wrapperRef` is the stable outer div React never modifies.
  // We manually append/remove ReDoc divs inside it.
  const wrapperRef   = useRef<HTMLDivElement>(null);
  // Tracks the currently mounted ReDoc div so we can safely remove it later.
  const activeDiv    = useRef<HTMLDivElement | null>(null);
  // Monotonic counter — each initRedoc call gets its own generation number.
  // The callback checks this to ignore results from stale (superseded) inits.
  const generation   = useRef(0);
  // Debounce timer for theme-change re-inits (avoids rapid stacking).
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [status, setStatus]     = useState<'loading' | 'ready' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  const themeCtx = useTheme();
  const isDark   = themeCtx?.theme === 'dark';
  const t        = isDark ? DARK : LIGHT;

  // ── Core init function ────────────────────────────────────────────────────
  //
  // Strategy:
  //   1. Create a fresh <div> that is NOT yet in the DOM.
  //   2. Pass it to Redoc.init() — ReDoc mounts its React tree there.
  //   3. Inside the success callback, append the new div to the wrapper.
  //   4. Schedule removal of the old div via requestAnimationFrame so that
  //      React (inside the old ReDoc instance) finishes any pending work
  //      before we touch its DOM.  We also guard with `parentNode` to be safe.
  //   5. If the generation has changed by the time the callback fires, we
  //      discard the result entirely (no DOM mutation, no state update).
  //
  const initRedoc = useCallback((dark: boolean) => {
    if (!wrapperRef.current || !window.Redoc) return;

    const myGen = ++generation.current;
    setStatus('loading');

    const newDiv = document.createElement('div');
    newDiv.style.cssText = 'flex:1; display:block;';

    window.Redoc.init(
      ApiDocsUrl,
      buildRedocOptions(dark),
      newDiv,
      (err: Error) => {
        // Stale callback from a superseded init — ignore completely.
        if (myGen !== generation.current) return;

        if (err) {
          setStatus('error');
          setErrorMsg(err.message ?? 'An unknown error occurred.');
          return;
        }

        // Grab the old div reference BEFORE mutating activeDiv.
        const oldDiv = activeDiv.current;
        activeDiv.current = newDiv;

        // Append new div first so the page never goes blank.
        wrapperRef.current?.appendChild(newDiv);

        // Remove old div on the next animation frame.
        // This gives ReDoc's internal React tree time to finish its
        // current render cycle, avoiding the removeChild error.
        if (oldDiv) {
          requestAnimationFrame(() => {
            // Double-check it's still a child before removing.
            if (oldDiv.parentNode === wrapperRef.current) {
              wrapperRef.current?.removeChild(oldDiv);
            } else if (oldDiv.parentNode) {
              // Fallback: use its actual parent if it moved somehow.
              oldDiv.parentNode.removeChild(oldDiv);
            }
          });
        }

        setStatus('ready');
      }
    );
  }, []); // no deps — dark is passed as a parameter, not closed over

  // ── Load script once, then mount for the first time ───────────────────────
  useEffect(() => {
    function boot() { initRedoc(isDark); }

    const existing = document.getElementById('redoc-script');
    if (existing) {
      // Script already injected — Redoc may or may not be ready yet.
      if (window.Redoc) { boot(); } 
      else { existing.addEventListener('load', boot, { once: true }); }
      return;
    }

    const script = document.createElement('script');
    script.id  = 'redoc-script';
    script.src = 'https://cdn.jsdelivr.net/npm/redoc@2.5.0/bundles/redoc.standalone.js';
    script.async = true;
    script.onload  = boot;
    script.onerror = () => {
      setStatus('error');
      setErrorMsg('Failed to load ReDoc bundle. Please check your connection.');
    };
    document.head.appendChild(script);

    // Cleanup: remove active ReDoc div on unmount.
    // We do NOT remove the script tag — it can be reused if the user
    // navigates away and back.
    return () => {
      generation.current++; // cancel any in-flight init
      const div = activeDiv.current;
      if (div?.parentNode) div.parentNode.removeChild(div);
      activeDiv.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Re-init when theme toggles (debounced 80 ms) ─────────────────────────
  //
  // We skip the very first render (handled by the mount effect above).
  // The debounce prevents rapid toggling from queuing multiple inits.
  //
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return; }

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      if (window.Redoc) initRedoc(isDark);
    }, 80);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [isDark, initRedoc]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ background: t.bg }}
    >
      {/* ── Sticky top bar ───────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 flex items-center px-6 md:px-10 h-16 backdrop-blur-md transition-colors duration-300"
        style={{ background: t.headerBg, borderBottom: `1px solid ${t.headerBorder}` }}
      >
        <div className="flex items-center gap-3">
          <NavLink to={RoutePaths.HOME} className="flex items-center gap-2">
            <img src={Logo} alt="Sentra Logo" className="h-7 w-auto" />
          </NavLink>
          <span style={{ color: t.sep }} className="select-none px-1">/</span>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
            style={{
              background: isDark ? '#18181b' : '#f4f4f5',
              color: isDark ? '#fafafa' : '#000000',
              border: `1px solid ${isDark ? '#27272a' : '#e4e4e7'}`,
            }}
          >
            API Reference
          </span>
        </div>
      </header>

      {/* ── Loading overlay ───────────────────────────────────────────────────── */}
      {status === 'loading' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 py-24">
          <div className="relative w-16 h-16">
            <div
              className="absolute inset-0 rounded-full animate-spin"
              style={{
                background: `conic-gradient(from 0deg, ${isDark ? '#ffffff' : '#000000'}, transparent)`,
                mask: 'radial-gradient(farthest-side,transparent calc(100% - 3px),black calc(100% - 3px))',
                WebkitMask: 'radial-gradient(farthest-side,transparent calc(100% - 3px),black calc(100% - 3px))',
              }}
            />
          </div>
          <div className="text-center">
            <p className="font-medium" style={{ color: t.textPrimary }}>Loading API Reference</p>
            <p className="text-sm mt-1" style={{ color: t.textSecondary }}>
              Fetching spec from <code className="font-mono text-xs" style={{ color: isDark ? '#ffffff' : '#000000' }}>{ApiDocsUrl}</code>
            </p>
          </div>
        </div>
      )}

      {/* ── Error overlay ────────────────────────────────────────────────────── */}
      {status === 'error' && (
        <div className="flex-1">
          <ErrorHero 
            tag="Documentation Error"
            title={<>Spec <br className="md:hidden"/> Offline.</>}
            description={
              <>
                Unable to load the API Reference from <code className="font-mono text-xs opacity-80" style={{ color: isDark ? '#ffffff' : '#000000' }}>{GatewayBaseUrl}</code>. 
                {errorMsg && <div className="mt-2 text-xs italic opacity-60">{errorMsg}</div>}
              </>
            }
            action={
              <button
                onClick={() => { setErrorMsg(''); initRedoc(isDark); }}
                className="px-8 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ 
                  background: isDark ? '#ffffff' : '#000000',
                  color: isDark ? '#000000' : '#ffffff',
                  boxShadow: isDark ? '0 0 20px rgba(255,255,255,0.1)' : '0 0 20px rgba(0,0,0,0.1)'
                }}
              >
                RETRY CONNECTION
              </button>
            }
          />
        </div>
      )}

      {/* ── Stable outer wrapper — ReDoc divs are appended here imperatively ── */}
      {/* React never renders children inside this div, avoiding any conflict  */}
      <div
        ref={wrapperRef}
        id="redoc-wrapper"
        className="flex-1"
        style={{
          display: status === 'ready' ? 'block' : 'none',
          minHeight: 'calc(100vh - 64px)',
        }}
      />
    </div>
  );
}
