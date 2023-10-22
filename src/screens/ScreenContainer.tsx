/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

import Fab from '../components/Fab';
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import BodyText from '../components/BodyText';
import Container from '../components/Container';

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

interface ScreenContainerProps {
  loading?: boolean;
  loadingText?: string;
  noData?: boolean;
  noDataText?: {
    title: string;
    body: string;
  };
  onRetryPress?: () => void;
  error?: boolean | string | '';
  headerContent?: ReactElement | null;
  fabConfig?: {
    onCreatePress: () => void;
    onRefreshPress: () => void;
    refreshVisible: boolean;
  };
  children: ReactElement | null;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
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
            <BodyText>{noDataText?.title}</BodyText>
            <Spacer />
            <BodyText>{noDataText?.body}</BodyText>
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
      {fabConfig ? (
        <Fab
          onCreatePress={fabConfig.onCreatePress}
          onRefreshPress={fabConfig.onRefreshPress}
          refreshVisible={fabConfig.refreshVisible}
        />
      ) : null}
    </Container>
  );
};

export default ScreenContainer;
