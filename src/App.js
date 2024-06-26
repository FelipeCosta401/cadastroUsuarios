import { Routes, Route } from "react-router-dom";
import Home from './paginas/Home'

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home/>}/>
      <Route path={"/:id"} element={<Home/>}/>
      <Route path={"/del/:id"} element={<Home />}/>
    </Routes>
  );
}

export default App;
