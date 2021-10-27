import {
  CHAT_DETAILS_REQUEST,
  CHAT_DETAILS_SUCCESS,
  CHAT_DETAILS_FAIL,
} from '../constant/chatConstants';

export function chatReducer(state = { chatDetails: {} }, action: any) {
  switch (action.type) {
    case CHAT_DETAILS_REQUEST:
      return { loading: true, chatDetails: [] };
    case CHAT_DETAILS_SUCCESS:
      return { loading: false, chatDetails: action.payload };
    case CHAT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
