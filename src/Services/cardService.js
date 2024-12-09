export async function getDeck() {
  return fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then((response) => response.json())
    .then((data) => {
      return data.deck_id;
    });
}

export async function getCard(deck_id) {
  const query = encodeURIComponent(deck_id);
  return fetch(`https://deckofcardsapi.com/api/deck/${query}/draw/?count=1`)
    .then((response) => response.json())
    .then((data) => {
      return data
        ? data.cards
        : [
            {
              code: "error",
              image: "/images/error.png",
              value: "error",
              suit: "error",
            },
          ];
    });
}
