import {
  FIRST_LOAD,
  CHANGE_LANGUAGE,
  SHOW_RATE_REMINDER,
  LAUNCHED,
} from "../types/Types";

let initialState = {
  firstLoad: true,
  language: { label: "English", value: 1 },
  showRateReminder: false,
  launchCounter: 0,
};

export default reducers = (state = initialState, action) => {
  switch (action.type) {
    case FIRST_LOAD:
      return Object.assign({}, state, { firstLoad: false });
    case CHANGE_LANGUAGE:
      return Object.assign({}, state, { language: action.payload });
    case SHOW_RATE_REMINDER:
      return Object.assign({}, state, { showRateReminder: action.payload });
    case LAUNCHED:
      return Object.assign({}, state, { launchCounter: action.payload });
    default:
      return state;
  }
};
