import React, { useEffect } from "react";
import "./styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userImg from "../../assets/react.svg";

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logoutfnc() {
    try {
      signOut(auth)
        .then(() => {
          // sign-out successful.
          toast.success("Logged Out Successfully");
          navigate("/");
        })
        .catch((error) => {
          // An error happened.
        });
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <div className="navbar">
      <p className="logo">Financialy</p>

      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* <img
            src={user.photoURL ? userPhotoURL : userImg}
            style={{
              // height: "2rem",
              width: "2rem",
              display: "flex",
              borderRadius: "50%",
              height:"1.5rem",
              alignItems: "center",
              gap: "0.5rem",
            }}
          /> */}
          <p className="logo link" onClick={logoutfnc}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
