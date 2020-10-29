import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { getProfile, updateProfile } from "../Redux/actions/profile";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: "auto",
  },
  title: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  flex: {
    display: "flex",
    flexWrap: "wrap",
  },
  fieldName: {
    width: 100,
  },
  textField: {
    width: 550,
  },
  button: {
    width: 100,
    margin: theme.spacing(3),
  },
}));

const UpdateProfile = ({
  user,
  authLoading,
  profile,
  profileLoading,
  getProfile,
  updateProfile,
  history,
}) => {
  const classes = useStyles();
  const initialState = {
    name: "",
    imgURL: "",
   
  };
  const [formData, setFormData] = useState(initialState);
  const  {name,imgURL} = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData, user._id, history);
  };

  useEffect(() => {
    if (user) getProfile(user._id);
    if (!profileLoading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(",");
      setFormData(profileData);
    }
  }, [authLoading, profileLoading]);

  return (
    !profileLoading && (
      <div className={classes.root}>
        <Typography className={classes.title} variant="h6">
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <List>
            <ListItem className={classes.flex}>
              <ListItemText primary="Name" className={classes.fieldName} />
              <TextField
                className={classes.textField}
                variant="outlined"
                placeholder="name"
                name="headline"
                value={name}
                onChange={handleChange}
              />
            </ListItem>

            <ListItem className={classes.flex}>
              <ListItemText primary="imgURL" className={classes.fieldName} />
              <TextField
                className={classes.textField}
                variant="outlined"
                placeholder="Paste Valid Image URL"
                name="location"
                value={imgURL}
                onChange={handleChange}
              />
            </ListItem>

           

           
          </List>

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
          >
            Save
          </Button>
        </form>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  authLoading: state.auth.loading,
  profile: state.profile.profile,
  profileLoading: state.profile.loading,
});

export default connect(mapStateToProps, { getProfile, updateProfile })(
  UpdateProfile
);
