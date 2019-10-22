import styled from 'styled-components';

export const Headline = styled.h2`
  color: ${props => props.white ? 'white' : 'black'};
  font-weight: ${props => props.weight ? props.weight : ''};
  text-align: ${props => props.center ? 'center' : 'left' };
  margin: 20px;
`;

export const Title = Headline.withComponent('h3');

export const Subtitle = Headline.withComponent('h4');