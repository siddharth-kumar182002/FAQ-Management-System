import express from 'express'

const router = express.Router();
import { body, validationResult } from 'express-validator';



const JWT_SECRET = 'Harryisagoodb$oy';
const user={
    name:"Admin",
    email:"Admin@gmail.com",
    password:"Admin12345"

}



// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
],  (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  console.log(email,password);
    
    if (user.email!==email || user.password!==password ) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    success = true;
    res.json({ success})

  


});



export default router;