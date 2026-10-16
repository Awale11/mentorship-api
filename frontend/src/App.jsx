import { useQuery } from '@tanstack/react-query'
import './App.css'
import Task from './Task';
import { Routes, Route, Navigate } from 'react-router';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AdminProtectedRoute } from './components/auth/AdminProtectedRoute';
import Admin from './pages/dashboard/Admin';

function App() {


  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      {/* TODO: add protected route */}
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <DashboardPage/>
        </ProtectedRoute>}/>
      {/* <Route path='/admin' element={
        <AdminProtectedRoute>
          <Admin/>
        </AdminProtectedRoute>}/> */}
      {/* Home page. page-ka ugu horeeyo login ha noqdo */}
      <Route path='/' element={<Navigate to='/login' replace/>}/>
    </Routes>
  )
}

export default App
 