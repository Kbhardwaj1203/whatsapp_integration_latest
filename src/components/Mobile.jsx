// MobileConfig.jsx
import React, { useEffect, useMemo, useState } from "react";
import { FaWhatsapp, FaBolt, FaBell, FaMobileAlt, FaDesktop } from "react-icons/fa";

/**
 * MobileConfig.jsx
 * - Implements all fields from mobile.txt
 * - Always-open form
 * - Live floating WhatsApp preview bottom-right
 * - Uses Tailwind classes (adjust if your project doesn't have Tailwind)
 */

// ---------- Helpers ----------
const clamp01 = (n) => Math.max(0, Math.min(1, Number.isFinite(+n) ? +n : 1));
const toRGBA = (hex, opacity) => {
  if (!hex || /^linear-gradient|radial-gradient|url\(/i.test(hex)) return hex;
  if (/^rgb|hsl|var\(/i.test(hex)) return hex;
  let h = (hex || "").replace(/[^0-9a-f]/gi, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const int = parseInt(h || "000000", 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// ---------- Defaults ----------
const DEFAULTS = {
  // colors
  mobileColor: "#25D366",
  mobileTextColor: "#FFFFFF",
  mobileLabelColor: "#ff3d3d",
  mobileBackground: "#102033",
  mobileOpacity: 1,
  chatBackgroundColor: "#345884",
  chatTextColor: "#EAD7BA",
  chatFont: "Arial, sans-serif",
  shareBackground: "#FFC229",
  shareTextColor: "#332007",
  timerTextColor: "#000000",
  clockBackgroundColor: "#4cd635",
  svgIconColor: "#351212",
  blinkCircleColor: "#ffffff",
  blinkCircleBg: "#e76060",
  faqColor: "#464757",

  // phone & cta
  countryCode: "+91",
  mobileNumber: "",
  ctaText: "Chat with us",

  // position & visibility
  visibleOnMobile: true,
  visibleOnDesktop: true,
  positionMobile: "right", // left | right
  positionDesktop: "right", // left | right | left-wall | right-wall
  mobileBottom: 20,
  desktopBottom: 20,
  moveChatLeftRightMobile: 2,
  moveChatLeftRightDesktop: 2,
  zIndex: 10000000000000000,

  // label / UI
  labelRadius: 8,
  fontSize: 23,
  scaleIconDesktop: 1,
  scaleIconMobile: 1,
  chatboxWidth: 376,
  chatboxHeight: 70,
  chatboxRadius: 8,
  greetingsTextSize: 24,
  displayAfterMobile: 0,
  displayAfterDesktop: 5,

  // types & toggles
  playNotificationSound: true,
  pushNotification: true,
  directWhatsapp: false,
  chatTypeMobile: "whatsapp", // whatsapp | livechat
  chatTypeDesktop: "whatsapp",
  buttonDesign: "normal", // normal | compact | very-compact | fluffy
  labelStyle: "normal", // normal | bold | bolder
  roundedHeader: false,
  includePageUrl: false,
  showBlinkingMessage: true,
  buttonAnimation: "none", // none | popular | glow | emitting | bounce
  timeZoneSetting: "round", // round | rectangle
  noPoweredBy: false,

  // editable textareas
  faqText: "FAQ: \n1. How to use?\n2. Contact us.",
  rateUsText: "Rate Us Please",
  manageLiveChatText: "Manage Live Chat here",

  // preview mode
  previewMode: "mobile", // mobile | desktop
};

// ---------- Animations styles (we inject style tag below) ----------

export default function MobileConfig() {
  const [state, setState] = useState(() => ({ ...DEFAULTS }));
  const [visible, setVisible] = useState(false); // preview display after delay

  // handle preview delay (applies on initial load or when delay values change)
  useEffect(() => {
    setVisible(false);
    const seconds = state.previewMode === "mobile" ? state.displayAfterMobile : state.displayAfterDesktop;
    const ms = Math.max(0, Number(seconds) * 1000);
    const t = setTimeout(() => setVisible(true), ms);
    return () => clearTimeout(t);
  }, [state.displayAfterMobile, state.displayAfterDesktop]);

  // instantly show preview when switching modes (no waiting)
  useEffect(() => {
    setVisible(true);
  }, [state.previewMode]);

  // live computed styles for preview button
  const previewStyle = useMemo(() => {
    const isMobilePreview = state.previewMode === "mobile";
    const bottom = `${isMobilePreview ? state.mobileBottom : state.desktopBottom}px`;
    let horizontalStyle = {};
    const moveOffset = isMobilePreview ? Number(state.moveChatLeftRightMobile) : Number(state.moveChatLeftRightDesktop);
    // choose actual left/right based on chosen position
    if (isMobilePreview) {
      if (state.positionMobile === "left") {
        horizontalStyle = { left: `${moveOffset}px`, right: "auto" };
      } else {
        horizontalStyle = { right: `${moveOffset}px`, left: "auto" };
      }
    } else {
      // desktop positions
      if (state.positionDesktop === "left") {
        horizontalStyle = { left: `${moveOffset}px`, right: "auto" };
      } else if (state.positionDesktop === "right") {
        horizontalStyle = { right: `${moveOffset}px`, left: "auto" };
      } else if (state.positionDesktop === "left-wall") {
        horizontalStyle = { left: `${moveOffset}px`, right: "auto" };
      } else {
        horizontalStyle = { right: `${moveOffset}px`, left: "auto" };
      }
    }

    // shape and padding based on design type
    const design = state.buttonDesign;
    let padding = "12px 18px";
    let borderRadius = state.labelRadius;
    if (design === "compact") {
      padding = "8px 12px";
      borderRadius = state.labelRadius;
    } else if (design === "very-compact") {
      padding = "6px 10px";
      borderRadius = Math.max(6, state.labelRadius - 4);
    } else if (design === "fluffy") {
      padding = "16px 22px";
      borderRadius = Math.max(20, state.labelRadius + 8);
    }

    // icon scale
    const scale = state.previewMode === "mobile" ? Number(state.scaleIconMobile) : Number(state.scaleIconDesktop);

    // animation class
    let animClass = "";
    if (state.buttonAnimation === "glow") animClass = "mc-anim-glow";
    if (state.buttonAnimation === "emitting") animClass = "mc-anim-emitting";
    if (state.buttonAnimation === "bounce") animClass = "mc-anim-bounce";
    if (state.buttonAnimation === "popular") animClass = "mc-anim-popular";

    return {
      position: "fixed",
      bottom,
      zIndex: Number(state.zIndex) || 9999,
      padding,
      borderRadius: `${borderRadius}px`,
      transform: `scale(${scale})`,
      ...horizontalStyle,
      animClass,
    };
  }, [
    state.previewMode,
    state.mobileBottom,
    state.desktopBottom,
    state.moveChatLeftRightMobile,
    state.moveChatLeftRightDesktop,
    state.positionMobile,
    state.positionDesktop,
    state.buttonDesign,
    state.labelRadius,
    state.scaleIconMobile,
    state.scaleIconDesktop,
    state.zIndex,
    state.buttonAnimation,
  ]);

  const onChange = (key) => (e) => {
    const val = e?.target?.type === "checkbox" ? e.target.checked : e.target.value;
    setState((s) => ({ ...s, [key]: val }));
  };

  // reset to defaults
  const resetAll = () => {
    setState({ ...DEFAULTS });
  };

  // helper to render small label + input row
  const Row = ({ label, children }) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      {children}
    </div>
  );

  // show/hide based on preview visibility toggles
  const isPreviewVisible = useMemo(() => {
    // Only show preview for selected mode and after delay
    if (!visible) return false;
    return state.previewMode === "mobile" || state.previewMode === "desktop";
  }, [state.previewMode, visible]);

  // assemble inline style for button background and text
  const buttonBackground = useMemo(
    () => toRGBA(state.mobileBackground, clamp01(state.mobileOpacity)),
    [state.mobileBackground, state.mobileOpacity]
  );

  // icon and text colors
  const iconColor = state.svgIconColor;
  const labelColor = state.chatTextColor || state.mobileTextColor;

  // animation style injection (scoped)
  const AnimStyles = () => (
    <style>{`
      /* Glow ring */
      .mc-anim-glow {
        box-shadow: 0 6px 20px rgba(0,0,0,0.12), 0 0 12px rgba(255,255,255,0.06), 0 0 18px rgba(255,255,255,0.02);
        animation: mcGlow 2.6s infinite;
      }
      @keyframes mcGlow {
        0% { box-shadow: 0 8px 20px rgba(0,0,0,0.12), 0 0 4px rgba(255, 200, 0, 0.0); transform: translateY(0); }
        50% { box-shadow: 0 12px 24px rgba(0,0,0,0.18), 0 0 12px rgba(255, 200, 0, 0.35); transform: translateY(-2px); }
        100% { box-shadow: 0 8px 20px rgba(0,0,0,0.12), 0 0 4px rgba(255, 200, 0, 0.0); transform: translateY(0); }
      }

      /* Emitting ripple */
      .mc-anim-emitting {
        position: relative;
        animation: mcEmit 2.6s infinite;
      }
      .mc-anim-emitting::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: inherit;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.04);
        z-index: -1;
      }
      @keyframes mcEmit {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.06); opacity: 0.85; }
        100% { transform: scale(1); opacity: 1; }
      }

      /* Bounce */
      .mc-anim-bounce {
        animation: mcBounce 2s infinite;
      }
      @keyframes mcBounce {
        0% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
        100% { transform: translateY(0); }
      }

      /* Popular (a tasteful pulse) */
      .mc-anim-popular {
        animation: mcPulse 1.8s infinite;
      }
      @keyframes mcPulse {
        0% { box-shadow: 0 0 0 0 rgba(33,150,243,0.0); }
        70% { box-shadow: 0 0 0 8px rgba(33,150,243,0.12); }
        100% { box-shadow: 0 0 0 0 rgba(33,150,243,0.0); }
      }

      /* Blink message dot */
      .mc-blink-dot {
        width: 8px; height: 8px; border-radius: 50%;
        display:inline-block; margin-left:6px;
        animation: mcBlink 1.2s infinite;
      }
      @keyframes mcBlink {
        0% { opacity: 0.2; transform: scale(0.9); }
        50% { opacity: 1; transform: scale(1.15); }
        100% { opacity: 0.2; transform: scale(0.9); }
      }
    `}</style>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <AnimStyles />

      <div className="bg-white rounded-2xl shadow border border-[#0b1e39]/10 overflow-hidden p-6 md:p-8">
        <header className="flex items-center justify-between px-6 py-4 bg-[#0b1e39] text-[#fffff0] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <FaMobileAlt />
            <h1 className="text-lg font-bold">Basic Chat Settings</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetAll}
              className="px-3 py-1 rounded-md bg-white/10 text-[#fffff0] border border-white/20 text-sm hover:bg-white/20"
            >
              Reset to Defaults
            </button>
            <div className="text-xs opacity-80">Preview: </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setState((s) => ({ ...s, previewMode: "mobile" }))}
                className={`px-2 py-1 rounded-md text-sm ${state.previewMode === "mobile" ? "bg-white text-[#0b1e39]" : "bg-white/10 text-white"}`}
              >
                <FaMobileAlt /> Mobile
              </button>
              <button
                onClick={() => setState((s) => ({ ...s, previewMode: "desktop" }))}
                className={`px-2 py-1 rounded-md text-sm ${state.previewMode === "desktop" ? "bg-white text-[#0b1e39]" : "bg-white/10 text-white"}`}
              >
                <FaDesktop /> Desktop
              </button>
            </div>
          </div>
        </header>

  {/* ---------- Form (always open) ---------- */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {/* Left column */}
          <div className="space-y-6">
            {/* Phone & CTA */}
            <Row label="Country Code">
              <input className="border px-2 py-1 rounded-md w-full" value={state.countryCode} onChange={onChange("countryCode")} placeholder="e.g. +91" />
            </Row>
            <Row label="Mobile Number">
              <input className="border px-2 py-1 rounded-md w-full" value={state.mobileNumber} onChange={onChange("mobileNumber")} placeholder="Enter WhatsApp number" />
            </Row>
            <Row label="CTA Text">
              <input className="border px-2 py-1 rounded-md w-full" value={state.ctaText} onChange={onChange("ctaText")} placeholder="Chat with us" />
            </Row>

            <Row label="Mobile Color / Background">
              <div className="flex items-center gap-3">
                <input type="color" value={state.mobileColor} onChange={onChange("mobileColor")} />
                <input className="border px-2 py-1 rounded-md flex-1" value={state.mobileColor} onChange={onChange("mobileColor")} />
              </div>
            </Row>

            <Row label="Mobile Text Color / Icon">
              <div className="flex items-center gap-3">
                <input type="color" value={state.mobileTextColor} onChange={onChange("mobileTextColor")} />
                <input className="border px-2 py-1 rounded-md flex-1" value={state.mobileTextColor} onChange={onChange("mobileTextColor")} />
              </div>
            </Row>

            <Row label="Mobile Label Color">
              <div className="flex items-center gap-3">
                <input type="color" value={state.mobileLabelColor} onChange={onChange("mobileLabelColor")} />
                <input className="border px-2 py-1 rounded-md flex-1" value={state.mobileLabelColor} onChange={onChange("mobileLabelColor")} />
              </div>
            </Row>

            <Row label="Chat Background Color">
              <div className="flex items-center gap-3">
                <input type="color" value={state.chatBackgroundColor} onChange={onChange("chatBackgroundColor")} />
                <input className="border px-2 py-1 rounded-md flex-1" value={state.chatBackgroundColor} onChange={onChange("chatBackgroundColor")} />
              </div>
            </Row>

            <Row label="Chat Text Color">
              <div className="flex items-center gap-3">
                <input type="color" value={state.chatTextColor} onChange={onChange("chatTextColor")} />
                <input className="border px-2 py-1 rounded-md flex-1" value={state.chatTextColor} onChange={onChange("chatTextColor")} />
              </div>
            </Row>

            <Row label="Chat Font (CSS font-family)">
              <input className="border px-2 py-1 rounded-md w-full" value={state.chatFont} onChange={onChange("chatFont")} />
            </Row>

            <Row label="Share Background">
              <div className="flex items-center gap-3">
                <input type="color" value={state.shareBackground} onChange={onChange("shareBackground")} />
                <input className="border px-2 py-1 rounded-md flex-1" value={state.shareBackground} onChange={onChange("shareBackground")} />
              </div>
            </Row>

            <Row label="Share Text Color">
              <div className="flex items-center gap-3">
                <input type="color" value={state.shareTextColor} onChange={onChange("shareTextColor")} />
                <input className="border px-2 py-1 rounded-md flex-1" value={state.shareTextColor} onChange={onChange("shareTextColor")} />
              </div>
            </Row>

            <Row label="Timer Text Color">
              <input type="color" value={state.timerTextColor} onChange={onChange("timerTextColor")} />
            </Row>

            <Row label="Clock Background Color">
              <input type="color" value={state.clockBackgroundColor} onChange={onChange("clockBackgroundColor")} />
            </Row>

            <Row label="SVG Icon Color">
              <div className="flex items-center gap-3">
                <input type="color" value={state.svgIconColor} onChange={onChange("svgIconColor")} />
                <input className="border px-2 py-1 rounded-md flex-1" value={state.svgIconColor} onChange={onChange("svgIconColor")} />
              </div>
            </Row>

            <Row label="Blink Circle Color">
              <input type="color" value={state.blinkCircleColor} onChange={onChange("blinkCircleColor")} />
            </Row>

            <Row label="Blink Circle Background">
              <input type="color" value={state.blinkCircleBg} onChange={onChange("blinkCircleBg")} />
            </Row>

            <Row label="FAQ Color">
              <input type="color" value={state.faqColor} onChange={onChange("faqColor")} />
            </Row>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <Row label="Visibility">
              <div className="flex gap-3 items-center">
                <label className="flex items-center gap-2"><input type="checkbox" checked={state.visibleOnMobile} onChange={onChange("visibleOnMobile")} /> Mobile</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={state.visibleOnDesktop} onChange={onChange("visibleOnDesktop")} /> Desktop</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={state.pushNotification} onChange={onChange("pushNotification")} /> Push Notification</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={state.playNotificationSound} onChange={onChange("playNotificationSound")} /> Play notification sound</label>
              </div>
            </Row>

            <Row label="Direct Whatsapp (redirect instead of popup)">
              <label className="flex items-center gap-2"><input type="checkbox" checked={state.directWhatsapp} onChange={onChange("directWhatsapp")} /> Direct to WhatsApp</label>
            </Row>

            <Row label="Chat Type (Mobile)">
              <div className="flex gap-2">
                <label className={`px-2 py-1 rounded ${state.chatTypeMobile === "whatsapp" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}><input type="radio" name="ctm" className="mr-1" checked={state.chatTypeMobile === "whatsapp"} onChange={() => setState(s => ({...s, chatTypeMobile: "whatsapp"}))} />WhatsApp</label>
                <label className={`px-2 py-1 rounded ${state.chatTypeMobile === "livechat" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}><input type="radio" name="ctm" className="mr-1" checked={state.chatTypeMobile === "livechat"} onChange={() => setState(s => ({...s, chatTypeMobile: "livechat"}))} />Live Chat</label>
              </div>
            </Row>

            <Row label="Chat Type (Desktop)">
              <div className="flex gap-2">
                <label className={`px-2 py-1 rounded ${state.chatTypeDesktop === "whatsapp" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}><input type="radio" name="ctd" className="mr-1" checked={state.chatTypeDesktop === "whatsapp"} onChange={() => setState(s => ({...s, chatTypeDesktop: "whatsapp"}))} />WhatsApp</label>
                <label className={`px-2 py-1 rounded ${state.chatTypeDesktop === "livechat" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}><input type="radio" name="ctd" className="mr-1" checked={state.chatTypeDesktop === "livechat"} onChange={() => setState(s => ({...s, chatTypeDesktop: "livechat"}))} />Live Chat</label>
              </div>
            </Row>

            <Row label="Button Position (Mobile)">
              <div className="flex gap-2">
                <button onClick={() => setState(s => ({...s, positionMobile: "left"}))} className={`px-2 py-1 rounded ${state.positionMobile === "left" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}>Left</button>
                <button onClick={() => setState(s => ({...s, positionMobile: "right"}))} className={`px-2 py-1 rounded ${state.positionMobile === "right" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}>Right</button>
              </div>
            </Row>

            <Row label="Button Position (Desktop)">
              <div className="flex gap-2">
                <button onClick={() => setState(s => ({...s, positionDesktop: "left"}))} className={`px-2 py-1 rounded ${state.positionDesktop === "left" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}>Left</button>
                <button onClick={() => setState(s => ({...s, positionDesktop: "right"}))} className={`px-2 py-1 rounded ${state.positionDesktop === "right" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}>Right</button>
                <button onClick={() => setState(s => ({...s, positionDesktop: "left-wall"}))} className={`px-2 py-1 rounded ${state.positionDesktop === "left-wall" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}>Left Wall</button>
                <button onClick={() => setState(s => ({...s, positionDesktop: "right-wall"}))} className={`px-2 py-1 rounded ${state.positionDesktop === "right-wall" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}>Right Wall</button>
              </div>
            </Row>

            <Row label="Mobile Position (from bottom px)">
              <input type="number" value={state.mobileBottom} onChange={onChange("mobileBottom")} className="border px-2 py-1 rounded-md w-full" />
            </Row>

            <Row label="Desktop Position (from bottom px)">
              <input type="number" value={state.desktopBottom} onChange={onChange("desktopBottom")} className="border px-2 py-1 rounded-md w-full" />
            </Row>

            <Row label="Move Chat bar Left or Right (Mobile px)">
              <input type="number" value={state.moveChatLeftRightMobile} onChange={onChange("moveChatLeftRightMobile")} className="border px-2 py-1 rounded-md w-full" />
            </Row>

            <Row label="Move Chat bar Left or Right (Desktop px)">
              <input type="number" value={state.moveChatLeftRightDesktop} onChange={onChange("moveChatLeftRightDesktop")} className="border px-2 py-1 rounded-md w-full" />
            </Row>

            <Row label="Z-index (1 - very large)">
              <input type="number" value={state.zIndex} onChange={onChange("zIndex")} className="border px-2 py-1 rounded-md w-full" />
            </Row>

            <Row label="Label Radius (px)">
              <input type="number" value={state.labelRadius} onChange={onChange("labelRadius")} className="border px-2 py-1 rounded-md w-full" />
            </Row>

            <Row label="Font Size (px)">
              <input type="number" value={state.fontSize} onChange={onChange("fontSize")} className="border px-2 py-1 rounded-md w-full" />
            </Row>

            <Row label="Scale icon (Desktop 0.5 - 2)">
              <input type="range" min="0.5" max="2" step="0.01" value={state.scaleIconDesktop} onChange={onChange("scaleIconDesktop")} className="w-full" />
            </Row>

            <Row label="Scale icon (Mobile 0.5 - 2)">
              <input type="range" min="0.5" max="2" step="0.01" value={state.scaleIconMobile} onChange={onChange("scaleIconMobile")} className="w-full" />
            </Row>

            <Row label="Chatbox Width (px)">
              <input type="number" value={state.chatboxWidth} onChange={onChange("chatboxWidth")} className="border px-2 py-1 rounded-md w-full" />
            </Row>

            <Row label="Chatbox Height (px)">
              <input type="number" value={state.chatboxHeight} onChange={onChange("chatboxHeight")} className="border px-2 py-1 rounded-md w-full" />
            </Row>

            <Row label="Chatbox Radius (px)">
              <input type="number" value={state.chatboxRadius} onChange={onChange("chatboxRadius")} className="border px-2 py-1 rounded-md w-full" />
            </Row>

            <Row label="Greetings Text Size (px)">
              <input type="number" value={state.greetingsTextSize} onChange={onChange("greetingsTextSize")} className="border px-2 py-1 rounded-md w-full" />
            </Row>

            <Row label="Display After (Mobile seconds)">
              <input type="number" value={state.displayAfterMobile} onChange={onChange("displayAfterMobile")} className="border px-2 py-1 rounded-md w-full" />
            </Row>

            <Row label="Display After (Desktop seconds)">
              <input type="number" value={state.displayAfterDesktop} onChange={onChange("displayAfterDesktop")} className="border px-2 py-1 rounded-md w-full" />
            </Row>
          </div>
        </div>

        {/* ---------- Second block: design & animations & misc ---------- */}
  <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Button Design</label>
              <select value={state.buttonDesign} onChange={onChange("buttonDesign")} className="w-full border px-2 py-1 rounded-md">
                <option value="normal">Normal</option>
                <option value="compact">Compact</option>
                <option value="very-compact">Very Compact</option>
                <option value="fluffy">Fluffy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Label Style</label>
              <select value={state.labelStyle} onChange={onChange("labelStyle")} className="w-full border px-2 py-1 rounded-md">
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="bolder">Bolder</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Rounded Header</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={state.roundedHeader} onChange={onChange("roundedHeader")} /> Rounded</label>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Include Page URL in chat?</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={state.includePageUrl} onChange={onChange("includePageUrl")} /> Include URL</label>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Show blinking message in chat icon</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={state.showBlinkingMessage} onChange={onChange("showBlinkingMessage")} /> Show</label>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Button Animation</label>
              <select value={state.buttonAnimation} onChange={onChange("buttonAnimation")} className="w-full border px-2 py-1 rounded-md">
                <option value="none">No Animation</option>
                <option value="popular">Most Popular</option>
                <option value="glow">Glow & Blink</option>
                <option value="emitting">Emitting</option>
                <option value="bounce">Bounce</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Time Zone Setting</label>
              <select value={state.timeZoneSetting} onChange={onChange("timeZoneSetting")} className="w-full border px-2 py-1 rounded-md">
                <option value="round">Round</option>
                <option value="rectangle">Rectangle</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">No Powered by xyz.com</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={state.noPoweredBy} onChange={onChange("noPoweredBy")} /> Hide Powered By</label>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Direct Whatsapp (redirect)</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={state.directWhatsapp} onChange={onChange("directWhatsapp")} /> Direct</label>
            </div>
          </div>
        </div>

        {/* ---------- Editable textareas ---------- */}
  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1">FAQ questions (multi-line)</label>
            <textarea value={state.faqText} onChange={onChange("faqText")} rows={6} className="w-full border px-2 py-1 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Rate Us text</label>
            <textarea value={state.rateUsText} onChange={onChange("rateUsText")} rows={6} className="w-full border px-2 py-1 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Manage Live Chat Here</label>
            <textarea value={state.manageLiveChatText} onChange={onChange("manageLiveChatText")} rows={6} className="w-full border px-2 py-1 rounded-md" />
          </div>
        </div>

        {/* ---------- Footer controls ---------- */}
  <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-500">Tip: Use preview toggle (top-right) to test Mobile vs Desktop placement.</div>
          <div className="flex items-center gap-3">
            {/* <button onClick={() => navigator.clipboard?.writeText(JSON.stringify(state, null, 2))} className="px-3 py-1 rounded bg-[#0b1e39] text-[#fffff0]">Copy JSON</button> */}
            {/* <button onClick={() => {
              try {
                const raw = prompt("Paste JSON config:");
                if (!raw) return;
                const parsed = JSON.parse(raw);
                setState(s => ({ ...s, ...parsed }));
              } catch (e) {
                alert("Invalid JSON");
              }
            }} className="px-3 py-1 rounded bg-white border">Import JSON</button> */}
          </div>
        </div>
      </div>

      {/* ---------- Floating WhatsApp Preview Button ---------- */}
      {visible && isPreviewVisible && (
        state.previewMode === "mobile" ? (
          <div
            role="button"
            tabIndex={0}
            aria-label="WhatsApp Chat Button Preview (Mobile)"
            className={`mc-preview ${previewStyle.animClass || ""}`}
            style={{
              ...previewStyle,
              background: buttonBackground,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: state.mobileTextColor,
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
              border: state.timeZoneSetting === "round" ? "none" : "1px solid rgba(0,0,0,0.06)",
            }}
            onClick={() => {
              if (state.directWhatsapp) {
                const msg = encodeURIComponent(state.includePageUrl ? `${state.ctaText} - ${window.location.href}` : state.ctaText);
                const phone = `${(state.countryCode || '').replace(/[^\d+]/g,'')}${(state.mobileNumber || '').replace(/\D/g,'')}`;
                const url = phone ? `https://wa.me/${phone.replace('+','')}?text=${msg}` : `https://wa.me/?text=${msg}`;
                window.open(url, "_blank");
              } else {
                alert("Open chat popup (preview) — (directWhatsapp is off)");
              }
            }}
          >
            {/* Mobile text */}
            <div style={{
              fontWeight: state.labelStyle === "bold" ? 700 : state.labelStyle === "bolder" ? 900 : 400,
              fontSize: `${state.fontSize}px`,
              fontFamily: state.chatFont,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <span style={{ color: state.mobileTextColor }}>{state.ctaText} <span style={{fontSize:12, color:'#25D366', fontWeight:600}}></span></span>
              {state.showBlinkingMessage && (
                <span className="mc-blink-dot" style={{ background: state.blinkCircleColor }} />
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaWhatsapp size={Math.round(state.fontSize * 0.8)} color={state.mobileColor} />
            </div>
      
          </div>
        ) : (
          <div
            role="button"
            tabIndex={0}
            aria-label="WhatsApp Chat Button Preview (Desktop)"
            className={`mc-preview ${previewStyle.animClass || ""}`}
            style={{
              ...previewStyle,
              background: state.chatBackgroundColor,
              display: "flex",
              alignItems: "center",
              gap: "14px",
              color: state.chatTextColor,
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
              border: state.timeZoneSetting === "rectangle" ? "2px solid #a78bfa" : "none",
            }}
            onClick={() => {
              if (state.directWhatsapp) {
                const msg = encodeURIComponent(state.includePageUrl ? `${state.ctaText} - ${window.location.href}` : state.ctaText);
                const phone = `${(state.countryCode || '').replace(/[^\d+]/g,'')}${(state.mobileNumber || '').replace(/\D/g,'')}`;
                const url = phone ? `https://wa.me/${phone.replace('+','')}?text=${msg}` : `https://wa.me/?text=${msg}`;
                window.open(url, "_blank");
              } else {
                alert("Open chat popup (preview) — (directWhatsapp is off)");
              }
            }}
          >
            {/* Desktop text */}
            <div style={{
              fontWeight: state.labelStyle === "bold" ? 700 : state.labelStyle === "bolder" ? 900 : 400,
              fontSize: `${state.fontSize + 2}px`,
              fontFamily: state.chatFont,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
              <span style={{ color: state.chatTextColor }}>{state.ctaText} <span style={{fontSize:12, color:'#a78bfa', fontWeight:600}}>(Desktop)</span></span>
              {state.showBlinkingMessage && (
                <span className="mc-blink-dot" style={{ background: state.blinkCircleColor }} />
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaWhatsapp size={Math.round((state.fontSize + 2) * 0.8)} color={state.svgIconColor} />
            </div>
           
          </div>
        )
      )}
    </div>
  );
}

