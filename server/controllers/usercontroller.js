import ImageKit from "@imagekit/nodejs";
import fs from "fs";
import Users from "../models/Users.js";
import Connection from "../models/Connection.js";


// ---------------- GET USER DATA ----------------

export const getUserData = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const user = await Users.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user,
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



// ---------------- UPDATE USER DATA ----------------

export const updateUserData = async (req, res) => {
  try {
    const { userId } = await req.auth();
    let { username, bio, location, full_name } = req.body;

    const tempUser = await Users.findById(userId);
    if (!tempUser) {
      return res.json({ success: false, message: "User not found" });
    }

    // If no username provided, keep old one
    if (!username) username = tempUser.username;

    // Check if username exists
    if (tempUser.username !== username) {
      const exists = await Users.findOne({ username });
      if (exists) username = tempUser.username;
    }

    let updatedData = { username, bio, location, full_name };

    // Profile + Cover files
    const profile = req.files?.profile?.[0];
    const cover = req.files?.cover?.[0];

    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL,
    });


    // Upload profile
    if (profile) {
      const buffer = fs.readFileSync(profile.path);

      const upload = await imagekit.upload({
        file: buffer.toString("base64"),
        fileName: profile.originalname,
      });

      const url = imagekit.url({
        path: upload.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: 512 },
        ],
      });

      updatedData.profile_picture = url;
    }


    // Upload cover photo
    if (cover) {
      const buffer = fs.readFileSync(cover.path);

      const upload = await imagekit.upload({
        file: buffer.toString("base64"),
        fileName: cover.originalname,
      });

      const url = imagekit.url({
        path: upload.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: 1280 },
        ],
      });

      updatedData.cover_photo = url;
    }


    const user = await Users.findByIdAndUpdate(userId, updatedData, { new: true });

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



// ---------------- DISCOVER USER ----------------

export const discoverUser = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { input } = req.body;

    const users = await Users.find({
      $or: [
        { username: new RegExp(input, "i") },
        { email: new RegExp(input, "i") },
        { full_name: new RegExp(input, "i") },
        { location: new RegExp(input, "i") },
      ],
    });

    const filtered = users.filter((u) => u._id.toString() !== userId);

    res.json({ success: true, users: filtered });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



// ---------------- FOLLOW USER ----------------

export const followUser = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { id } = req.body;

    if (userId === id) {
      return res.json({ success: false, message: "You cannot follow yourself" });
    }

    const user = await Users.findById(userId);
    const target = await Users.findById(id);

    if (!user || !target) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.following.includes(id)) {
      return res.json({ success: false, message: "Already following" });
    }

    user.following.push(id);
    target.followers.push(userId);

    await user.save();
    await target.save();

    res.json({
      success: true,
      message: "Followed successfully",
      user,
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



// ---------------- UNFOLLOW USER ----------------

export const unfollowUser = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { id } = req.body;

    if (userId === id) {
      return res.json({ success: false, message: "You cannot unfollow yourself" });
    }

    const user = await Users.findById(userId);
    const target = await Users.findById(id);

    if (!user || !target) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!user.following.includes(id)) {
      return res.json({ success: false, message: "You are not following this user" });
    }

    user.following = user.following.filter((uid) => uid.toString() !== id);
    target.followers = target.followers.filter((uid) => uid.toString() !== userId);

    await user.save();
    await target.save();

    res.json({
      success: true,
      message: "Unfollowed successfully",
      user,
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



// ---------------- SEND CONNECTION REQUEST ----------------

export const sendConnectionRequest = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { id } = req.body; // target user

    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const requestCount = await Connection.find({
      from_user_id: userId,
      createdAt: { $gte: last24Hours },
    });

    if (requestCount.length >= 20) {
      return res.json({
        success: false,
        message: "Connection request limit reached. Try again later.",
      });
    }

    const connection = await Connection.findOne({
      $or: [
        { from_user_id: userId, to_user_id: id },
        { from_user_id: id, to_user_id: userId },
      ],
    });

    if (!connection) {
      await Connection.create({ from_user_id: userId, to_user_id: id });
      return res.json({ success: true, message: "Connection request sent." });
    }

    if (connection.status === "accepted") {
      return res.json({
        success: false,
        message: "You are already connected with this user.",
      });
    }

    return res.json({
      success: false,
      message: "Connection request pending.",
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



// ---------------- GET USER CONNECTIONS ----------------

export const getUserConnections = async (req, res) => {
  try {
    const { userId } = await req.auth();

    const user = await Users.findById(userId).populate("connections");

    const pendingRequests = await Connection.find({
      to_user_id: userId,
      status: "pending",
    }).populate("from_user_id");

    res.json({
      success: true,
      connection: user.connections,
      followers: user.followers,
      following: user.following,
      pendingConnections: pendingRequests.map((r) => r.from_user_id),
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



// ---------------- ACCEPT CONNECTION REQUEST ----------------

export const acceptConnectionRequest = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { id } = req.body;

    const connection = await Connection.findOne({
      from_user_id: id,
      to_user_id: userId,
      status: "pending",
    });

    if (!connection) {
      return res.json({
        success: false,
        message: "Connection request not found.",
      });
    }

    const me = await Users.findById(userId);
    const other = await Users.findById(id);

    me.connections.push(id);
    other.connections.push(userId);

    await me.save();
    await other.save();

    connection.status = "accepted";
    await connection.save();

    res.json({
      success: true,
      message: "Connection request accepted.",
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

