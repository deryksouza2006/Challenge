import { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import chatbot from "../assets/images/chatbot.png";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "O que é o VisuAll?",
      answer: "O VisuAll é um aplicativo SPA (Single Page Application) desenvolvido com foco em acessibilidade, especialmente para idosos e pessoas com necessidades especiais. Oferece assistente de voz e interface intuitiva para gerenciamento de lembretes médicos."
    },
    {
      id: 2,
      question: "Como funciona o assistente de voz?",
      answer: "O assistente de voz permite que você ouça seus lembretes em voz alta, facilitando o acesso às informações mesmo para pessoas com dificuldades visuais. Basta clicar no botão 'Ouvir Lembrete' em qualquer compromisso."
    },
    {
      id: 3,
      question: "Como adicionar um novo lembrete?",
      answer: "Para adicionar um novo lembrete, clique no botão '+ Adicionar Lembrete' na página inicial. Preencha as informações do médico, especialidade, data, hora, local e observações. Depois clique em 'Salvar'."
    },
    {
      id: 4,
      question: "Posso compartilhar meus lembretes?",
      answer: "Sim! Você pode compartilhar lembretes específicos clicando no botão 'Compartilhar'. Isso é útil para familiares ou cuidadores acompanharem seus compromissos médicos."
    },
    {
      id: 5,
      question: "O aplicativo funciona em dispositivos móveis?",
      answer: "Sim, o VisuAll foi desenvolvido com design mobile-first, funcionando perfeitamente em smartphones, tablets e computadores. A interface se adapta automaticamente ao tamanho da tela."
    },
    {
      id: 6,
      question: "Como acessar o histórico de lembretes?",
      answer: "O histórico de lembretes está disponível na página inicial, logo abaixo do lembrete atual. Você pode ver todos os compromissos passados e futuros organizados por data."
    },
    {
      id: 7,
      question: "O aplicativo oferece recursos de acessibilidade?",
      answer: "Sim! O VisuAll inclui diversos recursos de acessibilidade: navegação por teclado, alto contraste, textos ampliados, assistente de voz e interface simplificada para facilitar o uso por pessoas idosas ou com deficiências."
    },
    {
      id: 8,
      question: "Como entrar em contato com o suporte?",
      answer: "Você pode entrar em contato através da página 'Contato' ou pelos canais: email contato@visuall.com.br, telefone (11) 9999-9999. Oferecemos suporte 24h para questões de acessibilidade."
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Cabeçalho */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Perguntas Frequentes</h1>
        <p className="text-gray-600">Encontre respostas para as dúvidas mais comuns sobre o VisuAll</p>
      </div>

      {/* Botão voltar */}
      <BackButton />

      {/* Lista de FAQs */}
      <div className="space-y-3">
        {faqItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              aria-expanded={openItem === item.id}
              aria-controls={`faq-answer-${item.id}`}
            >
              <h3 className="font-medium text-gray-800 pr-4">{item.question}</h3>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openItem === item.id ? 'rotate-180' : ''
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {openItem === item.id && (
              <div 
                id={`faq-answer-${item.id}`}
                className="px-4 pb-4 text-gray-600 leading-relaxed"
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Seção de ajuda adicional */}
      <div className="bg-teal-50 rounded-lg p-4 mt-8">
        <h2 className="text-lg font-semibold text-teal-800 mb-2">Precisa de mais ajuda?</h2>
        <p className="text-teal-700 mb-4">
          Não encontrou a resposta que procurava? Nossa equipe está pronta para ajudá-lo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            to="/contato" 
            className="bg-teal-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-teal-700 transition-colors duration-200"
          >
            Entre em contato
          </Link>
          <Link 
            to="/dev" 
            className="border border-teal-600 text-teal-600 px-4 py-2 rounded-lg text-center font-medium hover:bg-teal-50 transition-colors duration-200"
          >
            Conheça a equipe
          </Link>
        </div>
      </div>

      {/* Recursos de acessibilidade */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
          <img className="w-5 h-5 mr-2" src={chatbot} alt="icone de chatbot" />
          Dica de Acessibilidade
        </h2>
        <p className="text-blue-700 text-sm">
          Use as teclas Tab e Enter para navegar pelos itens do FAQ. 
          Pressione Espaço ou Enter para expandir/recolher as respostas.
        </p>
      </div>
    </div>
  );
}
