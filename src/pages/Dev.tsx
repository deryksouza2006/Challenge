import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import dev1Image from '../assets/images/dev1.jpeg';
import dev2Image from '../assets/images/dev2.jpeg';
import dev3Image from '../assets/images/dev3.jpeg';
import chatbot from "../assets/images/chatbot.png";

interface Developer {
  id: number;
  name: string;
  role: string;
  description: string;
  skills: string[];
  image: string;
  github?: string;
  linkedin?: string;
  email?: string;
}

export default function Dev() {
  const developers: Developer[] = [
    {
      id: 1,
      name: "Deryk de Souza Queiroz",
      role: "Front-End Developer",
      description: "RM: 563412 - 1TDSPX",
      skills: ["React", "TypeScript", "TailwindCSS", "Acessibilidade Web"],
      image: dev1Image,
      github: "https://github.com/deryksouza2006",
      linkedin: "https://www.linkedin.com/in/deryksouza/",
    },
    {
      id: 2,
      name: "Vinicius Paschoeto da Silva",
      role: "Data Base Administrator",
      description: "RM: 563089 - 1TDSPX",
      skills: ["SQL", "ORACLE", "Mongodb", "Chatbot"],
      image: dev2Image,
      github: "https://github.com/pasva01",
      linkedin: "https://www.linkedin.com/in/vin%C3%ADcius-paschoeto-785009349/",
    },
    {
      id: 3,
      name: "Lucas Gonçalves Viana",
      role: "Back-End Developer",
      description: "RM: 563254 - 1TDSPX",
      skills: ["Java", "Python", "Panda"],
      image: dev3Image,
      linkedin: "https://www.linkedin.com/in/lucas-viana-262068367/",
      github: "https://github.com/LucasViana130"
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Cabeçalho */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Nossa Equipe</h1>
        <p className="text-gray-600">Conheça os profissionais dedicados a tornar a tecnologia mais acessível</p>
      </div>

      {/* Botão voltar */}
      <BackButton />

      {/* Sobre o projeto */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Sobre o VisuAll</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          O VisuAll nasceu da necessidade de criar uma solução tecnológica verdadeiramente inclusiva, 
          especialmente voltada para idosos e pessoas com necessidades especiais. Nossa missão é 
          democratizar o acesso à informação e facilitar a gestão de compromissos médicos através 
          de uma interface intuitiva e acessível.
        </p>
        <div className="bg-teal-50 rounded-lg p-3">
          <h3 className="font-semibold text-teal-800 mb-2">Tecnologias Utilizadas</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">React</span>
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">TypeScript</span>
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">Vite</span>
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">TailwindCSS</span>
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">React Router</span>
          </div>
        </div>
      </div>

      {/* Cards dos desenvolvedores */}
      <div className="space-y-4">
        {developers.map((dev) => (
          <Link to={`/dev/${dev.id}`} key={dev.id} className="block bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img 
                  src={dev.image} 
                  alt={`Foto de ${dev.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{dev.name}</h3>
                <p className="text-teal-600 font-medium mb-2">{dev.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{dev.description}</p>
                
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Especialidades:</h4>
                  <div className="flex flex-wrap gap-1">
                    {dev.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 text-sm">
                  {dev.linkedin && (
                    <a 
                      href={dev.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-teal-600 hover:text-teal-700"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  )}
                  
                  {dev.github && (
                    <a 
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-teal-600 hover:text-teal-700"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>


      {/* Call to action */}
      <div className="bg-teal-50 rounded-lg p-4 text-center">
        <h2 className="text-lg font-semibold text-teal-800 mb-2">Gostou do nosso trabalho?</h2>
        <p className="text-teal-700 mb-4">
          Estamos sempre buscando melhorar a acessibilidade e inclusão digital. 
          Sua opinião é muito importante para nós!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            to="/contato" 
            className="bg-[#23C8AA] text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200">
            Entre em contato
          </Link>
          <Link 
            to="/faq" 
            className="border border-[#23C8AA] text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-teal-50 transition-colors duration-200">
            Veja o FAQ
          </Link>
        </div>
      </div>

      {/* Recursos de acessibilidade */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
          <img className="w-5 h-5 mr-2" src={chatbot} alt="" />
          Compromisso com a Acessibilidade
        </h2>
        <p className="text-blue-700 text-sm">
          Nossa equipe segue as diretrizes WCAG 2.1 e testa regularmente com tecnologias assistivas 
          para garantir que o VisuAll seja verdadeiramente acessível a todos.
        </p>
      </div>
    </div>
  );
}
