//eslint-disable-next-line
const PopUp = ({ onClose }) => {
  return (
    <section className="absolute z-10 h-screen w-screen bg-black bg-opacity-80 text-white">
      <div className="absolute left-1/2 top-1/2 z-20 flex h-[92vh] w-3/5 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-y-10 border-2 border-lime-500 bg-gray-900 pb-10 pt-10">
        <h1 className="text-2xl">AI BATTLE ⚔️</h1>
        <p className="w-2/3 overflow-y-auto pr-7 leading-7 scrollbar scrollbar-track-transparent scrollbar-thumb-lime-500">
          <strong>Leia com atenção as seguintes instruções:</strong> <br />
          <br />- ⚠️ Muito importante: Se o site for fechado ou se ficar mais de
          5 minutos fora do site, este será atualizado e perderá o progresso.{' '}
          <br />- Apenas acesse a prompt após as respostas carregarem. A prompt
          encontra-se na caixa &quot;full prompt here&quot;, onde também se
          encontram os requisitos de JCL. <br />
          <br />
          <strong> - Vote no resultado: </strong>
          <br /> <br />- Modelo A vence: Se o código do Modelo A for
          funcionalmente superior. <br />- Modelo B vence: Se o código do Modelo
          B for funcionalmente superior. <br />
          - Empate: Se ambos os códigos forem funcionalmente equivalentes ou
          ambos forem insatisfatórios. <br />
          <br />
          <strong>
            Considere os seguintes critérios ao avaliar a funcionalidade do
            código:{' '}
          </strong>{' '}
          <br /> <br />
          - Representação: O código representa o que é esperado com base nos
          requisitos? <br />- Clareza: O código é claro e fácil de entender?{' '}
          <br /> <br /> <strong>Pontos adicionais a ter em conta:</strong>{' '}
          <br />
          <br />- Foco na funcionalidade: Avalie as partes funcionais do código,
          ignorando quaisquer partes irrelevantes ou que não se alinhem
          diretamente com os requisitos. Não se pretende, nesta fase, que o
          código gerado esteja perfeito, por isso não deve ser analisado em
          detalhe. <br />
          <br />- Ruído visual: Esteja ciente de que o código gerado pode
          incluir muitos comentários ou trechos que podem parecer desnecessários
          ou criar &quot;ruído visual&quot;. Apesar disso, é importante procurar
          por pedaços de código úteis que possam ser aproveitados. <br />
          <br />- Especialização: Avalie do ponto de vista de um especialista
          sénior em COBOL e JCL, mas mantendo o foco no que realmente importa
          para a funcionalidade e clareza do código, sem se perder em detalhes
          excessivos.
        </p>
        <button
          onClick={async () => {
            onClose();
          }}
          className="rounded-xl border-2 border-lime-500 px-4 py-2 hover:bg-lime-500"
        >
          Start
        </button>
      </div>
    </section>
  );
};

export default PopUp;
