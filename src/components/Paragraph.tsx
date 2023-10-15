import styled from 'styled-components/native';
import theme from '../theme';

const Paragraph = styled.Text`
  ${theme.typography.body};
  color: ${theme.palette.text.primary};
`;

export default Paragraph;
