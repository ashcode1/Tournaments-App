import React, { Dispatch, SetStateAction } from 'react';
import RNMPrompt from 'react-native-modal-prompt';
import { Alert } from 'react-native';

interface PromptProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  defaultValue: string;
  onCancel: () => void;
  onSave: (value: string) => void;
}

const Prompt: React.FC<PromptProps> = ({
  visible,
  setVisible,
  defaultValue,
  onCancel,
  onSave,
}): JSX.Element => {
  const validateText = (text: string) => {
    // Remove leading and trailing spaces for validation
    const trimmedText = text.trim();

    // Check if the text consists of Latin letters, numbers, and spaces
    const regex = /^[A-Za-z0-9\s]+$/;

    // Check if the input is not empty and matches the regex
    const isValid = trimmedText.length > 0 && regex.test(trimmedText);

    return isValid;
  };

  const onCancelPress = () => {
    onCancel();
    return;
  };

  const onUpdatePress = (value: string) => {
    console.log('is valid? :', validateText(value));
    if (validateText(value) === true) {
      onSave(value);
      setVisible(false);
    } else {
      Alert.alert(
        'Invalid',
        `The tournament name must 
ONLY contain  
Latin letters, numbers, and spaces, 
not an empty name or only spaces`
      );
      return false;
    }
  };
  return (
    <>
      <RNMPrompt
        visible={visible}
        title="Type below to edit name"
        defaultValue={defaultValue}
        operation={[
          {
            text: 'Cancel',
            color: '#000',
            onPress: onCancelPress,
          },
          {
            text: 'Update',
            onPress: onUpdatePress,
          },
        ]}
      />
    </>
  );
};

export default Prompt;
