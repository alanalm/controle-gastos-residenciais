import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Pages
import Inicio from './pages/Inicio';
import Categorias from './pages/Categorias';
import Pessoas from './pages/Pessoas';
import Transacoes from './pages/Transacoes';

function App() {
    return (
        <Router>
            <div style={{ display: 'flex', minHeight: '100vh' }}>
                {/* Menu lateral */}
                <nav style={{ width: '200px', background: '#f0f0f0', padding: '1rem' }}>
                    <h2>Controle de Gastos</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/categorias">Categorias</Link></li>
                        <li><Link to="/pessoas">Pessoas</Link></li>
                        <li><Link to="/transacoes">Transações</Link></li>
                    </ul>
                </nav>

                {/* Área principal */}
                <main style={{ flex: 1, padding: '1rem' }}>
                    <Routes>
                        <Route path="/" element={<Inicio />} />
                        <Route path="/categorias" element={<Categorias />} />
                        <Route path="/pessoas" element={<Pessoas />} />
                        <Route path="/transacoes" element={<Transacoes />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
