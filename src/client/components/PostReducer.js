export const INITIAL_RESERVATION_STATE = {
  name: "",
  email: "",
  number_of_guests: "",
  phone_number: "",
};

export const INITIAL_REVIEW_STATE = {
  name: "",
  email: "",
  message: "",
  subject: ""
};


export const PostReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.id]: action.payload.value,
      };
    case "CLEAR_RESERVATION_FORM": 
    return {
      ...INITIAL_RESERVATION_STATE
    }
    case "CLEAR_REVIEW_FORM": 
    return {
      ...INITIAL_REVIEW_STATE
    }
  }
};




