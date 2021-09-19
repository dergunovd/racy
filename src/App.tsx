import React from 'react';
import {SafeAreaView} from 'react-native';
// import {AdMobBanner} from 'react-native-admob';

import {Map} from './components/Map';
import {Info} from './components/Info';
import {StoreContextProvider} from './store';

const App = () => (
  <SafeAreaView>
    <StoreContextProvider>
      {/*<AdMobBanner*/}
      {/*  adSize="banner"*/}
      {/*  adUnitID="ca-app-pub-2714230443684738/6752267802"*/}
      {/*  testDevices={[AdMobBanner.simulatorId]}*/}
      {/*  width="100%"*/}
      {/*  height={100}*/}
      {/*  onAdLoaded={console.log}*/}
      {/*  onAdFailedToLoad={(error: Error) => console.error(error)}*/}
      {/*/>*/}
      <Map />
      <Info />
    </StoreContextProvider>
  </SafeAreaView>
);

export default App;
