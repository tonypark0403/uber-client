import reset from 'styled-reset';
import { createGlobalStyle } from './typed-components';

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    -moz-user-input,
    button{
        &:focus,&:active {
            outline: none
        }
    }
`;

export default GlobalStyle;
