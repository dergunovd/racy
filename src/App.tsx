import React, {FC, PropsWithChildren, useCallback} from 'react';
import {NativeRouter, Route, Routes, useNavigate} from 'react-router-native';
import {useBackHandler} from '@react-native-community/hooks';
import styled from '@emotion/native';

import {History, HistoryList, Menu, Race, Result, Start} from './screens';
import {StoreProvider} from './store/StoreProvider';
import {AppThemeProvider} from './themes/ThemeProvider';

const BackPressHandler: FC<PropsWithChildren> = ({children}) => {
  const navigate = useNavigate();
  const handleBackButtonClick = useCallback(() => {
    navigate(-1);
    return true;
  }, [navigate]);

  useBackHandler(handleBackButtonClick);

  return <>{children}</>;
};

const Body = styled.SafeAreaView`
  height: 100%;
`;

const App = () => (
  <Body>
    <StoreProvider>
      <AppThemeProvider>
        <NativeRouter>
          <BackPressHandler>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/race" element={<Race />} />
              <Route path="/result" element={<Result />} />
              <Route path="/history" element={<HistoryList />} />
              <Route path="/history/:date" element={<History />} />
            </Routes>
          </BackPressHandler>
        </NativeRouter>
      </AppThemeProvider>
    </StoreProvider>
  </Body>
);

export default App;
