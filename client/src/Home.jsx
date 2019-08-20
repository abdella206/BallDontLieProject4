import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './App.css'


function Home({ favPlayers, stats }) {

    
    let favs;
    let content = <h1>Loading</h1>
    if (Object.keys(favPlayers).length) {


        content = <h1>My Favorites Players!!! <hr /></h1>
        console.log(favPlayers.players[0])

        favs = favPlayers.players.map((player, id) => {
            return <h1 key={id}> <Link  onClick={() => stats(player.playerId) } to='/details' class>{player.firstName} {player.lastName}</Link>  </h1>
        })
    }




    return (
        <section>

            {content}
            {favs}
            



        </section>
    )
}

export default Home;
