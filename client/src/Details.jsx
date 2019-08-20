import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 
function Details({ favPlayers, players, handleInputChange }) {

    // const [playerStats, setPLayerStats] = useState([])





    // useEffect(() => {
    //     if (Object.keys(favPlayers).length) {
    //     axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${2010}&player_ids[]=${favPlayers.players[0].playerId}`)
    //         .then((response) => {
    //             setPLayerStats(response.data.data)
    //             console.log(response.data)
    //         })
    //     }

    // }, [])





    return (

        <section className="fav">

            <h1>hello</h1>
        </section>


    );
}

export default Details;