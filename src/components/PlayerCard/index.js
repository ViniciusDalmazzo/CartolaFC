import React from 'react';
import { Card, Title, InfoContainer, Info, BorderContainer, Icon } from './styles';

const PlayerCard = props => {
    const player = props.player;

    const getVariacao = () => {
      if (player.variacao_num < 0)
        return (<Info color="#DD0000">{player.variacao_num}</Info>);
      else if (player.variacao_num === 0)
        return (<Info color="#CCCCCC">{player.variacao_num}.00</Info>);
      else
        return (<Info color="#00DD00">+{player.variacao_num}</Info>);
    };
    
    return (
      <Card>
        <img src={player.foto.replace('FORMATO', '140x140')} alt={player.apelido}></img>
        <Icon src="https://cartolafc.globo.com/dist/4.10.1/img/atleta/status/provavel.svg" height="20" width="25" />
        <InfoContainer>
          <Title>{player.apelido.toUpperCase()}</Title>
          <Info color="#555555">{props.position} {props.clubName}</Info>
          <h6>Média: {player.media_num}</h6>
          <BorderContainer>
            <Info color="#000000" marginRight="20">C$ {player.preco_num}</Info>
            {getVariacao()}
          </BorderContainer>
        </InfoContainer>
      </Card>
    );
};

export default PlayerCard;
