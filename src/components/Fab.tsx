import React from 'react';
import styled from 'styled-components/native';

import theme from '../theme';
import { PlusIcon, RefreshCcwIcon } from '../icons';

const AbsoluteContainer = styled.View`
  position: absolute;
  bottom: 50px;
  right: 20px;
`;

const ButtonContainer = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
`;

const CreateButton = styled(ButtonContainer)`
  background-color: ${theme.palette.primary.main};
  position: absolute;
  bottom: 0px;
  right: 0px;
`;

const UndoButton = styled(ButtonContainer)`
  background-color: ${theme.palette.primary.main};
  position: absolute;
  bottom: 70px;
  right: 0px;
`;

interface FabProps {
  onCreatePress: () => void;
  onRefreshPress: () => void;
  refreshVisible: boolean;
}

const Fab: React.FC<FabProps> = ({
  onCreatePress,
  onRefreshPress,
  refreshVisible,
}): JSX.Element => {
  return (
    <AbsoluteContainer>
      <CreateButton onPress={onCreatePress}>
        <PlusIcon />
      </CreateButton>
      {refreshVisible ? (
        <UndoButton onPress={onRefreshPress}>
          <RefreshCcwIcon />
        </UndoButton>
      ) : null}
    </AbsoluteContainer>
  );
};

export default Fab;
