import React, { useState } from "react";
import FloatingWhatsAppButton from "./FloatingWhatsAppButton";

export default function TextConfig() {
  const [flyerMobile, setFlyerMobile] = useState(false);
  const [flyerDesktop, setFlyerDesktop] = useState(false);
  const [flyerImage, setFlyerImage] = useState("");
  const [previewValue, setPreviewValue] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [orderTracking, setOrderTracking] = useState("Order No");
  const [desktopText, setDesktopText] = useState("Chat with us");
  const [mobileText, setMobileText] = useState("Chat with u");
  const [prefillMsg, setPrefillMsg] = useState("I need help");
  const [offlineMsg, setOfflineMsg] = useState("Currently Offline. Will be back soon");
  const [operatorMsg, setOperatorMsg] = useState("Hello! James here from support team. for Order status, kindly give your order number and enter, for anything else please type message and chat with me");
  const [flyerMsg, setFlyerMsg] = useState("");
  const [replyDuration, setReplyDuration] = useState("We typically reply within minutes");
  const [welcomeMsg, setWelcomeMsg] = useState("Welcome Guest");
  const [chatboxTopMsg, setChatboxTopMsg] = useState("Hi there");
  const [typingPlaceholder, setTypingPlaceholder] = useState("");

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#fff] rounded-3xl shadow-2xl border border-[#e0e7ff] p-8 mt-12 animate-fade-in">
      {/* Flyer Section */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-medium text-gray-800">Flyer</span>
        </div>
        <div className="flex gap-16 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-gray-700 font-medium mb-1">Flyer Mobile</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={flyerMobile} onChange={e => setFlyerMobile(e.target.checked)} />
              <div className={`w-11 h-6 rounded-full transition-all ${flyerMobile ? 'bg-blue-400' : 'bg-gray-200'}`}></div>
            </label>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-700 font-medium mb-1">Flyer Desktop</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={flyerDesktop} onChange={e => setFlyerDesktop(e.target.checked)} />
              <div className={`w-11 h-6 rounded-full transition-all ${flyerDesktop ? 'bg-blue-400' : 'bg-gray-200'}`}></div>
            </label>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex items-center gap-3 mb-1">
            <span className="font-medium text-gray-800">Flyer Image/Youtube (Optional)</span>
            <button className="text-blue-700 underline font-medium cursor-pointer" type="button">Upload here</button>
            <button className="text-blue-700 underline font-medium cursor-pointer" type="button" onClick={() => {setPreviewValue(flyerImage);setShowPreview(true);}}>Preview</button>
          </div>
          <textarea className="w-full border border-gray-300 rounded-md p-2 min-h-[70px] focus:outline-none focus:ring-2 focus:ring-blue-200" value={flyerImage} onChange={e => setFlyerImage(e.target.value)} />
        </div>
        {/* Flyer Message Field styled as shown, now after Flyer Image/Youtube */}
        <div className="mt-6">
          <label className="font-semibold text-[#a78bfa] mb-2 block flex items-center gap-2">
            Flyer Message
            <button type="button" className="text-blue-500 font-semibold underline cursor-pointer" onClick={() => {setPreviewValue(flyerMsg);setShowPreview(true);}}>Preview</button>
          </label>
          <textarea className="w-full border-2 border-[#a78bfa]/40 rounded-xl p-3 mb-2 text-base focus:border-[#a78bfa] focus:ring-2 focus:ring-[#a78bfa]/20 transition-all bg-white shadow-sm" value={flyerMsg} onChange={e => setFlyerMsg(e.target.value)} rows={3} />
        </div>
      </div>
      {/* ...existing code... */}
      <h2 className="text-2xl font-bold text-[#1e293b] mb-6 flex items-center gap-2">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#a78bfa"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff">TEXT</text></svg>
        Text Configuration
      </h2>
      {/* Floating WhatsApp Button (shared component) for preview in Text settings */}
     
      {/* Quick Action Buttons */}
      <div className="mb-8 flex flex-col gap-6">
        <div className="flex items-center gap-3 cursor-pointer">
          <span className="inline-flex items-center gap-1">
            <span className="bg-yellow-400 text-[#464757] font-bold px-2 py-1 rounded shadow text-xs">FAQ</span>
          </span>
          <span className="text-gray-500 font-medium">FAQ questions</span>
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <span className="inline-flex items-center gap-1">
            <span className="bg-orange-400 text-white font-bold px-2 py-1 rounded shadow text-xs flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" fill="#FF5722"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff">LIVE</text></svg>
            </span>
          </span>
          <span className="text-gray-500 font-medium">Manage Live Chat here</span>
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <span className="text-blue-600 font-bold text-lg">Rate Us</span>
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <span className="inline-flex items-center gap-1">
            <span className="bg-red-500 text-white font-bold px-2 py-1 rounded shadow text-xs flex items-center gap-1">HELP</span>
            <span style={{fontSize:'1.5em'}}>🖐️</span>
          </span>
        </div>
      </div>
      <div className="mb-8">
        <label className="font-semibold text-[#2563eb] mb-2 block">Order Tracking Parameters</label>
        <div className="flex gap-4 flex-wrap">
          {['Order No', 'Email Id', 'Phone No', 'Phone No or Email(Rec)', 'Disable Tracking'].map(opt => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <input type="radio" name="orderTracking" value={opt} checked={orderTracking === opt} onChange={e => setOrderTracking(e.target.value)} />
              {opt}
            </label>
          ))}
        </div>
      </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="font-semibold text-[#2563eb]">Desktop : Chat Button Text <button type="button" className="text-blue-500 ml-2 cursor-pointer" onClick={() => {setPreviewValue(desktopText);setShowPreview(true);}}>Preview</button></label>
          <textarea className="w-full border-2 border-[#2563eb]/30 rounded-xl p-3 mb-2 text-base focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all bg-white shadow-sm" value={desktopText} onChange={e => setDesktopText(e.target.value)} rows={2} />
          <div className="text-xs text-gray-500 mb-4">Comma separated text (e.g Chat with us, we are 24/7 online, support team, best quality)</div>
          <label className="font-semibold text-[#2563eb]">Mobile : Chat Button Text <button type="button" className="text-blue-500 ml-2 cursor-pointer" onClick={() => {setPreviewValue(mobileText);setShowPreview(true);}}>Preview</button></label>
          <textarea className="w-full border-2 border-[#a78bfa]/30 rounded-xl p-3 mb-2 text-base focus:border-[#a78bfa] focus:ring-2 focus:ring-[#a78bfa]/20 transition-all bg-white shadow-sm" value={mobileText} onChange={e => setMobileText(e.target.value)} rows={2} />
          <div className="text-xs text-gray-500 mb-4">This is the message prefilled in whatsapp chat when users tries to chat with you</div>
          <label className="font-semibold text-[#2563eb]">Prefilled Message <button type="button" className="text-blue-500 ml-2 cursor-pointer" onClick={() => {setPreviewValue(prefillMsg);setShowPreview(true);}}>Preview</button></label>
          <textarea className="w-full border-2 border-[#2563eb]/30 rounded-xl p-3 mb-2 text-base focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all bg-white shadow-sm" value={prefillMsg} onChange={e => setPrefillMsg(e.target.value)} rows={2} />
          <label className="font-semibold text-[#a78bfa]">Offline Message <button type="button" className="text-blue-500 ml-2 cursor-pointer" onClick={() => {setPreviewValue(offlineMsg);setShowPreview(true);}}>Preview</button></label>
          <textarea className="w-full border-2 border-[#a78bfa]/30 rounded-xl p-3 mb-2 text-base focus:border-[#a78bfa] focus:ring-2 focus:ring-[#a78bfa]/20 transition-all bg-white shadow-sm" value={offlineMsg} onChange={e => setOfflineMsg(e.target.value)} rows={2} />
        </div>
        <div>
          <label className="font-semibold text-[#2563eb]">Message by Operator <button type="button" className="text-blue-500 ml-2 cursor-pointer" onClick={() => {setPreviewValue(operatorMsg);setShowPreview(true);}}>Preview</button></label>
          <textarea className="w-full border-2 border-[#2563eb]/30 rounded-xl p-3 mb-2 text-base focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all bg-white shadow-sm" value={operatorMsg} onChange={e => setOperatorMsg(e.target.value)} rows={3} />
          <label className="font-semibold text-[#a78bfa]">Flyer Message <button type="button" className="text-blue-500 ml-2 cursor-pointer" onClick={() => {setPreviewValue(flyerMsg);setShowPreview(true);}}>Preview</button></label>
          <textarea className="w-full border-2 border-[#a78bfa]/30 rounded-xl p-3 mb-2 text-base focus:border-[#a78bfa] focus:ring-2 focus:ring-[#a78bfa]/20 transition-all bg-white shadow-sm" value={flyerMsg} onChange={e => setFlyerMsg(e.target.value)} rows={2} />
          <label className="font-semibold text-[#2563eb]">Reply Duration Message <button type="button" className="text-blue-500 ml-2 cursor-pointer" onClick={() => {setPreviewValue(replyDuration);setShowPreview(true);}}>Preview</button></label>
          <textarea className="w-full border-2 border-[#2563eb]/30 rounded-xl p-3 mb-2 text-base focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all bg-white shadow-sm" value={replyDuration} onChange={e => setReplyDuration(e.target.value)} rows={2} />
          <label className="font-semibold text-[#2563eb]">Welcome Message <button type="button" className="text-blue-500 ml-2 cursor-pointer" onClick={() => {setPreviewValue(welcomeMsg);setShowPreview(true);}}>Preview</button></label>
          <textarea className="w-full border-2 border-[#2563eb]/30 rounded-xl p-3 mb-2 text-base focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all bg-white shadow-sm" value={welcomeMsg} onChange={e => setWelcomeMsg(e.target.value)} rows={2} />
          <label className="font-semibold text-[#a78bfa]">Message (Chatbox Top) <button type="button" className="text-blue-500 ml-2 cursor-pointer" onClick={() => {setPreviewValue(chatboxTopMsg);setShowPreview(true);}}>Preview</button></label>
          <textarea className="w-full border-2 border-[#a78bfa]/30 rounded-xl p-3 mb-2 text-base focus:border-[#a78bfa] focus:ring-2 focus:ring-[#a78bfa]/20 transition-all bg-white shadow-sm" value={chatboxTopMsg} onChange={e => setChatboxTopMsg(e.target.value)} rows={2} />
          <label className="font-semibold text-[#2563eb]">Chatbox Typing Placeholder <button type="button" className="text-blue-500 ml-2 cursor-pointer" onClick={() => {setPreviewValue(typingPlaceholder);setShowPreview(true);}}>Preview</button></label>
          <textarea className="w-full border-2 border-[#2563eb]/30 rounded-xl p-3 mb-2 text-base focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all bg-white shadow-sm" value={typingPlaceholder} onChange={e => setTypingPlaceholder(e.target.value)} rows={2} />
        </div>
      </div>
      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-2xl p-8 min-w-[320px] max-w-lg border border-[#e0e7ff]">
            <div className="text-lg font-bold text-[#2563eb] mb-4">Preview</div>
            <div className="text-base text-[#1e293b] whitespace-pre-line">{previewValue || "Nothing to preview"}</div>
            <button className="mt-6 px-4 py-2 rounded bg-[#2563eb] text-white font-semibold" onClick={() => setShowPreview(false)}>Close</button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
      `}</style>
    </div>
  );
}
