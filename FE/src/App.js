import {Route, Routes} from "react-router-dom";
import "./App.css";
import Login from "./googleLogin/index";
import Dashboard from './Dashboard/dashboard'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // const currentUser = sessionStorage.getItem("currentUser");
  return (
    <div className="App">
      <ToastContainer autoClose={2000}/>
      <Routes>
         <Route path="/" exact element={<Login/>}/>:  
         {/* { currentUser ? <Route path="/api/dashboard" element={<Dashboard/>}/> : <Route to="/api/dashboard" element={<Navigate to="/login" element={<Login/>}/>}></Route>} */}
         <Route path="/api/dashboard" element={<Dashboard/>}/>
        </Routes>
      </div>
  );
}

export default App;
