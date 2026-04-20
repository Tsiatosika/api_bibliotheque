const jwt  = require('jsonwebtoken');
const { User } = require('../models');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(422).json({ success: false, message: 'Email et mot de passe requis' });

    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.checkPassword(password)))
      return res.status(401).json({ success: false, message: 'Identifiants incorrects' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.json({
      success: true,
      data: { token, user: { id: user.id, name: user.name, email: user.email } },
      message: 'Connexion réussie'
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};