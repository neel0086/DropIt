import React, { useEffect } from 'react';
import Login from './Login';
import UserPage from './drive/UserPage';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import {BrowserRouter as Router,Route,  Routes } from 'react-router-dom';
import NavBar from './drive/NavBar';
import Favourite from './drive/Favourite';
import Sidebar from './drive/Sidebar';
import Trash from './drive/Trash';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged(user => {
    if(user){
        dispatch(login({
        displayName:user.displayName,
        email:user.email,
        uuid:user.uid,
        photoUrl:user.photoURL

    }))
  }
    })
  },[])
  return (
    <div>
      <Router>
      {!user ? (
        <Login />
      ):(
    <div className="App">
      <NavBar/>
      <div style={{display:'flex',paddingTop:'20px'}}>
      <Sidebar/>
      {/* <UserPage /> */}
      <Routes>
        <Route path="/" element={<UserPage />} ></Route>
      </Routes>
      <Routes>
        <Route path="/trash" element={<Trash />} ></Route>
      </Routes>
      <Routes>
        <Route path="/favourite" element={<Favourite />} ></Route>
      </Routes>
      <Routes>
      <Route path="/Folder/:FolderId" element={<UserPage/>}></Route>
      </Routes>
    </div>
    </div>
      )}
     </Router>
    </div>

  );
}

export default App;
