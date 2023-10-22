import React from 'react';
import styled from 'styled-components/native';

import H6 from './H6';
import Line from './Line';
import theme from '../theme';
import Spacer from './Spacer';
import BodyText from './BodyText';

const StyledView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  marginbottom: ${theme.spacing(3)};
`;

const ColumnLeft = styled.View``;

const ColumnRight = styled.View`
  align-items: flex-end;
`;

interface MultiDetailsRowProps {
  title: string;
  subTitle1: string;
  subTitle2: string;
  value1: number;
  value2: number;
  icon: JSX.Element;
}

const MultiDetailsRow: React.FC<MultiDetailsRowProps> = ({
  title,
  subTitle1,
  subTitle2,
  value1,
  value2,
  icon,
}): JSX.Element => {
  return (
    <>
      <Line />
      <StyledView>
        <BodyText>{title}:</BodyText>
        {icon}
      </StyledView>
      <Spacer spacing={2} />
      <StyledView>
        <ColumnLeft>
          <BodyText>{subTitle1}</BodyText>
          <H6>{value1}</H6>
        </ColumnLeft>
        <ColumnRight>
          <BodyText>{subTitle2}</BodyText>
          <H6>{value2}</H6>
        </ColumnRight>
      </StyledView>
    </>
  );
};

export default MultiDetailsRow;
