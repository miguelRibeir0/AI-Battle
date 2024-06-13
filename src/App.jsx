import Battle from './Battle.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PopUp from './Components/PopUp.jsx';
import { useState } from 'react';
import { BattleId } from './Components/BattleId.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  const [showPopUp, setShowPopUp] = useState(true);

  return (
    <>
      <BattleId>
        <QueryClientProvider client={queryClient}>
          {showPopUp && <PopUp onClose={() => setShowPopUp(false)} />}
          <section className="ml-20 flex h-16 w-full items-center text-4xl">
            <h1 className="text-2xl text-white">AI BATTLE ⚔️</h1>
          </section>
          <Battle />
        </QueryClientProvider>
      </BattleId>
    </>
  );
}

export default App;
