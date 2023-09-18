export const ACTION_TYPES = {
  toggled: 'notification/toggled',
};

export const notificationToggled = ({ color, message }) => ({
  type: ACTION_TYPES.toggled,
  payload: { color, message },
});
