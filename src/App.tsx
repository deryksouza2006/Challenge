import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Devs from "./pages/Dev";
import Contato from "./pages/Contato";
import Tutorial from "./pages/Tutorial";
import Instrucoes from "./pages/Instrucoes";
import OuvidoriaHC from "./pages/OuvidoriaHC";
import SobreVisuAll from "./pages/SobreVisuall";
import DeveloperDetail from "./pages/DeveloperDetail";
import Login from "./pages/auth/Login";
import Cadastro from "./pages/auth/Cadastro";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-1">
            <Routes>
              {/* Rota Principal */}
              <Route path="/" element={<Home />} />
              
              {/* Rotas Públicas */}
              <Route path="/faq" element={<FAQ />} />
              <Route path="/dev" element={<Devs />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/tutorial" element={<Tutorial />} />
              <Route path="/instrucoes" element={<Instrucoes />} />
              <Route path="/ouvidoria-hc" element={<OuvidoriaHC />} />
              <Route path="/sobreVisuAll" element={<SobreVisuAll/>} />
              <Route path="/dev/:id" element={<DeveloperDetail />} />
              
              {/* Rotas de Autenticação */}
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;