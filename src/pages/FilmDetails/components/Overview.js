import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
  },
  pitch: {
    paddingTop: theme.spacing(7),
  },
}));

const Overview = ({ film }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={4.25} className={classes.gridItem}>
        <Typography variant="body1" component="div">
          GENRE
        </Typography>
      </Grid>
      <Grid item xs={7.75} className={classes.gridItem}>
        {film.genre}
      </Grid>

      <Grid item xs={4.25} className={classes.gridItem}>
        <Typography variant="body1" component="div">
          COUNTRY
        </Typography>
      </Grid>
      <Grid item xs={7.75} className={classes.gridItem}>
        {film.country_of_production}
      </Grid>

      <Grid item xs={4.25} className={classes.gridItem}>
        <Typography variant="body1" component="div">
          RAISING
        </Typography>
      </Grid>
      <Grid item xs={7.75} className={classes.gridItem}>
        {`$${String(film.raising).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
      </Grid>

      <Grid item xs={4.25} className={classes.gridItem}>
        <Typography variant="body1" component="div">
          LANGUAGE
        </Typography>
      </Grid>
      <Grid item xs={7.75} className={classes.gridItem}>
        {film.language}
      </Grid>

      <Grid item xs={4.25} className={classes.gridItem}>
        <Typography variant="body1" component="div">
          STUDIOS
        </Typography>
      </Grid>
      <Grid item xs={7.75} className={classes.gridItem}>
        {film.studios}
      </Grid>

      <Grid item xs={4.25} className={classes.gridItem}>
        <Typography variant="body1" component="div">
          LENGTH
        </Typography>
      </Grid>
      <Grid item xs={7.75} className={classes.gridItem}>
        {`${film.film_length} page(s)`}
      </Grid>

      <Grid item xs={12} className={classes.pitch}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {film.pitch_details}
        </ReactMarkdown>
      </Grid>
    </Grid>
  );
};

export default Overview;
