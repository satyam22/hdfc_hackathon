import React, { Component } from 'react';
import { getAllProjects } from './api';
import { message } from 'antd';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Projects from './components/Projects';
import Project from './components/Project';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      projects: [],
      status: 'pending'
    }
  }
  componentDidMount(){
    getAllProjects(({ success, results, message:msg }) => {
      if(success) {
        this.setState({ projects: results })
      }
      else message.error(msg);
    });
  }

  render(){
    const { match } = this.props;

    const { projects } = this.state;
    return(
      <div className = "App">
      <Switch>
        <Route exact path = '/' render = {() => <Projects projects = {projects} />} />
        <Route exact path = '/:id' render = {(match) => <Project projects = {projects} match = {match}/>} />
        </Switch>
      </div>
    )
  }
}