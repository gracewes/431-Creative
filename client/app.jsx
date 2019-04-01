import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { DIV } from 'good-dom'
import fetch from 'isomorphic-fetch'

import Routes from './routes'
import { classes } from './theme'
import { HOST_AND_PROTOCOL } from '../backend/config'

// CSS for toast notifications
import 'react-toastify/dist/ReactToastify.min.css'

//
// set body
//
const reactContainer = new DIV({
  style: classes.body
})
document.body.children = [
  reactContainer
]

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentWillMount () {
    this.authenticate()
    if (localStorage.getItem('user') !== 'undefined' && localStorage.getItem('user') !== undefined) {
      try {
        window.user = JSON.parse(localStorage.getItem('user'))
      } catch (e) {}
      this.setState({ loading: false })
    }
  }

  async authenticate () {
    try {
      let res = await fetch(`${HOST_AND_PROTOCOL}/auth/google/authenticate`, {
        mode: 'no-cors'
      })
      let data = await res.json()

      /* istanbul ignore if */
      if (data.authenticated) {
        console.log('AUTHENTICATED')
        localStorage.setItem('user', JSON.stringify(data.user))
        window.user = data.user
      } else {
        console.log('NOT AUTHENTICATED')
        localStorage.setItem('user', undefined)
        window.user = undefined
      }
    } catch (err) {
      console.error('Ran into an issue checking authentication...', err)
    } finally {
      this.setState({ loading: false })
    }
  }

  render () {
    return this.state.loading
      ? <div />
      : <Routes />
  }
}

// put the pages inside the container
ReactDOM.render(React.createElement(App), reactContainer)
export default App
