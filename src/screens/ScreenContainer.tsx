import React, { ReactElement } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import styled from 'styled-components/native';

import H4 from '../components/H4';
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import Container from '../components/Container';
import BodyText from '../components/BodyText';

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
  noDataText: {
    title: string;
    body: string;
  };
  onRetryPress: () => void;
  error: boolean | string | '';
  headerContent: ReactElement | null;
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
  headerContent,
  children,
}): JSX.Element => {
  return (
    <Container>
      <StatusBar animated={true} barStyle="light-content" />
      <H4>{screenTitle}</H4>
      {headerContent}
      <>
        {error ? (
          <StyledView>
            <BodyText>Something went wrong!</BodyText>
            <Spacer />
            <Button onPress={onRetryPress}>RETRY</Button>
          </StyledView>
        ) : noData ? (
          <StyledView>
            <BodyText>{noDataText.title}</BodyText>
            <Spacer />
            <BodyText>{noDataText.body}</BodyText>
          </StyledView>
        ) : loading ? (
          <StyledView>
            <BodyText>{loadingText}</BodyText>
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
