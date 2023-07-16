import { Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/404";
import Container from "./components/container";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import DashboardLayout from "./dashboard/layout";
import Home from "./pages/home";

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Container><Login /></Container>} />
      <Route path="/register" element={<Container><Register /></Container>} />
      <Route path="/" element={<Container authRoute><DashboardLayout /></Container>} >
        <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
