import * as Types from "../constants/ActionTypes";

let initialState = [
  { id: 1, name: "rahul gupta", favourite: false },
  { id: 2, name: "shivangi sharma", favourite: false },
  { id: 3, name: "akash singh", favourite: false },
  { id: 4, name: "prakash kumar", favourite: false },
  { id: 5, name: "shivali sharma", favourite: false },
  { id: 6, name: "runali gupta", favourite: false },
  { id: 7, name: "priyanka gupta", favourite: false },
  { id: 8, name: "jose sen", favourite: false },
  { id: 9, name: "jitesh gupta", favourite: false },
  { id: 10, name: "mayank gupta", favourite: false },
  { id: 11, name: "richa singh", favourite: false },
  { id: 12, name: "ron gupta", favourite: false },
];

var friends = (state = initialState, action) => {
  let stateObj = [...state];
  let id = '';
  let objIndex = '';
  switch (action.type) {
    case Types.MARK_FAVOURITE:
      id = action.id;
      objIndex = stateObj.findIndex((obj => obj.id === id));
      stateObj[objIndex].favourite = !stateObj[objIndex].favourite;
      return stateObj;
    case Types.SORT_BY_FAVOURITE:
      if(action.sort){
        stateObj.sort((a,b) => b.favourite - a.favourite );
        return stateObj;
      }else{
        stateObj.sort((a,b) => b.id - a.id );
        return stateObj;
      }
    case Types.DELETE_FRIEND:
      id = action.id;
      objIndex = stateObj.findIndex((obj => obj.id === id));
      stateObj.splice(objIndex,1);
      return stateObj;
    case Types.ADD_FRIEND:
      let lastObj = stateObj[0];
      let obj = {
        id: lastObj.id + 1,
        name: action.friend.toLowerCase(),
        favourite: false,
      }
      stateObj.unshift(obj);
      return stateObj;
    default:
      stateObj.sort((a,b) => b.id - a.id );
      return stateObj;
  }
};

export default friends;
