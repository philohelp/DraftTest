import React, { Component } from 'react';
import styles from './embedBtnStyles.module.css';
import { convertToRaw } from 'draft-js';

export default class VideoAdd extends Component {
  // Start the popover closed
  state = {
    url: '',
    open: false,
  };

  // When the popover is open and users click anywhere on the page,
  // the popover should close
  componentDidMount() {
    document.addEventListener('click', this.closePopover);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePopover);
  }

  // Note: make sure whenever a click happens within the popover it is not closed
  onPopoverClick = () => {
    this.preventNextClose = true;
  };

  openPopover = () => {
    if (!this.state.open) {
      this.preventNextClose = true;
      this.setState({
        open: true,
      });
    }
  };

  closePopover = () => {
    if (!this.preventNextClose && this.state.open) {
      this.setState({
        open: false,
      });
    }

    this.preventNextClose = false;
  };

  addResource = () => {
    const { editorState, onChange } = this.props;
    onChange(this.props.modifier(editorState, { src: this.state.url }));
    const currentContent = this.props.modifier(editorState, { src: this.state.url }).getCurrentContent();
    const es = convertToRaw(currentContent);
    console.log("from button", es)
  };

  changeUrl = (evt) => {
    this.setState({ url: evt.target.value });
  };

  render() {
    const popoverClassName = this.state.open ?
      styles.addEmbedPopover :
      styles.addEmbedClosedPopover;
    const buttonClassName = this.state.open ?
      styles.addEmbedPressedButton :
      styles.addEmbedButton;

    return (
      <div className={styles.addEmbed} >
        <button
          className={buttonClassName}
          onMouseUp={this.openPopover}
          type="button"
        >
          +
        </button>
        <div
          className={popoverClassName}
          onClick={this.onPopoverClick}
        >
          <input
            type="text"
            placeholder="Collez l'adresse de la page…"
            className={styles.addEmbedInput}
            onChange={this.changeUrl}
            value={this.state.url}
          />
          <button
            className={styles.addEmbedConfirmButton}
            type="button"
            onClick={this.addResource}
          >
            Insérer
          </button>
        </div>
      </div>
    );
  }
}