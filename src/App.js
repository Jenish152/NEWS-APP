
import './App.css';

import React, { Component } from 'react';
import News from './coomponent/News';
import Navbar from './coomponent/Navbar';
import { BrowserRouter as Router, Route, Link, Switch, Routes} 
        from "react-router-dom";
        import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apikey=process.env.REACT_NEWS_APP_API;
  state={
    progress:0
  }
  setprogress=(pro)=>{
    this.setState({
      progress:pro
    });
  }
  render() {
    return <div>
      <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
      <Routes>
      <Route exact path="/"  element={<News api={this.apikey} setprogress={this.setprogress} key="general" pagesize={15} category="general"/>}>    
      
      </Route>
      <Route exact path="/bussiness" element={<News api={this.apikey} setprogress={this.setprogress} key="bussiness" pagesize={15} category="bussiness"/>} >    
      
      </Route>
      <Route exact path="/entertainment" element={<News api={this.apikey} setprogress={this.setprogress} key="entertainment" pagesize={15} category="entertainment"/>} >    
      
      </Route>
      <Route exact path="/health" element={ <News api={this.apikey} setprogress={this.setprogress} key="health" pagesize={15} category="health"/>} >    
     
      </Route>
      <Route exact path="/science" element={<News api={this.apikey} setprogress={this.setprogress} key="science" pagesize={15} category="science"/>} >    
      
      </Route>
      <Route exact path="/sports" element={<News api={this.apikey} setprogress={this.setprogress} key="sports" pagesize={15} category="sports"/>} >    

      </Route>
      <Route exact path="/technology" element={<News api={this.apikey} setprogress={this.setprogress} key="technology" pagesize={15} category="technology"/>}>    
      
      </Route>
      </Routes>
      </Router>
    
    </div>;
  }
}

// export default App;
 