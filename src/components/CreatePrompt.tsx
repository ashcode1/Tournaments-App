import React, { Dispatch, SetStateAction } from 'react';

import CustomPrompt from './Prompt';
import { validateText } from '../helpers/promptHelpers';

interface CreatePromptProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  defaultValue: string;
  onCancel: () => void;
  onCreate: (value: string) => void;
}

const CreatePrompt: React.FC<CreatePromptProps> = ({
  visible,
  setVisible,
  defaultValue,
  onCreate,
}): JSX.Element => {
  const [validationMessage, setValidationMessage] = React.useState<string>('');

  const onCancelPress = () => {
    setVisible(false);
    return;
  };

  const message =
    'The tournament name must ONLY contain Latin letters, numbers, and spaces, not an empty name or only spaces';

  const onCreatePress = (value: string) => {
    if (validateText(value) === true) {
      onCreate(value);
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
        title="Type new tournament name"
        hasTextInput
        defaultValue={defaultValue}
        operation={[
          {
            text: 'Cancel',
            onPress: onCancelPress,
          },
          {
            text: 'Create',
            onPress: onCreatePress,
          },
        ]}
      />
    </>
  );
};

export default CreatePrompt;
