import {
  CHAT_DETAILS_REQUEST,
  CHAT_DETAILS_SUCCESS,
  CHAT_DETAILS_FAIL,
  IS_MOBILE,
  SHOW_MENU,
} from '../constant/chatConstants';

export const getChatDetails = (roomId: string) => (dispatch: any) => {
  try {
    dispatch({ type: CHAT_DETAILS_REQUEST });
    dispatch({ type: CHAT_DETAILS_SUCCESS, payload: 'data' });
  } catch (error: any) {
    console.log('Error -', error);
    dispatch({ type: CHAT_DETAILS_FAIL, payload: error.message });
  }
};

export const setMobileView = (mobile: boolean) => {
  return {
    type: IS_MOBILE,
    payload: mobile,
  };
};
export const setVisibleMenu = (show: boolean) => {
  return {
    type: SHOW_MENU,
    payload: show,
  };
};
