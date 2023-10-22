import React from 'react';
import styled from 'styled-components/native';

const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const StyledImage = styled.Image`
  height: 40px;
  width: 40px;
  margin-bottom: 20px;
`;

const ScreenHeader: React.FC = (): JSX.Element => {
  return (
    <Header>
      <StyledImage
        source={require('../images/faceit-logo.png')}
        resizeMode="contain"
      />
    </Header>
  );
};

export default ScreenHeader;
