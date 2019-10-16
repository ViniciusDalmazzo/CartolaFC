import styled from 'styled-components';

export const Card = styled.div`
  @media (max-width: 768px) {
    margin: 15px 0;
  }

  @media (min-width: 768.2px) {
    margin: 10px 0;
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
  color: ${props => props.color};
  font-size: 14px;
  margin-bottom: 3px;
  margin-right: ${props => props.marginRight ? props.marginRight + 'px' : ''};
`;

export const InfoContainer = styled.div`
  @media (max-width: 768px) {
    width: 46%;
  }

  @media (min-width: 768.2px) {
    width: 30%;
  }

  padding: 15px 0;
`

export const BorderContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  border-color: lightgray;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 3px 15px;
  }

  @media (min-width: 768.2px) {
    padding: 3px 30px;
  }
`;

export const Icon = styled.img`
  margin: 18px 5px;
`