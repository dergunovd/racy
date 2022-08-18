import React, {FC, PropsWithChildren, useCallback, useEffect} from 'react';
import {SafeAreaView, BackHandler} from 'react-native';
import {NativeRouter, Route, Routes, useNavigate} from 'react-router-native';

import {Start, Menu} from './screens';

const BackPressHandler: FC<PropsWithChildren> = ({children}) => {
  const navigate = useNavigate();
  const handleBackButtonClick = useCallback(() => {
    navigate(-1);
    return false;
  }, [navigate]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [handleBackButtonClick]);

  return <>{children}</>;
};
const App = () => (
  <SafeAreaView style={{height: '100%'}}>
    <NativeRouter>
      <BackPressHandler>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/menu" element={<Menu />} />
          {/*<Route path="/race" element={<Race />} />*/}
          {/*<Route path="/result" element={<Race />} />*/}
          {/*<Route path="/history" element={<History />} />*/}
        </Routes>
      </BackPressHandler>
    </NativeRouter>
  </SafeAreaView>
);

export default App;
