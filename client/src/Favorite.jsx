import React from 'react';
import axios from 'axios';
import Home from './Home'


function Favorite({players, handleInputChange, addFavs, user, stats }) {
    
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
            return <h1 key={id}> {player.first_name} {player.last_name}<button onClick={() => addFavs(player) } > Add to favorites!</button>  </h1>
        })
    }


    return (

        <section className="fav">
            <h2>Search for your favorite players</h2>
            <form action="">
                <input type="text" onChange={(e) => handleInputChange(e.target.value)} />
                
            </form>
            {content}
            
        </section>


    );
}

export default Favorite;