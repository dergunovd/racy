import React, {FC} from 'react';
import {TextInputProps} from 'react-native';
import styled from '@emotion/native';

import {MediumText} from './MediumText';

const Body = styled.View<{isInvalid?: boolean}>`
  border-width: 1px;
  border-color: ${props =>
    props.isInvalid ? props.theme.negativeColor : props.theme.accentColor50};
  border-radius: 4px;
  flex-direction: row;
`;
const TextInput = styled.TextInput`
  border: none;
  outline: none;
  font-size: 14px;
  flex-grow: 1;
  padding: 0 16px;
  color: ${props => props.theme.accentColor};
`;

const Unit = styled(MediumText)`
  color: ${props => props.theme.accentColor};
  border-radius: 4px;
  padding: 8px;
  background-color: ${props => props.theme.bgColor};
`;

const Error = styled(MediumText)`
  color: ${props => props.theme.negativeColor};
  font-size: 10px;
`;

interface Props {
  unit?: string;
  error?: string;
}
export const InputWithUnit: FC<TextInputProps & Props> = ({
  unit,
  error,
  ...props
}) => (
  <>
    <Body isInvalid={!!error}>
      <TextInput {...props} />
      {unit ? <Unit>{unit}</Unit> : null}
    </Body>
    {error ? <Error>{error}</Error> : null}
  </>
);
