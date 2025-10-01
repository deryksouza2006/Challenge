import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import telefone24 from "../assets/images/telefone24.png";
import instrucao from "../assets/images/instrucao.png";
import tutorial from "../assets/images/tutorial.png";
import doutor from "../assets/images/perfil.png";
import lixeira from "../assets/images/lixeira.png";
import calendario from "../assets/images/calendario.png";
import localizacao from "../assets/images/localizacao.png";
import relogio from "../assets/images/relogio.png";
import audio from "../assets/images/audio.png";
import compartilhar from "../assets/images/compartilhar.png";
import informacao from "../assets/images/informacao.png";
import contato from "../assets/images/fale.png";
import faq from "../assets/images/interrogacao.png";
import dev from "../assets/images/dev.png";

// validação com Zod
const lembreteSchema = z.object({
  nomeMedico: z.string()
    .min(1, 'Nome do médico é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  especialidade: z.string()
    .min(1, 'Especialidade é obrigatória'),
  data: z.string()
    .min(1, 'Data é obrigatória')
    .refine((date) => {
      const dataConsulta = new Date(date);
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      return dataConsulta >= hoje;
    }, {
      message: 'A data não pode ser anterior a hoje'
    }),
  hora: z.string()
    .min(1, 'Hora é obrigatória'),
  local: z.string()
    .min(1, 'Local é obrigatório')
    .min(5, 'Local deve ter pelo menos 5 caracteres')
    .max(200, 'Local deve ter no máximo 200 caracteres'),
  observacoes: z.string()
    .max(500, 'Observações devem ter no máximo 500 caracteres')
    .optional()
});

type LembreteData = z.infer<typeof lembreteSchema>;

export default function Home() {
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [lembreteAtual, setLembreteAtual] = useState<LembreteData | null>({
    nomeMedico: 'Dr. João Silva',
    especialidade: 'Cardiologista',
    data: '2025-09-12',
    hora: '15:00',
    local: 'Hospital das Clínicas - Bloco B Sala 305',
    observacoes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LembreteData>({
    resolver: zodResolver(lembreteSchema)
  });

  const onSubmit = async (data: LembreteData) => {
    setIsSubmitting(true);
    
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Atualizar o lembrete atual com os dados do formulário
    setLembreteAtual(data);
    
    // Resetar formulário
    reset();
    
    setIsSubmitting(false);
    setShowAddReminder(false);
  };

  const handleListenReminder = () => {
    if (lembreteAtual) {
      const message = `Lembrete de consulta com ${lembreteAtual.nomeMedico}, ${lembreteAtual.especialidade}, no dia ${formatDate(lembreteAtual.data)}, às ${formatTime(lembreteAtual.hora)}, no local ${lembreteAtual.local}. ${lembreteAtual.observacoes ? `Observações: ${lembreteAtual.observacoes}` : ''}`;
      const speech = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(speech);
    } else {
      alert("Nenhum lembrete para ouvir.");
    }
  };

  const handleShareReminder = async () => {
    if (lembreteAtual) {
      const shareText = `Lembrete de consulta com ${lembreteAtual.nomeMedico}, ${lembreteAtual.especialidade}, no dia ${formatDate(lembreteAtual.data)}, às ${formatTime(lembreteAtual.hora)}, no local ${lembreteAtual.local}. ${lembreteAtual.observacoes ? `Observações: ${lembreteAtual.observacoes}` : ''}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Lembrete VisuAll',
            text: shareText,
          });
          alert('Lembrete compartilhado com sucesso!');
        } catch (error) {
          console.error('Erro ao compartilhar:', error);
          alert('Não foi possível compartilhar o lembrete.');
        }
      } else {
        // Fallback para copiar para a área de transferência
        navigator.clipboard.writeText(shareText)
          .then(() => {
            alert('Lembrete copiado para a área de transferência!');
          })
          .catch(err => {
            console.error('Erro ao copiar:', err);
            alert('Não foi possível copiar o lembrete.');
          });
      }
    } else {
      alert("Nenhum lembrete para compartilhar.");
    }
  };

  const handleDeleteReminder = () => {
    if (window.confirm('Tem certeza que deseja excluir este lembrete?')) {
      setLembreteAtual(null);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatTime = (timeString: string): string => {
    return timeString;
  };

  return (
    <div className="p-4 space-y-6">
      {/* Cards principais */}
      <div className="grid grid-cols-3 gap-4">
        {/* Ouvidoria HC */}
        <Link to="/ouvidoria-hc" className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow duration-200">
          <div className="w-12 h-12 mx-auto mb-2 text-teal-600">
            <img src={telefone24} alt="icone telefone" />
          </div>
          <h3 className="text-sm font-medium text-gray-800">Ouvidoria HC</h3>
        </Link>

        {/* Instruções */}
        <Link to="/instrucoes" className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow duration-200">
          <div className="w-12 h-12 mx-auto mb-2 text-teal-600">
            <img src={instrucao} alt="icone instrução" />
          </div>
          <h3 className="text-sm font-medium text-gray-800">Instruções</h3>
        </Link>

        {/* Tutorial */}
        <Link to="/tutorial" className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow duration-200">
          <div className="w-12 h-12 mx-auto mb-2 text-teal-600">
            <img src={tutorial} alt="icone tutorial" />
          </div>
          <h3 className="text-sm font-medium text-gray-800">Tutorial</h3>
        </Link>
      </div>

      {/* Lembrete atual */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-gray-800">Lembrete atual</h2>
          <button 
            onClick={() => setShowAddReminder(true)}
            className="bg-[#23C8AA] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-teal-700 transition-colors"
          >
            <span>+</span>
            <span>Adicionar Lembrete</span>
          </button>
        </div>
        
        {lembreteAtual ? (
          <div className="p-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 flex items-center justify-center text-white">
                <img src={doutor} alt="icone pessoa" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{lembreteAtual.nomeMedico}</h3>
                <p className="text-sm text-gray-600">{lembreteAtual.especialidade}</p>
              </div>
              <button 
                onClick={handleDeleteReminder}
                className="text-red-500 p-1 w-10 h-10 hover:bg-red-50 rounded-lg transition-colors"
                title="Excluir lembrete"
              >
                <span></span>
                <img src={lixeira} alt="icone lixeira" />
              </button>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <img className="w-4 h-4" src={calendario} alt="icone calendario" />
                <span>{formatDate(lembreteAtual.data)}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <img className="w-4 h-4" src={localizacao} alt="icone localização" />
                <span>{lembreteAtual.local}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <img className="w-4 h-4" src={relogio} alt="icone relógio" />
                <span>{formatTime(lembreteAtual.hora)}</span>
              </div>

              {lembreteAtual.observacoes && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Observações:</strong> {lembreteAtual.observacoes}
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex space-x-2">
              <button 
                onClick={handleListenReminder}
                className="bg-[#23C8AA] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-teal-700 transition-colors"
              >
                <img className="w-4 h-4" src={audio} alt="icone audio" />
                <span>Ouvir Lembrete</span>
              </button>
              
              <button 
                onClick={handleShareReminder}
                className="border border-[#23C8AA] text-[#23C8AA] px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-teal-50 transition-colors"
              >
                <img className="w-4 h-4" src={compartilhar} alt="icone compartilhar" />
                <span>Compartilhar</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 opacity-50">
              <img src={doutor} alt="icone pessoa" />
            </div>
            <p className="text-lg font-medium mb-2">Nenhum lembrete cadastrado</p>
            <p className="text-sm">Clique em "Adicionar Lembrete" para criar seu primeiro lembrete de consulta.</p>
          </div>
        )}
      </div>

      {/* Histórico de Lembretes */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-gray-800">Histórico de Lembretes</h2>
        </div>
        
        <div className="p-4 space-y-3">
          <Link to="/sobreVisuall" className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded transition-colors">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <img className="w-4 h-4" src={informacao} alt="icone informacao" />
            </div>
            <span className="text-gray-700">Sobre o VisuAll</span>
          </Link>
          
          <Link to="/faq" className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded transition-colors">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <img className="w-5 h-5" src={faq} alt="icone faq" />
            </div>
            <span className="text-gray-700">FAQ</span>
          </Link>
          
          <Link to="/contato" className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded transition-colors">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <img className="w-4 h-4" src={contato} alt="icone contato" />
            </div>
            <span className="text-gray-700">Fale conosco</span>
          </Link>
          
          <Link to="/dev" className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded transition-colors">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <img className="w-4 h-4" src={dev} alt="icone dev" />
            </div>
            <span className="text-gray-700">Desenvolvedores</span>
          </Link>
        </div>
      </div>

      {/* Adicionar Lembrete */}
      {showAddReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Adicionando lembrete</h3>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Médico *
                </label>
                <input 
                  type="text" 
                  {...register('nomeMedico')}
                  placeholder="Digite o Nome do Médico"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.nomeMedico ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.nomeMedico && (
                  <p className="text-red-500 text-sm mt-1">{errors.nomeMedico.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Especialidade *
                </label>
                <select 
                  {...register('especialidade')}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.especialidade ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione uma especialidade</option>
                  <option value="Cardiologia">Cardiologia</option>
                  <option value="Neurologia">Neurologia</option>
                  <option value="Oftalmologia">Oftalmologia</option>
                  <option value="Ortopedia">Ortopedia</option>
                  <option value="Pediatria">Pediatria</option>
                  <option value="Psiquiatria">Psiquiatria</option>
                  <option value="Dermatologia">Dermatologia</option>
                  <option value="Ginecologia">Ginecologia</option>
                  <option value="Urologia">Urologia</option>
                  <option value="Endocrinologia">Endocrinologia</option>
                </select>
                {errors.especialidade && (
                  <p className="text-red-500 text-sm mt-1">{errors.especialidade.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data *
                </label>
                <input 
                  type="date" 
                  {...register('data')}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.data ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.data && (
                  <p className="text-red-500 text-sm mt-1">{errors.data.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora *
                </label>
                <input 
                  type="time" 
                  {...register('hora')}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.hora ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.hora && (
                  <p className="text-red-500 text-sm mt-1">{errors.hora.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Local *
                </label>
                <input 
                  type="text" 
                  {...register('local')}
                  placeholder="Ex: Hospital das Clínicas - Bloco A Sala 205"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.local ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.local && (
                  <p className="text-red-500 text-sm mt-1">{errors.local.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea 
                  {...register('observacoes')}
                  rows={3}
                  placeholder="Informações adicionais sobre a consulta (opcional)"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none ${
                    errors.observacoes ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.observacoes && (
                  <p className="text-red-500 text-sm mt-1">{errors.observacoes.message}</p>
                )}
              </div>

              <div className="border-t pt-4 flex space-x-3">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                    isSubmitting 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                      : 'bg-[#23C8AA] text-white hover:bg-teal-700'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Salvando...</span>
                    </span>
                  ) : (
                    'Salvar'
                  )}
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddReminder(false)}
                  disabled={isSubmitting}
                  className="flex-1 border border-[#23C8AA] text-[#23C8AA] py-3 rounded-lg font-medium hover:bg-teal-50 transition-colors disabled:opacity-50"
                >
                  <span>Cancelar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
