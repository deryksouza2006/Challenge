import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo.png";
import AccountDrawer from './AccountDrawer';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <header className="bg-[#23C8AA] text-white px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img className="w-20 h-15" src={logo} alt="Logo Visuall" />
          </Link>

          {/* Botão de Configurações (Canto Superior Direito) */}
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 rounded-full hover:bg-teal-600 transition-colors duration-200 focus:outline-none"
            aria-label="Abrir menu de configurações"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Account Drawer */}
      <AccountDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        isAuthenticated={isAuthenticated}
        user={user}
      />
    </>
  );
}
