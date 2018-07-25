import React from 'react'
import {Navbar, SearchBar, Footer} from './components'
import Routes from './routes'




const App = (props) => {
  const {children} = props
  return (
    <div>
      <Navbar />
      <hr />
      <div className="main-container">
        {children}
      <Routes />
    </div>
  </div>
  )
}

export default App