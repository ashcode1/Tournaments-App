import React, { ReactElement } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

import H4 from '../components/H4';
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import Container from '../components/Container';
import Paragraph from '../components/Paragraph';

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

interface ScreenContainerProps {
  screenTitle?: string;
  loading: boolean;
  loadingText: string;
  noData: boolean;
  noDataText: string;
  onRetryPress: () => void;
  error: boolean | string | '';
  children: ReactElement | null;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  screenTitle,
  loading,
  loadingText,
  noData,
  noDataText,
  onRetryPress,
  error,
  children,
}): JSX.Element => {
  return (
    <Container>
      <H4>{screenTitle}</H4>
      <>
        {error ? (
          <StyledView>
            <Paragraph>Something went wrong.</Paragraph>
          </StyledView>
        ) : noData ? (
          <StyledView>
            <Paragraph>{noDataText}</Paragraph>
            <Spacer />
            <Button onPress={onRetryPress}>RETRY</Button>
          </StyledView>
        ) : loading ? (
          <StyledView>
            <Paragraph>{loadingText}</Paragraph>
            <Spacer />
            <ActivityIndicator />
          </StyledView>
        ) : (
          children || null
        )}
      </>
    </Container>
  );
};

export default ScreenContainer;
