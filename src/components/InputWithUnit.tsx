import React, {FC} from 'react';
import {TextInputProps} from 'react-native';
import styled from '@emotion/native';

import {MediumText} from './MediumText';

const Body = styled.View<{isInvalid?: boolean}>`
  border: 1px solid ${props => (props.isInvalid ? '#F53D3D' : '#313131')};
  border-radius: 4px;
  flex-direction: row;
`;
const TextInput = styled.TextInput`
  border: none;
  outline: none;
  font-size: 14px;
  flex-grow: 1;
  padding: 0 16px;
  color: #313131;
`;

const Unit = styled(MediumText)`
  color: #313131;
  border-radius: 4px;
  padding: 8px;
  background-color: rgb(206, 206, 206);
`;

const Error = styled(MediumText)`
  color: #f53d3d;
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
