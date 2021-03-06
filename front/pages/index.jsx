import Layout from "../components/Layout";
import Modal from "../components/Layout";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  makeStyles,
  Button,
  IconButton,
  Divider,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Image from "material-ui-image";
import { Add, PlayArrow } from "@material-ui/icons";
import NextLink from "../components/NextLink";
import FacebookIcon from "../public/assets/facebook.svg";
import GoogleIcon from "../public/assets/google.svg";
import { withTranslation, Router } from "../plugins/i18n";
import { connect } from "react-redux";
import { appendToString } from "../store/actions/test";
import http from "../plugins/axios";
import { createMatch, joinMatch } from "../store/actions/matches";
import store from "../store";
const useStyles = makeStyles({
  imageContainer: { height: "auto", width: "320px", marginTop: 45 },
  button: {
    borderRadius: "87px",
    margin: "0px 0px 32px 0px",
    width: 300,
    letterSpacing: 1.25,
  },
  socialIcon: {
    borderRadius: "50%",
    boxShadow:
      "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
  },
  textDivider: {
    position: "absolute",
    margin: "auto",
    backgroundColor: "#fff",
    padding: "4px 10px 4px 10px",
    top: "-13px",
  },
});

const Home = function Home(props) {
  const openJoinModal = async () => {
    const nombre = prompt("Nombre del usuario?");
    const user = {
      email: null,
      name: nombre,
      avatar: "https://www.twago.es/img/2018/default/no-user.png",
      score: 0,
    };
    const token = prompt("Tóken de la partida?");
    await joinMatch(user, token);
  };

  const userLoggedJoin = async (user) => {
    const token = prompt("Tóken de la partida?");
    await joinMatch(user, token);
  };

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = async () => {
    //setOpenModal(true);
    const nombre = prompt("Username");
    const user = {
      email: null,
      name: nombre,
      avatar: "https://www.twago.es/img/2018/default/no-user.png",
      score: 0,
    };
    await createMatch(user);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const { t, helloWorld, append, auth, createMatch, joinMatch } = props;
  const styles = useStyles();

  return (
    <Layout justifyContent="space-between">
      {
        // <Modal openModal={openModal} handleCloseModal={handleCloseModal} />
      }
      <Box className={styles.imageContainer}>
        <Image src="/assets/logo.png" aspectRatio={1.9} />
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography
          align="center"
          variant="subtitle1"
          style={{ marginBottom: 40, marginTop: 50, letterSpacing: 1.25 }}
        >
          {t("title")}
        </Typography>

        <Box display="flex" flexDirection="column">
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            className={styles.button}
            startIcon={<Add />}
            onClick={
              auth.user
                ? async () => createMatch(auth.user.user)
                : async () => handleOpenModal()
            }
          >
            {t("create-match")}
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            className={styles.button}
            startIcon={<PlayArrow />}
            onClick={
              auth.user
                ? async () => userLoggedJoin(auth.user.user)
                : async () => openJoinModal()
            }
          >
            {t("join-match")}
          </Button>
        </Box>

        <NextLink href="/how-to-play">{t("how-to-play")}</NextLink>
      </Box>
      {!auth.user && (
        <>
          <Box
            display="flex"
            justifyContent="center"
            position="relative"
            width="60%"
            margin="30px 0px 30px 0px"
          >
            <Divider variant="fullWidth" style={{ height: 1, width: "100%" }} />
            <Typography variant="caption" className={styles.textDivider}>
              {t("or")}
            </Typography>
          </Box>

          <Typography variant="h2">{helloWorld}</Typography>

          <Box>
            <Typography
              variant="subtitle1"
              style={{ marginBottom: 20, letterSpacing: 1.25 }}
            >
              {t("login-title")}
            </Typography>

            <Box display="flex" justifyContent="center" marginBottom="120px">
              <IconButton
                aria-label="Google"
                onClick={() =>
                  location.assign(
                    "https://spyfall-backend.herokuapp.com/auth/google"
                  )
                }
              >
                <GoogleIcon className={styles.socialIcon} />
              </IconButton>
              <IconButton
                aria-label="Facebook"
                onClick={() =>
                  location.assign(
                    "https://spyfall-backend.herokuapp.com/auth/facebook"
                  )
                }
              >
                <FacebookIcon className={styles.socialIcon} />
              </IconButton>
            </Box>
          </Box>
        </>
      )}
    </Layout>
  );
};

const test = async () => {
  try {
    const response = await http.get(
      "https://stackoverflow.com/questions/2936931/rewrite-document-location-without-loading"
    );
    data = response.data;
  } catch (error) {
    console.error(error);
  }
};

Home.getInitialProps = async ({ store }) => {
  let data = {};

  return { namespacesRequired: ["home"], data: data };
};

Home.propTypes = {
  auth: PropTypes.object,
  createMatch: PropTypes.func.isRequired,
  joinMatch: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({ auth: state.auth, match: state.match });

const mapDispatchToProps = {
  append: appendToString,
  createMatch,
  joinMatch,
};

export default withTranslation("home")(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
