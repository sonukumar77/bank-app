const INITIAL_STATE = {
  userInfo: null,
  accessToken:null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, userInfo: action.payload,accessToken:action.token };
      case "LOGOUT":
        return { ...state, userInfo: null,accessToken:null };
    default: {
      return state;
    }
  }
};

export default userReducer;
