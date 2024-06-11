import Battle from './Battle.jsx';
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
        <section className="ml-20 flex h-16 w-full items-center text-4xl">
          <h1 className="text-2xl text-white">AI BATTLE ⚔️</h1>
        </section>
        <Battle></Battle>
      </QueryClientProvider>
    </>
  );
}

export default App;
