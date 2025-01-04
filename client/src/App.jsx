import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./Home";
import { BrowserRouter,Route,Routes } from "react-router-dom";


function App(){



  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path ="/login" element={<Login/>}></Route>
          <Route path ="/register" element={<Register/>}></Route>
          <Route path ="/" element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App