import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import perfil from '../assets/images/perfil.png';
import { useAccessibility } from '../context/AccessibilityContext';
import { useAuth } from '../context/AuthContext';

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  user: { id: number; nome: string; email: string } | null;
}

export default function AccountDrawer({ isOpen, onClose, isAuthenticated, user }: AccountDrawerProps) {
  const navigate = useNavigate();
  const { settings, updateSettings, resetSettings } = useAccessibility();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'conta' | 'perfil' | 'acessibilidade' | 'notificacoes'>('conta');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  const handleEditProfile = () => {
    setActiveTab('perfil');
  };

  const handleGoToLogin = () => {
    onClose();
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0  z-40"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white text-white shadow-lg z-50 overflow-y-auto">
        {/* Header com botão de fechar */}
        <div className="flex justify-between items-center p-6 border-b bg-black">
          <h2 className="text-xl font-bold">
            {activeTab === 'conta' && 'Conta'}
            {activeTab === 'perfil' && 'Perfil'}
            {activeTab === 'acessibilidade' && 'Acessibilidade'}
            {activeTab === 'notificacoes' && 'Notificações'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            <span className="hover:text-white">✕</span>
          </button>
        </div>

        {/* Conteúdo do Drawer */}
        <div className="p-6">
          {/* Tab: Conta - Não Autenticado */}
          {activeTab === 'conta' && !isAuthenticated && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-black mb-6">Você não está logado. Faça login para acessar sua conta.</p>
              </div>

              {/* Botões de Login e Cadastro */}
              <div className="space-y-3">
                <button 
                  onClick={handleGoToLogin}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-[#23C8AA] hover:bg-[#23C8AA] rounded-lg transition-colors font-medium"
                >
                  <span>Fazer Login</span>
                </button>
                <Link 
                  to="/cadastro"
                  onClick={onClose}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors font-medium"
                >
                  <span>Criar Conta</span>
                </Link>
              </div>

              {/* Menu de Navegação */}
              <div className="pt-6 border-t border-gray-700 space-y-2">
                <button 
                  onClick={() => setActiveTab('acessibilidade')}
                  className="w-full text-left py-2 px-4 hover: rounded-lg transition-colors"
                >
                <span className="text-[#23C8AA] hover:bg">Acessibilidade</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab: Conta - Autenticado */}
          {activeTab === 'conta' && isAuthenticated && user && (
            <div className="space-y-6">
              {/* Informações do Usuário */}
              <div className="flex items-center space-x-4 pb-6 border-gray-700">
                <img 
                  src={perfil} 
                  alt="Avatar" 
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-black font-bold">{user.nome}</h3>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="space-y-3">
                <button 
                  onClick={handleEditProfile}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-[#23C8AA] hover:bg-gray-600 rounded-lg transition-colors"
                >
                <span>Configurar Conta</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                <span>Sair da Conta</span>
                </button>
              </div>

              {/* Menu de Navegação */}
              <div className="pt-6 border-t border-gray-700 space-y-2">
                <button 
                  onClick={() => setActiveTab('acessibilidade')}
                  className="w-full text-left py-2 px-4  rounded-lg "
                >
                <span className="text-black hover:text-white hover:bg-[#23C8AA] rounded-lg space-x-2 py-2 px-4">Acessibilidade</span>
                </button>
                <button 
                  onClick={() => setActiveTab('notificacoes')}
                  className="w-full text-left py-2 px-4  rounded-lg transition-colors"
                >
                <span className="text-black hover:text-white hover:bg-[#23C8AA] rounded-lg space-x-2 py-2 px-4">Notificações</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab: Perfil */}
          {activeTab === 'perfil' && isAuthenticated && user && (
            <div className="space-y-6">
              <button 
                onClick={() => setActiveTab('conta')}
                className="text-gray-400 hover:text-[#23C8AA] text-sm mb-4"
              >
              Voltar
              </button>
              
              <div className="flex items-center justify-center mb-6">
                <img 
                  src={perfil} 
                  alt="Avatar" 
                  className="w-24 h-24 rounded-full"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Nome</label>
                  <input 
                    type="text" 
                    value={user.nome}
                    disabled
                    className="w-full bg-black text-white px-4 py-2 rounded-lg border border-gray-700 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">Email</label>
                  <input 
                    type="email" 
                    value={user.email}
                    disabled
                    className="w-full bg-black text-white px-4 py-2 rounded-lg border border-gray-700 cursor-not-allowed"
                  />
                </div>
              </div>

              <button 
                className="w-full py-2 px-4 bg-gray-600 text-gray-300 rounded-lg font-medium cursor-not-allowed"
                disabled
              >
                Edição desabilitada (será implementada na API)
              </button>
            </div>
          )}

          {/* Tab: Acessibilidade */}
          {activeTab === 'acessibilidade' && (
            <div className="space-y-6">
              <button 
                onClick={() => setActiveTab('conta')}
                className="text-gray-400 hover:text-[#23C8AA] text-sm mb-4"
              >
              Voltar
              </button>

              <div>
                <label className="text-sm text-gray-400 block mb-2">Tamanho da Fonte: {settings.fontSize}%</label>
                <input 
                  type="range" 
                  min="80" 
                  max="140" 
                  value={settings.fontSize}
                  onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Menor</span>
                  <span>Normal</span>
                  <span>Maior</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">Espaçamento entre Linhas: {settings.lineHeight}</label>
                <input 
                  type="range" 
                  min="1.2" 
                  max="1.8" 
                  step="0.1"
                  value={settings.lineHeight}
                  onChange={(e) => updateSettings({ lineHeight: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Compacto</span>
                  <span>Confortável</span>
                  <span>Amplo</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 px-4 bg-black rounded-lg">
                <label className="text-sm">Alto Contraste</label>
                <input 
                  type="checkbox" 
                  checked={settings.highContrast}
                  onChange={(e) => updateSettings({ highContrast: e.target.checked })}
                  className="w-5 h-5"
                />
              </div>

              <div className="flex items-center justify-between py-3 px-4 bg-black rounded-lg">
                <label className="text-sm">Modo Simplificado (sem animações)</label>
                <input 
                  type="checkbox" 
                  checked={settings.simplifiedMode}
                  onChange={(e) => updateSettings({ simplifiedMode: e.target.checked })}
                  className="w-5 h-5"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={resetSettings}
                  className="flex-1 py-2 px-4 bg-gray-700 hover:bg-red-800 rounded-lg transition-colors"
                >
                  Restaurar Padrão
                </button>
                <button 
                  onClick={() => setActiveTab('conta')}
                  className="flex-1 py-2 px-4 bg-teal-600 hover:bg-[#23C8AA] rounded-lg transition-colors"
                >
                  Concluir
                </button>
              </div>
            </div>
          )}

          {/* Tab: Notificações */}
          {activeTab === 'notificacoes' && isAuthenticated && (
            <div className="space-y-6">
              <button 
                onClick={() => setActiveTab('conta')}
                className="text-gray-400 hover:text-[#23C8AA] text-sm mb-4"
              >
              Voltar
              </button>

              <div className="flex items-center justify-between py-3 px-4 bg-gray-800 rounded-lg">
                <div>
                  <label className="text-sm font-medium">Notificações por Email</label>
                  <p className="text-xs text-gray-400 mt-1">Receba lembretes por email</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="w-5 h-5"
                />
              </div>

              {notificationsEnabled && (
                <div className="p-3 bg-teal-900 text-teal-100 rounded-lg text-sm">
                  ✓ Notificações por email ativadas. Você receberá lembretes por email.
                </div>
              )}

              <p className="text-xs text-gray-500 italic">
                *Nota: A funcionalidade de envio de emails será implementada em Python na próxima etapa.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
