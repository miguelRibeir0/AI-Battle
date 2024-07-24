import github from '../assets/github.svg';

const GameOver = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-y-10 text-white">
      <h1>Thank you for participating in this AI Battle Game!</h1>
      <h3>
        Models Tested: [ &apos;llama3-8b-8192&apos;,
        &apos;mixtral-8x7b-32768&apos;, &apos;gemma-7b-it&apos;,
        &apos;gemma2-9b-it&apos;, &apos;llama3-70b-8192&apos; ]
      </h3>
      <p className="flex items-center gap-x-3">
        Source Code:{' '}
        <a href="https://github.com/miguelRibeir0/AI-Battle" target="_blank">
          <img src={github} className="w-7 cursor-pointer hover:opacity-70" />
        </a>{' '}
      </p>
    </div>
  );
};
export default GameOver;
