import {
  FIRST_LOAD,
  CHANGE_LANGUAGE,
  SHOW_RATE_REMINDER,
  LAUNCHED,
} from "../types/Types";

export function firstLoad() {
  return { type: FIRST_LOAD };
}

export function changeLanguage(newLanguage) {
  return { type: CHANGE_LANGUAGE, payload: newLanguage };
}

export function changeShowRatingReminder(timeToRemind) {
  return { type: SHOW_RATE_REMINDER, payload: timeToRemind };
}

export function changeLaunchCount(newLaunchCounter) {
  return { type: LAUNCHED, payload: newLaunchCounter };
}
