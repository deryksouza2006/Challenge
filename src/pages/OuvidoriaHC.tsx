import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import BackButton from '../components/BackButton';
import pessoa from "../assets/images/pessoa.png";
import ligar from "../assets/images/telefone.png";
import mail from "../assets/images/mail.png";
import info from "../assets/images/info.png";
import chatbot from "../assets/images/chatbot.png";

// validação para o campo de pesquisa
const searchSchema = z.object({
  searchTerm: z.string()
    .max(100, 'Termo de pesquisa deve ter no máximo 100 caracteres')
    .optional()
});

type SearchFormData = z.infer<typeof searchSchema>;

interface Unidade {
  id: string;
  nome: string;
  sigla: string;
  telefone: string;
  ouvidor: string;
  ouvidorSuplente?: string;
  email: string;
}

export default function OuvidoriaHC() {
  const [selectedUnidade, setSelectedUnidade] = useState<string | null>(null);

  const {
    register,
    watch,
    formState: { errors }
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchTerm: ''
    }
  });

  const searchTerm = watch('searchTerm') || '';

  const unidades: Unidade[] = [
    {
      id: 'ichc',
      nome: 'Instituto Central e PAMB',
      sigla: 'ICHC',
      telefone: '(11) 2661-7176',
      ouvidor: 'Maria Madalena do Nascimento Pereira',
      email: 'ouvidoria.ichc@hc.fm.usp.br'
    },
    {
      id: 'icr',
      nome: 'Instituto da Criança',
      sigla: 'ICr',
      telefone: '(11) 2661-8701',
      ouvidor: 'Lucimara Silva',
      ouvidorSuplente: 'Luciene Tavares Cezário Ramos',
      email: 'ouvidoria.icr@hc.fm.usp.br'
    },
    {
      id: 'inrad',
      nome: 'Instituto de Radiologia',
      sigla: 'InRad',
      telefone: '(11) 2661-7556',
      ouvidor: 'Fernanda Gomes dos Santos',
      email: 'ouvidoria.inrad@hc.fm.usp.br'
    },
    {
      id: 'incor',
      nome: 'Instituto do Coração',
      sigla: 'InCor',
      telefone: '(11) 2661-5369',
      ouvidor: 'Dra. Claudia Regina Haponczuk de Lemos',
      email: 'ouvidoria@incor.usp.br'
    },
    {
      id: 'ipq',
      nome: 'Instituto de Psiquiatria',
      sigla: 'IPQ',
      telefone: '(11) 2661-6707',
      ouvidor: 'Vinicius Alves Ribeiro',
      ouvidorSuplente: 'Roselene Rodrigues Marques da Silva',
      email: 'ouvidoria.ipq@hc.fm.usp.br'
    },
    {
      id: 'iot',
      nome: 'Instituto de Ortopedia e Traumatologia',
      sigla: 'IOT',
      telefone: '(11) 2661-6951',
      ouvidor: 'Rosemeire Silveira',
      ouvidorSuplente: 'Marcia Aparecida Rosa',
      email: 'ouvidoria.iot@hc.fm.usp.br'
    },
    {
      id: 'imrea-vm',
      nome: 'Instituto de Reabilitação - Vila Mariana',
      sigla: 'IMREA Vila Mariana',
      telefone: '(11) 5180-7831',
      ouvidor: 'Gracinda Rodrigues Tsukimoto',
      ouvidorSuplente: 'Rodrigo Agustini Sanches',
      email: 'ouvidoria.vlmariana.imrea@hc.fm.usp.br'
    },
    {
      id: 'imrea-um',
      nome: 'Instituto de Reabilitação - Umarizal',
      sigla: 'IMREA Umarizal',
      telefone: '(11) 5841-7414',
      ouvidor: 'Antonia Lourivania Pires Sandri',
      ouvidorSuplente: 'Lilian dos Santos da Silva Munhos',
      email: 'ouvidoria.umarizal.imrea@hc.fm.usp.br'
    },
    {
      id: 'imrea-lapa',
      nome: 'Instituto de Reabilitação - Lapa',
      sigla: 'IMREA Lapa',
      telefone: '(11) 3803-4600 / 3873-6760',
      ouvidor: 'Landa Aparecida Santos Santiago',
      ouvidorSuplente: 'Grazieli Nascimento Fagundes',
      email: 'ouvidoria.lapa.imrea@hc.fm.usp.br'
    },
    {
      id: 'imrea-cli',
      nome: 'Instituto de Reabilitação - Clínicas',
      sigla: 'IMREA Clínicas',
      telefone: '(11) 2661-7557',
      ouvidor: 'Téssia da Costa Figueiredo',
      ouvidorSuplente: 'Ana Paula Carvalho Flor',
      email: 'imrea.ouvidoria.cli@hc.fm.usp.br'
    },
    {
      id: 'lim',
      nome: 'Laboratórios de Investigação Médica',
      sigla: 'LIM',
      telefone: '(11) 3061-7271 / 3061-7329',
      ouvidor: 'Não especificado',
      email: 'ouvidoria.lims@hc.fm.usp.br'
    },
    {
      id: 'icesp',
      nome: 'Instituto do Câncer do Estado de São Paulo',
      sigla: 'ICESP',
      telefone: '(11) 3893-2048 / 3893-2054',
      ouvidor: 'Monica Torihara Kinshoku',
      ouvidorSuplente: 'Ana Cristina de Araujo Dias',
      email: 'ouvidoria.icesp@hc.fm.usp.br'
    },
    {
      id: 'iper',
      nome: 'Instituto Perdizes',
      sigla: 'IPER',
      telefone: '(11) 3803-2849',
      ouvidor: 'Rogério da Silva Trigueiro',
      ouvidorSuplente: 'Roberto Sena Constantino',
      email: 'ouvidoria.iper@hc.fm.usp.br'
    }
  ];

  const filteredUnidades = unidades.filter(unidade =>
    unidade.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unidade.sigla.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCall = (telefone: string) => {
    window.location.href = `tel:${telefone.replace(/[^\d]/g, '')}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="p-4 space-y-6">
      {/* Cabeçalho */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Ouvidoria HC</h1>
        <p className="text-gray-600">Contatos das unidades de atendimento do Hospital das Clínicas</p>
      </div>

      {/* Botão voltar */}
      <BackButton />

      {/* Barra de pesquisa */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Pesquisar por nome ou sigla da unidade..."
            {...register('searchTerm')}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
              errors.searchTerm ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>
        {errors.searchTerm && (
          <p className="text-red-500 text-sm mt-1">{errors.searchTerm.message}</p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          {filteredUnidades.length} unidade{filteredUnidades.length !== 1 ? 's' : ''} encontrada{filteredUnidades.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Lista de unidades */}
      <div className="space-y-4">
        {filteredUnidades.map((unidade) => (
          <div key={unidade.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header da unidade */}
            <button
              onClick={() => setSelectedUnidade(selectedUnidade === unidade.id ? null : unidade.id)}
              className="w-full p-4 text-left hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{unidade.nome}</h3>
                  <p className="text-sm text-teal-600 font-medium">{unidade.sigla}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{unidade.telefone}</p>
                    <p className="text-xs text-gray-500">Toque para expandir</p>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                      selectedUnidade === unidade.id ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Detalhes expandidos */}
            {selectedUnidade === unidade.id && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="space-y-4">
                  {/* Informações do ouvidor */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                      <img className="w-4 h-4 mr-2" src={pessoa} alt="icone pessoa " />
                      Responsáveis
                    </h4>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Ouvidor(a):</span> {unidade.ouvidor}
                      </p>
                      {unidade.ouvidorSuplente && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Suplente:</span> {unidade.ouvidorSuplente}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Botões de contato */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleCall(unidade.telefone)}
                      className="flex-1 bg-[#23C8AA] text-white px-4 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <img className="w-5 h-5" src={ligar} alt="icone telefone" />
                      <span>Ligar</span>
                    </button>
                    
                    <button
                      onClick={() => handleEmail(unidade.email)}
                      className="flex-1 border border-[#23C8AA] text-teal-600 px-4 py-3 rounded-lg font-medium hover:bg-teal-50 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <img className="w-5 h-5" src={mail} alt="icone email " />
                      <span>E-mail</span>
                    </button>
                  </div>

                  {/* Email para cópia */}
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">E-mail para contato:</p>
                    <p className="text-sm text-gray-700 font-mono break-all">{unidade.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Informações adicionais */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
          <img className="w-4 h-4 mr-2" src={info} alt="icone informação " />
          Informações Importantes
        </h2>
        <div className="text-blue-700 text-sm space-y-2">
          <p>• A Ouvidoria é um canal de comunicação entre você e o Hospital das Clínicas</p>
          <p>• Você pode registrar elogios, sugestões, reclamações e solicitações</p>
          <p>• O atendimento é gratuito e sigiloso</p>
          <p>• Horário de funcionamento: Segunda a sexta, das 7h às 17h</p>
        </div>
      </div>

      {/* Recursos de acessibilidade */}
      <div className="bg-green-50 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
          <img className="w-5 h-5 mr-2" src={chatbot} alt="icone chatbot" />
          Dica de Acessibilidade
        </h2>
        <p className="text-green-700 text-sm">
          Use a barra de pesquisa para encontrar rapidamente a unidade desejada. 
          Os botões "Ligar" e "E-mail" abrem automaticamente os aplicativos correspondentes no seu dispositivo.
        </p>
      </div>
    </div>
  );
}
