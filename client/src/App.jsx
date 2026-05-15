
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Labs from "./pages/Labs";
import LabDetails from "./pages/LabDetails";
import AssetDetails from "./pages/AssetDetails";
import ForgotPassword from "./pages/ForgotPassword";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/labs"
          element={<Labs />}
        />
        <Route
          path="/labs/:id"
          element={<LabDetails />}
         />

         <Route
           path="/asset/:id"
           element={<AssetDetails />}
          />

          <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;