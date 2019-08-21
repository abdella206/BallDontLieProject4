import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 
function Details({ currentPlayer, handleYearChange }) {


    //     reb: 5.31,
    // ast: 4.5,
    // stl: 1.84,
    // blk: 0.38


    let content = <p>No Stats😢</p>;
    if (currentPlayer.length) {
        content =
            <>
                <div className='flexone'>

                    <div className='statsgame'><h1 className='statstext'>Games Played: {currentPlayer[0].games_played}</h1></div>

                    <div className='statspts'><h1>Points: {currentPlayer[0].pts}</h1></div>

                    <div className='statsreb'><h1>Rebounds: {currentPlayer[0].reb}</h1></div>
                </div>

                <div className='flextwo'>
                    <div className='statsast'><h1>Assists: {currentPlayer[0].ast}</h1></div>

                    <div className='statsblk'><h1>Blocks: {currentPlayer[0].blk}</h1></div>

                    <div className='statsstl'><h1>Steals: {currentPlayer[0].stl}</h1></div>
                </div>
            </>
    }







    return (

        <section className="fav">

            <h1>Player  Season Average Stats!</h1>
            <h1>Select Year: <input onChange={(e) => handleYearChange(e.target.value)} type="number" /></h1>
            {content}

        </section>


    );
}

export default Details;