import 'intl';

import 'intl/locale-data/jsonp/pt-BR';

import { StatusBar } from 'expo-status-bar';

import { AppStack } from './src/routes/AppStack';

export default function App() {
  return (
    <>
      <AppStack />
      <StatusBar style="auto" />
    </>
  );
}

