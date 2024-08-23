import React from 'react';
import { Grid, CircularProgress, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  return (
    !posts.length > 0 ? <CircularProgress className={classes.loader} /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Paper elevation={6}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;