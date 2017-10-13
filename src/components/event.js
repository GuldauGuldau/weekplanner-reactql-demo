// IMPORTS

/* NPM */
import React from 'react';
import PropTypes from 'prop-types';

// HOC/decorator to listen to Redux store state
import { connect } from 'react-redux';
// Styles
import css from './schedule.scss';

@connect(state => ({ events: state.eventsList }))
export default class Schedule extends React.Component {

  render() {
    const events = this.props.events;

    let inner = (
      <span>Not found</span>
    );

    if(events.length) {
      events.forEach(currentEvent => {
        if (this.props.eventUUID == currentEvent.uuid) {
          let backgroundColor = {
            background: currentEvent.color
          }

          inner = (
            <div className={css.shEventBody} style={backgroundColor} >
              <div className={css.shEventName} title={currentEvent.name}>
                {currentEvent.name}
              </div>
              <div className={css.shEventDesc} title={currentEvent.desc}>
                {currentEvent.desc}
              </div>
            </div>
          );
        }
      });
    }

    return (
      <div className={css.shEvent}>{inner}</div>
    )
  }
}
