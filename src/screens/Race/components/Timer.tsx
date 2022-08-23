import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import styled from '@emotion/native';

import {timeFormatter} from '../../../utils/formatters';
import {StoreContext} from '../../../contexts';

const TimerText = styled.Text`
  font-weight: 400;
  font-size: 32px;
  color: ${props => props.theme.accentColor50};
`;

export const Timer: FC = () => {
  const intervalId = useRef(0);
  const [time, setTime] = useState<number>();
  const {
    state: {lapStartTime},
  } = useContext(StoreContext);

  useEffect(() => {
    intervalId.current = +setInterval(
      () => setTime(lapStartTime ? Date.now() - lapStartTime : 0),
      10,
    );
    return () => {
      clearInterval(intervalId.current);
    };
  }, [lapStartTime]);

  return <TimerText>{timeFormatter(time)}</TimerText>;
};
