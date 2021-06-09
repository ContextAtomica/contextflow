import { useState, useContext } from "react";
import { showSuccessMsg, showErrMsg } from "../utils/notification/Notification";
import { UserContext } from "../../provider/UserProvider";
import "./index.css";
import axios from "axios";
import { isLength, isMatch } from "../utils/validation/Validation";
const initialState = {
  name: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};
const Profile = () => {
  const value = useContext(UserContext);
  const [userData, setUserData] = value.user;
  const [data, setData] = useState(initialState);
  const { name, password, cf_password, err, success } = data;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };
  const updateInfor = () => {
    try {
      axios.patch(
        "http://localhost:8080/user/update",
        {
          name: name ? name : userData.user.name,
          id: userData.user._id,
          // avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: userData.token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updatePassword = () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match.", success: "" });

    try {
      axios.post(
        "http://localhost:8080/user/reset-password",
        { password },
        {
          headers: { Authorization: userData.token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const handleUpdate = () => {
    if (name) updateInfor();
    if (password) updatePassword();
  };

  return (
    <>
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {/* {loading && <h3>Loading.....</h3>} */}
      </div>

      <div className="profile_page">
        {userData.user !== undefined ? (
          <>
            <div className="col-left">
              <h2>{"User Profile"}</h2>

              <div className="avatar">
                <img src={userData.user.avatar} alt="" />
                <span>
                  <i className="fas fa-camera"></i>
                  <p>Change</p>
                  <input
                    type="file"
                    name="file"
                    id="file_up"
                    // onChange={changeAvatar}
                  />
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={userData.user.name}
                  placeholder="Your name"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={userData.user.email}
                  placeholder="Your email address"
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password"
                  value={password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cf_password">Confirm New Password</label>
                <input
                  type="password"
                  name="cf_password"
                  id="cf_password"
                  placeholder="Confirm password"
                  value={cf_password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <em style={{ color: "crimson" }}>
                  * You can update your profile name,password from here
                </em>
              </div>

              <button
                //   disabled={loading}
                onClick={() => handleUpdate()}
              >
                Update
              </button>
            </div>
          </>
        ) : (
          <h1>please login</h1>
        )}
        <div className="col-right"></div>
      </div>
    </>
  );
};
export default Profile;
