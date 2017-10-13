// IMPORTS

/* NPM */
import React from 'react';
import PropTypes from 'prop-types'
// HOC/decorator to listen to Redux store state
import { connect } from 'react-redux';

// Actions to add/remove event
import { addEvent } from 'src/actions';

// Styles
import css from './schedule.scss';

@connect()
export default class ColorItem extends React.PureComponent {
  render() {
    let color = this.props.color;
    let backgroundStyle = {
      background: color
    }
    return (
      <div data-color={color} className={css.colorItemWrap} onClick={this.props.onClick}>
        <div className={css.colorItem} style={backgroundStyle}></div>
      </div>
    );
  }
}
