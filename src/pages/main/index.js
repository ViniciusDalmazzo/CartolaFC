import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';
import Modal from "react-responsive-modal";
import PlayerCard from '../../components/PlayerCard/index.js';
import { PLAYER_POSITIONS } from '../../data/playerPositions';
import { Container } from './styles';

export default class Main extends Component {

    state = {
        initInfos: [],
        players: [],
        clubs: [],
        open: false
    }

    componentDidMount() {

        this.loadPlayers();
        this.loadInitialPage();
        this.loadClubs();
    }

    loadInitialPage = async () => {

        const response = await api.get('/mercado/status');
        this.setState({ initInfos: response.data.rodada_atual })
    };

    loadPlayers = async () => {

        const response = await api.get('/atletas/mercado');
        this.setState({ players: response.data.atletas })
    };

    loadClubs = async () => {
        const response = await api.get('/clubes');
        this.setState({
            ...this.state,
            clubs: response.data
        });
    };

    getClubNameById = id => {
        var clubs = this.state.clubs;

        return Object.values(clubs).find(x => x.id === id).nome_fantasia;
    };

    getPosition = id => (
        PLAYER_POSITIONS.find(p => p.id === id).description
    );

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

        // playersFilter.sort(function (a, b) {
        //     return (a.media_num > b.media_num) ? -1 : ((b.media_num > a.media_num) ? 1 : 0);
        // });

        // Filtra pelos prováveis
        playersFilter = playersFilter.filter(player => player.status_id === 7);

        // playersFilter = playersFilter.slice(0, 52);

        return (
            <div>
                <Container>
                    {playersFilter.map(player => (
                        <PlayerCard 
                            key={player.atleta_id} 
                            player={player}
                            position={this.getPosition(player.posicao_id)}
                            clubName={this.getClubNameById(player.clube_id)}
                        />
                    ))}
                </Container>
            </div>
        );
    }
}