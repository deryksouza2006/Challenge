import { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import info from "../assets/images/info.png";
import dica from "../assets/images/atencao.png";
import chatbot from "../assets/images/chatbot.png";

interface TutorialSection {
  id: string;
  title: string;
  icon: string;
  items: string[];
  tips?: string[];
}

export default function Instrucoes() {
  const [activeSection, setActiveSection] = useState<string>('documentos');

  const tutorialSections: TutorialSection[] = [
    {
      id: 'documentos',
      title: 'Documentos Essenciais',
      icon: '📋',
      items: [
        'Documento de identidade (RG ou CNH)',
        'CPF',
        'Cartão do convênio médico ou SUS',
        'Cartão de vacinação atualizado',
        'Exames anteriores relacionados à consulta',
        'Lista de medicamentos em uso',
        'Receitas médicas anteriores'
      ],
      tips: [
        'Sempre leve originais e cópias dos documentos',
        'Mantenha os documentos organizados em uma pasta',
        'Verifique a validade do cartão do convênio'
      ]
    },
    {
      id: 'medicamentos',
      title: 'Medicamentos e Histórico',
      icon: '💊',
      items: [
        'Lista completa de medicamentos atuais',
        'Dosagens e horários de cada medicamento',
        'Medicamentos que causam alergia',
        'Suplementos e vitaminas em uso',
        'Medicamentos suspensos recentemente',
        'Histórico de cirurgias anteriores',
        'Doenças na família (histórico familiar)'
      ],
      tips: [
        'Anote o nome completo dos medicamentos, não apenas o nome comercial',
        'Leve as caixas dos medicamentos se tiver dúvidas',
        'Informe sobre qualquer reação adversa já experimentada'
      ]
    },
    {
      id: 'sintomas',
      title: 'Sintomas e Queixas',
      icon: '🩺',
      items: [
        'Lista dos sintomas que está sentindo',
        'Quando os sintomas começaram',
        'O que melhora ou piora os sintomas',
        'Intensidade da dor (escala de 1 a 10)',
        'Frequência dos sintomas',
        'Sintomas que já teve no passado',
        'Perguntas que quer fazer ao médico'
      ],
      tips: [
        'Anote os sintomas alguns dias antes da consulta',
        'Seja específico sobre quando e como os sintomas aparecem',
        'Não tenha vergonha de relatar qualquer sintoma'
      ]
    },
    {
      id: 'preparacao',
      title: 'Preparação para a Consulta',
      icon: '⏰',
      items: [
        'Chegue com 15-30 minutos de antecedência',
        'Vista roupas confortáveis e fáceis de tirar',
        'Tome banho e use roupas limpas',
        'Evite perfumes fortes',
        'Leve um acompanhante se necessário',
        'Tenha o telefone do consultório anotado',
        'Confirme o endereço e como chegar'
      ],
      tips: [
        'Se for exame de sangue, verifique se precisa estar em jejum',
        'Para exames de urina, siga as instruções de coleta',
        'Leve água e um lanche leve se a consulta for demorada'
      ]
    }
  ];

  const importantReminders = [
    {
      title: 'Não esqueça de perguntar',
      items: [
        'Qual é o diagnóstico?',
        'Preciso de algum exame?',
        'Como tomar os medicamentos prescritos?',
        'Quando devo retornar?',
        'Posso continuar com minhas atividades normais?',
        'Há alguma restrição alimentar?'
      ]
    },
    {
      title: 'Após a consulta',
      items: [
        'Guarde bem as receitas e pedidos de exame',
        'Anote as orientações do médico',
        'Marque o retorno se necessário',
        'Tire dúvidas antes de sair do consultório',
        'Siga corretamente as prescrições médicas'
      ]
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Cabeçalho */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Instruções para Consultas Médicas</h1>
        <p className="text-gray-600">Guia completo para se preparar adequadamente para suas consultas</p>
      </div>

      {/* Botão voltar */}
      <BackButton />

      {/* Navegação por abas */}
      <div className="bg-white rounded-lg shadow-sm p-1">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {tutorialSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeSection === section.id
                  ? 'bg-[#23C8AA] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="text-lg mb-1">{section.icon}</div>
              <div className="text-xs">{section.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo da seção ativa */}
      {tutorialSections.map((section) => (
        activeSection === section.id && (
          <div key={section.id} className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-3">{section.icon}</span>
              {section.title}
            </h2>
            
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Lista de verificação:</h3>
              <div className="space-y-2">
                {section.items.map((item, index) => (
                  <label key={index} className="flex items-start space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </label>
                ))}
              </div>
              
              {section.tips && (
                <div className="mt-6 bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                    <img className="w-5 h-5 mr-2" src={info} alt="icone informação" />
                    Dicas Importantes
                  </h4>
                  <ul className="space-y-1">
                    {section.tips.map((tip, index) => (
                      <li key={index} className="text-blue-700 text-sm">• {tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )
      ))}

      {/* Lembretes importantes */}
      <div className="space-y-4">
        {importantReminders.map((reminder, index) => (
          <div key={index} className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
            <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
              <img className="w-5 h-5 mr-2" src={dica} alt="icone aviso " />
              {reminder.title}
            </h3>
            <ul className="space-y-2">
              {reminder.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-yellow-700 text-sm flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Botão de ação */}
      <div className="bg-teal-50 rounded-lg p-4 text-center">
        <h3 className="font-semibold text-teal-800 mb-2">Pronto para sua consulta?</h3>
        <p className="text-teal-700 mb-4 text-sm">
          Use este tutorial como um guia e marque os itens conforme for se preparando.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            to="/" 
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200"
          >
            Voltar ao início
          </Link>
          <button 
            onClick={() => window.print()}
            className="border border-teal-600 text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-teal-50 transition-colors duration-200"
          >
            Imprimir tutorial
          </button>
        </div>
      </div>

      {/* Recursos de acessibilidade */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
          <img className="w-4 h-4 mr-2" src={chatbot} alt="icone chatbot " />
          Dica de Acessibilidade
        </h2>
        <p className="text-blue-700 text-sm">
          Use as abas acima para navegar entre as diferentes seções do tutorial. 
          Você pode marcar os itens da lista de verificação para acompanhar sua preparação.
        </p>
      </div>
    </div>
  );
}
