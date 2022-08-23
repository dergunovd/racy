import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {Pressable} from 'react-native';
import {useNavigate} from 'react-router';
import styled from '@emotion/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Button, Chip, InputWithUnit} from '../components';
import {ThemeContext} from '../contexts';

const Screen = styled.ScrollView`
  background: ${props => props.theme.bgColor};
  color: ${props => props.theme.accentColor};
`;

const Section = styled.View<{withoutBorder?: boolean}>`
  padding: 24px;
  border-bottom-color: ${props => props.theme.accentColor50};
  border-bottom-width: ${props => (props.withoutBorder ? '0' : '1px')};
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.accentColor};
  margin-bottom: 4px;
`;

const SubTitle = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.theme.accentColor};
  opacity: 0.5;
`;

const ChipContainer = styled.View`
  margin-top: 16px;
  flex-direction: row;
  justify-content: space-between;
`;

const InputContainer = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 16px;
  width: 120px;
`;
type Theme = 'light' | 'dark' | 'system';
type Accuracy = 'low' | 'balanced' | 'high';

export const Menu: FC = () => {
  const navigate = useNavigate();
  const {setTheme: setContextTheme} = useContext(ThemeContext);
  const [theme, setTheme] = useState<Theme>();
  const [accuracy, setAccuracy] = useState<Accuracy>();
  const [newLapAccuracy, setNewLapAccuracy] = useState<string>();

  useEffect(() => {
    AsyncStorage.getItem('theme').then(value =>
      setTheme((value ?? 'system') as Theme),
    );
    AsyncStorage.getItem('accuracy').then(value =>
      setAccuracy((value ?? 'balanced') as Accuracy),
    );
    AsyncStorage.getItem('newLapAccuracy').then(value =>
      setNewLapAccuracy((value ?? 5) as string),
    );
  }, []);

  const save = useCallback(async () => {
    theme && setContextTheme(theme);
    await AsyncStorage.multiSet([
      ['theme', theme as Theme],
      ['accuracy', accuracy as Accuracy],
      ['newLapAccuracy', newLapAccuracy as string],
    ]);

    navigate('/');
  }, [accuracy, navigate, newLapAccuracy, setContextTheme, theme]);

  return (
    <Screen>
      <Pressable onPress={() => navigate('/history')}>
        <Section>
          <Title>История записей</Title>
          <SubTitle>15 записей</SubTitle>
        </Section>
      </Pressable>

      <Section>
        <Title>Тема</Title>
        <ChipContainer>
          <Chip active={theme === 'system'} onPress={() => setTheme('system')}>
            Как в системе
          </Chip>
          <Chip active={theme === 'light'} onPress={() => setTheme('light')}>
            Светлая
          </Chip>
          <Chip active={theme === 'dark'} onPress={() => setTheme('dark')}>
            Темная
          </Chip>
        </ChipContainer>
      </Section>

      <Section>
        <Title>Точность измерения</Title>
        <SubTitle>При высокой точности быстрее разряжается батарея</SubTitle>
        <ChipContainer>
          <Chip active={accuracy === 'low'} onPress={() => setAccuracy('low')}>
            Экономная
          </Chip>
          <Chip
            active={accuracy === 'balanced'}
            onPress={() => setAccuracy('balanced')}>
            Средняя
          </Chip>
          <Chip
            active={accuracy === 'high'}
            onPress={() => setAccuracy('high')}>
            Высокая
          </Chip>
        </ChipContainer>
      </Section>

      <Section withoutBorder>
        <Title>Точность отсчёта нового круга</Title>
        <SubTitle>
          В каком радиусе от точки старта отсчитывается новый круг?
        </SubTitle>
        <InputContainer>
          <InputWithUnit
            value={newLapAccuracy}
            unit="метров"
            keyboardType="numeric"
            onChange={event => setNewLapAccuracy(event.nativeEvent.text)}
            error={
              isNaN(+(newLapAccuracy ?? 5)) ? 'Это не число :(' : undefined
            }
          />
        </InputContainer>
      </Section>

      <Section withoutBorder>
        <Button onPress={save} disabled={isNaN(+(newLapAccuracy ?? 5))}>
          Готово
        </Button>
      </Section>
    </Screen>
  );
};
