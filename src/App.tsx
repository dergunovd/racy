import React from 'react';
import {SafeAreaView} from 'react-native';

import {Map} from './components/Map';
import {Info} from './components/Info';
import {StoreContextProvider} from './store';

const App = () => (
  <SafeAreaView>
    <StoreContextProvider>
      <Map />
      <Info />
    </StoreContextProvider>
  </SafeAreaView>
);

export default App;
