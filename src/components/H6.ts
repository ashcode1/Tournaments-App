import styled from 'styled-components/native';
import theme from '../theme';

const H6 = styled.Text`
  ${theme.typography.h6};
  margin: 0;
  margin-bottom: ${theme.spacing(4)};
  color: ${theme.palette.text.primary};
`;

export default H6;
