import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/api/hotels" element={<List/>}/>
        <Route path="/api/hotels/find/:id" element={<Hotel/>}/>
        <Route path="api/login" element={<Login/>}/>
        <Route path="api/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
