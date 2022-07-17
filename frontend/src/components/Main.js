import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import WithRouter from "./WithRouter";

class Main extends React.Component {
  static contextType = CurrentUserContext;

  render() {
    return (
      <main className="main">
        <section className="profile">
          <div className="profile__block">
            <div className="profile__avatar">
              <img
                className="profile__photo"
                src={this.context.avatar}
                alt="Аватар"
              />
              <div
                className="profile__photo-overllay"
                onClick={this.props.onEditAvatar}
              ></div>
            </div>
            <div className="profile__info">
              <h1 className="profile__name">{this.context.name}</h1>
              <button
                className="profile__button-edit"
                type="button"
                onClick={this.props.onEditProfile}
              ></button>
              <p className="profile__job">{this.context.about}</p>
            </div>
          </div>
          <button
            className="profile__button-add"
            type="button"
            onClick={this.props.onAddPlace}
          ></button>
        </section>
        <section className="elements">
          {this.props.cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onClickImage={this.props.onOpenCard}
                onLikeCard={this.props.onLikeCard}
                onDeleteCard={this.props.onDeleteCard}
              />
            );
          })}
        </section>
      </main>
    );
  }
}

export default WithRouter(Main);
