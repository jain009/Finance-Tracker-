import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import { doc, getDoc, setDoc } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";
import Button from "../Button";

import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function SigninSignupComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [loginForm, setLoginForm] = useState("");
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    console.log("Name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("confirmpassword", confirmPassword);
    // signInWithCustomToken(auth, token)
    // .then((userCredential) => {
    //   // Signed in
    //   const user = userCredential.user;
    //   // ...
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // ...
    // });
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("User>>>", user);
            toast.success("User Created!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
            // create A doc with user id at the following id
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);

            // ..
          });
      } else {
        toast.error("Password dont match dont match");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }
  function loginWithEmail() {
    setLoading(true);
    console.log("Email", email);
    console.log("Password", password);
    if (email != "" && password != "") {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Login successfuly");
          console.log("User Logged IN", user);
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } else {
      toast.error("All fields are required");
      setLoading(false);
    }
  }
  async function createDoc(user) {
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "user", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", "user-uid"), {
          name: user.dispalyName ? user.dispalyName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createAt: new Date(),
        });
        toast.success("Doc created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("The Doc is existed");
    }
  }
  function googleAuth() {
    setLoading(true);
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user logged in:", user);
          createDoc(user);
          setLoading(false);
          navigate("/dashboard");
          toast.success("User authenticated");
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <>
      {loginForm ? (
        <>
          {" "}
          <div className="signup-wrapper">
            <h2 className="title">
              Login <span style={{ color: "var(--theme)" }}>Financialy</span>
            </h2>
            <form>
              <Input
                type={"text"}
                label={"Email"}
                state={email}
                setState={setEmail}
                placeholder={"JohnDoh@gmail.com"}
              />
              <Input
                type={"password"}
                label={"Password"}
                state={password}
                setState={setPassword}
                placeholder={"abcd@gmail.com"}
              />

              <Button
                disabled={loading}
                text={loading ? "Loading..." : "Login using Email and password"}
                onClick={loginWithEmail}
              />
              <p className="p-login">or</p>
              <Button
                text={"Signin using Goggle "}
                onClick={googleAuth}
                blue={true}
              />

              <p
                className="p-login"
                onClick={() => setLoginForm(!loginForm)}
                style={{ cursor: "pointer" }}
              >
                or Don't have acoount ? clickhere
              </p>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="signup-wrapper">
            <h2 className="title">
              Sign up <span style={{ color: "var(--theme)" }}>Financialy</span>
            </h2>
            <form>
              <Input
                type={"text"}
                label={"Full Name"}
                state={name}
                setState={setName}
                placeholder={"john Doe"}
              />
              <Input
                type={"text"}
                label={"Email"}
                state={email}
                setState={setEmail}
                placeholder={"JohnDoh@gmail.com"}
              />
              <Input
                type={"password"}
                label={"Password"}
                state={password}
                setState={setPassword}
                placeholder={"abcd@gmail.com"}
              />
              <Input
                type={"password"}
                label={"Confirm Password"}
                state={confirmPassword}
                setState={setConfirmPassword}
                placeholder={"abcd@gmail.com"}
              />
              <Button
                text={
                  loading ? "Loading..." : "Signup using Email and password"
                }
                onClick={signupWithEmail}
                disabled={loading}
              />
              <p className="p-login">or</p>
              <Button
                text={loading ? "Loading.." : "Signup using Goggle "}
                onClick={googleAuth}
                blue={true}
              />
              <p
                className="p-login"
                style={{ cursor: "pointer", textAlign: "center", margin: "0" }}
                onClick={() => setLoginForm(!loginForm)}
              >
                or have an account allready ? click here
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default SigninSignupComponent;
