import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import BackButton from '../components/BackButton';
import check from "../assets/images/check.png";
import mail from "../assets/images/mail2.png";
import telefone from "../assets/images/telefone2.png";
import relogio from "../assets/images/relogio2.png";
import chatbot from "../assets/images/chatbot.png";

// Schema de validação com Zod
const contatoSchema = z.object({
  nome: z.string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ter um formato válido'),
  telefone: z.string()
    .optional()
    .refine((val) => !val || /^[\(\)\s\-\+\d]+$/.test(val), {
      message: 'Telefone deve conter apenas números, espaços, parênteses e hífens'
    }),
  assunto: z.string()
    .min(1, 'Assunto é obrigatório'),
  mensagem: z.string()
    .min(1, 'Mensagem é obrigatória')
    .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
    .max(1000, 'Mensagem deve ter no máximo 1000 caracteres')
});

type ContatoFormData = z.infer<typeof contatoSchema>;

export default function Contato() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContatoFormData>({
    resolver: zodResolver(contatoSchema)
  });

  const onSubmit = async (_data: ContatoFormData) => {
    setIsSubmitting(true);
    
    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Resetar formulário
    reset();
  };

  if (submitSuccess) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center">
          <div className="w-16 h-16  flex items-center justify-center mx-auto mb-4">
            <img className="w-10 h-10" src={check} alt="icone check" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Mensagem Enviada!</h1>
          <p className="text-gray-600 mb-6">
            Obrigado pelo seu contato. Nossa equipe responderá em até 24 horas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/" 
              className="bg-[#23C8AA] text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200"
            >
              Voltar ao início
            </Link>
            <button 
              onClick={() => setSubmitSuccess(false)}
              className="border border-[#23C8AA] text-[#23C8AA] px-6 py-3 rounded-lg font-medium hover:bg-teal-50 transition-colors duration-200"
            >
              Enviar nova mensagem
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Cabeçalho */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Entre em Contato</h1>
        <p className="text-gray-600">Estamos aqui para ajudá-lo. Envie sua mensagem e responderemos em breve.</p>
      </div>

      {/* Botão voltar */}
      <BackButton />

      {/* Informações de contato */}
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Nossos Canais de Atendimento</h2>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10  flex items-center justify-center">
              <img className="w-10 h-10" src={mail} alt="icone mail" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Email</p>
              <p className="text-gray-600">contato@visuall.com.br</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img className="w-10 h-10" src={telefone} alt="icone telefone" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Telefone</p>
              <p className="text-gray-600">(11) 9999-9999</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img className="w-10 h-10" src={relogio} alt="icone relogio" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Horário de Atendimento</p>
              <p className="text-gray-600">24h - Suporte para acessibilidade</p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário de contato */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Envie sua Mensagem</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo *
            </label>
            <input
              type="text"
              id="nome"
              {...register('nome')}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.nome ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Digite seu nome completo"
            />
            {errors.nome && (
              <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="seu@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <input
              type="tel"
              id="telefone"
              {...register('telefone')}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.telefone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="(11) 99999-9999"
            />
            {errors.telefone && (
              <p className="text-red-500 text-sm mt-1">{errors.telefone.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-1">
              Assunto *
            </label>
            <select
              id="assunto"
              {...register('assunto')}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.assunto ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Selecione um assunto</option>
              <option value="suporte">Suporte Técnico</option>
              <option value="acessibilidade">Questões de Acessibilidade</option>
              <option value="sugestao">Sugestão de Melhoria</option>
              <option value="bug">Relatar Problema</option>
              <option value="outros">Outros</option>
            </select>
            {errors.assunto && (
              <p className="text-red-500 text-sm mt-1">{errors.assunto.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">
              Mensagem *
            </label>
            <textarea
              id="mensagem"
              {...register('mensagem')}
              rows={5}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none ${
                errors.mensagem ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Descreva sua dúvida, sugestão ou problema..."
            />
            {errors.mensagem && (
              <p className="text-red-500 text-sm mt-1">{errors.mensagem.message}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
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
                <span>Enviando...</span>
              </span>
            ) : (
              'Enviar Mensagem'
            )}
          </button>
        </form>
      </div>

      {/* Recursos de acessibilidade */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
          <img className="w-5 h-5 mr-2" src={chatbot} alt="" />
          Dica de Acessibilidade
        </h2>
        <p className="text-blue-700 text-sm">
          Use a tecla Tab para navegar pelos campos do formulário. 
          Todos os campos obrigatórios estão marcados com asterisco (*).
        </p>
      </div>
    </div>
  );
}
