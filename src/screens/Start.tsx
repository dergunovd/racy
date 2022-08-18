import React, {FC, useCallback, useState} from 'react';
import {useNavigate} from 'react-router';
import styled from '@emotion/native';

import {DropdownButton, Map, Picker} from '../components';
import {BurgerIcon, DropdownIcon} from '../components/icons';

const MapContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Content = styled.View`
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
`;

const ButtonContainer = styled.View`
  padding: 20px;
  flex-direction: row;
  align-items: center;
`;
const Menu = styled.Pressable`
  padding: 12px;
  margin-right: 16px;
`;
export const Start: FC = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [meters, setMeters] = useState(10);

  const toggleShow = useCallback(() => {
    setShowSettings(prev => !prev);
  }, []);

  return (
    <>
      <MapContainer>
        <Map />
      </MapContainer>
      <Content>
        <ButtonContainer>
          <Menu onPress={() => navigate('/menu')}>
            <BurgerIcon />
          </Menu>
          <DropdownButton
            buttonOnPress={() => console.log('button')}
            iconOnPress={toggleShow}
            icon={<DropdownIcon />}
            text={meters ? `Старт через ${meters}м` : 'Старт сейчас'}
          />
        </ButtonContainer>
        {showSettings ? (
          <Picker
            defaultValue={10}
            onPress={setMeters}
            items={[0, 10, 15, 30, 50, 75, 100]}
          />
        ) : null}
      </Content>
    </>
  );
};
