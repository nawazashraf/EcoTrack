const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { name, email, password, organizationName, department } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      name, email, password: hashedPassword, organizationName, department
    });
    
    res.status(201).json({ message: "User registered" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const token = jwt.sign({ id: user._id, department: user.department }, process.env.JWT_SECRET);
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      department: user.department,
      organizationId: user.organizationId
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.clerkSync = async (req, res) => {
  try {
    const { email, name, clerkId } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: name || "Clerk User",
        email,
        password: "clerk_managed_password", 
        clerkId: clerkId,
        organizationId: "org_default_123", 
        department: "General",             
        role: "user"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET,            
      { expiresIn: '30d' }
    );

    res.status(200).json({ 
      success: true, 
      token, 
      user: {
        id: user._id,
        name: user.name,
        department: user.department
      } 
    });

  } catch (err) {
    console.error("Clerk Sync Error:", err);
    res.status(500).json({ error: "Sync failed" });
  }
};