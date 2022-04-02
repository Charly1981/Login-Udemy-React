import React from "react";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";
import Firestore from "./Firestore";

function Admin(props) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (auth.currentUser) {
      console.log("existe el usuario");
      setUser(auth.currentUser);
    } else {
      props.history.push("/login");
      console.log("no existe");
    }
  }, [props.history]);

  return <div className="mt-5">{user && <Firestore user={user} />}</div>;
}

export default withRouter(Admin);
