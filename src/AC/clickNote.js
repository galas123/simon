import {CLICK_NOTE} from '../constants'
export const clickNote = (id) => (
{
  type: CLICK_NOTE,
  payload: {
    id
  }
}
);