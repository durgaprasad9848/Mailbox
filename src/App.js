import { Indbox } from "./pages/Indbox";
import { Welcome } from "./pages/Welcome";
import { Auth } from "./pages/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ComposeMail from "./pages/ComposeMail";
import { Indexitem } from "./pages/Indexitem";
import { Sentbox } from "./pages/Sentbox";
import { Sentitem } from "./pages/Sentitem";
import { fetchDataind } from "./slice/Contentslice";
import { useDispatch } from "react-redux";
function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  setInterval(() => {
    fetchDataind(dispatch);
  }, 2000);
  return (
    <BrowserRouter>
      {!isLogin && <Auth />}
      {isLogin && <Welcome />}
      <Routes>
        {isLogin && <Route path="/Welcome" element={<Welcome />} />}
        {isLogin && <Route path="/Compose" element={<ComposeMail />} />}
        {isLogin && <Route path="/Indbox" element={<Indbox />} />}
        {isLogin && <Route path="/Sentbox" element={<Sentbox />} />}
        {isLogin && <Route path="/Indexitem/:id" element={<Indexitem />} />}
        {isLogin && <Route path="/Sentboxitem/:id" element={<Sentitem />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
