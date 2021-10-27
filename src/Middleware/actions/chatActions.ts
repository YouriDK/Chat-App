import {
  CHAT_DETAILS_REQUEST,
  CHAT_DETAILS_SUCCESS,
  CHAT_DETAILS_FAIL,
} from '../constant/chatConstants';

const getChatDetails = (roomId: string) => (dispatch: any) => {
  try {
    dispatch({ type: CHAT_DETAILS_REQUEST });
    dispatch({ type: CHAT_DETAILS_SUCCESS, payload: 'data' });
  } catch (error: any) {
    console.log('Error -', error);
    dispatch({ type: CHAT_DETAILS_FAIL, payload: error.message });
  }
};

export { getChatDetails };
