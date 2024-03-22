export const load_cards = (cards) => ({
  type: 'LOAD_CARDS',
  payload: cards
})

export const edit_card = (card) => ({
  type: 'EDIT_CARD',
  payload: card
})