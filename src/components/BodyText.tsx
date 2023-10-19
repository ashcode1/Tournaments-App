import styled from 'styled-components/native';
import theme from '../theme';

const BodyText = styled.Text<{ color?: string; size?: number }>`
  ${(props) => `
    ${theme.typography.body};
    color: ${props.color ? props.color : theme.palette.text.primary};
    font-size: ${props.size ? props.size + 'px' : '14px'};
  `}
`;

export default BodyText;
