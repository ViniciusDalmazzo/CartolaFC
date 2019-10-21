import api from '../../services/api';

import React, { Component } from 'react';
import Select from 'react-select';

//import './styles.css';
import PlayerCard from '../../components/PlayerCard/index.js';
import Heading from '../../components/Heading';
import { Container } from './styles';

import { PLAYER_POSITIONS } from '../../data/playerPositions';
import { PLAYERS_ORDER_BY } from '../../data/playersOrderBy';

export default class Main extends Component {

    state = {
        initInfos: '',
        players: [],
        clubs: [],
        open: false,
        orderBy: null
    }

    componentDidMount() {
        this.loadPlayers();
        this.loadInitialPage();
        this.loadClubs();
    }

    loadInitialPage = async () => {

        const response = await api.get('/mercado/status');
        this.setState({
            ...this.state, 
            initInfos: response.data.rodada_atual 
        });       
    };

    loadPlayers = async () => {
        const response = await api.get('/atletas/mercado');
        this.setState({
            ...this.state, 
            players: response.data.atletas
        });
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

    orderResults = () => {
        if (this.state.orderBy === null)
            return;

        const orderBy = this.state.orderBy.value;
        
        if (orderBy === 'Price')
            this.state.players.sort(function (a, b) {
                return (a.preco_num > b.preco_num) ? -1 : ((b.preco_num > a.preco_num) ? 1 : 0);
            });

        else if (orderBy === 'Average')
            this.state.players.sort(function (a, b) {
                return (a.media_num > b.media_num) ? -1 : ((b.media_num > a.media_num) ? 1 : 0);
            });

        else if (orderBy === 'Variation')
            this.state.players.sort(function (a, b) {
                return (a.variacao_num > b.variacao_num) ? -1 : ((b.variacao_num > a.variacao_num) ? 1 : 0);
            });
    }

    handleChange = selectedOption => {
        this.setState({
            ...this.state,
            orderBy: selectedOption
        });
    }

    render() {

        this.orderResults();

        // Filtra pelos prováveis
        let playersFilter = this.state.players.filter(player => player.status_id === 7);
        
        return (
            <div>
                <Container>
                    <Heading 
                        center 
                        weight='bold'
                        type='title'
                        text={'Rodada ' + this.state.initInfos}
                    />
                    <Select
                        value={this.state.orderBy}
                        onChange={this.handleChange}
                        options={PLAYERS_ORDER_BY}
                        placeholder="Ordenar por..."
                        isSearchable
                    />
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