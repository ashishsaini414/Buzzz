import {Navigate, Route, Routes} from "react-router-dom";
import "./App.css";
import Login from "./googleLogin/index";
import Dashboard from './Dashboard/dashboard'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from "./ProfilePage/profilePage";

function App() {
  const currentUserUsername = localStorage.getItem("currentUserUsername");
  
  return (
    <div className="App">
      <ToastContainer autoClose={2000}/>
      <Routes>
         <Route path="/" exact element={<Login/>}/>
         <Route path="/dashboard" element={<Dashboard/>}/>
         <Route path="/profile/:id" element={<ProfilePage/>}/>
      </Routes>
      </div>
  );
}

export default App;
