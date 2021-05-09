import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom'
import './scss/style.scss';
import Home from './pages'

axios.post('http://localhost:8080/api/login', {
  email: 'admin@admin.com',
  password: 'admin1234'
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});

function App() {
  return (
    <Router>
      <Home/>
    </Router>
  );
}

export default App;
