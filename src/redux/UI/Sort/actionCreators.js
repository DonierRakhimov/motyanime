export const ACTION_TYPES = {
  sortSelected: 'sort/sortSelected',
}

export const sortSelected = (sortBy) => ({
  type: ACTION_TYPES.sortSelected,
  payload: sortBy,
})
