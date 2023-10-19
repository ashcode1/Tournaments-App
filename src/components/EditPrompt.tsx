import React, { Dispatch, SetStateAction } from 'react';
import CustomPrompt from './Prompt';

interface EditPromptProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  defaultValue: string;
  onCancel: () => void;
  onSave: (value: string) => void;
}

const EditPrompt: React.FC<EditPromptProps> = ({
  visible,
  setVisible,
  defaultValue,
  onCancel,
  onSave,
}): JSX.Element => {
  const [validationMessage, setValidationMessage] = React.useState<string>('');

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
    setVisible(false);
    return onCancel();
  };

  const message =
    'The tournament name must ONLY contain Latin letters, numbers, and spaces, not an empty name or only spaces';

  const onUpdatePress = (value: string) => {
    if (validateText(value) === true) {
      onSave(value);
      setVisible(false);
    } else {
      setValidationMessage(message);
      return false;
    }
  };
  return (
    <>
      <CustomPrompt
        visible={visible}
        validationText={validationMessage}
        title="Type below to edit name"
        hasTextInput
        defaultValue={defaultValue}
        operation={[
          {
            text: 'Cancel',
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

export default EditPrompt;
