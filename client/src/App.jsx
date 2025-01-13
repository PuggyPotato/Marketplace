import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./Home";
import ListItem from "./ItemList/ListItem";
import Marketplace from "./ItemList/Marketplace.jsx";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import CheckOffer from "./Offers/CheckOffer.jsx";
import OffersList from "./Offers/OffersList.jsx";
import MessageContainer from "./Chats/MessageContainer.jsx";


function App(){



  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path ="/login" element={<Login/>}></Route>
          <Route path ="/register" element={<Register/>}></Route>
          <Route path ="/" element={<Home/>}></Route>
          <Route path ="/listitem" element ={<ListItem/>}></Route>
          <Route path ="/Marketplace" element={<Marketplace/>}></Route>
          <Route path ="/checkoffer" element={<CheckOffer/>}></Route>
          <Route path ="/offerlist" element={<OffersList/>}></Route> 
          <Route path ="/message" element={<MessageContainer/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App