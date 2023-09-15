
import './App.css';
import Home from './Pages/Home';
import Create from './Pages/Create';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Posts from './Pages/Posts';
import { Route,Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
function App() {
  const user=useSelector(state=>{return state.auth.isAuth});

  return (
    <div className="App">
     <Routes>
        <Route path="/" element={user?<Home/>:<Signup/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/posts/" element={<Posts/>}/>
     </Routes>
    </div>
  );
}

export default App;
