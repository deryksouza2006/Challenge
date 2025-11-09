import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import ReminderCard from '../components/ReminderCard';
import HistoryCard from '../components/HistoryCard';
import telefone24 from "../assets/images/telefone24.png";
import instrucao from "../assets/images/instrucao.png";
import tutorial from "../assets/images/tutorial.png";
import informacao from "../assets/images/informacao.png";
import contato from "../assets/images/fale.png";
import faq from "../assets/images/interrogacao.png";
import dev from "../assets/images/dev.png";

// Interface para Lembrete
interface Lembrete {
  id: number;
  titulo: string;
  nomeMedico: string;
  especialidade: string;
  data: string;
  hora: string;
  local: string;
  observacoes: string;
  concluido: boolean;
  concluidoEm?: number;
}

// Validação com Zod
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
  const { user, isAuthenticated } = useAuth();
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<LembreteData>({
    resolver: zodResolver(lembreteSchema)
  });

  // Carregar lembretes do localStorage baseado no usuário logado
  useEffect(() => {
    if (user) {
      const userLembretes = localStorage.getItem(`lembretes_${user.id}`);
      if (userLembretes) {
        setLembretes(JSON.parse(userLembretes));
      } else {
        // Lembretes mock iniciais apenas para demonstração
        const initialLembretes: Lembrete[] = [
          {
            id: 1,
            titulo: 'Consulta com Dr. João Silva',
            nomeMedico: 'Dr. João Silva',
            especialidade: 'Cardiologista',
            data: '2025-12-15',
            hora: '15:00',
            local: 'Hospital das Clínicas - Bloco B Sala 305',
            observacoes: 'Levar exames anteriores',
            concluido: false,
          },
        ];
        setLembretes(initialLembretes);
        localStorage.setItem(`lembretes_${user.id}`, JSON.stringify(initialLembretes));
      }
    } else {
      setLembretes([]);
    }
  }, [user]);

  // Salvar lembretes no localStorage quando mudarem
  useEffect(() => {
    if (user && lembretes.length > 0) {
      localStorage.setItem(`lembretes_${user.id}`, JSON.stringify(lembretes));
    }
  }, [lembretes, user]);

  // Efeito para remover lembretes do histórico após 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      setLembretes(prevLembretes =>
        prevLembretes.filter(lembrete => {
          if (lembrete.concluido && lembrete.concluidoEm) {
            const tempoDecorrido = Date.now() - lembrete.concluidoEm;
            return tempoDecorrido < 300000;
          }
          return true;
        })
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data: LembreteData) => {
    if (!user) {
      alert('Você precisa estar logado para criar lembretes');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    setLembretes(prevLembretes => {
      if (editingId !== null) {
        return prevLembretes.map(l =>
          l.id === editingId
            ? { 
                ...l, 
                nomeMedico: data.nomeMedico, 
                especialidade: data.especialidade, 
                data: data.data, 
                hora: data.hora, 
                local: data.local, 
                observacoes: data.observacoes || '',
                titulo: `Consulta com ${data.nomeMedico}`
              }
            : l
        );
      } else {
        const novoLembrete: Lembrete = {
          id: Math.max(...prevLembretes.map(l => l.id), 0) + 1,
          titulo: `Consulta com ${data.nomeMedico}`,
          nomeMedico: data.nomeMedico,
          especialidade: data.especialidade,
          data: data.data,
          hora: data.hora,
          local: data.local,
          observacoes: data.observacoes || '',
          concluido: false,
        };
        return [...prevLembretes, novoLembrete];
      }
    });

    reset();
    setIsSubmitting(false);
    setShowAddReminder(false);
    setEditingId(null);
  };

  const handleEditLembrete = (lembrete: Lembrete) => {
    setValue('nomeMedico', lembrete.nomeMedico);
    setValue('especialidade', lembrete.especialidade);
    setValue('data', lembrete.data);
    setValue('hora', lembrete.hora);
    setValue('local', lembrete.local);
    setValue('observacoes', lembrete.observacoes);
    setEditingId(lembrete.id);
    setShowAddReminder(true);
  };

  const handleDeleteLembrete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este lembrete?')) {
      setLembretes(prevLembretes => prevLembretes.filter(l => l.id !== id));
    }
  };

  const handleToggleConcluido = (id: number) => {
    setLembretes(prevLembretes => 
      prevLembretes.map(l =>
        l.id === id 
          ? { 
              ...l, 
              concluido: !l.concluido, 
              concluidoEm: !l.concluido ? Date.now() : undefined 
            } 
          : l
      )
    );
  };

  const handleListenReminder = (lembrete: Lembrete) => {
    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    };

    const message = `Lembrete de consulta com ${lembrete.nomeMedico}, ${lembrete.especialidade}, no dia ${formatDate(lembrete.data)}, às ${lembrete.hora}, no local ${lembrete.local}. ${lembrete.observacoes ? `Observações: ${lembrete.observacoes}` : ''}`;
    const speech = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(speech);
  };

  const handleShareReminder = async (lembrete: Lembrete) => {
    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    };

    const shareText = `Lembrete de consulta com ${lembrete.nomeMedico}, ${lembrete.especialidade}, no dia ${formatDate(lembrete.data)}, às ${lembrete.hora}, no local ${lembrete.local}. ${lembrete.observacoes ? `Observações: ${lembrete.observacoes}` : ''}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Lembrete VisuAll',
          text: shareText,
        });
        alert('Lembrete compartilhado com sucesso!');
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      navigator.clipboard.writeText(shareText)
        .then(() => {
          alert('Lembrete copiado para a área de transferência!');
        })
        .catch(err => {
          console.error('Erro ao copiar:', err);
          alert('Não foi possível copiar o lembrete.');
        });
    }
  };

  const handleCloseForm = () => {
    reset();
    setEditingId(null);
    setShowAddReminder(false);
  };

  const handleAddReminderClick = () => {
    if (!isAuthenticated) {
      alert('Você precisa fazer login para criar lembretes');
      navigate('/login');
      return;
    }
    setShowAddReminder(true);
  };

  // Separar lembretes ativos e histórico
  const lembretesAtivos = lembretes.filter(l => !l.concluido);
  const lembretesHistorico = lembretes.filter(l => l.concluido);

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

      {/* Seção de Lembretes Ativos */}
      <div>
        {/* Cabeçalho com Título e Botão */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Meus Lembretes</h2>
          <button
            onClick={handleAddReminderClick}
            className="bg-[#23C8AA] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-teal-700 transition-colors"
          >
            <span>+</span>
            <span>Novo Lembrete</span>
          </button>
        </div>

        {/* Lista de Lembretes Ativos */}
        <div className="space-y-3">
          {!isAuthenticated ? (
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-500 text-lg mb-4">Faça login para acessar seus lembretes</p>
            </div>
          ) : lembretesAtivos.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-500 text-lg mb-2">Você não tem lembretes cadastrados</p>
              <p className="text-sm text-gray-400">Clique em "Novo Lembrete" para criar seu primeiro lembrete de consulta.</p>
            </div>
          ) : (
            lembretesAtivos.map(lembrete => (
              <ReminderCard
                key={lembrete.id}
                lembrete={{
                  ...lembrete,
                  nomeMedico: lembrete.nomeMedico,
                }}
                onEdit={handleEditLembrete}
                onDelete={handleDeleteLembrete}
                onToggleConcluido={handleToggleConcluido}
                onListen={handleListenReminder}
                onShare={handleShareReminder}
              />
            ))
          )}
        </div>
      </div>

      {/* Seção de Histórico de Lembretes */}
      {isAuthenticated && lembretesHistorico.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Histórico de Lembretes</h2>
          
          <div className="space-y-3">
            {lembretesHistorico.map(lembrete => (
              <HistoryCard
                key={lembrete.id}
                lembrete={{
                  ...lembrete,
                  nomeMedico: lembrete.nomeMedico,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Histórico (Links) */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-gray-800">Histórico</h2>
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

          <button
            onClick={() => navigate("/contato")}
            className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded transition-colors w-full text-left">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <img className="w-4 h-4" src={contato} alt="icone contato" />
            </div>
            <span className="text-gray-700">Fale conosco</span>
          </button>

          <Link to="/dev" className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded transition-colors">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <img className="w-4 h-4" src={dev} alt="icone dev" />
            </div>
            <span className="text-gray-700">Desenvolvedores</span>
          </Link>
        </div>
      </div>

      {/* Modal: Adicionar/Editar Lembrete */}
      {showAddReminder && (
        <div className="fixed inset-0  backdrop-blur-lg flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {editingId ? 'Editar Lembrete' : 'Novo Lembrete'}
              </h3>
              <button
                onClick={handleCloseForm}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
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
                    editingId ? 'Salvar Alterações' : 'Salvar'
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
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