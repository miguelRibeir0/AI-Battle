//eslint-disable-next-line
const PopUp = ({ onClose }) => {
  return (
    <section className="absolute z-10 h-screen w-screen bg-black bg-opacity-80 text-white">
      <div className="absolute left-1/2 top-1/2 z-20 flex h-[92vh] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-y-10 border-2 border-lime-500 bg-gray-900">
        <h1 className="text-2xl">AI BATTLE ⚔️</h1>
        <p className="w-2/3 leading-7">
          <strong>Leia com atenção as seguintes instruções:</strong> <br />
          <br />- ⚠️ Muito importante: Se o site for fechado ou se ficar mais de
          5 minutos fora do site, este será atualizado e perderá o progresso.{' '}
          <br />- O acesso ao prompt está na caixa &quot;full prompt here&quot;,
          onde também se encontram os requisitos de JCL. <br />
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
          <br /> <br /> -Representação: O código representa o que é esperado com
          base nos requisitos? <br /> -Clareza: O código é claro e fácil de
          entender? <br /> <br /> Avalie as partes funcionais do código,
          ignorando quaisquer partes irrelevantes <br />
          Avalie do ponto de vista de um especialista sénior em COBOL e JCL.
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
