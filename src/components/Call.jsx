import React, { useState } from "react";

const animationOptions = [
  { label: "No Animation", value: "none" },
  { label: "Glow & Blink", value: "glow" },
  { label: "Emitting", value: "emitting" },
  { label: "Bounce", value: "bounce" },
];
const repeatOptions = [
  { label: "Once", value: 1 },
  { label: "Twice", value: 2 },
  { label: "Thrice", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Five", value: 5 },
  { label: "Six", value: 6 },
  { label: "Infinite", value: "infinite" },
];

export default function Call() {
  const [enabled, setEnabled] = useState(false);
  const [ctaText, setCtaText] = useState("We are 24x7 available for chat. feel free to chat");
  const [animation, setAnimation] = useState("bounce");
  const [repeat, setRepeat] = useState("infinite");
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#fff] rounded-3xl shadow-2xl border border-[#e0e7ff] p-8 mt-12">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-bold text-2xl text-[#1e293b] flex items-center gap-2">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#2563eb"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff">CTA</text></svg>
          Enable Call to Action
        </span>
        <button
          className={`w-14 h-8 flex items-center bg-gray-200 rounded-full p-1 duration-300 focus:outline-none shadow-inner ${enabled ? 'bg-blue-500' : ''}`}
          onClick={() => setEnabled((v) => !v)}
          aria-label="Toggle Call to Action"
        >
          <span
            className={`bg-white w-7 h-7 rounded-full shadow-md transform duration-300 ${enabled ? 'translate-x-6' : ''}`}
            style={{ boxShadow: enabled ? '0 0 0 4px #2563eb22' : '' }}
          />
        </button>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <span className="font-semibold text-[#2563eb] text-lg">Call to Action Text</span>
        <button className="text-blue-600 text-sm font-semibold underline underline-offset-2" onClick={() => setShowMore((v) => !v)}>
          {showMore ? 'Hide Preview' : 'Preview'}
        </button>
      </div>
      <textarea
        className="w-full border-2 border-[#2563eb]/30 rounded-xl p-4 mb-4 text-base focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all bg-white shadow-sm"
        rows={3}
        value={ctaText}
        onChange={(e) => setCtaText(e.target.value)}
        placeholder="Type your call to action message..."
      />
      <div className="mb-6">
        <div className="font-semibold text-[#1e293b] mb-2">Animation Style</div>
        <div className="flex flex-wrap gap-4">
          {animationOptions.map((opt) => (
            <label key={opt.value} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-xl border transition-all ${animation === opt.value ? 'border-blue-500 bg-blue-50 text-blue-700 shadow' : 'border-gray-200 bg-white text-gray-500'}`}>
              <input
                type="radio"
                name="animation"
                value={opt.value}
                checked={animation === opt.value}
                onChange={() => setAnimation(opt.value)}
                disabled={!enabled}
                className="accent-blue-500"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <div className="font-semibold text-[#1e293b] mb-2">Repeat</div>
        <div className="flex flex-wrap gap-4">
          {repeatOptions.map((opt) => (
            <label key={opt.value} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-xl border transition-all ${repeat === opt.value ? 'border-blue-500 bg-blue-50 text-blue-700 shadow' : 'border-gray-200 bg-white text-gray-500'}`}>
              <input
                type="radio"
                name="repeat"
                value={opt.value}
                checked={repeat === opt.value}
                onChange={() => setRepeat(opt.value)}
                disabled={!enabled}
                className="accent-blue-500"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
      {showMore && (
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200 text-base text-[#1e293b] shadow-lg animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#2563eb"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff">CTA</text></svg>
            <strong className="text-blue-700">Preview:</strong>
          </div>
          <div className="mt-2 font-medium text-lg" style={{ animation: animation !== 'none' ? `${animation} 1.5s ${repeat === 'infinite' ? 'infinite' : repeat}` : 'none' }}>{ctaText}</div>
        </div>
      )}
      <style>{`
        @keyframes glow { 0% { box-shadow: 0 0 0 0 #2563eb44; } 50% { box-shadow: 0 0 16px 4px #2563eb88; } 100% { box-shadow: 0 0 0 0 #2563eb44; } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes emitting { 0% { opacity: 1; } 50% { opacity: 0.7; } 100% { opacity: 1; } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: translateY(0);} }
      `}</style>
      {/* Floating WhatsApp Button Fixed Bottom Right, reflects animation, repeat, and text */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
            className="flex items-center gap-2 px-5 py-3 rounded-full shadow-lg"
            style={{
              background: 'linear-gradient(90deg, #2563eb 0%, #a78bfa 100%)',
              color: '#fff',
              fontFamily: 'Arial, sans-serif',
              fontSize: '18px',
              fontWeight: 'bold',
              animation: enabled && animation !== 'none' ? `${animation} 1.5s ${repeat === 'infinite' ? 'infinite' : Number.isFinite(repeat) ? repeat : 1}` : 'none',
            }}
        >
          <img src="https://img.icons8.com/color/48/000000/whatsapp.png" alt="wa" className="w-6 h-6" />
          <span style={{ color: '#fff' }}>Chat Now</span>
        </button>
      </div>
    </div>
  );
}
