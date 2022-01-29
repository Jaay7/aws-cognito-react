import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Confirmation from './components/Confirmation';
import Amplify from 'aws-amplify';
import ProtectedRoute from './ProtectedRoute';

Amplify.configure({
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_6p0eAyNQJ',
  aws_user_pools_web_client_id: '11on091aq6e8jc1tneg1l0gonm',
})

const App: React.FC = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Dashboard} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
