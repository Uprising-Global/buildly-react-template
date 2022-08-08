import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  Button, Card, CardActionArea, CardContent, CardMedia, Chip, Grid, Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import arrow from '@assets/arrow.svg';
import WallImage from '@assets/wall-image.png';
import Loader from '@components/Loader/Loader';
import { getAllFilms } from '@redux/project/project.actions';
import { routes } from '@routes/routesConstants';

const useStyles = makeStyles((theme) => ({
  section1: {
    height: theme.spacing(135),
    paddingBottom: theme.spacing(20),
    backgroundImage: `url(${WallImage})`,
    '& h2': {
      paddingLeft: theme.spacing(15),
      textTransform: 'uppercase',
      fontStyle: 'normal',
      WebkitTextStrokeColor: '#d6d6d6',
      WebkitTextFillColor: 'transparent',
      WebkitTextStrokeWidth: theme.spacing(0.25),
      MozTextStrokeColor: '#d6d6d6',
      MozTextFillColor: 'transparent',
      MozTextStrokeWidth: theme.spacing(0.25),
      '&:first-of-type': {
        marginTop: theme.spacing(25),
      },
    },
  },
  container: {
    paddingLeft: theme.spacing(20),
    marginTop: theme.spacing(8),
    '& img': {
      float: 'left',
    },
    '& div': {
      '&:first-of-type': {
        paddingTop: theme.spacing(2),
      },
    },
    '& button': {
      marginTop: theme.spacing(5),
    },
  },
  section2: {
    padding: `${theme.spacing(2)} ${theme.spacing(20)} ${theme.spacing(10)}`,
  },
  grid1: {
    paddingBottom: theme.spacing(8),
  },
  bottomHighlight: {
    stroke: theme.palette.primary.contrastText,
    strokeWidth: theme.spacing(0.25),
  },
  grid2: {
    paddingTop: theme.spacing(6),
    textAlign: 'center',
  },
  section3: {
    backgroundColor: '#253238',
    padding: `${theme.spacing(2)} ${theme.spacing(20)} ${theme.spacing(4)}`,
    '& div': {
      marginTop: theme.spacing(2),
    },
  },
  title: {
    textTransform: 'uppercase',
  },
  subtitle: {
    marginTop: theme.spacing(4),
  },
  card: {
    marginTop: theme.spacing(5),
    display: 'grid',
    gridColumnGap: theme.spacing(8),
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  chipContainer: {
    marginBottom: theme.spacing(3),
    display: 'grid',
    gridGap: theme.spacing(1),
    gridTemplateColumns: 'repeat(3, max-content)',
  },
  noInvest: {
    marginTop: theme.spacing(5),
    textAlign: 'center',
  },
}));

const Home = ({ dispatch, loading, films, history }) => {
  const classes = useStyles();
  const scrollRef = useRef(null);
  const [openFilms, setOpenFilms] = useState([]);

  useEffect(() => {
    dispatch(getAllFilms());
  }, []);

  useEffect(() => {
    if (films && !_.isEmpty(films)) {
      setOpenFilms(_.filter(films, { status: 'Open' }));
    }
  }, [films]);

  const handleClick = () => {
    scrollRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <Grid container>
      {loading && <Loader open={loading} />}
      <Grid item xs={12} className={classes.section1}>
        <Typography variant="h2">
          Invest in films
        </Typography>
        <Typography variant="h2">
          as little as $100
        </Typography>
        <div className={classes.container}>
          <img src={arrow} alt="Left arrow" />
          <Typography variant="body1">
            Greenlight the stories you want to see.
          </Typography>
          <Typography variant="body1">
            Join the Uprising
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Discover Stories
          </Button>
        </div>
      </Grid>

      <Grid item xs={12} className={classes.section2} ref={scrollRef}>
        <Grid item className={classes.grid1}>
          <Typography variant="h4" color="secondary" className={classes.title}>
            Invest now
          </Typography>
          <Typography variant="subtitle1" className={classes.title}>
            Films currently raising money
          </Typography>

          <Grid container className={_.isEmpty(openFilms) ? classes.noInvest : classes.card}>
            {openFilms && _.isEmpty(openFilms) && (
              <Typography variant="body1" component="div">
                <em>No films available for investment for now.</em>
              </Typography>
            )}

            {openFilms && !_.isEmpty(openFilms) && _.map(openFilms, (film) => (
              <Grid item key={film.film_uuid}>
                <Card variant="outlined">
                  <CardActionArea onClick={(e) => history.push(`${routes.FILM}/${film.film_uuid}`)}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={film.poster_url}
                      alt={film.name}
                    />
                    <CardContent>
                      <div className={classes.chipContainer}>
                        {_.map(film.genre, (genre, idx) => (
                          <Chip key={`${genre}-${idx}`} label={genre} color="primary" />
                        ))}
                      </div>
                      <Typography gutterBottom variant="h5" component="h5">
                        {film.name}
                      </Typography>
                      <Typography variant="body1">
                        {film.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <svg width="100%" height="1" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <line strokeDasharray="15" x1="0" x2="100%" className={classes.bottomHighlight} />
        </svg>

        <Grid item className={classes.grid2}>
          <Typography variant="h4" color="secondary" className={classes.title}>
            How It works
          </Typography>
          <Typography variant="body1" className={classes.subtitle}>
            <em>Step by Step Explanation</em>
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12} className={classes.section3}>
        <Typography variant="caption">
          Lörem ipsum prelassa spebuns ett sengar. Tiskade eun utan månat. Nyfål oras.
          Ågärade ralogi. Radionetik dess Emanuel Gustavsson. Yre pevassa samt Jessica Nordström.
          Bukaliga monosamma radioitet sadade. Ripan mar en soheten sal reagen. Nyr viras och prena
          neska egov. Oskapet trev. Jidoren akrosk samt preheten i prehet tritisat. Vörålig
          majessade, sur. Kontravi pafagen pror. Enas käheten när benera Gunnar Nilsson speben. Spen
          Viola Holmberg, Johan Arvidsson Barbro Sandström. Arent plamåning betilig. Fosat pese.
          Emil Wallin rekroktiga. Homoktiga ultras kal. Karat dinuning dera, peska innan Nils
          Lindgren. Krov terar lavis.
        </Typography>
        <Typography variant="caption">
          Kopyvis dolabel. Antenest kosade palig. Nysk osam, alig, så dekalogi bussade. Preliga fagt
          osk kvasitel äbeda. Olig lavis fast vade näsarade. Seskapet sunade med javis valingar,
          homot.Bussa exonäning. Pseudosofi ade ambigyn, såvis. Pösade kontragäng ten, då gigass.
          Aning jerade, i sår.
        </Typography>
        <Typography variant="caption">
          Semivis synlogi buling. Kosamma presam. Polyskade faning eller mitreska, poktiga paktiga.
          Polyrat reda. Orar tefon. Berit Lindholm Leif Jonsson, och epis nektiga abism. Krora
          kroning. Pona nyrade tiv didiss jag pötresk. Vödede Robin Hansson, Maria Berg gönining.
          Ses pladat delan fåkäsat. Dis Christian Martinsson samtan vara drabbad. Bösam sade, epp
          och ness men parande. Vajälig nynevis. Tetraskap metavalens. Kroren pneumates att regon
          för att hypons. Tivis for denade emedan lasade negt. Jade prerade. Nes bebåv förutom
          poliga kyn. San. Jack tregösm när sebur. Hexaktiga ens, supp i vispera. Kontramin megafal.
          Suprant. Gunnar Strömberg hypov. Salig varade ykägt tills bussa, oda.
        </Typography>
        <Typography variant="caption">
          Pseudopol Emil Nilsson. Lina Arvidsson pseudopp Maria Lundgren, solig. Roger Berglund
          däbel. Mahet Bo Sjöberg. Kabär dira. Plade lar oning har ber. Bepagt lanar didade.
        </Typography>
        <Typography variant="caption">
          Pseudopol Emil Nilsson. Lina Arvidsson pseudopp Maria Lundgren, solig. Roger Berglund
          däbel. Mahet Bo Sjöberg. Kabär dira. Plade lar oning har ber. Bepagt lanar didade.
          Antesam spektigt. Monotira valiga parapiktig. Kontraheten Fredrik Gunnarsson påsask nefas.
          Firad astront ekoskop köligt fajadäment. Makrorade såtining trivism. Sesona abel ar: och
          best. Spere prehövis nybus är ase. Obel reafat san prening. Oning dev, rässade. Pan vask
          innan vinening. Jisemuning ponar, krorade nyss, mimysade. Os Victoria Sandberg jaheten.
          Jenny Håkansson megatism tresåd åt. Teralar fåre ekosiv. Båpåre dek kroning, nisade, i
          Linda Karlsson. Hemifos fåsat i felig alltså fanade. Plasade prenade vipepåmyr sek
          nilingar. Sespessade monostat, än euroming. Synons teles soligen nev spetrevis. Osm.
          Readiktisk larat. Oligt heterora tiren tena on. Sassade krobel, did än did. Desa dekare
          Marianne Ekström polyfiering intrask. Biongen Gunnel Svensson, inte vat inte begäling
          megande.påv.
        </Typography>
        <Typography variant="caption">
          Bösam sade, epp och ness men parande. Vajälig nynevis. Tetraskap metavalens. Kroren
          pneumates att regon för att hypons. Tivis for denade emedan lasade negt. Jade prerade.
          Nes bebåv förutom poliga kyn. San. Jack tregösm när sebur. Hexaktiga ens, supp i vispera.
          Kontramin megafal. Suprant. Gunnar Strömberg hypov. Salig varade ykägt tills bussa, oda.
          Pseudopol Emil Nilsson. Lina Arvidsson pseudopp Maria Lundgren, solig. Roger Berglund
          däbel. Mahet Bo Sjöberg. Kabär dira. Plade lar oning har ber. Bepagt lanar didade.
        </Typography>
        <Typography variant="caption">
          Antesam spektigt. Monotira valiga parapiktig. Kontraheten Fredrik Gunnarsson påsask
          nefas. Firad astront ekoskop köligt fajadäment. Makrorade såtining trivism. Sesona abel
          ar: och best. Spere prehövis nybus är ase. Obel reafat san prening. Oning dev, rässade.
          Pan vask innan vinening. Jisemuning ponar, krorade nyss, mimysade. Os Victoria Sandberg
          jaheten. Jenny Håkansson megatism tresåd åt. Teralar fåre ekosiv
        </Typography>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state.projectReducer,
});

export default connect(mapStateToProps)(Home);
