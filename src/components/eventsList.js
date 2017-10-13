// IMPORTS

/* NPM */
import React from 'react';
import PropTypes from 'prop-types';
// HOC/decorator to listen to Redux store state
import { connect } from 'react-redux';

// Actions to add/remove event
import { addEvent, removeEvent } from 'src/actions';


@connect(state => ({ events: state.eventsList }))
export default class ListEvents extends React.PureComponent {
  static propTypes = {
    events: PropTypes.arrayOf(
      PropTypes.string,
    ),
  }
  setRef = ref => { this.ref = ref; }
  addEvent = () => {
    this.props.dispatch(addEvent(this.ref.value));
    this.ref.value = '';
  };
  removeEvent = (eventUUID) => {
    this.props.dispatch(removeEvent(eventUUID));
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
        <ul>
          {events.map(currentEvent => (
            <li key={currentEvent.uuid}>
              {currentEvent.name}
              <button onClick={() => this.removeEvent(currentEvent.uuid)}>Remove event</button>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div>
        {inner}
        <div>
          <input ref={this.setRef} type="text" />
          <button onClick={this.addEvent}>Add event</button>
        </div>
      </div>
    );
  }
}
