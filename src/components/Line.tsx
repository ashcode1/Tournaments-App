import styled from 'styled-components/native';

import theme from '../theme';

const Line = styled.View`
  height: 1px
  border: 1px dotted ${theme.palette.secondary.main};
  margin-bottom: ${theme.spacing(4)};
`;

export default Line;
