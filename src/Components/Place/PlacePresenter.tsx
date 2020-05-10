import React from 'react';
import styled from '../Style/typed-components';
import Button from '../Button';

const Place = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  & i {
    font-size: 12px;
  }
`;

const Container = styled.div`
  margin-left: 10px;
`;

const Name = styled.span`
  display: block;
`;

const Icon = styled.span`
  cursor: pointer;
`;

const Address = styled.span`
  color: ${(props) => props.theme.greyColor};
  font-size: 14px;
`;

const Remove = styled.div`
  flex: 1;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
`;
interface IProps {
  fav: boolean;
  name: string;
  address: string;
  onStarPress: any;
  onRemovePress: any;
}

const PlacePresenter: React.FC<IProps> = ({
  onStarPress,
  fav,
  name,
  address,
  onRemovePress,
}) => (
  <Place>
    <Icon onClick={onStarPress}>{fav ? '★' : '✩'}</Icon>
    <Container>
      <Name>{name}</Name>
      <Address>{address}</Address>
    </Container>
    <Remove onClick={onRemovePress}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='12'
        height='12'
        viewBox='0 0 24 24'>
        <path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z' />
      </svg>
    </Remove>
  </Place>
);

export default PlacePresenter;
