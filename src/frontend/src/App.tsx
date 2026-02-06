// Main application component with routing and theme

import { RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from './theme/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { router } from './router';
import { useEffect } from 'react';
import { initializeDb } from './localDb';

export default function App() {
  useEffect(() => {
    // Initialize IndexedDB on app mount
    initializeDb().catch((error) => {
      console.error('Failed to initialize database:', error);
    });
  }, []);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
