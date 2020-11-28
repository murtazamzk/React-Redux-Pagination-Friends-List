import * as Types from "../constants/ActionTypes";

export const actSearchFriend = keyword => {
  return {
    type: Types.SEARCH,
    keyword
  };
};

export const actMarkFavourite = id => {
  return {
    type: Types.MARK_FAVOURITE,
    id
  };
};

export const actSortByFavourites = sort => {
  return {
    type: Types.SORT_BY_FAVOURITE,
    sort
  };
};

export const actAddFriend = friend => {
  return {
    type: Types.ADD_FRIEND,
    friend
  };
};

export const actDeleteFriend = id => {
  return {
    type: Types.DELETE_FRIEND,
    id
  };
};