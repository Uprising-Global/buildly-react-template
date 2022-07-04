import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import _ from 'lodash';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CallMadeIcon from '@mui/icons-material/CallMade';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(0.5),
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    width: 'max-content',
    paddingTop: theme.spacing(4),
  },
  bottomHighlight: {
    stroke: theme.palette.secondary.main,
    strokeWidth: theme.spacing(0.25),
  },
  linkIcon: {
    float: 'right',
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
  blueText: {
    color: '#478ECC',
  },
  castGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: theme.spacing(6),
  },
  castGridItem: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    height: theme.spacing(10),
    objectFit: 'contain',
    borderRadius: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  extraDetails: {
    paddingTop: theme.spacing(4),
  },
}));

const CastCrew = ({ castCrew }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="subtitle1" component="div" className={classes.title}>
        Directing
        <svg height="16" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <line strokeDasharray="8" x1="0" y1="2" x2="48" y2="2" className={classes.bottomHighlight} />
        </svg>
      </Typography>
      <Grid container className={classes.container}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" component="div" className={classes.blueText}>
            {castCrew.director_name}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="subtitle1" component="div">
            Director
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <a href={castCrew.director_link} target="_blank" rel="noopener noreferrer">
            <CallMadeIcon className={classes.linkIcon} />
          </a>
        </Grid>
      </Grid>

      <Typography variant="subtitle1" component="div" className={classes.title}>
        Writing
        <svg height="16" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <line strokeDasharray="8" x1="0" y1="2" x2="48" y2="2" className={classes.bottomHighlight} />
        </svg>
      </Typography>
      <Grid container className={classes.container}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" component="div" className={classes.blueText}>
            {castCrew.written_name}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="subtitle1" component="div">
            Written By
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <a href={castCrew.written_link} target="_blank" rel="noopener noreferrer">
            <CallMadeIcon className={classes.linkIcon} />
          </a>
        </Grid>
      </Grid>

      <Typography variant="subtitle1" component="div" className={classes.title}>
        Cast
        <svg height="16" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <line strokeDasharray="8" x1="0" y1="2" x2="40" y2="2" className={classes.bottomHighlight} />
        </svg>
      </Typography>
      <Grid container className={classes.castGrid}>
        {_.map(castCrew.cast_details, (cast, idx) => (
          <Grid key={`${idx}-${cast.name}`} item className={classes.castGridItem}>
            <img className={classes.image} src={cast.image} alt={cast.name} />
            <div style={{ flex: 1 }}>
              <Typography variant="subtitle1" component="div">
                {cast.name}
              </Typography>
              <Typography variant="body1" component="div">
                {cast.played}
              </Typography>
            </div>
            <a href={cast.link} target="_blank" rel="noopener noreferrer">
              <CallMadeIcon className={classes.linkIcon} />
            </a>
          </Grid>
        ))}
      </Grid>

      {castCrew && castCrew.extra_details && (
        <div className={classes.extraDetails}>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {castCrew.extra_details}
          </ReactMarkdown>
        </div>
      )}
    </>
  );
};

export default CastCrew;
