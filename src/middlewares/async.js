export default ({ dispatch }) => (next) => (action) => {
  // Check to see if this acton has a promise on its payload property.
  // If it does, then wait for it to resolve. If it doesn't, then send the action on to the next middleware
  if (!action.payload || !action.payload.then) {
    return next(action);
  }

  // We want to wait for the promise to resolve ie get its data and then create a new action with that data and dispatch it
  action.payload.then(function (response) {
    const newAction = { ...action, payload: response };
    // this dispatch function essentially sends our action back again through all the middlewares. Hence order of the middlewares doesnot matter.
    dispatch(newAction);
  });
};
