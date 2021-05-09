import React from 'react';
import axios from 'axios';
import "./scss/style.scss";

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
    <div className="App">
      {'Test page'}
    </div>
  );
}

export default App;
