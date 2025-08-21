/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  auth,
  signInWithGoogle,
  logInWithEmailAndPassword,
  signInWithFacebook,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../../styles/Login.module.css";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Typography, Box } from "@mui/material";
import NoSsr from "@mui/material/NoSsr";
import logo from "../../public/img/connectify.png";

import Image, { StaticImageData } from "next/image";

const StyledButton = styled(Button)({
  borderRadius: "100px",
  width: "100%",
  marginTop: "10px",
  padding: "10px",
  backgroundColor: "#42A5F5",
  boxShadow: "none",
  color: "white",
  "&:hover": {
    backgroundColor: "#e0e0e0",
    boxShadow: "none",
    border: "2px solid #e0e0e0",
    color: "black",
  },
});
const StyledText = styled(Typography)({
  color: "#fc6918",
  textAlign: "center",
  fontSize: "16px",
});
const StyledTextApp = styled(Typography)({
  color: "#392b88",
  textAlign: "center",
  fontWeight: "400",
  fontSize: "25px",
  marginBottom: "50px",
});
const StyledTextRegister = styled(Typography)({
  color: "#1f2023ff",
  cursor: "pointer",
  display: "inline-flex",
  fontSize: "16px",
  "&:hover": {
    color: "#50b7f5",
  },
});
const StyledGoogleButton = styled(Button)({
  borderRadius: "100px",
  width: "100%",
  marginTop: "20px",
  backgroundColor: "#8556f8",
  padding: "10px",
  "&:hover": {
    backgroundColor: "#e0e0e0",
    boxShadow: "none",
    border: "2px solid #e0e0e0",
    color: "black",
  },
});
const StyledFacebookButton = styled(Button)({
  borderRadius: "100px",
  width: "100%",
  marginTop: "20px",
  marginBottom: "30px",
  padding: "10px",
  backgroundColor: "#392b88",
  "&:hover": {
    backgroundColor: "#e0e0e0",
    boxShadow: "none",
    border: "2px solid #e0e0e0",
    color: "black",
  },
});
const StyledTextField = styled(TextField)({
  display: "flex",
  marginBottom: "20px",
  "& .MuiInputBase-input": {
    border: "1px solid transparent",
    color: "black",
  },
  "& .MuiInputLabel-root": {
    color: "#392b88",
  },
  "& .MuiInputLabel-shrink": {
    color: "#392b88",
  },
  "& .MuiInputLabel-animate": {
    color: "#392b88",
  },

  "& .MuiInput-underline:before": {
    borderBottomColor: "#392b88",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#392b88",
  },
});
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) router.push("/home");
  }, [user, loading, router]);
  return (
    <NoSsr>
      <div className={styles.login}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Image
                src={logo as StaticImageData}
                alt="pic"
                height={300}
                width={400}
              />
              <StyledTextApp variant="h2">
                Your Social Media With Connectify
              </StyledTextApp>
            </Grid>
            <Grid xs={12} md={6}>
              <StyledTextField
                id="outlined-basic"
                label="E-mail Address"
                variant="standard"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <StyledTextField
                id="outlined-basic"
                type="password"
                label="Password"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <StyledButton
                variant="contained"
                onClick={() => logInWithEmailAndPassword(email, password)}
              >
                Login with email and password
              </StyledButton>
              <StyledGoogleButton
                variant="contained"
                onClick={signInWithGoogle}
              >
                Login with Google
              </StyledGoogleButton>
              <StyledFacebookButton
                variant="contained"
                onClick={signInWithFacebook}
              >
                Login with Facebook
              </StyledFacebookButton>

              <StyledText variant="h6">
                <Link href="/reset">Forgot Password</Link>
              </StyledText>
              <StyledText variant="h5">
                Don't have an account?{" "}
                <Link href="/register">
                  <StyledTextRegister variant="h6">Register</StyledTextRegister>
                </Link>{" "}
                now.
              </StyledText>
            </Grid>
          </Grid>
        </Box>
      </div>
    </NoSsr>
  );
};
export default Login;
