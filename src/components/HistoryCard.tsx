import doutor from "../assets/images/perfil.png";
import calendario from "../assets/images/calendario.png";
import localizacao from "../assets/images/localizacao.png";
import relogio from "../assets/images/relogio.png";
import switchon from "../assets/images/switchon.png"

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

interface HistoryCardProps {
  lembrete: Lembrete;
}

export default function HistoryCard({ lembrete }: HistoryCardProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 relative">
      {/* Cabeçalho com Título e Status */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold text-gray-800">{lembrete.titulo}</h3>
        
        {/* Status Concluído */}
        <div className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-full  font-medium">
          <img className="w-6 h-6" src={switchon} alt="concluido" />
          <span className="text-sm font-medium text-gray-800">Concluído</span>
        </div>
      </div>

      {/* Avatar e Informações Principais */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-teal-100 rounded-full">
          <img src={doutor} alt="icone pessoa" className="w-6 h-6" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800">{lembrete.nomeMedico}</h4>
          <p className="text-sm text-gray-600">{lembrete.especialidade}</p>
        </div>
      </div>

      {/* Informações de Data, Hora e Local */}
      <div className="space-y-2">
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
    </div>
  );
}
