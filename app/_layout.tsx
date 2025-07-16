import React from 'react';
import { Stack } from 'expo-router';
import { LanguageProvider } from './context/LanguageContext';

export default function Layout() {
  return (
    <LanguageProvider>
      <Stack />
    </LanguageProvider>
  );
}
