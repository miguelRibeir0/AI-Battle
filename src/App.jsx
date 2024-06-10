import Battle from './Components/Battle.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <section className="w-full h-16 flex items-center ml-20 text-4xl">
          <h1 className="text-white text-2xl">AI BATTLE ⚔️</h1>
        </section>
        <Battle></Battle>
      </QueryClientProvider>
    </>
  );
}

export default App;
