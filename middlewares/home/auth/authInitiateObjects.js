import Auth from "../../../models/home/auth/AuthModel.js";

const authInitiateObjects = (req, _, next) => {
  const { email, password, photo, phoneNumber, name } = req.body;
  console.log(email, password, phoneNumber, name);
  req.auth = new Auth(email, password, photo, phoneNumber, name);
  next();
};

export default authInitiateObjects;
