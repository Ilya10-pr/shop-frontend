import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from "react-router-dom";
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/store.ts';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <Router>
            <Provider store={store}>
                    <App />
            </Provider>
        </Router>
    </QueryClientProvider>

)
