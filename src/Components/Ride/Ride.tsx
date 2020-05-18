import React from 'react';
import styled from '../Style/typed-components';

const Ride = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.greyColor};
`;

const Order = styled.span`
  color: ${(props) => props.theme.blueColor};
`;

const Container = styled.div`
  margin-left: 10px;
`;

const Name = styled.span`
  display: block;
  margin-bottom: 0.5em;
`;

const Address = styled.span`
  color: ${(props) => props.theme.greyColor};
  font-size: 14px;
`;

const Distance = styled.span`
  color: ${(props) => props.theme.blueColor};
  font-size: 12px;
`;

const Request = styled.div`
  flex: 1;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

interface IProps {
  order: number;
  distance: string;
  dropOffAddress: string;
  driverName: string | null;
  onRequestDrive: any;
}

const PlacePresenter: React.FC<IProps> = ({
  order,
  distance,
  dropOffAddress,
  driverName,
  onRequestDrive,
}) => (
  <Ride>
    <Order>{order}</Order>
    <Container>
      <Name>{driverName}</Name>
      <Address>{dropOffAddress}</Address>
      <Distance>{distance}</Distance>
    </Container>
    <Request onClick={() => onRequestDrive(dropOffAddress)}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'>
        <path d='M11 16v-3h1.247c.882 0 1.235.297 1.828.909.452.465 1.925 2.091 1.925 2.091h-5zm-1-3h-2.243c-.688 0-1.051.222-1.377.581-.316.348-.895.948-1.506 1.671 1.719.644 4.055.748 5.126.748v-3zm14 5.161c0-2.823-2.03-3.41-2.794-3.631-1.142-.331-1.654-.475-3.031-.794-.549-.545-2.051-2.035-2.389-2.375l-.089-.091c-.666-.68-1.421-1.27-3.172-1.27h-7.64c-.547 0-.791.456-.254.944-.534.462-1.945 1.705-2.341 2.107-1.383 1.403-2.29 2.481-2.29 4.604 0 2.461 1.361 4.258 3.179 4.332.41 1.169 1.512 2.013 2.821 2.013 1.304 0 2.403-.838 2.816-2h6.367c.413 1.162 1.512 2 2.816 2 1.308 0 2.409-.843 2.82-2.01 1.934-.056 3.181-1.505 3.181-3.829zm-18 4.039c-.662 0-1.2-.538-1.2-1.2s.538-1.2 1.2-1.2 1.2.538 1.2 1.2-.538 1.2-1.2 1.2zm12 0c-.662 0-1.2-.538-1.2-1.2s.538-1.2 1.2-1.2 1.2.538 1.2 1.2-.538 1.2-1.2 1.2zm2.832-2.15c-.399-1.188-1.509-2.05-2.832-2.05-1.327 0-2.44.868-2.836 2.062h-6.328c-.396-1.194-1.509-2.062-2.836-2.062-1.319 0-2.426.857-2.829 2.04-.586-.114-1.171-1.037-1.171-2.385 0-1.335.47-1.938 1.714-3.199.725-.735 1.309-1.209 2.263-2.025.34-.291.774-.432 1.222-.43h5.173c1.22 0 1.577.385 2.116.892.419.393 2.682 2.665 2.682 2.665s2.303.554 3.48.895c.84.243 1.35.479 1.35 1.71 0 1.195-.396 1.825-1.168 1.887zm-13.6-12.985c.71-.751 1.688-1.215 2.768-1.215s2.058.464 2.768 1.215l1.164-1.236c-1.006-1.067-2.397-1.727-3.932-1.727-1.535 0-2.926.66-3.932 1.727l1.164 1.236zm-2.038-2.163c1.23-1.304 2.929-2.11 4.806-2.11s3.576.806 4.806 2.11l1.194-1.266c-1.535-1.629-3.656-2.636-6-2.636s-4.465 1.007-6 2.636l1.194 1.266zm6.806 4.098h-4c.035-.906.749-1.737 2-1.737 1.243 0 1.965.831 2 1.737z' />
      </svg>
    </Request>
  </Ride>
);

export default PlacePresenter;
