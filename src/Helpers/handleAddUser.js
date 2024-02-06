import { jwtDecode } from 'jwt-decode';
import { setAddUserInfo } from '../Store/Slices/authReducer';

export const handleAddUser = (response, dispatch) => {
  const decoded = jwtDecode(response);
  const userInfo = {
    isAuth: true,
    name: decoded.name,
    login: decoded.login,
  };
  dispatch(setAddUserInfo(userInfo));
};
