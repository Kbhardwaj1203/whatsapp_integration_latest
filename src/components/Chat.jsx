import React, { useState } from "react";
import FloatingWhatsAppButton from "./FloatingWhatsAppButton";

export default function Chat() {
    const [iconSize, setIconSize] = useState(50);
    const [iconMove, setIconMove] = useState(50);
    const [iconRadius, setIconRadius] = useState(50);

    return (
        <>
            <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#fff] rounded-3xl shadow-2xl border border-[#e0e7ff] p-8 mt-12 animate-fade-in">
                <h2 className="text-2xl font-bold text-center mb-2 text-[#1e293b] flex items-center gap-2">
                    {/* <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#2563eb"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff">CHAT</text></svg> */}
                    Button Display & Position
                    <span className="text-base font-semibold ml-2">(Left Right Up Down)</span>
                </h2>
                {/* <div className="text-center text-blue-600 font-semibold mb-4">
                    We feel you need to adjust the slider and increase the width and hit on SAVE
                </div> */}
                <div className="mb-6 text-[#1e293b] text-sm font-medium">
                    Chat Icon Width & Height in Px. If you want round icon then 40-60Px recommended. For flat merged bar with icon + Text 100Px minimum is recommended.
                </div>
                <div className="flex flex-col gap-2 mb-6">
                    <input
                        type="range"
                        min={40}
                        max={120}
                        value={iconSize}
                        onChange={e => setIconSize(Number(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span></span>
                        <span>{iconSize} Px</span>
                    </div>
                </div>
                <div className="mb-6 text-[#1e293b] text-sm font-medium">
                    Chat Icon move left right just by increasing decreasing the percentage. It is particularly applicable if you want to make flat design with merged text
                </div>
                <div className="flex flex-col gap-2 mb-6">
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={iconMove}
                        onChange={e => setIconMove(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span></span>
                        <span>{iconMove} %</span>
                    </div>
                </div>
                <div className="mb-6 text-[#1e293b] text-sm font-medium">
                    Chat Icon border radius. If you want rounded icon then set 50. if you want flat icon then radius should be 1-10% maximum
                </div>
                <div className="flex flex-col gap-2 mb-6">
                    <input
                        type="range"
                        min={1}
                        max={60}
                        value={iconRadius}
                        onChange={e => setIconRadius(Number(e.target.value))}
                        className="w-full accent-purple-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span></span>
                        <span>{iconRadius} Px</span>
                    </div>
                </div>
                <button
                    className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg shadow hover:opacity-90 transition-all"
                    onClick={() => {}}
                >
                    SAVE
                </button>
                <style>{`
                    @keyframes fade-in { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
                `}</style>
            </div>
            {/* Floating WhatsApp Button (shared component, single icon everywhere) */}
            <FloatingWhatsAppButton
              text="Chat with us"
              size={iconSize}
              movePercent={iconMove}
              radius={iconRadius}
              background="linear-gradient(90deg, #25D366 0%, #128C7E 100%)"
              color="#fff"
              animation="none"
              repeat="infinite"
            />
        </>
    );
}