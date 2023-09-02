export const ACTION_TYPES = {
  titlesLoading: 'titles/titlesLoading',
  titlesLoaded: 'titles/titlesLoaded',
  titlesAdded: 'titles/titlesAdded',
  titlesReseted: 'titles/titlesReseted',
}


export const titlesLoading = () => {
  return {
    type: ACTION_TYPES.titlesLoading,
  }
}

export const titlesLoaded = (data) => {
  return {
    type: ACTION_TYPES.titlesLoaded,
    payload: data
  }
}

export const titlesAdded = (titles) => {
  return {
    type: ACTION_TYPES.titlesAdded,
    payload: titles
  }
}

export const titlesReseted = () => {
  return {
    type: ACTION_TYPES.titlesReseted
  }
}