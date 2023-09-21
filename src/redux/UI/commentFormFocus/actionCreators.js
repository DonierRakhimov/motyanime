export const ACTION_TYPES = {
  focusGained: 'commentFormFocus/focusGained',
  focusLost: 'commentFormFocus/focusLost',
}

export const focusGained = () => ({
  type: ACTION_TYPES.focusGained,
})

export const focusLost = () => ({
  type: ACTION_TYPES.focusLost,
})