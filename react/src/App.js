import "./normal.css";
import "./App.css";
import Home from "./components/Home";
import AuthPage from "./components/login/AuthPage";
import LoginPage from "./components/login/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="auth/login" />;
  };

  return (
    <div className="App">
      <Routes>
        <Route
          index
          exact
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route exact path="auth/login" element={<AuthPage />} />
        <Route exact path="login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
