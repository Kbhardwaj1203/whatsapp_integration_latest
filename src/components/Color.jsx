import React, { useMemo, useState } from "react";
import { FaFont, FaPalette, FaWhatsapp } from "react-icons/fa";

// ---------- Helpers ----------
const clamp01 = (n) => Math.max(0, Math.min(1, Number.isFinite(+n) ? +n : 1));
const toRGBA = (hex, opacity) => {
  if (!hex || /^linear-gradient|radial-gradient|url\(/i.test(hex)) return hex;
  if (/^rgb|hsl|var\(/i.test(hex)) return hex;
  let h = hex.replace(/[^0-9a-f]/gi, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const int = parseInt(h || "000000", 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// ---------- Initial ----------
const initial = {
  background: "#102033",
  text: "#EAD7BA",
  chatNow: "#000000",
  labelBg: "#ff3d3d",
  shareBg: "#FFC229",
  shareText: "#332007",
  headerText: "#000000",
  headerBg: "#4cd635",
  svgIcon: "#351212",
  blinkColor: "#ffffff",
  blinkBg: "#e76060",
  faqColor: "#464757",
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  labelStyle: "normal",
  opacity: 1,
  gradient: "none",
  iconUrl: null, // toggle between svg and image
  showOnMobile: true,
  showOnDesktop: true,
  showOnTablet: true,
};

// ---------- Fonts ----------
const FONTS = [
  "Arial, sans-serif",
  "'Roboto', sans-serif",
  "'Open Sans', sans-serif",
  "Helvetica, sans-serif",
  "Georgia, serif",
  "'Times New Roman', serif",
  "'Courier New', monospace",
  "'Comic Sans MS', cursive, sans-serif",
  "'Trebuchet MS', sans-serif",
  "Verdana, sans-serif",
  "'Poppins', sans-serif",
  "'Lato', sans-serif",
  "'Montserrat', sans-serif",
  "'Nunito', sans-serif",
  "'Merriweather', serif",
  "'Raleway', sans-serif",
  "'Ubuntu', sans-serif",
  "'Fira Sans', sans-serif",
  "'Inconsolata', monospace",
];

// ---------- Gradients (complete list from color.txt) ----------
const GRADIENTS = [
  { id: "none", css: "none", label: "No Gradient" },
  { id: "0", css: "linear-gradient(115deg, #047c8d, #2ff289)" },
  { id: "1", css: "linear-gradient(115deg, #401dba, #825bf0)" },
  { id: "2", css: "linear-gradient(115deg, #ff4e6f, #fb9168)" },
  { id: "3", css: "linear-gradient(115deg, #ace0f9, #fff1eb)" },
  { id: "4", css: "linear-gradient(115deg, #29323c, #485563)" },
  { id: "5", css: "linear-gradient(115deg, #4facfe, #00f2fe)" },
  { id: "6", css: "linear-gradient(115deg, #7c3ab7, #ff9aad)" },
  { id: "7", css: "linear-gradient(115deg, #a18cd1, #fbc2eb)" },
  { id: "8", css: "linear-gradient(115deg, #ff9a9e, #fad0c4)" },
  { id: "51", css: "linear-gradient(115deg, #009FFF, #ec2F4B)" },
  { id: "52", css: "linear-gradient(115deg, #654ea3, #eaafc8)" },
  { id: "53", css: "linear-gradient(115deg, #FF416C, #FF4B2B)" },
  { id: "54", css: "linear-gradient(115deg, #8A2387, #E94057, #F27121)" },
  { id: "55", css: "linear-gradient(115deg, #a8ff78, #78ffd6)" },
  { id: "56", css: "linear-gradient(115deg, #1E9600, #FFF200, #FF0000)" },
  { id: "57", css: "linear-gradient(115deg, #ED213A, #93291E)" },
  { id: "58", css: "linear-gradient(115deg, #FDC830, #F37335)" },
  { id: "59", css: "linear-gradient(115deg, #00B4DB, #0083B0)" },
  { id: "60", css: "linear-gradient(115deg, #FFEFBA, #FFFFFF)" },
  { id: "61", css: "linear-gradient(115deg, #59C173, #a17fe0, #5D26C1)" },
  { id: "62", css: "linear-gradient(115deg, #005AA7, #FFFDE4)" },
  { id: "122", css: "linear-gradient(115deg, #30E8BF, #FF8235)" },
  { id: "123", css: "linear-gradient(115deg, #D66D75, #E29587)" },
  { id: "124", css: "linear-gradient(115deg, #20002c, #cbb4d4)" },
  { id: "125", css: "linear-gradient(115deg, #C33764, #1D2671)" },
  { id: "126", css: "linear-gradient(115deg, #F7971E, #FFD200)" },
  { id: "127", css: "linear-gradient(115deg, #34e89e, #0f3443)" },
  { id: "128", css: "linear-gradient(115deg, #6190E8, #A7BFE8)" },
  { id: "129", css: "linear-gradient(115deg, #44A08D, #093637)" },
  { id: "130", css: "linear-gradient(115deg, #200122, #6f0000)" },
  { id: "131", css: "linear-gradient(115deg, #0575E6, #021B79)" },
  { id: "132", css: "linear-gradient(115deg, #4568DC, #B06AB3)" },
  { id: "133", css: "linear-gradient(115deg, #43C6AC, #191654)" },
  { id: "199", css: "linear-gradient(115deg, #C33764, #1D2671)" },
  { id: "200", css: "linear-gradient(115deg, #20002c, #cbb4d4)" },
  { id: "201", css: "linear-gradient(115deg, #D66D75, #E29587)" },
  { id: "202", css: "linear-gradient(115deg, #30E8BF, #FF8235)" },
  { id: "203", css: "linear-gradient(115deg, #B2FEFA, #0ED2F7)" },
  { id: "205", css: "linear-gradient(115deg, #4AC29A, #BDFFF3)" },
  { id: "206", css: "linear-gradient(115deg, #E44D26, #F16529)" },
  { id: "207", css: "linear-gradient(115deg, #EB5757, #000000)" },
  { id: "208", css: "linear-gradient(115deg, #F2994A, #F2C94C)" },
  { id: "209", css: "linear-gradient(115deg, #56CCF2, #2F80ED)" },
  { id: "210", css: "linear-gradient(115deg, #007991, #78ffd6)" },
  { id: "211", css: "linear-gradient(115deg, #000046, #1CB5E0)" },
  { id: "212", css: "linear-gradient(115deg, #159957, #155799)" },
  { id: "213", css: "linear-gradient(115deg, #c0392b, #8e44ad)" },
  { id: "214", css: "linear-gradient(115deg, #EF3B36, #FFFFFF)" },
  { id: "215", css: "linear-gradient(115deg, #283c86, #45a247)" },
  { id: "216", css: "linear-gradient(115deg, #3A1C71, #D76D77, #FFAF7B)" },
  { id: "217", css: "linear-gradient(115deg, #CB356B, #BD3F32)" },
  { id: "218", css: "linear-gradient(115deg, #36D1DC, #5B86E5)" },
  { id: "219", css: "linear-gradient(115deg, #000000, #0f9b0f)" },
  { id: "220", css: "linear-gradient(115deg, #1c92d2, #f2fcfe)" },
  { id: "221", css: "linear-gradient(115deg, #642B73, #C6426E)" },
  { id: "222", css: "linear-gradient(115deg, #06beb6, #48b1bf)" },
  { id: "223", css: "linear-gradient(115deg, #0cebeb, #20e3b2, #29ffc6)" },
  { id: "224", css: "linear-gradient(115deg, #d9a7c7, #fffcdc)" },
  { id: "225", css: "linear-gradient(115deg, #396afc, #2948ff)" },
  { id: "226", css: "linear-gradient(115deg, #C9D6FF, #E2E2E2)" },
  { id: "287", css: "linear-gradient(115deg, #b92b27, #1565C0)" },
  { id: "288", css: "linear-gradient(115deg, #12c2e9, #c471ed, #f64f59)" },
  { id: "289", css: "linear-gradient(115deg, #0F2027, #203A43, #2C5364)" },
  { id: "290", css: "linear-gradient(115deg, #C6FFDD, #FBD786, #f7797d)" },
  { id: "291", css: "linear-gradient(115deg, #2193b0, #6dd5ed)" },
  { id: "292", css: "linear-gradient(115deg, #ee9ca7, #ffdde1)" },
  { id: "293", css: "linear-gradient(115deg, #bdc3c7, #2c3e50)" },
];

// ---------- Icons (from icon.txt) ----------
const ICON_GROUPS = {
  1: [
    "https://img.icons8.com/color/48/000000/whatsapp.png",
    "https://img.icons8.com/ios-filled/50/25D366/whatsapp.png",
    "https://cdn.shopify.com/s/files/1/0033/3538/9233/files/icon-88887.png",
  ],
  2: [
    "https://img.icons8.com/fluency/48/whatsapp.png",
    "https://img.icons8.com/material-outlined/48/25D366/whatsapp.png",
    "https://cdn.shopify.com/s/files/1/0033/3538/9233/files/520.png",
  ],
  3: [
    "https://img.icons8.com/ios/50/000000/whatsapp--v1.png",
    "https://img.icons8.com/material-sharp/48/25D366/whatsapp.png",
  ],
  4: [
    "https://img.icons8.com/ios-filled/50/000000/whatsapp--v1.png",
    "https://img.icons8.com/color/48/whatsapp--v1.png",
  ],
  5: [
    "https://img.icons8.com/ios-glyphs/30/000000/whatsapp.png",
    "https://img.icons8.com/ios/50/25D366/whatsapp.png",
  ],
  6: [
    "https://img.icons8.com/material-outlined/48/000000/whatsapp--v2.png",
    "https://img.icons8.com/color/48/000000/whatsapp--v2.png",
  ],
  "Round (Color Based)": [
    { name: "Grey & Black", url: "https://example.com/round-grey.png" },
    { name: "🚚 It’s Easy 🚚", url: "https://example.com/round-easy.png" },
    { name: "Blue & White", url: "https://example.com/round-blue.png" },
    { name: "Harvest Gold", url: "https://example.com/round-gold.png" },
    { name: "Black & Gold Template", url: "https://example.com/round-bng.png" },
    { name: "Glow & Blink", url: "https://example.com/round-glow.png" },
    { name: "Soft", url: "https://example.com/round-soft.png" },
    { name: "🛍 Good Mood 🛍", url: "https://example.com/round-mood.png" },
    { name: "Fairy Tale", url: "https://example.com/round-fairy.png" },
    { name: "Important Things", url: "https://example.com/round-important.png" },
    { name: "WHATSAPP DEFAULT", url: "https://example.com/round-default.png" },
    { name: "Awesome1", url: "https://example.com/round-awesome.png" },
    { name: "Classic Blue", url: "https://example.com/round-blue-classic.png" },
    { name: "Pink EE", url: "https://example.com/round-pink.png" },
  ],
  "Rectangle (Color Based)": [
    { name: "Grey & Black", url: "https://example.com/rect-grey.png" },
    { name: "🚚 It’s Easy 🚚", url: "https://example.com/rect-easy.png" },
    { name: "Blue & White", url: "https://example.com/rect-blue.png" },
    { name: "Harvest Gold", url: "https://example.com/rect-gold.png" },
    { name: "Black & Gold Template", url: "https://example.com/rect-bng.png" },
    { name: "Glow & Blink", url: "https://example.com/rect-glow.png" },
    { name: "Soft", url: "https://example.com/rect-soft.png" },
    { name: "🛍 Good Mood 🛍", url: "https://example.com/rect-mood.png" },
    { name: "Fairy Tale", url: "https://example.com/rect-fairy.png" },
  ],
};

export default function Color() {
  const [state, setState] = useState(initial);

  const bgPreview = useMemo(() => {
    if (state.gradient && state.gradient !== "none") {
      const grad = GRADIENTS.find((g) => g.id === state.gradient);
      return grad?.css || state.background;
    }
    return toRGBA(state.background, clamp01(state.opacity));
  }, [state.gradient, state.background, state.opacity]);

  const onChange = (key) => (e) => setState((s) => ({ ...s, [key]: e.target.value }));
  const resetIcon = () => setState((s) => ({ ...s, iconUrl: null }));
  const toggleSwitch = (key) => () => setState((s) => ({ ...s, [key]: !s[key] }));

  const inputBase =
    "w-full mt-1 px-3 py-2 border border-[#0b1e39]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b1e39]/30 bg-[#fffff0] text-[#0b1e39]";
  const colorBox = "w-14 h-10 p-1 bg-white border border-[#0b1e39]/20 rounded";
  const selectBase = inputBase;

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow border border-[#0b1e39]/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-[#0b1e39] text-[#fffff0] flex items-center gap-2">
        <FaPalette />
        <h2 className="text-lg font-bold">Color Settings</h2>
      </div>

      {/* Form */}
      <div className="p-6">
        {/* Chat Visibility Section */}
        <div className="mb-8">
          <h3 className="text-base font-bold text-[#0b1e39] mb-3">Chat Visibility</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center gap-3 bg-[#f7fafc] px-4 py-2 rounded-lg shadow-sm border border-[#0b1e39]/10">
              <input
                type="checkbox"
                checked={state.showOnMobile}
                onChange={toggleSwitch("showOnMobile")}
                className="accent-[#0b1e39] w-5 h-5"
              />
              <span className="text-[#0b1e39] font-medium">Show on Mobile</span>
            </label>
            <label className="flex items-center gap-3 bg-[#f7fafc] px-4 py-2 rounded-lg shadow-sm border border-[#0b1e39]/10">
              <input
                type="checkbox"
                checked={state.showOnDesktop}
                onChange={toggleSwitch("showOnDesktop")}
                className="accent-[#0b1e39] w-5 h-5"
              />
              <span className="text-[#0b1e39] font-medium">Show on Desktop</span>
            </label>
            <label className="flex items-center gap-3 bg-[#f7fafc] px-4 py-2 rounded-lg shadow-sm border border-[#0b1e39]/10">
              <input
                type="checkbox"
                checked={state.showOnTablet}
                onChange={toggleSwitch("showOnTablet")}
                className="accent-[#0b1e39] w-5 h-5"
              />
              <span className="text-[#0b1e39] font-medium">Show on Tablet</span>
            </label>
          </div>
        </div>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Background */}
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">Background Color</label>
            <input className={colorBox} type="color" value={state.background} onChange={onChange("background")} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">Text/Icon Color</label>
            <input className={colorBox} type="color" value={state.text} onChange={onChange("text")} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">Chat Now Text Color</label>
            <input className={colorBox} type="color" value={state.chatNow} onChange={onChange("chatNow")} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">Label Background</label>
            <input className={colorBox} type="color" value={state.labelBg} onChange={onChange("labelBg")} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">Share Background</label>
            <input className={colorBox} type="color" value={state.shareBg} onChange={onChange("shareBg")} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">Share Text Color</label>
            <input className={colorBox} type="color" value={state.shareText} onChange={onChange("shareText")} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">Header Text</label>
            <input className={inputBase} type="text" value={state.headerText} onChange={onChange("headerText")} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">Header Background</label>
            <input className={inputBase} type="text" value={state.headerBg} onChange={onChange("headerBg")} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">SVG Icon Color</label>
            <input className={colorBox} type="color" value={state.svgIcon} onChange={onChange("svgIcon")} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">Blink Color</label>
            <input className={colorBox} type="color" value={state.blinkColor} onChange={onChange("blinkColor")} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">Blink Background</label>
            <input className={colorBox} type="color" value={state.blinkBg} onChange={onChange("blinkBg")} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">FAQ Color</label>
            <input className={colorBox} type="color" value={state.faqColor} onChange={onChange("faqColor")} />
          </div>

          {/* Font */}
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39] flex items-center gap-1">
              <FaFont /> Font Family
            </label>
            <select value={state.fontFamily} onChange={onChange("fontFamily")} className={selectBase}>
              {FONTS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">Font Size</label>
            <input
              className={inputBase}
              type="number"
              value={parseInt(state.fontSize)}
              onChange={(e) => setState((s) => ({ ...s, fontSize: `${e.target.value}px` }))}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">Label Style</label>
            <select value={state.labelStyle} onChange={onChange("labelStyle")} className={selectBase}>
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="bolder">Bolder</option>
            </select>
          </div>

          {/* Opacity */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-[#0b1e39]">Background Opacity: {state.opacity}</label>
            <input
              className="w-full mt-2"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={state.opacity}
              onChange={onChange("opacity")}
            />
          </div>

          {/* Gradients */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-[#0b1e39]">Gradient Preset</label>
            <select value={state.gradient} onChange={onChange("gradient")} className={selectBase}>
              {GRADIENTS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label || g.css}
                </option>
              ))}
            </select>
            <div className="flex flex-wrap gap-2 mt-3">
              {GRADIENTS.map((g) => (
                <button
                  type="button"
                  key={g.id}
                  className={`w-9 h-9 rounded-md border border-[#0b1e39]/20 ${
                    state.gradient === g.id ? "ring-2 ring-[#0b1e39]" : ""
                  }`}
                  style={{ background: g.css === "none" ? "#f0f0f0" : g.css }}
                  onClick={() => setState((s) => ({ ...s, gradient: g.id }))}
                />
              ))}
            </div>
          </div>
        </form>

        {/* Divider */}
        <div className="my-6 h-px bg-[#0b1e39]/10" />

        {/* Icons */}
        <div>
          <h3 className="font-semibold text-[#0b1e39] mb-3">Choose WhatsApp Icon</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(ICON_GROUPS).map(([group, urls]) => (
              <div key={group} className="p-3 border border-[#0b1e39]/10 rounded-lg bg-[#fffff0]">
                <h4 className="text-xs font-bold text-[#0b1e39]/80 mb-2">Style {group}</h4>
                <div className="flex gap-2 flex-wrap">
                  {urls.map((url) => (
                    <img
                      key={typeof url === 'string' ? url : url.url}
                      src={typeof url === 'string' ? url : url.url}
                      alt="wa-icon"
                      className={`w-10 h-10 cursor-pointer border border-[#0b1e39]/10 rounded ${
                        state.iconUrl === (typeof url === 'string' ? url : url.url) ? "ring-2 ring-[#0b1e39]" : ""
                      }`}
                      onClick={() => setState((s) => ({ ...s, iconUrl: typeof url === 'string' ? url : url.url }))}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={resetIcon} className="mt-3 text-xs text-red-600 underline">
            Reset to Default SVG
          </button>
        </div>
      </div>

      {/* Floating WhatsApp Button Preview */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-end">
          <button
            className="flex items-center gap-2 px-5 py-3 rounded-full shadow-lg"
            style={{
              background: bgPreview,
              color: state.text,
              fontFamily: state.fontFamily,
              fontSize: state.fontSize,
              fontWeight: state.labelStyle,
            }}
          >
            {state.iconUrl ? (
              <img src={state.iconUrl} alt="wa" className="w-6 h-6" />
            ) : (
              <FaWhatsapp className="w-6 h-6" style={{ color: state.svgIcon }} />
            )}
            <span style={{ color: state.chatNow }}>Chat Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}