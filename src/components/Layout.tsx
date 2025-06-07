import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MiniPlayer from './MiniPlayer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      {!isPlayerExpanded && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      <MiniPlayer 
        isExpanded={isPlayerExpanded}
        onExpandedChange={setIsPlayerExpanded}
      />
      {!isPlayerExpanded && <Footer />}
    </div>
  );
};

export default Layout;