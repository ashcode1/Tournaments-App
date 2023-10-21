import React from 'react';
import styled from 'styled-components/native';

import theme from '../theme';
import { PlusIcon } from '../icons';

const StyledTouchableOp = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  background-color: ${theme.palette.primary.main};
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 50px;
  right: 20px;
`;

interface FabProps {
  onPress: () => void;
}

const Fab: React.FC<FabProps> = ({ onPress }): JSX.Element => {
  return (
    <StyledTouchableOp onPress={onPress}>
      <PlusIcon />
    </StyledTouchableOp>
  );
};

export default Fab;
