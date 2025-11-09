import React, { createContext, useState, useEffect, type ReactNode } from 'react';

export interface AccessibilitySettings {
  fontSize: number; // 80, 100, 120, 140 (em porcentagem)
  lineHeight: number; // 1.2, 1.5, 1.8
  highContrast: boolean;
  simplifiedMode: boolean; // Remove animações
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  lineHeight: 1.5,
  highContrast: false,
  simplifiedMode: false,
};

export const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  // Carregar configurações do localStorage ao montar o componente
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Aplicar as configurações ao documento
  useEffect(() => {
    const root = document.documentElement;
    
    // Aplicar tamanho da fonte
    root.style.fontSize = `${settings.fontSize}%`;
    
    // Aplicar altura de linha
    root.style.lineHeight = `${settings.lineHeight}`;
    
    // Aplicar alto contraste
    if (settings.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    // Aplicar modo simplificado (remover animações)
    if (settings.simplifiedMode) {
      document.body.classList.add('simplified-mode');
    } else {
      document.body.classList.remove('simplified-mode');
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('accessibilitySettings', JSON.stringify(updatedSettings));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('accessibilitySettings');
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = React.useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility deve ser usado dentro de AccessibilityProvider');
  }
  return context;
};
