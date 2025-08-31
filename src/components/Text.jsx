import React, { useState } from "react";

export default function TextConfig() {
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
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#fff] rounded-3xl shadow-2xl border border-[#e0e7ff] p-8 mt-12 animate-fade-in">
      <h2 className="text-2xl font-bold text-[#1e293b] mb-6 flex items-center gap-2">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#a78bfa"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff">TEXT</text></svg>
        Text Configuration
      </h2>
      {/* Order Tracking Parameters */}
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
