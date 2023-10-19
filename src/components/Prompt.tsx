import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import theme from '../theme';
import Input from './Input';
import BodyText from './BodyText';

const PromptContainer = styled.View`
  flex: 1;
`;

const PromptMask = styled.View`
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
`;

const PromptContent = styled.View`
  background: ${theme.palette.background.body};
  position: absolute;
  top: 30%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  border-radius: 5px;
  align-items: center;
  overflow: hidden;
`;

const PromptTitleContainer = styled.View`
  padding-top: 20px;
`;

const PromptBody = styled.View`
  padding-horizontal: 10px;
  padding-vertical: 20px;
  width: 100%;
`;

const ValidationContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 5px;
  margin-top: 5px;
`;

const PromptFooter = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  border-top-width: 1px;
  border-color: ${theme.palette.primary.main};
`;

const PromptAction = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding-vertical: 10px;
  border-right-width: 1px;
  border-color: ${theme.palette.primary.main};
  position: relative;
  left: 1px;
`;

interface Operation {
  text: string;
  onPress?: (value: string) => void;
  color?: string;
}

interface PromptProps {
  visible?: boolean;
  title: string;
  hasTextInput?: boolean;
  defaultValue?: string;
  placeholder?: string;
  operation?: Operation[];
  maxLength?: number;
  validationText?: string;
}

const Prompt: React.FC<PromptProps> = ({
  visible = false,
  title,
  hasTextInput,
  defaultValue = '',
  placeholder = '',
  operation = [],
  maxLength = 100,
  validationText,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setIsVisible(visible);
    setValue(defaultValue);
  }, [visible, defaultValue]);

  const requestClose = () => {
    setIsVisible(false);
  };

  const operationPress = (fn?: (value: string) => boolean | void) => {
    const bool = fn && fn(value);
    if (bool !== false) {
      setIsVisible(false);
    }
  };

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <Modal visible={isVisible} onRequestClose={requestClose}>
      <PromptContainer>
        <PromptMask />
        <PromptContent>
          <PromptTitleContainer>
            <BodyText size={18}>{title}</BodyText>
          </PromptTitleContainer>
          <PromptBody>
            {hasTextInput ? (
              <>
                <Input
                  style={styles.promptInput}
                  defaultValue={defaultValue}
                  placeholder={placeholder}
                  onChangeText={onChangeText}
                  maxLength={maxLength}
                  autoFocus={true}
                />
                {validationText ? (
                  <ValidationContainer>
                    <BodyText style={{ color: theme.palette.attention.main }}>
                      {validationText}
                    </BodyText>
                  </ValidationContainer>
                ) : null}
              </>
            ) : null}
          </PromptBody>
          <PromptFooter>
            {operation.length > 0 &&
              operation.map((item, index) => (
                <PromptAction
                  key={index}
                  onPress={() => operationPress(item.onPress)}
                >
                  <BodyText color={theme.palette.primary.main} size={18}>
                    {item.text}
                  </BodyText>
                </PromptAction>
              ))}
          </PromptFooter>
        </PromptContent>
      </PromptContainer>
    </Modal>
  );
};

const styles = StyleSheet.create({
  promptInput: {
    height: 46,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.palette.primary.main,
    borderRadius: 3,
    paddingHorizontal: 10,
  },
});

export default Prompt;
