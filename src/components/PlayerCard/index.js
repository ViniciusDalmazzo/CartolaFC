import React from 'react';
import { Card, Title, InfoContainer, Info } from './styles';

const PlayerCard = (props) => (
    <Card>
      <img src={props.foto.replace('FORMATO', '140x140')}></img>
      <InfoContainer>
        <Title>{props.nome.toUpperCase()}</Title>
        <Info>C$ {props.preco}</Info>
        <h5>Média: {props.media}</h5>
        <h5>Jogos: {props.jogos}</h5>
        <h5>Variação: {props.variacao}</h5>
      </InfoContainer>
    </Card>
);

export default PlayerCard;
