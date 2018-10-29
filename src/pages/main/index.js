import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

export default class Main extends Component {

    state = {
        initInfos: [],
        players: []
    }

    componentDidMount() {

        this.loadPlayers();
        this.loadInitialPage();
    }

    loadInitialPage = async () => {

        const response = await api.get('/mercado/status');

        this.setState({ initInfos: response.data.rodada_atual })
    };

    loadPlayers = async () => {

        const response = await api.get('/atletas/mercado');
        this.setState({ players: response.data.atletas })
    };

    render() {
        return (

            <div className="player-list">
                {this.state.players.map(player => (
                    <div className="player-div" key={player.atleta_id}>
                        <strong>{player.nome}</strong> ({player.apelido})
                        <div className="player-info">                           
                            <strong>Preço R$</strong><p>{player.preco_num}</p>
                            <strong>Média</strong><p>{player.media_num}</p>
                            <strong>Jogos</strong> <p>{player.jogos_num}</p>                           
                        </div>
                        <a href="">Ver mais informações</a>
                    </div>
                ))}
            </div>
        );
    }
}