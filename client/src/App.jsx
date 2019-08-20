import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login'
import Signup from './Signup'
import Favorite from './Favorite'
import Details from './Details'
import Home from './Home'
import SignInSide from "./SignInSide";
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
  
  const [playerId, setPLayerId] = useState(null)





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
    if (user) {
      axios.get(`/users/${user._id}/players`).then((response) => {
        setFavPlayers(response.data)
        console.log(response.data)
      })
    }

  }, [user, ])
  //favPlayers







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
      <>
      
        <p>Hello,  {user.name}</p>
        <p onClick={logout}>Logout</p>

        <Router>

          <nav>
            <Link to='home'>Home</Link>{''}
            <br />
            <Link to='favorite'>Favorites</Link>
          </nav>
          <Route exact path='/favorite' render={() => <Home favPlayers={favPlayers} />} />

          <Route exact path='/details' render={() => <Details favPlayers={favPlayers} />} />

          <Route exact path='/home' render={() => < Favorite players={players}
            handleInputChange={setPlayerSearch}
            addFav={setFavPlayers}
            user={user} />} />

        </Router>

      </>
    );
  } else {
    contents = (
      <>

        <p>Please signup or login</p>
      
        <Login liftToken={liftToken} />
        <Signup liftToken={liftToken} />
      </>
    )
  }
  return (
    <div className="App">

      {contents}
    </div>
  );
}
export default App;
















// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       token: '',
//       user: null,
//       errorMessage: '',
//       apiDate: null
//     }
//     this.checkForLocalToken = this.checkForLocalToken.bind(this);
//     this.liftToken = this.liftToken.bind(this);
//     this.logout = this.logout.bind(this);
//   }

//   checkForLocalToken() {
//     var token = localStorage.getItem('mernToken')
//     if (!token || token === 'undefined') {
//       //  token is invalid or missing
//       localStorage.removeItem('mernToken');
//       this.setState({
//         token: '',
//         user: null
//       })
//     } else {
//       // we found a token in localStorage, verify it
//       axios.post('/auth/me/from/token', { token })
//         .then(res => {
//           if (res.data.type === 'error') {
//             localStorage.removeItem('mernToken')
//             this.setState({
//               token: '',
//               user: null,
//               errorMessage: res.data.message
//             })
//           } else {
//             localStorage.setItem('mernToken', res.data.token);
//             this.setState({
//               token: res.data.token,
//               user: res.data.user,
//               errorMessage: ''
//             })
//           }
//         })
//     }
//   }

//   liftToken(data) {
//     this.setState({
//       token: data.token,
//       user: data.user
//     })
//   }

//   logout() {
//     // Remove token from localStore
//     localStorage.removeItem('mernToken')
//     // Remove user and token from state
//     this.setState({
//       token: '',
//       user: null
//     })
//   }

//   componentDidMount() {
//     this.checkForLocalToken()
//   }

//   render() {
//     var user = this.state.user
//     var contents = ''
//     if (user) {
//       contents = (
//         <>
//           <p>Hello,  {user.name} we ballinnnnn</p>
//           <p onClick={this.logout}>Logout</p>
//           <Home />

//         </>
//       )
//     } else {
//       contents = (
//         <>

//           <p>PLease signup or login</p>
//           <Login liftToken={this.liftToken} />
//           <Signup liftToken={this.liftToken} />
//         </>
//       );
//     }
//     return (
      // <div className="App">

      //   {contents}
      // </div>

//     );
//   }
// }










// export default App;
