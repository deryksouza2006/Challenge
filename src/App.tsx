import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import FAQ from "./pages/FAQ";
import Devs from "./pages/Dev";
import Contato from "./pages/Contato";
import Tutorial from "./pages/Tutorial";
import Instrucoes from "./pages/Instrucoes";
import OuvidoriaHC from "./pages/OuvidoriaHC";
import SobreVisuAll from "./pages/SobreVisuall";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/dev" element={<Devs />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/instrucoes" element={<Instrucoes />} />
            <Route path="/ouvidoria-hc" element={<OuvidoriaHC />} />
            <Route path="/sobreVisuall" element={<SobreVisuAll/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
