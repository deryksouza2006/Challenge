import React from 'react';
import { useLembretes } from '../hooks/useLembretes';

export const ListaLembretes: React.FC = () => {
  const { 
    lembretesAtivos, 
    lembretes,
    loading, 
    error, 
    excluirLembrete, 
    marcarComoConcluido 
  } = useLembretes();

  if (loading) return <div className="p-4">Carregando lembretes...</div>;
  if (error) return <div className="p-4 text-red-500">Erro: {error}</div>;

  // Função auxiliar para formatar data
  const formatarData = (dataString: string | undefined): string => {
    if (!dataString) return 'Data não definida';
    try {
      return new Date(dataString).toLocaleDateString('pt-BR');
    } catch {
      return 'Data inválida';
    }
  };

  // Função auxiliar para obter hora
  const obterHora = (horaString: string | undefined): string => {
    return horaString || 'Hora não definida';
  };

  return (
    <div className="p-4">
      {/* Lembretes Ativos */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Lembretes Ativos</h2>
        {lembretesAtivos.length === 0 ? (
          <p className="text-gray-500">Nenhum lembrete ativo</p>
        ) : (
          <div className="space-y-4">
            {lembretesAtivos.map(lembrete => (
              <div key={lembrete.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-lg">{lembrete.titulo || `Consulta com ${lembrete.nomeMedico}`}</h3>
                <p className="text-gray-600">Tipo: {lembrete.tipoLembrete || 'CONSULTA'}</p>
                <p className="text-gray-600">
                  Data: {formatarData(lembrete.dataConsulta)} às {obterHora(lembrete.horaConsulta)}
                </p>
                <p className="text-gray-600">Especialista: {lembrete.nomeMedico}</p>
                <p className="text-gray-600">Local: {lembrete.localConsulta}</p>
                {lembrete.observacoes && (
                  <p className="text-gray-600 mt-2">Observações: {lembrete.observacoes}</p>
                )}
                
                <div className="mt-3 space-x-2">
                  <button 
                    onClick={() => marcarComoConcluido(lembrete.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
                  >
                    Marcar como Concluído
                  </button>
                  <button 
                    onClick={() => excluirLembrete(lembrete.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Histórico Completo */}
      <div>
        <h2 className="text-xl font-bold mb-4">Histórico de Lembretes</h2>
        {lembretes.length === 0 ? (
          <p className="text-gray-500">Nenhum lembrete no histórico</p>
        ) : (
          <div className="space-y-3">
            {lembretes.map(lembrete => (
              <div key={lembrete.id} className={`border rounded-lg p-3 ${lembrete.ativo ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{lembrete.titulo || `Consulta com ${lembrete.nomeMedico}`}</h4>
                    <p className="text-sm text-gray-600">
                      {formatarData(lembrete.dataConsulta)} às {obterHora(lembrete.horaConsulta)}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${lembrete.ativo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {lembrete.ativo ? 'Ativo' : 'Concluído'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
