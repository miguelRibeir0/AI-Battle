//eslint-disable-next-line
const Prompt = ({ prompt }) => {
  return (
    <section className="flex items-center justify-center">
      <h2 className="rounded-lg border-2 border-lime-500 px-3 py-2 text-center text-xl text-white">
        <span className="font-bold">PROMPT:</span> {prompt}
      </h2>
    </section>
  );
};

export default Prompt;
