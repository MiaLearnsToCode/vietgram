import React from 'react'
import ReactDOM from 'react-dom'
import 'spectre.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './style.scss'

import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

import Gems from './components/gems/Gems'
import GemsShow from './components/gems/GemsShow'


const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Navbar />
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/gems' component={Gems}/>
          <Route path='/gems/:gemId' component={GemsShow}/>
        </Switch>
        <Footer/>
      </main>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)