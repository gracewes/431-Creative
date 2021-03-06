import 'regenerator-runtime/runtime'
import React from 'react'
import { LastLocationProvider } from 'react-router-last-location'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import GoBack from './components/goback'

// pages
import SplashPage from './splash-page/splash-page'
import Dashboard from './dashboard/index'
import PageNotFound from './page-not-found/page-not-found'
import AllPostings from './all-postings/all-postings'
import ShowPosting from './show-posting/show-posting'
import PostingPage from './posting-page/posting-page'

//
// Routes
//
export default (props) =>
  <Router>
    <LastLocationProvider>
      {/* Pick which page to render */}
      <Switch>
        <Route component={SplashPage} path='/' exact />
        <Route component={GoBack} path='/goback' exact />
        <Route component={SplashPage} path='/about' exact />
        <Route component={AllPostings} path='/postings' exact />
        <Route component={PostingPage} path='/makeposting' exact />
        <Route component={PostingPage} path='/editposting/:id' exact />
        <Route component={ShowPosting} path='/showposting/:id' exact />
        <Route component={Dashboard} path='/dashboard' exact />
        <Route component={PageNotFound} />
      </Switch>
    </LastLocationProvider>
  </Router>
