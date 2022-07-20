export default function (state, action) {
  switch (action.type) {
    //! Put all cases for the reducer here
    case "setstockdetails":
      return Object.assign({}, state, action.payload);

    case "setcryptodetails":
      return Object.assign({}, state, action.payload);

    case "setbonddetails":
      return Object.assign({}, state, action.payload);

    case "setothersdetails":
      return Object.assign({}, state, action.payload);

    case "setOverlay":
      return Object.assign({}, state, action.payload);

    case "setLoading":
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};
