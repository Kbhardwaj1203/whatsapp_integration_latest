import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Chat from './components/Chat.jsx';
import Call from './components/Call.jsx';
import Color from './components/Color.jsx';
import Mobile from './components/Mobile.jsx';
import { FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard' | 'color' | 'mobile' | 'call' | 'chat'

  const renderDashboard = () => (
    <div className="p-6 space-y-6">
      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-5 border border-[#0b1e39]/10">
          <div className="text-sm text-[#0b1e39]/70">Total Chats</div>
          <div className="mt-2 text-3xl font-bold text-[#0b1e39]">1,248</div>
          <div className="mt-1 text-xs text-[#0b1e39]/60">+12% from last week</div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 border border-[#0b1e39]/10">
          <div className="text-sm text-[#0b1e39]/70">Conversions</div>
          <div className="mt-2 text-3xl font-bold text-[#0b1e39]">312</div>
          <div className="mt-1 text-xs text-[#0b1e39]/60">+4.5% this month</div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 border border-[#0b1e39]/10">
          <div className="text-sm text-[#0b1e39]/70">Avg. Response</div>
          <div className="mt-2 text-3xl font-bold text-[#0b1e39]">1m 43s</div>
          <div className="mt-1 text-xs text-[#0b1e39]/60">-8s vs yesterday</div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 border border-[#0b1e39]/10">
          <div className="text-sm text-[#0b1e39]/70">Active Agents</div>
          <div className="mt-2 text-3xl font-bold text-[#0b1e39]">7</div>
          <div className="mt-1 text-xs text-[#0b1e39]/60">Peak: 10 agents</div>
        </div>
      </div>

      {/* Content blocks */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-xl shadow p-5 border border-[#0b1e39]/10">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[#0b1e39]">Recent Conversations</h3>
            <button className="text-sm text-[#0b1e39]/70 hover:text-[#0b1e39]">View all</button>
          </div>
          <div className="mt-4 h-48 grid place-items-center text-[#0b1e39]/50 text-sm">
            Chart/Table placeholder
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 border border-[#0b1e39]/10">
          <h3 className="font-semibold text-[#0b1e39]">Quick Actions</h3>
          <div className="mt-4 space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-[#0b1e39] text-[#fffff0] hover:opacity-90">Create Campaign</button>
            <button className="w-full text-left px-4 py-3 rounded-lg bg-[#102846] text-[#fffff0] hover:opacity-90" onClick={() => setCurrentPage('color')}>Color Settings</button>
            <button className="w-full text-left px-4 py-3 rounded-lg bg-[#14365c] text-[#fffff0] hover:opacity-90">Add FAQ</button>
          </div>
        </div>
      </div>
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
        </section>
      </main>
    </div>
  );
}

export default App;