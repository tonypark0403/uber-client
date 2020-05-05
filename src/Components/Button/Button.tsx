import React, { FC } from 'react';
import styled from '../Style/typed-components';

const Container = styled.button`
  box-shadow: 0 18px 35px rgba(50, 50, 93, 0.1), 0 8px 15px rgba(0, 0, 0, 0.07);
  background-color: ${(props) => (props.disabled ? '#d2d2d2' : 'black')};
  color: white;
  padding: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 50px;
  right: 50px;
  cursor: pointer;
`;

interface IProps {
  disabled?: boolean;
  children: any;
}

const Button: FC<IProps> = ({ disabled = false, children }) => {
  console.log('disabled:', disabled);
  return <Container disabled={disabled}>{children}</Container>;
};

export default Button;
