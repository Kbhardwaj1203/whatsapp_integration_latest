import React, { useState } from 'react';
import {
  FaBars,
  FaWhatsapp,
  FaShareAlt,
  FaFacebook,
  FaComments,
  FaPalette,
  FaQuestionCircle,
  FaLayerGroup,
  FaBolt,
  FaChartLine,
  FaShoppingCart,
  FaCog,
  FaChevronLeft,
  FaEnvelope,
  FaFont
} from 'react-icons/fa';

function Sidebar({ onHamburgerClick, onNavigate }) {
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [showChatSettingOptions, setShowChatSettingOptions] = useState(false);

  const sectionLink = (Icon, label, onClick) => (
    <button
      className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg hover:bg-[#102846] transition-colors"
      onClick={onClick}
    >
      <Icon className="text-[#fffff0]" size={16} />
      <span className="text-sm tracking-wide">{label}</span>
    </button>
  );

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-72 bg-[#0b1e39] text-[#fffff0] shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
        <span className="text-lg font-bold tracking-wide">PushDaddy Admin</span>
        <button className="ml-3 focus:outline-none" onClick={onHamburgerClick} aria-label="Toggle sidebar">
          <FaBars size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-4 overflow-y-auto">
        {!showChatOptions && !showChatSettingOptions ? (
          <>
            {sectionLink(FaWhatsapp, 'Whatsapp Chat, Share', () => setShowChatOptions(true))}
            {sectionLink(FaBolt, 'Whatsapp Automation', () => {})}
            {sectionLink(FaComments, 'Manual Whatsapp Messages', () => {})}
            {sectionLink(FaCog, 'Chatbot', () => {})}
            {sectionLink(FaChartLine, 'Invoice Download', () => {})}
            {sectionLink(FaChartLine, 'Reviews', () => {})}
            {sectionLink(FaComments, 'Customer', () => {})}
            {sectionLink(FaBolt, 'Other Apps', () => {})}
          </>
        ) : showChatOptions && !showChatSettingOptions ? (
          <>
            {sectionLink(FaCog, 'Chat Setting', () => setShowChatSettingOptions(true))}
            {sectionLink(FaShareAlt, 'Share Setting', () => {})}
            {sectionLink(FaFacebook, 'Messenger, Instagram ET', () => {})}
            {sectionLink(FaQuestionCircle, 'Add FAQ in Chat', () => {})}
            {sectionLink(FaLayerGroup, 'Merge Chat', () => {})}
            {sectionLink(FaBolt, 'Advance Chat', () => {})}
            {sectionLink(FaFacebook, 'Facebook Pixel/GA', () => {})}
            {sectionLink(FaShoppingCart, 'Add to Cart Links', () => {})}
            <button
              className="flex items-center gap-2 text-xs mt-6 text-[#fffff0]/70 hover:text-[#fffff0]"
              onClick={() => setShowChatOptions(false)}
            >
              <FaChevronLeft /> Back
            </button>
          </>
        ) : showChatSettingOptions ? (
          <>
            {sectionLink(FaComments, 'Basic Chat Setting', () => onNavigate && onNavigate('mobile'))}
            {sectionLink(FaPalette, 'Color Setting', () => onNavigate && onNavigate('color'))}
            {sectionLink(FaFont, 'Text Setting', () => {})}
            {sectionLink(FaWhatsapp, 'Chat Icon', () => onNavigate && onNavigate('chat'))}
            {sectionLink(FaBolt, 'Call to action', () => onNavigate && onNavigate('call'))}
            {sectionLink(FaEnvelope, 'Email Popup in Chat', () => {})}
            <button
              className="flex items-center gap-2 text-xs mt-6 text-[#fffff0]/70 hover:text-[#fffff0]"
              onClick={() => setShowChatSettingOptions(false)}
            >
              <FaChevronLeft /> Back
            </button>
          </>
        ) : null}
      </nav>

      {/* Footer mini profile */}
      <div className="p-4 border-t border-white/10 text-xs text-[#fffff0]/70">
        <div className="font-semibold text-[#fffff0]">Logged in</div>
        <div>admin@example.com</div>
      </div>
    </aside>
  );
}

export default Sidebar;