export const ActionType = {
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
};

export const ActionCreator = {
  requireAuthorization: () => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: true,
  }),
};
