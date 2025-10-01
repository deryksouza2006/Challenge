import React from 'react';
import { useParams, Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

// Dados dos desenvolvedores (copiados de Dev.tsx para simular um "banco de dados")
const developersData = [
  {
    id: '1',
    name: 'Deryk de Souza Queiroz',
    role: 'Front-End Developer',
    description: 'RM: 563412 - 1TDSPX',
    skills: ['React', 'TypeScript', 'TailwindCSS', 'Acessibilidade Web'],
    image: '/src/assets/images/dev1.jpeg',
    github: 'https://github.com/deryksouza2006',
    linkedin: 'https://www.linkedin.com/in/deryksouza/',
  },
  {
    id: '2',
    name: 'Vinicius Paschoeto da Silva',
    role: 'Data Base Administrator',
    description: 'RM: 563089 - 1TDSPX',
    skills: ['SQL', 'ORACLE', 'Mongodb', 'Chatbot'],
    image: '/src/assets/images/dev2.jpeg',
    github: 'https://github.com/pasva01',
    linkedin: 'https://www.linkedin.com/in/vin%C3%ADcius-paschoeto-785009349/',
  },
  {
    id: '3',
    name: 'Lucas Gonçalves Viana',
    role: 'Back-End Developer',
    description: 'RM: 563254 - 1TDSPX',
    skills: ['Java', 'Python', 'Panda'],
    image: '/src/assets/images/dev3.jpeg',
    linkedin: 'https://www.linkedin.com/in/lucas-viana-262068367/',
    github: 'https://github.com/LucasViana130',
  },
];

export default function DeveloperDetail() {
  const { id } = useParams<{ id: string }>();
  const developer = developersData.find(dev => dev.id === id);

  if (!developer) {
    return (
      <div className="p-4 text-center text-red-500">
        <h1 className="text-2xl font-bold">Desenvolvedor não encontrado</h1>
        <p className="mt-2">O ID do desenvolvedor fornecido não corresponde a nenhum registro.</p>
        <Link to="/dev" className="mt-4 inline-block bg-[#23C8AA] text-white px-4 py-2 rounded-lg hover:bg-teal-700">Voltar para Desenvolvedores</Link>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <BackButton />
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <img 
          src={developer.image} 
          alt={`Foto de ${developer.name}`}
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-teal-200"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{developer.name}</h1>
        <p className="text-xl text-teal-600 font-medium mb-4">{developer.role}</p>
        <p className="text-gray-700 leading-relaxed mb-4">{developer.description}</p>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Habilidades:</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {developer.skills.map((skill, index) => (
              <span 
                key={index}
                className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-lg">
          {developer.linkedin && (
            <a 
              href={developer.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
          )}
          
          {developer.github && (
            <a 
              href={developer.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

