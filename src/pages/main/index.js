import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';
import Modal from "react-responsive-modal";
import PlayerCard from '../../components/PlayerCard/index.js';

export default class Main extends Component {

    state = {
        initInfos: [],
        players: [],
        open: false
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

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {

        let playersFilter = this.state.players.filter((player) => {
            return player.foto != null;
        })

        playersFilter.sort(function (a, b) {
            return (a.preco_num > b.preco_num) ? -1 : ((b.preco_num > a.preco_num) ? 1 : 0);
        });

        playersFilter = playersFilter.slice(0, 52);

        return (
            <div>
                {playersFilter.map(player => (
                    <PlayerCard 
                        key={player.atleta_id} 
                        nome={player.apelido}
                        preco={player.preco_num}
                        media={player.media_num}
                        jogos={player.jogos_num}
                        foto={player.foto}
                        variacao={player.variacao_num}
                    />
                ))}
            </div>
        );
    }
}