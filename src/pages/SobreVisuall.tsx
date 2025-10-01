import BackButton from '../components/BackButton';
import ilustracao from '../assets/images/imagem ilustrativa.jpg'

export default function SobreVisuAll() {
  return (
    <div className="p-4 space-y-6">
      {/* Botão voltar */}
      <BackButton />

      {/* Cabeçalho */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-black mb-4">Sobre o VisuAll</h1>
      </div>

      {/* Conteúdo principal */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        
        {/* Primeiro parágrafo */}
        <div className="text-gray-700 leading-relaxed">
          <p className="text-lg">
            O VisuAll nasceu da necessidade de tornar a saúde mais acessível e inclusiva para a população idosa. 
            Com o aumento do envelhecimento no Brasil, percebemos que muitos pacientes enfrentam dificuldades para 
            lembrar datas de consultas, utilizar aplicativos complexos ou até mesmo chegar ao local correto no hospital. 
            Essas barreiras resultam em absenteísmo, impacto no tratamento e desperdício de recursos do sistema de saúde.
          </p>
        </div>

        {/* Seção com imagem e texto */}
        <div className="grid md:grid-cols-2 gap-1 items-center">
          {/* Imagem ilustrativa */}
          <div className="order-1 md:order-1">
            <img className="w-80 h-auto rounded-lg shadow-md" src={ilustracao} alt="imagem de acompanhante ajudando idoso" />
          </div>
          
          {/* Texto da solução */}
          <div className="order-1 md:order-2 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Nossa solução é um assistente de voz simples e intuitivo, projetado para oferecer informações 
              essenciais de forma clara e acessível. Com apenas um toque ou comando de voz, o paciente pode 
              ouvir a data, o horário, e o local. A interface 
              foi desenvolvida seguindo princípios de acessibilidade, com design minimalista, botões grandes 
              e contraste adequado, mas o diferencial está na experiência auditiva, que elimina barreiras 
              de leitura e navegação.
            </p>
          </div>
        </div>

        {/* Parágrafo final */}
        <div className="text-gray-700 leading-relaxed">
          <p className="text-lg">
            Além de beneficiar diretamente o paciente, o VisuAll também agrega valor às instituições de saúde, 
            reduzindo faltas e otimizando o uso da agenda médica. Nosso compromisso é devolver autonomia aos idosos, 
            promover inclusão digital e contribuir para um atendimento mais humano e eficiente. O VisuAll é mais 
            do que uma ferramenta: é um passo em direção a uma saúde verdadeiramente acessível para todos.
          </p>
        </div>

        {/* Seção de características */}
        <div className="bg-teal-50 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-teal-800 mb-4">Características principais do VisuAll:</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-700 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-teal-600">Interface simples e intuitiva para idosos</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-700 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-teal-600">Assistente de voz para acessibilidade</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-700 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-teal-600">Design com alto contraste e botões grandes</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-700 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-teal-600">Lembretes de consultas médicas</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-700 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-teal-600">Informações de contato das unidades de saúde</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-700 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-teal-600">Funcionalidade de compartilhamento</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pt-6">
          <div className="bg-[#23C8AA] text-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Junte-se a nós nessa missão!</h3>
            <p className="text-blue-100">
              Ajudando a tornar a saúde mais acessível e inclusiva para todos os idosos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
