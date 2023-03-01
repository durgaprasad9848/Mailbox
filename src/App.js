import { Indbox } from "./pages/Indbox";
import { Welcome } from "./pages/Welcome";
import { Auth } from "./pages/Auth";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { useSelector } from "react-redux";
import ComposeMail from "./pages/ComposeMail";
import { Indexitem } from "./pages/Indexitem";
 
function App() {
  const isLogin = useSelector((state)=>state.auth.isLogin);
 
  return (
    <BrowserRouter> 
    
      {!isLogin && <Auth/>}
      {isLogin && <Welcome/>}
      <Routes>
        {isLogin && <Route path="/Welcome" element={<Welcome/>}/>}
        {isLogin && <Route path ="/Compose" element={<ComposeMail/>}/> }
        {isLogin && <Route path ="/Indbox" element={<Indbox/>}/> }
        {isLogin && <Route path ="/Indexitem/:id" element={<Indexitem/>} /> }
       
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
