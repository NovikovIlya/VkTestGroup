import Groups from './pages/Group/Groups';
import './App.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div>
          <Groups />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
