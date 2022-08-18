import styled from '@emotion/native';
import React, {FC, useCallback, useContext, useState} from 'react';
import {Pressable} from 'react-native';
import {Button, Chip, InputWithUnit} from '../components';
import {useNavigate} from 'react-router';
import {StoreContext} from '../store/Store.context';

const Screen = styled.ScrollView`
  background: #fff;
  color: #313131;
`;

const Section = styled.View<{withoutBorder?: boolean}>`
  padding: 24px;
  border-bottom-color: rgba(49, 49, 49, 0.5);
  border-bottom-width: ${props => (props.withoutBorder ? '0' : '1px')};
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #313131;
  margin-bottom: 4px;
`;

const SubTitle = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #313131;
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
export const Menu: FC = () => {
  const navigate = useNavigate();
  const {
    state: {settings},
    dispatch,
  } = useContext(StoreContext);
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>(
    settings.theme,
  );
  const [accuracy, setAccuracy] = useState<'low' | 'normal' | 'high'>(
    settings.accuracy,
  );
  const [newLapAccuracy, setNewLapAccuracy] = useState(
    `${settings.newLapAccuracy}`,
  );

  const save = useCallback(() => {
    dispatch({
      type: 'set',
      value: {settings: {theme, accuracy, newLapAccuracy: +newLapAccuracy}},
    });
    navigate('/');
  }, [accuracy, dispatch, navigate, newLapAccuracy, theme]);

  return (
    <Screen>
      <Pressable>
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
            active={accuracy === 'normal'}
            onPress={() => setAccuracy('normal')}>
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
            error={isNaN(+newLapAccuracy) ? 'Это не число :(' : undefined}
          />
        </InputContainer>
      </Section>

      <Section withoutBorder>
        <Button onPress={save} disabled={isNaN(+newLapAccuracy)}>
          Готово
        </Button>
      </Section>
    </Screen>
  );
};
