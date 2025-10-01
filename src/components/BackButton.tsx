import { Link } from 'react-router-dom';
import voltar from "../assets/images/voltar.png";

interface BackButtonProps {
  to?: string;
  text?: string;
  className?: string;
}

export default function BackButton({ 
  to = "/", 
  text = "Voltar ao início", 
  className = "" 
}: BackButtonProps) {
  return (
    <Link 
      to={to}
      className={`inline-flex items-center space-x-2 text-[#23C8AA]  font-medium transition-colors duration-200 ${className}`}
    >
      <img className="w-5 h-5" src={voltar} alt="ícone voltar" />
      <span>{text}</span>
    </Link>
  );
}
