import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8),
    paddingTop: '6em',
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
    textAlign: 'center',
    flex: 1,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTop: `1px solid ${theme.palette.primary.contrastText}`,
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
  },
  searchInput: {
    margin: `${theme.spacing(2)} ${theme.spacing(10)}`,
    marginRight: 0,
    '& .MuiOutlinedInput-root': {
      color: theme.palette.primary.contrastText,
      backgroundColor: '#253238',
      borderRadius: theme.spacing(4),
      borderColor: '#999999',
    },
    '& .MuiSvgIcon-root': {
      color: '#90A4AF',
    },
  },
  filterContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridColumnGap: theme.spacing(8),
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
    '& .MuiOutlinedInput-root': {
      color: theme.palette.primary.contrastText,
      backgroundColor: '#253238',
      borderColor: '#999999',
    },
  },
  filterFields: {
    marginBottom: theme.spacing(2),
  },
  fetchButton: {
    marginTop: theme.spacing(11),
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: theme.spacing(7),
    marginTop: theme.spacing(6),
  },
  card: {
    borderRadius: theme.spacing(1),
    textAlign: 'start',
    border: 'none',
    backgroundColor: '#253238',
  },
  cardActionArea: {
    padding: theme.spacing(2),
  },
}));

const Projects = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <Typography variant="h3" component="h3" color="primary">
          Projects
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="search"
          type="text"
          id="search"
          className={classes.searchInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon color="inherit" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className={classes.filterContainer}>
        <TextField
          variant="outlined"
          margin="normal"
          select
          name="genre"
          label="Genre"
          type="text"
          id="genre"
          className={classes.filterFields}
        />

        <TextField
          variant="outlined"
          margin="normal"
          select
          name="countryOfProd"
          label="Country Of Production"
          type="text"
          id="countryOfProd"
          className={classes.filterFields}
        />

        <TextField
          variant="outlined"
          margin="normal"
          select
          name="status"
          label="Status"
          type="text"
          id="status"
          className={classes.filterFields}
        />

        <TextField
          variant="outlined"
          margin="normal"
          select
          name="sortBy"
          label="Sort By"
          type="text"
          id="sortBy"
          className={classes.filterFields}
        />
      </div>

      <div className={classes.cardContainer}>
        <Card variant="outlined" className={classes.card}>
          <CardMedia
            component="img"
            height="160"
            image="https://picsum.photos/200/300?random=2"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom component="div" variant="h5">
              The Last Breath
            </Typography>
            <Typography component="div" variant="body1">
              Pursued by deadly space kittens, the cosmos' most notorious idiot
              and his nephew find a hidden stash of weed during their efforts to...
            </Typography>
          </CardContent>
          <CardActionArea className={classes.cardActionArea}>
            <Button type="button" variant="contained" color="secondary" fullWidth>
              Check this project
            </Button>
          </CardActionArea>
        </Card>

        <Card variant="outlined" className={classes.card}>
          <CardMedia
            component="img"
            height="160"
            image="https://picsum.photos/200/300?random=2"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom component="div" variant="h5">
              The Last Breath
            </Typography>
            <Typography component="div" variant="body1">
              Pursued by deadly space kittens, the cosmos' most notorious idiot
              and his nephew find a hidden stash of weed during their efforts to...
            </Typography>
          </CardContent>
          <CardActionArea className={classes.cardActionArea}>
            <Button type="button" variant="contained" color="secondary" fullWidth>
              Check this project
            </Button>
          </CardActionArea>
        </Card>

        <Card variant="outlined" className={classes.card}>
          <CardMedia
            component="img"
            height="160"
            image="https://picsum.photos/200/300?random=2"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom component="div" variant="h5">
              The Last Breath
            </Typography>
            <Typography component="div" variant="body1">
              Pursued by deadly space kittens, the cosmos' most notorious idiot
              and his nephew find a hidden stash of weed during their efforts to...
            </Typography>
          </CardContent>
          <CardActionArea className={classes.cardActionArea}>
            <Button type="button" variant="contained" color="secondary" fullWidth>
              Check this project
            </Button>
          </CardActionArea>
        </Card>

        <Card variant="outlined" className={classes.card}>
          <CardMedia
            component="img"
            height="160"
            image="https://picsum.photos/200/300?random=2"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom component="div" variant="h5">
              The Last Breath
            </Typography>
            <Typography component="div" variant="body1">
              Pursued by deadly space kittens, the cosmos' most notorious idiot
              and his nephew find a hidden stash of weed during their efforts to...
            </Typography>
          </CardContent>
          <CardActionArea className={classes.cardActionArea}>
            <Button type="button" variant="contained" color="secondary" fullWidth>
              Check this project
            </Button>
          </CardActionArea>
        </Card>

        <Card variant="outlined" className={classes.card}>
          <CardMedia
            component="img"
            height="160"
            image="https://picsum.photos/200/300?random=2"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom component="div" variant="h5">
              The Last Breath
            </Typography>
            <Typography component="div" variant="body1">
              Pursued by deadly space kittens, the cosmos' most notorious idiot
              and his nephew find a hidden stash of weed during their efforts to...
            </Typography>
          </CardContent>
          <CardActionArea className={classes.cardActionArea}>
            <Button type="button" variant="contained" color="secondary" fullWidth>
              Check this project
            </Button>
          </CardActionArea>
        </Card>

        <Card variant="outlined" className={classes.card}>
          <CardMedia
            component="img"
            height="160"
            image="https://picsum.photos/200/300?random=2"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom component="div" variant="h5">
              The Last Breath
            </Typography>
            <Typography component="div" variant="body1">
              Pursued by deadly space kittens, the cosmos' most notorious idiot
              and his nephew find a hidden stash of weed during their efforts to...
            </Typography>
          </CardContent>
          <CardActionArea className={classes.cardActionArea}>
            <Button type="button" variant="contained" color="secondary" fullWidth>
              Check this project
            </Button>
          </CardActionArea>
        </Card>

        <Card variant="outlined" className={classes.card}>
          <CardMedia
            component="img"
            height="160"
            image="https://picsum.photos/200/300?random=2"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom component="div" variant="h5">
              The Last Breath
            </Typography>
            <Typography component="div" variant="body1">
              Pursued by deadly space kittens, the cosmos' most notorious idiot
              and his nephew find a hidden stash of weed during their efforts to...
            </Typography>
          </CardContent>
          <CardActionArea className={classes.cardActionArea}>
            <Button type="button" variant="contained" color="secondary" fullWidth>
              Check this project
            </Button>
          </CardActionArea>
        </Card>
      </div>

      <Button
        type="button"
        variant="contained"
        color="primary"
        className={classes.fetchButton}
      >
        Fetch more
      </Button>
    </div>
  );
};

export default Projects;
