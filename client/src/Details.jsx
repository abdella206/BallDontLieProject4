import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 
function Details({currentPlayer}) {


//     reb: 5.31,
// ast: 4.5,
// stl: 1.84,
// blk: 0.38

            
    let content = <p>loading</p>;
    if (currentPlayer.length) {
        content = <>
            <>Games Played: {currentPlayer[0].games_played}</>
            <hr/>
            <>Points: {currentPlayer[0].pts}</>
            <hr/>
            <>Rebounds: {currentPlayer[0].reb}</>
            <hr/>
            <>Assists: {currentPlayer[0].ast}</>
            <hr/>
            <>Blocks: {currentPlayer[0].blk}</>
            <hr/>
            <>Steals: {currentPlayer[0].stl}</>
        </>
    }







    return (

        <section className="fav">

            <h1>Player  Season Average Stats!</h1>
            <h1>{content} </h1>
            
        </section>


    );
}

export default Details;