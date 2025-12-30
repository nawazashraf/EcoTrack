const { clerkClient } = require("@clerk/express");
const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const {
      clerkUserId,
      name,
      email,
      organizationName,
      department,
      branch,
    } = req.body;

    // Prevent duplicate onboarding
    const existingUser = await User.findOne({ clerkUserId });
    if (existingUser) {
      return res.status(409).json({ message: "User already onboarded" });
    }

    // Save user to DB
    const dbUser = await User.create({
      clerkUserId,
      name,
      email,
      organizationName,
      department,
      branch,
    });

    // ✅ Mark onboarding completed in Clerk
    await clerkClient.users.updateUser(clerkUserId, {
      publicMetadata: {
        onBoardingCompleted: true,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      data: dbUser,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot create user" });
  }
};
