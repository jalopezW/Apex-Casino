export async function getDeck() {
  return fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data.deck_id)
      return data.deck_id;
    });
}

export async function getCard(deck_id) {
  const query = encodeURIComponent(deck_id);
  return fetch(`https://deckofcardsapi.com/api/deck/${query}/draw/?count=1`)
    .then((response) => response.json())
    .then((data) => {
      return data.cards;
    });
}
