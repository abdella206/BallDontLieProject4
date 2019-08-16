import React from 'react';


function Favorite({ players, handleInputChange }) {


    let content;
    if (players.length) {
        content = players.map((player, id) => {
            return <h1 key={id}> {player.first_name} {player.last_name}</h1>
        })
    }


    return (

        <section className="fav">
            <h2>Search for your favorite players</h2>
            <form action="">
                <input type="text" onChange={(e) => handleInputChange(e.target.value)} />
                {/* <button type='submit' onClick={() => players()}>search</button> */}
            </form>
            {content}
        </section>


    );
}

export default Favorite;