import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login'
import Signup from './Signup'
import Favorite from './Favorite'
import Details from './Details'
import Home from './Home'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';






function App() {
  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [apiData, setApiData] = useState(null)
  const [players, setPlayers] = useState([]);
  const [playerSearch, setPlayerSearch] = useState('')
  const [favPlayers, setFavPlayers] = useState([])
  const [currentPlayer, setCurrentPlayer] = useState([])
  const [playerId, setPlayerId] = useState()
  const [playerStats, setPlayerStats] = useState([])
  const [years, setYears] = useState(2018)





  useEffect(() => {
    var token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // token is invalid or missing
      localStorage.removeItem('mernToken');
      setToken('')
      setUser(null)
      // this.setState({
      //   token: '',
      //   user: null
      // })
    } else {
      // we found a token in localStorage, verify it
      axios.post('/auth/me/from/token', { token })
        .then(res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken')
            setToken('')
            setUser(null)
            setErrorMessage(res.data.message)
            
            // this.setState({
            //   token: '',
            //   user: null,
            //   errorMessage: res.data.message
            // })
          } else {
            localStorage.setItem('mernToken', res.data.token);
            setToken(res.data.token)
            setUser(res.data.user)
            setErrorMessage('')
            // this.setState({
            //   token: res.data.token,
            //   user: res.data.user,
            //   errorMessage: ''
            // })
          }
        })
    }
  }, [])
  const liftToken = ({ token, user }) => {
    console.log('setting user: ', user);
    console.log('setting token: ', token)
    setToken(token)
    setUser(user)
    // this.setState({
    //   token,
    //   user
    // })
  }

  // const addFav = (players) => {
  //   const newPlayerFavs = [...favPlayers, players]
  //   setFavPlayers(newPlayerFavs);

  // }

  useEffect(() => {
    if (playerSearch !== "") {
      axios.get(`https://www.balldontlie.io/api/v1/players/?search=${playerSearch}`)
        .then((response) => {
          console.log(response.data)
          setPlayers(response.data.data)
        })
    }

  }, [playerSearch])



  
  
  useEffect(() => {
    if (years > 1975) {
      console.log(`set status for player ${playerId} at ${years}`)
      axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${years}&player_ids[]=${playerId}`)
        .then((response) => {
          console.log(response.data.data + "years")
          setCurrentPlayer(response.data.data)
        })
    }

  }, [years,playerId])

  useEffect(() => {
    if (user) {
      axios.get(`/users/${user._id}/players`).then((response) => {
        setFavPlayers(response.data)
        console.log(response.data)
      })
    }

  }, [user,favPlayers])
  //favPlayers




  function stats(playerId) {
    console.log(`get stats for player ${playerId}`)
    setPlayerId(playerId)
    if (Object.keys(favPlayers).length) {
      axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${years}&player_ids[]=${playerId}`)
        .then((response) => {
          setCurrentPlayer(response.data.data)
          console.log(response.data)
        })
    }
  }





  function deleteFav(playerId) {
    axios.delete(`/users/${user._id}/players/${playerId}`).then(res => {
      axios.get(`/users/${user._id}/players`).then(res => {
        setFavPlayers(res.data)
        console.log(res.data)
      })
    })
  }



  function editFav(playerId) {
    axios.put(`/players/${playerId}`).then(res => {
      axios.get(`/users/${user._id}/players`).then(res => {
        setFavPlayers(res.data)
        console.log(res.data)
      })
    })
  }




  const logout = () => {
    // remove token from localStorage
    localStorage.removeItem('mernToken');
    // remove user and token from state
    setToken('')
    setUser(null)
    // this.setState({
    //   token: '',
    //   user: null
    // })
  }
  // useEffect(() => {
  //   checkForLocalToken()
  // }, [])
  var contents
  if (user) {
    contents = (
      <div className="flex">
        <Router>
          <nav className='nav'>
            <Link to='home'>Home</Link> |
            
          </nav>
          <p>Hello,  {user.name}</p>
          <p onClick={logout}>Logout</p>



          <Route exact path='/details' render={() => <Details  favPlayers={favPlayers} currentPlayer={currentPlayer} handleYearChange={setYears} />}  />



          <Route exact path='/home' render={() => < Favorite players={players}
            handleInputChange={setPlayerSearch}
            addFav={setFavPlayers}
            
            user={user} />} />

        <Route exact path='/home' render={() => <Home favPlayers={favPlayers} stats={stats} deleteFav={deleteFav} editFav={editFav} /> } />
        </Router>

      </div>
    );
  } else {
    contents = (
      <div>

        <Router>
        <Route exact path='/home' render={() =><Login liftToken={liftToken} /> }/>
        <Route exact path='/signup' render={() => <Signup liftToken={liftToken} />}/>
        </Router>


      </div>
    )
  }
  return (
    <>
      <header className="header">
        <div>🏀 BALLING!!!🏀</div>
      </header>
      <div className="App">

        {contents}
      </div>

    </>
  );
}
export default App;
















