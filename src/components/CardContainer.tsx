import React, { ReactElement } from 'react';
import styled from 'styled-components/native';

import theme from '../theme';

const StyledTouchableOp = styled.TouchableOpacity<{
  height?: number;
}>`
  ${(props) => `
    height: ${props.height ? props.height + 'px' : '150px'};
    padding-horizontal: ${theme.spacing(4)};
  `}
`;

const StyledView = styled.View<{
  width?: string;
  height?: number;
}>`
  ${(props) => `
    width: ${props.width ? props.width : '100%'};
    height: ${props.height ? props.height + 'px' : '150px'};
    padding-horizontal: ${theme.spacing(4)};
  `}
`;

const InnerContainer = styled.View`
  height: 150px;
  padding: ${theme.spacing(2)}
  margin-vertical: ${theme.spacing(3)};
  background: ${theme.palette.background.alt2}
  border: 1px solid ${theme.palette.secondary.main};
  border-radius: ${theme.borderRadius}
  align-items: center;
  justify-content: space-around;
  flex: 1;
`;

interface CardContainerProps {
  onPress?: () => void;
  width?: string; // percentage
  height?: number; // px
  children: ReactElement | Array<ReactElement>;
}

const CardContainer: React.FC<CardContainerProps> = ({
  onPress,
  width,
  height,
  children,
}): JSX.Element => {
  return onPress ? (
    <StyledTouchableOp onPress={onPress}>
      <InnerContainer>{children}</InnerContainer>
    </StyledTouchableOp>
  ) : (
    <StyledView width={width} height={height}>
      <InnerContainer>{children}</InnerContainer>
    </StyledView>
  );
};

export default CardContainer;
