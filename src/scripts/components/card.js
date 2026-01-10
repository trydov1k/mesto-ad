import { deleteCard as delCard, changeLikeCardStatus }  from "./api";

export const likeCard = (likeButton, card) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  
  changeLikeCardStatus(card._id, isLiked)
    .then((likedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      const LikeCountElement = likeButton.parentElement.querySelector(".card__like-count");
      LikeCountElement.textContent = likedCard.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCard = (cardElement, cardId) => {
  delCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getTemplate = () => {
  return document
    .getElementById("card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

export const createCardElement = (
  card,
  { onPreviewPicture, onLikeIcon, onDeleteCard },
  userId
) => {
  const cardElement = getTemplate();
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__control-button_type_delete");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  if (onLikeIcon) {
    likeButton.addEventListener("click", () => onLikeIcon(likeButton, card));
    if ((card.likes) && (card.likes.length > 0) && (card.likes.some((user) => user._id === userId))) {
      likeButton.classList.toggle("card__like-button_is-active");
    }
    const LikeCountElement = likeButton.parentElement.querySelector(".card__like-count");
    if (card.likes) {
      LikeCountElement.textContent = card.likes.length;
    }
  }

  if (onDeleteCard && (card.owner) && (card.owner._id === userId)) {
    deleteButton.removeAttribute('disabled');
    deleteButton.style.display = 'flex';
    deleteButton.addEventListener("click", () => onDeleteCard(cardElement, card._id));
  } else if (!card.owner) {
    deleteButton.removeAttribute('disabled');
    deleteButton.style.display = 'flex';
    deleteButton.addEventListener("click", () => onDeleteCard(cardElement, card._id));
  } else {
    deleteButton.setAttribute('disabled', true);
    deleteButton.style.display = 'none';
  }

  if (onPreviewPicture) {
    cardImage.addEventListener("click", () => onPreviewPicture({name: card.name, link: card.link}));
  }

  return cardElement;
};
