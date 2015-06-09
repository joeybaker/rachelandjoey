import React from 'react'
import {Route, DefaultRoute, NotFoundRoute} from 'react-router'
import Entry from '../_entry/'
import Home from '../home/'
import Weekend from '../page-weekend/'
import About from '../page-about/'
import NotFound from '../_notfound/'

export default (
  <Route path="/" handler={Entry}>
    <Route name="weekend" handler={Weekend} />
    <Route name="about" handler={About} />
    <DefaultRoute name="home" handler={Home} />
    <NotFoundRoute name="notFound" handler={NotFound}/>
  </Route>
)
