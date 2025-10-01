import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import lampada from "../assets/images/ideia.png";


export default function Tutorial() {
  return (
    <div className="p-4 space-y-6">
      {/* Cabeçalho */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Tutorial do VisuAll</h1>
        <p className="text-gray-600">Aprenda como usar nosso sistema de forma simples e prática</p>
      </div>

      {/* Botão voltar */}
      <BackButton />

      {/* Container do vídeo centralizado */}
      <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-4 md:p-8">
        {/* Título do vídeo */}
        <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Como usar o VisuAll - Tutorial Completo
        </h3>
        
        {/* Container responsivo para o vídeo do YouTube */}
        <div className="w-full max-w-4xl">
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/Y1Jl9EWHx7w"
              title="Tutorial do VisuAll - Como usar o aplicativo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          
          {/* Descrição do vídeo */}
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm md:text-base">
              Assista ao tutorial completo para aprender como usar todas as funcionalidades do VisuAll
            </p>
          </div>
        </div>
      </div>

      {/* Informações adicionais */}
      <div className="bg-teal-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-teal-800 mb-3 flex items-center">
          <img className="w-6 h-6" src={lampada} alt="icone lampada" />
          O que você aprenderá
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium text-teal-700">Funcionalidades básicas:</h3>
            <ul className="text-teal-600 text-sm space-y-1">
              <li>• Como navegar pelo aplicativo</li>
              <li>• Como adicionar um novo lembrete</li>
              <li>• Como ouvir seus lembretes</li>
              <li>• Como compartilhar informações</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-teal-700">Dicas importantes:</h3>
            <ul className="text-teal-600 text-sm space-y-1">
              <li>• Como encontrar contatos das unidades</li>
              <li>• Como acessar instruções para consultas</li>
              <li>• Como entrar em contato com suporte</li>
              <li>• Como usar as funcionalidades principais</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link 
          to="/" 
          className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 text-center"
        >
          Voltar ao início
        </Link>
        
        <Link 
          to="/instrucoes" 
          className="border border-teal-600 text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-teal-50 transition-colors duration-200 text-center"
        >
          Ver instruções para consultas
        </Link>
      </div>


    </div>
   );
}
