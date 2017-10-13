// IMPORTS

// React
import React from 'react';

// Routing via React Router
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';

// <Helmet> component for setting the page title/meta tags
import Helmet from 'react-helmet';

/* ReactQL */

// NotFound 404 handler for unknown routes
import { Redirect } from 'kit/lib/routing';

/* App */

import Schedule from 'src/components/schedule';
import EventsList from 'src/components/eventsList';

// Styles
import css from './main.scss';

import logo from './schedule-logo.svg';

export default () => (
  <div>
    <Helmet
      title="Week schedule"
      meta={[{
        name: 'description',
        content: 'Week Schedule',
      }]} />
    <Schedule />
  </div>
);
