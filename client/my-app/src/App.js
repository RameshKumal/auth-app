import "./index.css";

import { Route, Routes,useNavigate } from "react-router-dom";

import NotFoundPage from "./component/LoginForm/404";
import Home from "./component/LoginForm/Home";
import Header from "./component/LoginForm/header";
import HomePage from "./component/LoginForm/HomePage";
import LoginForm from "./component/LoginForm/LoginForm";
import LoginPage from "./component/LoginForm/LoginPage";
import StoreOwner from "./component/LoginForm/StoreOwner"

function App() {
 
  return (
    <>
      <Header />

      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/register" element={<LoginForm />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/StoreOwner" element={<StoreOwner />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

