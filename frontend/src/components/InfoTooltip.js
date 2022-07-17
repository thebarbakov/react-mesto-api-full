import React from "react";

class InfoTooltip extends React.Component {
  render() {
    return (
      <div
        className={`popup ${
          this.props.autorisationResult !== null ? "popup_opened" : ""
        }`}
      >
        <div className="popup__container">
          <button
            className="popup__button-close"
            type="button"
            onClick={this.props.onClose}
          ></button>
          <div className={`popup__indicator ${this.props.autorisationResult ? "popup__indicator_success" : "popup__indicator_error"}`}></div>
          <div className="popup__text">{
          this.props.autorisationResult
          ? (<><p className="popup__paragraph">Вы успешно</p><p className="popup__paragraph">зарегистрировались!</p></>)
          : (<><p className="popup__paragraph">Что-то пошло не так!</p><p className="popup__paragraph">Попробуйте ещё раз.</p></>)}
          </div>
        </div>
        <div className="popup__overlay" onClick={this.props.onClose}></div>
      </div>
    );
  }
}

export default InfoTooltip;
