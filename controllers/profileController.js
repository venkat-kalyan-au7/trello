import Profile from "../models/Profilemodel"


exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate("user", "name");

    if (!profile) {
      return res.status(404).json({ error: ["Profile not found"] });
    }

    return res.json(profile);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: ["Invalid user ID"] });
    } else {
      console.log(err);
      return res.status(500).json({
        error: "Server error",
      });
    }
  }
};


exports.updateProfile = async (req, res) => {
  try {
    
    

    const { name,imgURL } = req.body;

    const newProfile = {
      user: req.params.id,
     name,
     imgURL
     
    };

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.params.id },
      { $set: newProfile },
      { new: true, upsert: true, runValidators: true }
    ).populate("user", "name");

    return res
      .status(200)
      .json({ msg: "Profile updated", profile: updatedProfile });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMsg = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        error: errMsg,
      });
    } else {
      console.log(err);
      return res.status(500).json({
        error: "Server error",
      });
    }
  }
};


exports.initProfile = async (req, res) => {
  try {
    const profile = new Profile({
      user: res.locals.userId,
    });

    await profile.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Server error",
    });
  }
};


exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: res.locals.userId });

    if (!profile) {
      return res.status(404).json({ error: ["Profile not found"] });
    }

    await profile.remove();

    return res.status(200).json({ msg: "User and profile deleted" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: ["Invalid user ID"] });
    } else {
      console.log(err);
      return res.status(500).json({
        error: "Server error",
      });
    }
  }
};