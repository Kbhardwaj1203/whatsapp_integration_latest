import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Email from './components/Email.jsx';
import Chat from './components/Chat.jsx';
import Call from './components/Call.jsx';
import Color from './components/Color.jsx';
import Mobile from './components/Mobile.jsx';
import TextConfig from './components/Text.jsx';
import AddContact from './components/AddContact.jsx';
import { FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard' | 'color' | 'mobile' | 'call' | 'chat' | 'email' | 'text' | 'add-contact'

  const renderDashboard = () => (
    <div className="p-6 space-y-6">
      {/* ...existing code... */}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#fffff0] text-[#0b1e39]">
      {sidebarOpen && (
        <Sidebar
          onHamburgerClick={() => setSidebarOpen(false)}
          onNavigate={(route) => {
            if (route === 'color') setCurrentPage('color');
            if (route === 'mobile') setCurrentPage('mobile');
            if (route === 'call') setCurrentPage('call');
            if (route === 'chat') setCurrentPage('chat');
            if (route === 'email') setCurrentPage('email');
            if (route === 'text') setCurrentPage('text');
            if (route === 'add-contact') setCurrentPage('add-contact');
          }}
        />
      )}

      {!sidebarOpen && (
        <button
          className="fixed top-4 left-4 z-50 bg-[#0b1e39] text-[#fffff0] p-2 rounded-md shadow-lg hover:opacity-90 focus:outline-none"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      )}

      <main className="flex-1 min-h-screen flex flex-col ml-72">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-[#0b1e39]/10 px-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3 w-full max-w-xl bg-[#fffff0] border border-[#0b1e39]/10 rounded-lg px-3 py-2">
            <FaSearch className="text-[#0b1e39]/60" />
            <input
              placeholder="Search…"
              className="flex-1 bg-transparent outline-none text-sm text-[#0b1e39]"
            />
          </div>
          <div className="flex items-center gap-4 text-[#0b1e39]">
            <FaBell className="opacity-80 cursor-pointer" />
            <FaUserCircle className="opacity-80 cursor-pointer" />
          </div>
        </header>

        <section className="flex-1">
          {currentPage === 'dashboard' && renderDashboard()}
          {currentPage === 'color' && (
            <div className="p-6">
              <Color />
            </div>
          )}
          {currentPage === 'mobile' && (
            <div className="p-6">
              <Mobile />
            </div>
          )}
          {currentPage === 'call' && (
            <div className="p-6">
              <Call />
            </div>
          )}
          {currentPage === 'chat' && (
            <div className="p-6">
              <Chat />
            </div>
          )}
          {currentPage === 'email' && (
            <div className="p-6">
              <Email />
            </div>
          )}
          {currentPage === 'text' && (
            <div className="p-6">
              <TextConfig />
            </div>
          )}
          {currentPage === 'add-contact' && (
            <div className="p-6">
              <AddContact />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;