import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { Cadastro } from "./pages/cadastro/cadastro";
import { Login } from "./pages/login/login";
import StoreProvider from "./store/provider";
import ProtectedRoute from "./routes/Private";
import { Home } from "./pages/Home/home";
import { Navbar } from "./components/navbar/navbar";
import { Listas } from "./pages/listas/listas";

export function AppRoutes() {
    return (
        <Router>
            <StoreProvider>
                <Navbar />
                <div className="wrapper">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/home" element={<Home />} />
                            <Route path="/listas" element={<Listas />} />
                        </Route>
                        <Route path="*" element={<p>There's nothing here: 404!</p>} />
                    </Routes>
                </div>
            </StoreProvider>
        </Router>
    )
}