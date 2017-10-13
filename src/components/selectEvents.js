// IMPORTS

/* NPM */
import React from 'react';
import PropTypes from 'prop-types';

// HOC/decorator to listen to Redux store state
import { connect } from 'react-redux';

// Actions to add/remove event
import {removeEvent, addSchedule, removeEventFromSchedule } from 'src/actions';

// Styles
import css from './schedule.scss';

@connect(state => ({ events: state.eventsList}))
export default class SelectEvent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    events: PropTypes.objectOf(PropTypes.string),
  }

  removeEvent = (eventUUID, day, time) => {
    this.props.dispatch(removeEvent(eventUUID, day, time));
    this.props.dispatch(removeEventFromSchedule(eventUUID));
  }
  addSchedule = (eventUUID, day, time) => {
    this.props.dispatch(addSchedule(eventUUID, day, time));
    this.props.onChange();
  }

  editEvent = (event) => {
    this.props.editEvent(event);
  }
  getEvent = (event) => {
    let backgroundColor = {
      background: event.color
    }
    return (
      <div key={event.uuid} className={css.selectEventItem} style={backgroundColor}>
      <div className={css.eventItemMenu}>
        <div onClick={() => this.props.editEvent(event)}>Edit</div>
        <div onClick={() => this.removeEvent(event.uuid)}>Delete</div>
      </div>
      <div onClick={() => this.addSchedule(event.uuid, this.props.day, this.props.time)} className={css.eventArea}>
        <div className={css.shEventName}>{event.name}</div>
        <div className={css.shEventDesc}>{event.desc}</div>
      </div>
      </div>
    )
  }

  render() {
    const events = this.props.events;
    let inner;
    if (!events.length) {
      inner = (
        <h4>Not found events.</h4>
      );
    } else {
      inner = (
        <div className={css.selectEventList}>
          {events.map(currentEvent => (
            this.getEvent(currentEvent)
          ))}
        </div>
      );
    }
    return (
      <div>{inner}</div>
    );
  }
}
