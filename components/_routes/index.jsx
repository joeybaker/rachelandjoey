import React from 'react'
import {Route, DefaultRoute, NotFoundRoute} from 'react-router'
import Entry from '../_entry/'
import Home from '../home/'
import Weekend from '../page-weekend/'
import RSVP from '../page-rsvp'
import NotFound from '../_notfound/'

export default (
  <Route path="/" handler={Entry}>
    <Route name="rsvp" handler={RSVP} />
    <Route name="weekend" handler={Weekend} />
    <DefaultRoute name="home" handler={Home} />
    <NotFoundRoute name="notFound" handler={NotFound}/>
  </Route>
)
