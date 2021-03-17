/* eslint-disable import/no-anonymous-default-export */
import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const access_token  = req.cookies.access_token

  if (!access_token) {
    req.Login = false

    return next();
  }

  try {
    const dados = jwt.verify(access_token, 'LGCLB3E5REDZT4ER5YHTGDDZAESA4EFSA');
    
    const { id, email } = dados;

    const user = await User.query().findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        errors: ['Invalid User'],
      });
    }

    req.userId = id;
    req.userEmail = email;
    req.Login = true
    
    return next();
  } catch (error) {
    return res.status(401).json({
      errors: ['Token expired or invalid!'],
    });
  }
};