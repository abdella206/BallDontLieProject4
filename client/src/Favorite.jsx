import React from 'react';
import axios from 'axios';
import Home from './Home'
import ReactPlayer from 'react-player'


function Favorite({ players, handleInputChange, user, stats }) {

    function addFavs(player) {
        axios.post(`/users/${user._id}/players`, {
            firstName: player.first_name,
            lastName: player.last_name,
            playerId: player.id

        }).then(res => {
            axios.get(`/users/${user._id}/players`).then(res => {

            })
        })
    }






    let content;
    if (players.length) {
        content = players.map((player, id) => {
            return <h3 className="favp" key={id}> {player.first_name} {player.last_name}<p onClick={() => addFavs(player)} >🏀</p>  </h3>
        })
    }


    return (

        <section >
            <div className="youtube">
                <ReactPlayer url='https://www.youtube.com/watch?v=9CuMePT5fjQ' playing />

            </div>
                <h2>Search For Your Favorite Players!!</h2>
                <form action="">
                    <input type="text" onChange={(e) => handleInputChange(e.target.value)} />
                </form>
            <div className="sectionFav">
            {content}
            </div>
            <div className='basketball'>

            <div class="ball"></div>
            <div class="ball2"></div>
            <div class="ball3"></div>
            <div class="ball4"></div>

            </div>


        </section>


    );
}

export default Favorite;