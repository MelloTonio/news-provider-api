/* eslint-disable import/no-anonymous-default-export */
import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const access_token  = req.cookies.access_token

  if (!access_token) {
    return res.status(401).json({
      errors: ['Login Required!'],
    });
  }

  try {
    const dados = jwt.verify(access_token, 'LGCLB3E5REDZT4ER5YHTGDDZAESA4EFSA');
    
    const { id, email, isAdmin } = dados;

    const user = await User.query().findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        errors: ['Invalid User'],
      });
    }

    if(isAdmin == 1) {
        req.id = id;
        req.name = user.username;
        return next();
    }

    return res.status(401).json({
        errors: ['You must be an admin to access this url.'],
    });

  } catch (error) {
    return res.status(401).json({
      errors: ['Token expired or invalid!'],
    });
  }
};