// Component that display event by day and startinterval

// ----------------------
// IMPORTS

/* NPM */
import React from 'react';
import PropTypes from 'prop-types';
import Event from 'src/components/event';
import ModalDialog from 'src/components/modalDialog';
import SelectEvents from 'src/components/selectEvents';
import EditEvent from 'src/components/editEvent';

// HOC/decorator to listen to Redux store state
import { connect } from 'react-redux';

// Actions
import { removeSchedule } from 'src/actions';
// Styles
import css from './schedule.scss';

@connect(state => ({ customschedule: state.schedule }))
export default class Schedule extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        showModal: false,
        selectEvent: true,
        editEvent: false
      };
  }

  static propTypes = {
    customschedule: PropTypes.objectOf(PropTypes.string),
  }

  removeSchedule = (eventUUID, day, time) => {
    this.props.dispatch(removeSchedule(eventUUID, day, time));
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
    this.setState({ selectEvent: true });
  }

  handleCreateEvent = () => {
    this.setState({ selectEvent: false });
  }

  handleSelectEvent = () => {
    this.setState({ selectEvent: true });
    this.setState({ editEvent: false });
  }

  handleEditEvent = (event) => {
    this.setState({ editEvent: event });
  }

  render() {
    
    const customschedule = this.props.customschedule;
    const footerBtn = (
      <div>
      { (this.state.selectEvent && !this.state.editEvent) ? (
        <div onClick={() => this.handleCreateEvent()} className={css.actionBtn}>Create Event</div>
        ) : (
          <div>
            <div onClick={() => this.handleSelectEvent()} className={css.tsBtn}>&#60;&#60;Back</div>
            <button type="submit" form="createEventForm" className={css.actionBtn}>
              {this.state.editEvent ? 'Edit' : 'Create'}
            </button>
          </div>
        )
      }
      </div>
    )

    let inner = (
        <div className={css.shItemContent}>
          <div className={css.tsFullBtn} onClick={ () => this.handleOpenModal()}></div>
          { this.state.showModal &&
            <ModalDialog title="List Events" onChange={this.handleCloseModal} footerBtn={footerBtn}>
              {(this.state.selectEvent && !this.state.editEvent) ? (
                <SelectEvents day={this.props.day} time={this.props.time} onChange={this.handleCloseModal} editEvent={this.handleEditEvent}/>
              ) : (
                <EditEvent selectEvent={this.handleSelectEvent} editEvent={this.state.editEvent}/>
              )}
            </ModalDialog>
          }
        </div>
    );

    if(customschedule.length) {
      customschedule.forEach(currentEvent => {
        if (this.props.day == currentEvent.day &&
        this.props.time == currentEvent.startinterval) {
          inner = (
            <div className={css.shItemContent}>
              <Event eventUUID={currentEvent.eventUUID} />
              <div
                onClick={ () => this.removeSchedule(currentEvent.eventUUID, this.props.day, this.props.time)}
                className={css.shDeleteBtn}>X</div>
            </div>
          );
        }
      });
    }

    return (
      <div className={css.shItem}>
       {inner}
      </div>
    )
  }
}
