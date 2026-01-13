export const calculateCountUsers = (cardsList) => {
  const ownersId = cardsList.map(card => card.owner._id);
  const usersId = ownersId.filter((item, index, array) => 
  { 
    return array.indexOf(item) === index;
  });
  return usersId.length;
};

export const calculateCountLikes = (cardsList) => {
  let likesCount = 0;
    cardsList.forEach((card) => {
      likesCount += card.likes.length;
    });
  return likesCount;
};

export const calculateMaxLikesFromOne = (cardsList) => {
  let dict = {}; // userId : countLikes

  cardsList.forEach((card) => {
    card.likes.forEach((like) => {
      if (dict[like._id]) {
        dict[like._id] += 1;
      } else {
        dict[like._id] = 1;
      }
    });
  });

  const countsLikes = Object.values(dict);
  return Math.max(...countsLikes);
};

export const calculateChampionOfLikes = (cardsList) => {
  let dict = {};  // ownerId : contLikes
  cardsList.forEach((card) => {
    if (dict[card.owner._id]) {
      dict[card.owner._id] += card.likes.length;
    } else {
      dict[card.owner._id] = card.likes.length;
    }
  });
  const countsLikes = Object.values(dict);
  const maxLikes = Math.max(...countsLikes);
  const ChampionId = Object.keys(dict).find((key) => dict[key] === maxLikes);
  const championName = cardsList.filter((card) => {
    return card.owner._id === ChampionId
  });
  return championName[0].owner.name;
};


export const calculatePopularCards = (cardsList) => {
  cardsList.sort((card1, card2) => {
    return card2.likes.length - card1.likes.length;
  });

  const popularCards = cardsList.slice(0, 3);

  return popularCards.map(card => card.name);
};