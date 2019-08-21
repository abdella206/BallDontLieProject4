import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modali, { useModali } from 'modali';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './App.css'


function Home({ deleteFav, favPlayers, stats, user }) {
    const [exampleModal, toggleExampleModal] = useModali();

    let favs;
    let content = <h1>Loading</h1>
    if (Object.keys(favPlayers).length) {


        content = <h1>My Favorites Players!!! <hr /></h1>
        console.log(favPlayers.players[0])

        favs = favPlayers.players.map((player, id) => {
            return <h1 key={id}> <Link onClick={() => stats(player.playerId)} to='/details' style={{ color: 'gold' }} activeStyle={{ color: 'red' }}>{player.firstName} {player.lastName}</Link>{' '}
                <button onClick={() => deleteFav(player._id)}>Delete</button>

            </h1>
        })
    }




    return (
        <section>
            {content}
            {favs}
            <button onClick={toggleExampleModal}>
                Click me to open a basic modal
    </button>
            <Modali.Modal {...exampleModal}>
                Hi, I'm a Modali!
        </Modali.Modal>
        </section>
    )
}

export default Home;
