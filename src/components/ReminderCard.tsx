import doutor from "../assets/images/perfil.png";
import lixeira from "../assets/images/lixeira.png";
import calendario from "../assets/images/calendario.png";
import localizacao from "../assets/images/localizacao.png";
import relogio from "../assets/images/relogio.png";
import audio from "../assets/images/audio.png";
import compartilhar from "../assets/images/compartilhar.png";
import switchoff from "../assets/images/switchoff.png"
import pen from "../assets/images/pen.png"

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
}

interface ReminderCardProps {
  lembrete: Lembrete;
  onEdit: (lembrete: Lembrete) => void;
  onDelete: (id: number) => void;
  onToggleConcluido: (id: number) => void;
  onListen: (lembrete: Lembrete) => void;
  onShare: (lembrete: Lembrete) => void;
}

export default function ReminderCard({
  lembrete,
  onEdit,
  onDelete,
  onToggleConcluido,
  onListen,
  onShare,
}: ReminderCardProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-[#23C8AA] ">
      {/* Cabeçalho com Título e Botões de Ação */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold text-gray-800">{lembrete.titulo}</h3>
        
        {/* Botões no Canto Superior Direito */}
        <div className="flex items-center gap-2 ml-4">
          {!lembrete.concluido && (
            <>
              <button
                onClick={() => onToggleConcluido(lembrete.id)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-200 text-gray-800 hover:text-white rounded-full hover:bg-green-500 transition-colors font-medium"
              >
                <img className="w-6 h-6" src={switchoff} alt="não concluido" />
                Concluir
              </button>

              <button
                onClick={() => onEdit(lembrete)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-200 text-gray-800 hover:text-white rounded-full hover:bg-blue-600 transition-colors font-medium"
              >
              <img className="w-6 h-6" src={pen} alt="editar" />
              Editar
              </button>
            </>
          )}

          <button
            onClick={() => onDelete(lembrete.id)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-200 text-gray-800 hover:text-white rounded-full hover:bg-black transition-colors font-medium"
            title="Excluir lembrete"
          >
            <img className="w-6 h-6" src={lixeira} alt="icone lixeira" />
            Excluir
          </button>
        </div>
      </div>

      {/* Avatar e Informações Principais */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
          <img src={doutor} alt="icone pessoa"  />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800">{lembrete.nomeMedico}</h4>
          <p className="text-sm text-gray-600">{lembrete.especialidade}</p>
        </div>
      </div>

      {/* Informações de Data, Hora e Local */}
      <div className="space-y-2 ml-0">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img className="w-4 h-4" src={calendario} alt="icone calendario" />
          <span>{formatDate(lembrete.data)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img className="w-4 h-4" src={localizacao} alt="icone localização" />
          <span className="truncate">{lembrete.local}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img className="w-4 h-4" src={relogio} alt="icone relógio" />
          <span>{lembrete.hora}</span>
        </div>
      </div>

      {/* Observações */}
      {lembrete.observacoes && (
        <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-700">
          <strong>Obs:</strong> {lembrete.observacoes}
        </div>
      )}

      {/* Botões de Ação (Ouvir e Compartilhar) - Apenas para lembretes não concluídos */}
      {!lembrete.concluido && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onListen(lembrete)}
            className="px-4 py-2 text-sm bg-[#23C8AA] text-white rounded-full hover:bg-teal-700 transition-colors font-medium flex items-center gap-2"
          >
            <img className="w-4 h-4" src={audio} alt="icone audio" />
            <span>Ouvir Lembrete</span>
          </button>

          <button
            onClick={() => onShare(lembrete)}
            className="px-4 py-2 text-sm border border-[#23C8AA] text-[#23C8AA] rounded-full hover:bg-teal-50 transition-colors font-medium flex items-center gap-2"
          >
            <img className="w-4 h-4" src={compartilhar} alt="icone compartilhar" />
            <span>Compartilhar</span>
          </button>
        </div>
      )}
    </div>
  );
}
