import { getUser } from '../../network/user';
import { getUserPending, getUserSuccess, getUserFail } from './userSlice';

const getUserProfile = () => async (dispatch: any) => {
  try {
    dispatch(getUserPending());
    const result = await getUser();
    if (result) {
      dispatch(getUserSuccess(result));
    }
  } catch (error: any) {
    dispatch(getUserFail(error.message));
  }
};

export default getUserProfile;
