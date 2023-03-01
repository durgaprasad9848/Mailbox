import { Indbox } from "./pages/Indbox";
import { Welcome } from "./pages/Welcome";
import { Auth } from "./pages/Auth";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { useSelector } from "react-redux";
import ComposeMail from "./pages/ComposeMail";
function App() {
  const isLogin = useSelector((state)=>state.auth.isLogin);
 
  return (
    <BrowserRouter> 
    
      {!isLogin && <Auth/>}
      {isLogin && <Welcome/>}
      <Routes>
        {isLogin && <Route path="/Welcome" element={<Welcome/>}/>}
        <Route path ="/Compose" element={<ComposeMail/>}/>
        <Route path ="/Indbox" element={<Indbox/>}/>
       
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
