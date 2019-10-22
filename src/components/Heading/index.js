import React from 'react';
import { Headline, Title, Subtitle } from './styles';

const Heading = (props) => {
  if (props.type === 'headline')
    return (
      <Headline {...props}>{props.text}</Headline>
    );
  
  else if (props.type === 'title')
    return (
      <Title {...props}>{props.text}</Title>
    );

  else
    return (
      <Subtitle {...props}>{props.text}</Subtitle>
    );
}

export default Heading;
