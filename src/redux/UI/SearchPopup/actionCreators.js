export const ACTION_TYPES = {
  searchPopupOpened: 'searchPopup/opened',
  searchPopupClosed: 'searchPopup/closed'
}

export const searchPopupOpened = () => ({
  type: ACTION_TYPES.searchPopupOpened
})

export const searchPopupClosed = () => ({
  type: ACTION_TYPES.searchPopupClosed
})