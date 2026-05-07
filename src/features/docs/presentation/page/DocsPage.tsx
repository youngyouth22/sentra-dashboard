import { useEffect, useRef, useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { ApiDocsUrl, GatewayBaseUrl } from '@/core/api/endpoints';
import { RoutePaths } from '@/core/routes/route-paths';
import { useTheme } from '@/core/context/ThemeProvider';
import Logo from '@/assets/images/Logo.svg';

// ─── Types ───────────────────────────────────────────────────────────────────
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Redoc: any;
  }
}

// ─── Theme tokens ─────────────────────────────────────────────────────────────
const DARK: Record<string, string> = {
  bg: '#0a0a0b',
  headerBg: 'rgba(10,10,11,0.85)',
  headerBorder: '#1f1f23',
  sep: '#3f3f46',
  textPrimary: '#f4f4f5',
  textSecondary: '#71717a',
  sidebarBg: '#0a0a0b',
  sidebarText: '#a1a1aa',
  sidebarActiveText: '#f4f4f5',
  sidebarActiveBg: '#1a1a1e',
  rightPanel: '#0d0d10',
  codeBg: '#111113',
  codeColor: '#e4e4e7',
  nestedBg: '#111113',
  border: '#27272a',
  typeColor: '#873AE3',
  titleColor: '#a1a1aa',
  rSuccess: '#022c22', rError: '#2c0707',
  rRedirect: '#2c2007', rInfo: '#1a0c2e',
};

const LIGHT: Record<string, string> = {
  bg: '#ffffff',
  headerBg: 'rgba(255,255,255,0.90)',
  headerBorder: '#e4e4e7',
  sep: '#d4d4d8',
  textPrimary: '#09090b',
  textSecondary: '#71717a',
  sidebarBg: '#f9f9fb',
  sidebarText: '#52525b',
  sidebarActiveText: '#09090b',
  sidebarActiveBg: '#ede9fe',
  rightPanel: '#f4f4f5',
  codeBg: '#f4f4f5',
  codeColor: '#3f3f46',
  nestedBg: '#f9f9fb',
  border: '#e4e4e7',
  typeColor: '#7c3aed',
  titleColor: '#52525b',
  rSuccess: '#f0fdf4', rError: '#fef2f2',
  rRedirect: '#fffbeb', rInfo: '#faf5ff',
};

function buildRedocOptions(dark: boolean) {
  const t = dark ? DARK : LIGHT;
  return {
    theme: {
      colors: {
        primary: { main: '#873AE3' },
        success: { main: '#22d3a5' },
        warning: { main: '#f59e0b' },
        error:   { main: '#ef4444' },
        text:    { primary: t.textPrimary, secondary: t.textSecondary },
        border:  { dark: t.border, light: t.border },
        responses: {
          success:  { color: '#22d3a5', backgroundColor: t.rSuccess },
          error:    { color: '#ef4444', backgroundColor: t.rError },
          redirect: { color: '#f59e0b', backgroundColor: t.rRedirect },
          info:     { color: '#873AE3', backgroundColor: t.rInfo },
        },
        http: {
          get: '#22d3a5', post: '#873AE3', put: '#f59e0b',
          options: '#6366f1', patch: '#3b82f6', delete: '#ef4444',
          basic: '#9ca3af', link: '#873AE3', head: '#6366f1',
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
            className="text-sm font-medium px-2 py-0.5 rounded-md"
            style={{
              background: 'linear-gradient(135deg,rgba(135,58,227,.18) 0%,rgba(17,70,242,.18) 100%)',
              color: '#873AE3',
              border: '1px solid rgba(135,58,227,.30)',
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
                background: 'conic-gradient(from 0deg,#873AE3,#1146F2,#873AE3)',
                mask: 'radial-gradient(farthest-side,transparent calc(100% - 3px),black calc(100% - 3px))',
                WebkitMask: 'radial-gradient(farthest-side,transparent calc(100% - 3px),black calc(100% - 3px))',
              }}
            />
          </div>
          <div className="text-center">
            <p className="font-medium" style={{ color: t.textPrimary }}>Loading API Reference</p>
            <p className="text-sm mt-1" style={{ color: t.textSecondary }}>
              Fetching spec from <code className="text-[#873AE3] text-xs">{ApiDocsUrl}</code>
            </p>
          </div>
        </div>
      )}

      {/* ── Error overlay ────────────────────────────────────────────────────── */}
      {status === 'error' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-5 py-24 px-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(239,68,68,.10)', border: '1px solid rgba(239,68,68,.25)' }}
          >
            <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <div className="text-center max-w-md">
            <p className="font-semibold text-lg" style={{ color: t.textPrimary }}>
              Unable to load API Reference
            </p>
            <p className="text-sm mt-2" style={{ color: t.textSecondary }}>{errorMsg}</p>
            <p className="text-xs mt-3" style={{ color: t.sep }}>
              Make sure the gateway at{' '}
              <code className="text-[#873AE3]">{GatewayBaseUrl}</code> is reachable.
            </p>
          </div>
          <button
            onClick={() => { setErrorMsg(''); initRedoc(isDark); }}
            className="mt-2 px-5 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: 'linear-gradient(135deg,#873AE3 0%,#1146F2 100%)' }}
          >
            Retry
          </button>
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
