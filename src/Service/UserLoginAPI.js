import axios from "axios";

const USER_LOGIN_BASE_URL = "http://localhost:9090/api/users";

class UserLoginAPI {
  userLogin(user) {
    return axios.post(USER_LOGIN_BASE_URL + "/userLogin", user);
  }

  generateToken(userid) {
    return axios.get(USER_LOGIN_BASE_URL + "/generateToken/" + userid);
  }

  resetPassword(userid, userNewPassword) {
    return axios.post(
      USER_LOGIN_BASE_URL + "/resetPassword/" + userid + "/" + userNewPassword
    );
  }
}
export default new UserLoginAPI();
