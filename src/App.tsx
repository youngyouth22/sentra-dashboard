import { createBrowserRouter, RouterProvider } from 'react-router';

import { ThemeProvider } from './core/context/ThemeProvider';
import ContainerTheme from './core/theme/ContainerTheme';

import { routes } from './core/routes';

import { TooltipProvider } from './components/ui/tooltip';

import { Toaster } from 'sonner';

import './App.css';

function App() {
  const router = createBrowserRouter(routes());

  return (
    <ThemeProvider>
      <ContainerTheme>
        <TooltipProvider>
          <RouterProvider router={router} />
          <Toaster richColors position="top-right" theme="dark" />
        </TooltipProvider>
      </ContainerTheme>
    </ThemeProvider>
  );
}

export default App;
