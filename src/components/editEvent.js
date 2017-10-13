// IMPORTS

/* NPM */
import React from 'react';
import PropTypes from 'prop-types';
// HOC/decorator to listen to Redux store state
import { connect } from 'react-redux';

import ColorItem from 'src/components/colorItem';
// Actions to add/remove event
import { addEvent } from 'src/actions';
import { editEvent } from 'src/actions';

// Styles
import css from './schedule.scss';

@connect(state => ({ events: state.eventsList}))
export default class EditEvent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: '',
      colorSet: [
        '#f15850', '#4aad93', '#50a8f1', '#f15086', '#21374b', '#491f73', '#5e1742', '#f18a41'
      ],
      selectedColor: '',
      eventName: this.props.editEvent ? this.props.editEvent.name : '',
      eventDesc: this.props.editEvent ? this.props.editEvent.desc : ''
    };
  }

  static propTypes = {
    events: PropTypes.objectOf(PropTypes.string),
  }

  componentDidMount() {
    this.setDefaultColor();
  }

  setDefaultColor = () => {
    let defaultColor = (this.props.editEvent) ? this.props.editEvent.color : this.state.colorSet[0];
    let colorElement = document.querySelector('[data-color="' + defaultColor + '"]');
    this.setState({ selectedColor: defaultColor });
    colorElement.classList.add(css.activeColor);
  }

  setRef = ref => { this.ref = ref; }
  setRefDesc = refDesc => { this.refDesc = refDesc}

  handleSubmit = (event) => {
      if(this.ref.value && this.state.selectedColor) {
        this.setState({ error: '' });
        if(this.props.editEvent) {
          this.props.dispatch(editEvent(this.ref.value, this.state.selectedColor, this.refDesc.value, this.props.editEvent.uuid));
        } else {
          this.props.dispatch(addEvent(this.ref.value, this.state.selectedColor, this.refDesc.value));
        }
        this.ref.value = '';
        this.props.selectEvent();
      } else {
        let errorContent = (
          <div>Incorrect value Name or Color</div>
        )
        this.setState({ error: errorContent });
      }
      event.preventDefault();

  };

  handleSetColor = (e) => {
    let elem = e.target.parentNode;
    this.setState({ selectedColor: elem.dataset.color });
    let colorList = document.getElementById('colorList');
    colorList.childNodes.forEach((color) => {
      color.classList.remove(css.activeColor);
    })
    elem.classList.add(css.activeColor);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let { error, colorSet } = this.state;
    let colorContent = '';

    if(colorSet.length) {
      colorContent = (
        <div>
          <div className={css.formLabel}>Color Event</div>
          <div id="colorList" className={css.colorListSelect}>
            {colorSet.map((colorItem, index) => (
              <ColorItem key={index} color={colorItem} onClick={(e) => this.handleSetColor(e)} />
            ))}
          </div>
        </div>
      )
    }

    return (
      <form onSubmit={this.handleSubmit} id="createEventForm">
        <div className={css.formGroup}>
          <div className={css.formLabel}>Name event (max 15 symbols)</div>
          <input ref={this.setRef} type="text" maxLength="15" value={this.state.eventName} name="eventName" onChange={(e) => this.handleChange(e)}/>
        </div>
        <div className={css.formGroup}>
          <div className={css.formLabel}>Description event</div>
          <textarea ref={this.setRefDesc} rows="2" name="text"  maxLength="30" value={this.state.eventDesc} name="eventDesc" onChange={(e) => this.handleChange(e)}></textarea>
        </div>
        <div className={css.formGroup}>
          {colorContent}
        </div>

        {error}
      </form>
    );
  }
}
