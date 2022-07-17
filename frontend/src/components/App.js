import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import AddPlacePopup from "../components/AddPlacePopup";
import DeleteCardPopup from "../components/DeleteCardPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Routes, Route } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import apiAuth from "../utils/apiAuth";
import WithRouter from "./WithRouter";
import { Redirect } from "./Redirect";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      cards: [],
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: null,
      deletingCard: null,
      isLoading: false,
      isLogged: false,
      loggedEmail: null,
      autorisationResult: null,
    };
  }

  handleCardClick = (card) => {
    this.setState({ selectedCard: card });
  };

  handleEditAvatarClick = () => {
    this.setState({ isEditAvatarPopupOpen: true });
  };

  handleEditProfileClick = () => {
    this.setState({ isEditProfilePopupOpen: true });
  };

  handleAddPlaceClick = () => {
    this.setState({ isAddPlacePopupOpen: true });
  };

  handleDeleteCardClick = (card) => {
    this.setState({ deletingCard: card });
  };

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: null,
      deletingCard: null,
      isLoading: false,
      autorisationResult: null,
    });
  };

  componentDidMount() {
    if (localStorage.getItem("userData") !== null) {
      apiAuth
        .verifyUserInfo()
        .then((res) => {
          this.setState({ isLogged: true });
          this.setState({ loggedEmail: res.email });
        })
        .catch((rej) => console.log(rej));
    }
  }

  componentDidUpdate() {
    if (this.state.isLogged && this.state.currentUser.name === undefined) {
      api
        .getInitialInfo()
        .then((res) => {
          this.setState({
            currentUser: res[0],
            cards: res[1],
          });
        })
        .catch((rej) => console.error(`Error: ${rej.status}`));
    }
  }
  handleCardLike = (card) => {
    const isLiked = card.likes.includes(this.state.currentUser._id);

    api
      .changeLikeStatus(card._id, isLiked)
      .then((res) => {
        this.setState({
          cards: this.state.cards.map((i) => (i._id === card._id ? res : i)),
        });
      })
      .catch((rej) => console.error(`Error: ${rej.status}`));
  };

  handleCardDeleteSubmit = () => {
    this.setState({ isLoading: true });
    api
      .deleteCard(this.state.deletingCard._id)
      .then((res) => {
        this.setState({
          cards: this.state.cards.filter(
            (i) => i._id !== this.state.deletingCard._id
          ),
        });
        this.closeAllPopups();
      })
      .catch((rej) => console.error(`Error: ${rej.status}`))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleUpdateUserSubmit = ({ profileName, profileJob }) => {
    this.setState({ isLoading: true });
    api
      .setUserInfo({ name: profileName, about: profileJob })
      .then((newUserInfo) => {
        this.setState({ currentUser: {...this.state.currentUser, name: newUserInfo.name, about: newUserInfo.about} });
        this.closeAllPopups();
      })
      .catch((rej) => console.error(`Error: ${rej.status}`))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleUpdateAvatarSubmit = ({ avatarUrl }) => {
    this.setState({ isLoading: true });
    api
      .setUserAvatar({ avatar: avatarUrl })
      .then((newUserInfo) => {
        this.setState({ currentUser: newUserInfo });
        this.closeAllPopups();
      })
      .catch((rej) => console.error(`Error: ${rej.status}`))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleAddPlaceSubmit = async ({ name, link }) => {
    let pomiseStatus = null;
    this.setState({ isLoading: true });
    await api
      .addCard({ name: name, link: link })
      .then((newCard) => {
        this.setState((prevState) => ({
          cards: [newCard, ...prevState.cards],
        }));
        this.closeAllPopups();
        pomiseStatus = true
      })
      .catch((rej) => {
        console.error(`Error: ${rej.status}`);
        pomiseStatus = false
      })
      .finally(() => this.setState({ isLoading: false }));
    return new Promise(function (resolve, reject) {
     pomiseStatus ? resolve() : reject()
    });
  };

  handleRegisterSubmit = ({ email, password }) => {
    this.setState({ isLoading: true });
    apiAuth
      .registerUser({ email: email, password: password })
      .then(() => {
        this.setState({ autorisationResult: true });
        this.props.router.navigate("/sign-in", { replace: true });
      })
      .catch((rej) => {
        this.setState({ autorisationResult: false });
        console.error(`Error: ${rej}`);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  handleLoginSubmit = ({ email, password }) => {
    this.setState({ isLoading: true });
    apiAuth
      .loginUser({ email: email, password: password })
      .then((res) => {
        localStorage.setItem("userData", res["token"]);
        this.setState({ isLogged: true, loggedEmail: email });
        this.props.router.navigate("/", { replace: true });
      })
      .catch((rej) => {
        this.setState({ autorisationResult: false });
        console.error(`Error: ${rej}`);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  submitLogOut = () => {
    localStorage.removeItem("userData");
    this.setState({ isLogged: false, loggedEmail: null, currentUser: {} });
  };

  render() {
    return (
      <>
        <Header
          loggedEmail={this.state.loggedEmail}
          onSignOut={this.submitLogOut}
        />
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                this.state.isLogged ? (
                  <Main
                    isLogged={this.state.isLogged}
                    onEditAvatar={this.handleEditAvatarClick}
                    onEditProfile={this.handleEditProfileClick}
                    onAddPlace={this.handleAddPlaceClick}
                    onOpenCard={this.handleCardClick}
                    onLikeCard={this.handleCardLike}
                    onDeleteCard={this.handleDeleteCardClick}
                    cards={this.state.cards}
                  />
                ) : (
                  <Redirect to="/sign-in" />
                )
              }
            />
            {/* В react-router-dom v6 дочерними элементами Routes может быть только Route или React.Fragment
            Пытался сделать так, как было в тренажере с небольшими ухищрениями, нов высегда была ошибка
            Uncaught Error: [ProtectedRoute] is not a <Route> component. All component children of 
            <Routes> must be a <Route> or <React.Fragment>
            Поэтому пришлось реализовать функционал этого компонента прямо в App */}
            <Route
              exact
              path="/sign-in"
              element={
                <Login
                  isLogged={this.state.isLogged}
                  onSubmit={this.handleLoginSubmit}
                  isLoading={this.state.isLoading}
                />
              }
            />
            <Route
              exact
              path="/sign-up"
              element={
                <Register
                  isLogged={this.state.isLogged}
                  onSubmit={this.handleRegisterSubmit}
                  isLoading={this.state.isLoading}
                />
              }
            />
          </Routes>
          <InfoTooltip
            onClose={this.closeAllPopups}
            autorisationResult={this.state.autorisationResult}
          />
          <ImagePopup
            data={this.state.selectedCard}
            onClose={this.closeAllPopups}
            isOpen={this.state.isEditAvatarPopupOpen}
          />
          <EditAvatarPopup
            isOpen={this.state.isEditAvatarPopupOpen}
            onClose={this.closeAllPopups}
            onUpdateAvatar={this.handleUpdateAvatarSubmit}
            isLoading={this.state.isLoading}
          />
          <EditProfilePopup
            isOpen={this.state.isEditProfilePopupOpen}
            onClose={this.closeAllPopups}
            onUpdateUser={this.handleUpdateUserSubmit}
            isLoading={this.state.isLoading}
          />
          <AddPlacePopup
            isOpen={this.state.isAddPlacePopupOpen}
            onClose={this.closeAllPopups}
            onAddPlace={this.handleAddPlaceSubmit}
            isLoading={this.state.isLoading}
          />
          <DeleteCardPopup
            isOpen={this.state.deletingCard}
            onClose={this.closeAllPopups}
            onDeleteCard={this.handleCardDeleteSubmit}
            isLoading={this.state.isLoading}
          />
        </CurrentUserContext.Provider>
        <Footer />
      </>
    );
  }
}

export default WithRouter(App);
