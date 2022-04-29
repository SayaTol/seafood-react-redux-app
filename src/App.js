import React from "react"
import Home from "./components/Home"
import './App.css'
import {Routes, Route} from 'react-router-dom'


//"Loading" with class component
class App extends React.Component {
  constructor () {
    super()
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {


    setTimeout(() => {
      this.setState({isLoading: false})
    }, 2000)

  }



  render() {
    return this.state.isLoading ? <h2 style={{textAlign: "center"}}>Loading....</h2> :
      <Routes>
        <Route exact path='/' element={<Home />} />
      </Routes>
  }

}



export default App
