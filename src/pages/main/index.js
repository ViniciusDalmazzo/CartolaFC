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

        let playersFilter = this.state.players.filter((player) => {
            return player.foto != null;
        })

        return (

            <div className="player-list">
                {playersFilter.map(player => (
                    <div className="player-div" key={player.atleta_id}>
                        <strong>{player.nome}</strong> ({player.apelido})

                        <div className="image">
                            <img src={player.foto.replace('FORMATO', '140x140')}></img>
                        </div>
                        <div className="table">
                            <table>
                                <div className="column">
                                    <th>
                                        <tr className="linha"><strong>Preço</strong></tr>
                                        <tr>R$ {player.preco_num} </tr>
                                    </th>
                                </div>
                                <div className="column">
                                    <th>
                                        <tr className="linha"><strong>Média</strong></tr>
                                        <tr>{player.media_num}</tr>

                                    </th>
                                </div>
                                <div className="column">
                                    <th>
                                        <tr className="linha"> <strong>Jogos</strong></tr>
                                        <tr>{player.jogos_num}</tr>
                                    </th>
                                </div>
                            </table>
                        </div>
                        <a href="">Ver mais informações</a>
                    </div>
                ))}
            </div>
        );
    }
}