// import './App.css';
import React, { Component } from 'react'
import Navbar from './Component/Navbar';
import News from './Component/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
export default class App extends Component {
  pageSize=15;
  apiKey=process.env.REACT_APP_NEWS_API
state={
    progress:0
  }
  setProgress=(progress)=>{
    
    this.setState({progress: progress})
  }

  render() {
    return (
        <Router>
      <div>
         <Navbar />
         <LoadingBar
        color='#f11946'
        progress={this.state.progress}
       
      />
          <Routes>
          <Route  path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='Business' pageSize={this.pageSize} country="in" category='general' />}> </Route>
            <Route  path="/Business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='Business' pageSize={this.pageSize} country="in" category='Business' />}> </Route>
            <Route  path="/Entertainment"element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='Entertainment' pageSize={this.pageSize} country="in" category='Entertainment' />}></Route>
            <Route  path="/General"element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='general' pageSize={this.pageSize} country="in" category='general' />}></Route>
            <Route  path="/Health"element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='Health' pageSize={this.pageSize} country="in" category='Health' />}></Route>
            <Route  path="/Science"element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='Science' pageSize={this.pageSize} country="in" category='Science' />}></Route>
            <Route  path="/Sports"element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='Sports' pageSize={this.pageSize} country="in" category='Sports' />}></Route>
            <Route  path="/Technology"element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='Technology' pageSize={this.pageSize} country="in" category='Technology' />}></Route>
            </Routes>
      </div>
        </Router>
    )
  }
}