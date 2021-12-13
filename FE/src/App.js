import { Route, Routes} from "react-router-dom";
import "./App.css";
import Login from "./googleLogin/index";
import Dashboard from './Dashboard/dashboard'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </div>
  );
}

export default App;
