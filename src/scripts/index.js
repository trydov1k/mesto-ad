/*
  Файл index.js является точкой входа в наше приложение
  и только он должен содержать логику инициализации нашего приложения
  используя при этом импорты из других файлов

  Из index.js не допускается что то экспортировать
*/

import { createCardElement, deleteCard, likeCard } from "./components/card.js";
import { openModalWindow, closeModalWindow, setCloseModalWindowEventListeners } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { getCardList, getUserInfo, setUserInfo, setUserAvatar, addNewCard } from "./components/api.js";
import { calculateCountUsers, calculateCountLikes, calculateMaxLikesFromOne, calculateChampionOfLikes, calculatePopularCards } from "./components/statistic.js";

// DOM узлы
const placesWrap = document.querySelector(".places__list");
const profileFormModalWindow = document.querySelector(".popup_type_edit");
const profileForm = profileFormModalWindow.querySelector(".popup__form");
const profileTitleInput = profileForm.querySelector(".popup__input_type_name");
const profileDescriptionInput = profileForm.querySelector(".popup__input_type_description");

const cardFormModalWindow = document.querySelector(".popup_type_new-card");
const cardForm = cardFormModalWindow.querySelector(".popup__form");
const cardNameInput = cardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardForm.querySelector(".popup__input_type_url");

const imageModalWindow = document.querySelector(".popup_type_image");
const imageElement = imageModalWindow.querySelector(".popup__image");
const imageCaption = imageModalWindow.querySelector(".popup__caption");

const openProfileFormButton = document.querySelector(".profile__edit-button");
const openCardFormButton = document.querySelector(".profile__add-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

const avatarFormModalWindow = document.querySelector(".popup_type_edit-avatar");
const avatarForm = avatarFormModalWindow.querySelector(".popup__form");
const avatarInput = avatarForm.querySelector(".popup__input");

const infoModalWindow = document.querySelector('.popup_type_info');
const openInfoButton = document.querySelector('.header__logo');

const handlePreviewPicture = ({ name, link }) => {
  imageElement.src = link;
  imageElement.alt = name;
  imageCaption.textContent = name;
  openModalWindow(imageModalWindow);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  const submitButton = profileForm.querySelector('.popup__button');
  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  setUserInfo({
    name: profileTitleInput.value,
    about: profileDescriptionInput.value,
  })
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModalWindow(profileFormModalWindow);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
};

const handleAvatarFromSubmit = (evt) => {
  evt.preventDefault();

  const submitButton = avatarForm.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  setUserAvatar(avatarInput.value)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closeModalWindow(avatarFormModalWindow);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  const submitButton = cardForm.querySelector(".popup__button");
  submitButton.textContent = "Создание...";
  submitButton.disabled = true;

  let userId;
  getUserInfo()
    .then((userData) => {
      userId = userData._id;
    })
  
  addNewCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  })
    .then((card) => {
      placesWrap.prepend(
        createCardElement(
          { name: card.name,
            link: card.link
          },
          {
            onPreviewPicture: handlePreviewPicture,
            onLikeIcon: likeCard,
            onDeleteCard: deleteCard,
          },
          userId
        )
      )
      closeModalWindow(cardFormModalWindow);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Создать';
      submitButton.disabled = false;
    });
};

const handleInfoModal = () => {

  getCardList()
    .then((cardsList) => {
      const countUsers = calculateCountUsers(cardsList);
      const countLikes = calculateCountLikes(cardsList);
      const maxLikesFromOne = calculateMaxLikesFromOne(cardsList);
      const championOfLikes = calculateChampionOfLikes(cardsList);

      const popularCards = calculatePopularCards(cardsList);

      const modalInfo = document.querySelector('.popup__content_content_info');

      const statisticElement = document.getElementById("popup-info-definition-template").content.querySelector('.popup__info-item').cloneNode(true);
      const popularCardElement = document.getElementById("popup-info-user-preview-template").content.querySelector('.popup__list-item_type_badge').cloneNode(true);


      const statisticList = [statisticElement.cloneNode(true), statisticElement.cloneNode(true), statisticElement.cloneNode(true), statisticElement.cloneNode(true)];
      statisticList[0].querySelector('.popup__info-term').textContent = 'Всего пользователей';
      statisticList[0].querySelector('.popup__info-description').textContent = countUsers;
      statisticList[1].querySelector('.popup__info-term').textContent = 'Всего лайков';
      statisticList[1].querySelector('.popup__info-description').textContent = countLikes;
      statisticList[2].querySelector('.popup__info-term').textContent = 'Максимально лайков от одного';
      statisticList[2].querySelector('.popup__info-description').textContent = maxLikesFromOne;
      statisticList[3].querySelector('.popup__info-term').textContent = 'Чемпион лайков';
      statisticList[3].querySelector('.popup__info-description').textContent = championOfLikes;
      
      const popularCardsList = [popularCardElement.cloneNode(true), popularCardElement.cloneNode(true), popularCardElement.cloneNode(true)];
      
      popularCardsList[0].textContent = popularCards[0];
      popularCardsList[1].textContent = popularCards[1];
      popularCardsList[2].textContent = popularCards[2];
      
      if (modalInfo.querySelector('.popup__info').querySelector('.popup__info-item')) {
        modalInfo.querySelector('.popup__info').querySelector('.popup__info-item').replaceWith();
        modalInfo.querySelector('.popup__info').querySelector('.popup__info-item').replaceWith();
        modalInfo.querySelector('.popup__info').querySelector('.popup__info-item').replaceWith();
        modalInfo.querySelector('.popup__info').querySelector('.popup__info-item').replaceWith();
      }
      if (modalInfo.querySelector('.popup__list').querySelector('.popup__list-item_type_badge')) {
        modalInfo.querySelector('.popup__list').querySelector('.popup__list-item_type_badge').replaceWith();
        modalInfo.querySelector('.popup__list').querySelector('.popup__list-item_type_badge').replaceWith();
        modalInfo.querySelector('.popup__list').querySelector('.popup__list-item_type_badge').replaceWith();
      }
      
      // Выводим данные в модальное окно
      statisticList.forEach((pair) => {        
        modalInfo.querySelector('.popup__info').append(pair);
      });
      popularCardsList.forEach((popularCard) => {
        modalInfo.querySelector('.popup__list').append(popularCard);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// EventListeners
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
avatarForm.addEventListener("submit", handleAvatarFromSubmit);

openProfileFormButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModalWindow(profileFormModalWindow);
});

profileAvatar.addEventListener("click", () => {
  avatarForm.reset();
  openModalWindow(avatarFormModalWindow);
});

openCardFormButton.addEventListener("click", () => {
  cardForm.reset();
  openModalWindow(cardFormModalWindow);
});

openInfoButton.addEventListener("click", () => {
  openModalWindow(infoModalWindow);
  handleInfoModal();
});

//настраиваем обработчики закрытия попапов
const allPopups = document.querySelectorAll(".popup");
allPopups.forEach((popup) => {
  setCloseModalWindowEventListeners(popup);
});

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationSettings);

Promise.all([getCardList(), getUserInfo()])
  .then(([cards, userData]) => {
      cards.forEach((card) => {
        placesWrap.append(
            createCardElement(
              card, 
              {
                onPreviewPicture: handlePreviewPicture,
                onLikeIcon: likeCard,
                onDeleteCard: deleteCard,
              },
              userData._id
            )
        );
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      });
    })
  .catch((err) => {
    console.log(err);
  });