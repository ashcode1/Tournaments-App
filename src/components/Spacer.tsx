import styled from 'styled-components/native';
import theme from '../theme';

const Spacer = styled.View<{ spacing?: number }>`
  ${(props) =>
    `margin-bottom: ${
      props.spacing ? theme.spacing(props.spacing) : theme.spacing(6)
    }`};
`;

export default Spacer;
