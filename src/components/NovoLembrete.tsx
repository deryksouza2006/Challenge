// components/NovoLembrete.tsx - VERSÃO CORRIGIDA

import React, { useState } from 'react';
import { useLembretes } from '../hooks/useLembretes';

interface FormData {
  nomeMedico: string;
  especialidade: string;
  dataConsulta: string;
  horaConsulta: string;
  localConsulta: string;
  observacoes: string;
}

export const NovoLembrete: React.FC = () => {
  const { adicionarLembrete, loading } = useLembretes();
  const [formData, setFormData] = useState<FormData>({
    nomeMedico: '',
    especialidade: '',
    dataConsulta: '',
    horaConsulta: '',
    localConsulta: '',
    observacoes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Dados do formulário:', formData);
      await adicionarLembrete(formData);
      
      // Limpa o formulário
      setFormData({
        nomeMedico: '',
        especialidade: '',
        dataConsulta: '',
        horaConsulta: '',
        localConsulta: '',
        observacoes: ''
      });
      
      alert('Lembrete criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar lembrete:', error);
      alert('Erro ao criar lembrete: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 max-w-md">
      <h2 className="text-xl font-bold mb-4">Novo Lembrete</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome do Médico *</label>
          <input
            type="text"
            name="nomeMedico"
            value={formData.nomeMedico}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Dr. João Silva"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Especialidade *</label>
          <input
            type="text"
            name="especialidade"
            value={formData.especialidade}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Cardiologia"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Data *</label>
            <input
              type="date"
              name="dataConsulta"
              value={formData.dataConsulta}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hora *</label>
            <input
              type="time"
              name="horaConsulta"
              value={formData.horaConsulta}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Local *</label>
          <input
            type="text"
            name="localConsulta"
            value={formData.localConsulta}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Hospital das Clínicas"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Observações</label>
          <textarea
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Observações adicionais..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 px-4 rounded transition-colors"
        >
          {loading ? 'Criando...' : 'Criar Lembrete'}
        </button>
      </form>
    </div>
  );
};
