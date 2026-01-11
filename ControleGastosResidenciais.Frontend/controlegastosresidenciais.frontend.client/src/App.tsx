import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Pages
import Inicio from './pages/Inicio';
import Categorias from './pages/Categorias';
import Pessoas from './pages/Pessoas';
import Transacoes from './pages/Transacoes';
import Relatorios from './pages/Relatorios';

function App() {
    return (
        <Router>
            <div style={{ display: 'flex', height: '100vh' }}>
                {/* Menu lateral */}
                <nav
                    style={{
                        width: "220px",
                        background: "#1f2937",
                        color: "#fff",
                        padding: "1rem",
                        height: "100vh",
                        position: "fixed",
                        left: 0,
                        top: 0
                    }}>
                    <h2>Controle de Gastos</h2>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: "1rem" }}>
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/categorias">Categorias</Link></li>
                        <li><Link to="/pessoas">Pessoas</Link></li>
                        <li><Link to="/transacoes">Transações</Link></li>
                        <li><Link to="/relatorios">Relatórios</Link></li>
                    </ul>
                </nav>

                {/* Área principal */}
                <main
                    style={{
                        marginLeft: "220px",
                        padding: "1rem",
                        flex: 1,
                        overflowY: "auto",
                        height: "100vh"
                    }}>
                    <Routes>
                        <Route path="/" element={<Inicio />} />
                        <Route path="/categorias" element={<Categorias />} />
                        <Route path="/pessoas" element={<Pessoas />} />
                        <Route path="/transacoes" element={<Transacoes />} />
                        <Route path="/relatorios" element={<Relatorios />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

