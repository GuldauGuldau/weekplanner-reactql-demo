// main component for schedule

// ----------------------
// IMPORTS

/* NPM */
import React from 'react';
import ScheduleItem from 'src/components/scheduleItem';
// HOC/decorator to listen to Redux store state
import { connect } from 'react-redux';
// Styles
import css from './schedule.scss';
// Actions to add/remove event
import { resetSchedule } from 'src/actions';
//Logo
import logo from 'src/components/main/schedule-logo.svg';

@connect()
export default class Schedule extends React.Component {

  resetSchedule = () => {
      this.props.dispatch(resetSchedule());
  };

  render() {

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
    const timePoints = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

    return (
      <div className={css.content}>
        <div className={css.asideSection}>
          <div className={css.headerContainer}>
            <img src={logo} alt="Schedule" className={css.logo} />
            <h1>Schedule</h1>
            <p>your amazing week</p>
            <p>planner</p>
            <div className={css.tsBtn} onClick={this.resetSchedule}>Reset</div>
          </div>
          <div className={css.copyright}>© 2017 WeekPlanner.  All rights reserved.</div>
        </div>

        <div className={css.scheduleSection}>
          <div className={css.shBody}>
            <div className={css.shColumn}>
              <div className={css.shHead + ' ' + css.shRow}>-</div>
              {timePoints.map((time, index) => (
                <div key={index} className={css.shRow + ' ' + css.shTime}>{time}</div>
              ))}
            </div>

            {days.map((day, index) => (
              <div key={index} className={css.shColumn}>
                <div className={css.shHead + ' ' + css.shRow}>{day}</div>
                {timePoints.map((time, index) => (
                  <div key={index} className={css.shRow}>
                    <ScheduleItem day={day} time={time} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
