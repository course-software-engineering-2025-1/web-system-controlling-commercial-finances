import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Notifications from './pages/Notifications/Notifications';
import Dashboard from './pages/Dashboard/Dashboard';
import ProductManagement from './pages/ProductManagement/ProductManagement';
import TransactionManagement from './pages/TransactionManagement/TransactionManagement';
import ReportPage from './pages/ReportPage/ReportPage';
import ProfileSettings from './pages/ProfileSettings/ProfileSettings';
import UserManagement from './pages/UserManagement/UserManagement';
import Esquecisenha from './pages/EsqueciSenha/EsqueciSenha';
import Cadastro from './pages/Cadastro/Cadastro';
import MetasFinanceiras from './pages/MetasFinanceiras/MetasFinanceiras';
import CadastroFornecedor from './pages/CadastroFornecedor/CadastroFornecedor';
import CadastroCliente from './pages/CadastroCliente/CadastroCliente';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/produtos" element={<ProductManagement />} />
        <Route path="/transacoes" element={<TransactionManagement />} />
        <Route path="/relatorios" element={<ReportPage />} />
        <Route path="/perfilsettings" element={<ProfileSettings />} />
        <Route path="/usuarios" element={<UserManagement />} />
        <Route path="/notificacoes" element={<Notifications />} />
        <Route path="/esqueci-senha" element={<Esquecisenha />} />
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="/metas-financeiras" element={<MetasFinanceiras />} />
        <Route path="/cadastro-fornecedor" element={<CadastroFornecedor />} />
        <Route path="/cadastro-cliente" element={<CadastroCliente />} />
      </Routes>
    </Router>
  );
}

export default App;