import {
  NOTHING,
} from '../actions/noop';

const initialState = {
};

export function noop (state = initialState, action = {}) {
  switch (action.type) {
    case NOTHING:
      console.log('Deliberately doing nothing');
      return state;

    default:
      console.log('Doing nothing');
      return state;
  }
}
