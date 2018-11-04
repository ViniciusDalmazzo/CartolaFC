import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';
import Modal from "react-responsive-modal";

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

            <div className="player-list">
                {playersFilter.map(player => (
                    <div className="player-div" key={player.atleta_id}>
                        <div className="titulo">
                        <strong>{player.nome}</strong> ({player.apelido})
                        </div>
                        

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
                        <button onClick={this.onOpenModal}>Ver mais informações</button>
                        <Modal open={this.state.open} onClose={this.onCloseModal} little>
                        <hr></hr>
                            <h2>Teste</h2>
                        </Modal>
                    </div>
                ))}
            </div>
        );
    }
}