import React from 'react';
import styled from 'styled-components/native';

import H6 from './H6';
import Line from './Line';
import theme from '../theme';
import BodyText from './BodyText';

const StyledView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  marginbottom: ${theme.spacing(3)};
`;

interface DetailsRowProps {
  title: string;
  value: string;
  icon: JSX.Element;
}

const DetailsRow: React.FC<DetailsRowProps> = ({
  title,
  value,
  icon,
}): JSX.Element => {
  return (
    <>
      <Line />
      <StyledView>
        <BodyText>{title}:</BodyText>
        {icon}
      </StyledView>
      <H6>{value}</H6>
    </>
  );
};

export default DetailsRow;
