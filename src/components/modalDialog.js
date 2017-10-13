// IMPORTS

/* NPM */
import React from 'react';
import ReactDOM from 'react-dom'

// Styles
import css from './schedule.scss';

export default class ModalDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.id = 'modal-root';
  }

  componentDidMount() {
    document.getElementById('main').appendChild(this.el);
  }

  componentWillUnmount() {
    document.getElementById('main').removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <div>
        <div className={css.modalDialog}>
          <div className={css.modalHeader}>
            {this.props.title}
            <button className={css.modalClose} onClick={this.props.onChange}>X</button>
          </div>
          <div className={css.modalBody}>
            {this.props.children}
          </div>
          <div className={css.modalFooter}>
              <div className={css.tsBtn} onClick={this.props.onChange}>Close</div>
              {this.props.footerBtn}
          </div>
        </div>
        <div className={css.modalDialogBackdrop}></div>
      </div>,
      this.el,
    );
  }
}
