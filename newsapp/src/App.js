
import './App.css';
import Newsitems from './Newsitems';

import React from 'react'
import Navbar from './Navbar';
import News from './News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


const App = () => {
  const country="us"
  const pageSize=6;
  const apiKey=process.env.REACT_APP_NEWS_APIKEY
 
    return (
      <BrowserRouter>
        <Navbar/>
      
        <Routes>
        <Route  exact path="/" element={<News key="general" pageSize={pageSize} apiKey={apiKey} country={country} category="general"/>} />
        <Route  exact path="/business" element={<News key="business" pageSize={pageSize} apiKey={apiKey} country={country} category="business"/>} />
        <Route  exact path="/entertainment" element={<News key="entertainment" pageSize={pageSize} apiKey={apiKey} country={country} category="entertainment"/>} />
        
        <Route  exact path="/health" element={<News key="health" pageSize={pageSize} apiKey={apiKey} country={country} category="health"/>} />
        <Route  exact path="/science" element={<News key="science" pageSize={pageSize} apiKey={apiKey} country={country} category="science"/>} />
        <Route  exact path="/sports" element={<News key="sports" pageSize={pageSize} apiKey={apiKey} country={country} category="sports"/>} />
        <Route  exact path="/technology" element={<News key="technology" pageSize={pageSize} apiKey={apiKey} country={country} category="technology"/>} />
        </Routes>
      </BrowserRouter>
    )
  }

  export default App;

