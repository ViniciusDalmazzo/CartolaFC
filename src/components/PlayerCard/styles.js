import styled from 'styled-components';

export const Card = styled.div`
  @media (max-width: 768px) {
    margin: 15px 15px;
  }

  @media (min-width: 768.2px) {
    margin: 10px 300px;
  }
  
  border-bottom-style: solid;
  border-width: 1.8px;
  border-radius: 6px;
  border-color: lightgray;
  background-color: white;
  height: auto;
  display: flex;
  flex-direction: row;
`;

export const Title = styled.h4`
  font-weight: 800;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: large;
  color: #222222;
`;

export const Info = styled.h5`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #000000;
  font-size: 14px;
`

export const InfoContainer = styled.div`
  padding: 15px 15px;
`