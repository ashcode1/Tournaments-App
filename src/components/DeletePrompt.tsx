import React, { Dispatch, SetStateAction } from 'react';
import CustomPrompt from './Prompt';

interface DeletePromptProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onDelete: () => void;
  onCancel: () => void;
}

const DeletePrompt: React.FC<DeletePromptProps> = ({
  visible,
  setVisible,
  onDelete,
  onCancel,
}): JSX.Element => {
  const onCancelPress = () => {
    setVisible(false);
    return onCancel();
  };

  const onConfirmPress = () => {
    onDelete();
    setVisible(false);
  };
  return (
    <>
      <CustomPrompt
        visible={visible}
        title="Do you really want to delete this tournament?"
        operation={[
          {
            text: 'Cancel',
            onPress: onCancelPress,
          },
          {
            text: 'Confirm',
            onPress: onConfirmPress,
          },
        ]}
      />
    </>
  );
};

export default DeletePrompt;
