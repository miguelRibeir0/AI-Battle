import { useState, useEffect } from 'react';
import Battle from './Battle.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PopUp from './Components/PopUp.jsx';
import { BattleId } from './Components/BattleId.jsx';
import ScreenWidth from './Components/ScreenWidth.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  // const [showPopUp, setShowPopUp] = useState(true);
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  useEffect(() => {
    // Checking if the screen is supported
    const mediaQuery = window.matchMedia('(max-width: 1000px)');

    const handleMediaQueryChange = (event) => {
      setIsScreenSmall(event.matches);
    };

    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      <BattleId>
        <QueryClientProvider client={queryClient}>
          {isScreenSmall && <ScreenWidth />}
          {/* {showPopUp && <PopUp onClose={() => setShowPopUp(false)} />} */}
          <section className="ml-36 flex h-20 w-full items-end justify-between text-4xl">
            <h1 className="text-2xl text-white">AI BATTLE ⚔️</h1>
          </section>
          <Battle />
        </QueryClientProvider>
      </BattleId>
    </>
  );
}

export default App;
