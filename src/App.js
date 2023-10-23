import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Switch, Route } from 'react-router-dom';
import YourForm from './Components/YourForm';
import Card from './Components/Card';
import DetailsPage from './Components/DetailsPage';
import NavBar from './Components/NavBar';


function App() {
  const [userData, setUserData] = useState([]);

  const handleFormSubmit = (values) => {
    setUserData([...userData, values]);
  };

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/card" element={ <Card userData={userData} />}>
           
          </Route>
          <Route path="/details/:id" element={ <DetailsPage userData={userData} />}>
            
          </Route>
          <Route path="/" exact element={ <YourForm onSubmit={handleFormSubmit} />} >
            
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
