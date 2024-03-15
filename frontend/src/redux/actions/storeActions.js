export const load_cards = (cards) => ({
  type: 'LOAD_CARDS',
  payload: cards
})

export const update_card = (card) => ({
  type: 'UPDATE_CARD',
  payload: card
})