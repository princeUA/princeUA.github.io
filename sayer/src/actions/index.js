export const WINDOW_STATE = 'WINDOW_STATE';
export const SINGLE_ITEM = 'SINGLE_ITEM';

export const windowState = (active) => {
  return{
    type: WINDOW_STATE,
    payload: active
  }
};

export const singleItem = (item) => {
  return{
    type: SINGLE_ITEM,
    payload: item
  }
};
