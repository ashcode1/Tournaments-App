import React, { ReactElement } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import styled from 'styled-components/native';

import theme from '../theme';
import H4 from '../components/H4';
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import Container from '../components/Container';
import BodyText from '../components/BodyText';
import Fab from '../components/Fab';

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Header = styled.View`
  padding: ${theme.spacing(3)};
  align-items: center;
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
  fabConfig?: {
    onPress: () => void;
  };
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
  fabConfig,
  children,
}): JSX.Element => {
  return (
    <Container>
      <StatusBar animated={true} barStyle="light-content" />
      <Header>
        <H4>{screenTitle}</H4>
        {headerContent}
      </Header>
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
      {fabConfig ? <Fab onPress={fabConfig.onPress} /> : null}
    </Container>
  );
};

export default ScreenContainer;
