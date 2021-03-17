import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/User'

class TokenController {
    async store(req, res) {
      const { email = '', password = '' } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          errors: ['Invalid e-mail or password'],
        });
      }
  
      const user = await User.query().findOne({ email: email });
  
      if (!user) {
        return res.status(400).json({
          errors: ['User not found!'],
        });
      }

      bcrypt.compare(req.body.password, user.password, function(err, valid) {
        if (err){
          console.log(err)
        }
        if (valid){
            const { id, isAdmin } = user;
            const token = jwt.sign({ id, email, isAdmin }, 'LGCLB3E5REDZT4ER5YHTGDDZAESA4EFSA', {
              expiresIn: '24h',
            });
            
            res.cookie('access_token', token, {
                maxAge: 30 * 86400,
                httpOnly: true,
                // secure: true
            });

            
            return res.status(200).end();
        } else {
          // response is OutgoingMessage object that server response http request
          return res.json({success: false, message: 'passwords do not match'});
        }
      });

    }
  }
  
  export default new TokenController();