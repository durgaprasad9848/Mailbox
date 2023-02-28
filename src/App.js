import { Welcome } from "./pages/Welcome";
import { Auth } from "./pages/Auth";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { useSelector } from "react-redux";
function App() {
  const isLogin = useSelector((state)=>state.auth.isLogin);
 
  return (
    <BrowserRouter> 
    
      {!isLogin && <Auth/>}
      {isLogin && <Welcome/>}
      <Routes>
        {isLogin && <Route path="./Welcome" element={<Welcome/>}/>}

       
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
