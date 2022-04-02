import React from "react";
import { auth, db } from "../firebase";
import { withRouter } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = React.useState("prueba@hotmail.com ");
  const [pass, setPass] = React.useState("123456");
  const [error, setError] = React.useState(null);
  const [esRegistro, setEsRegistro] = React.useState(false);

  const procesarDatos = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      console.log("Ingrese email");
      setError("Ingrese email");
      return;
    }

    if (!pass.trim()) {
      console.log("Ingrese password");
      setError("Ingrese password");
      return;
    }

    if (pass.length < 6) {
      console.log("La password debe tener mas de 6 caracteres");
      setError("La password debe tener mas de 6 caracteres");
      return;
    }

    setError(null);

    if (esRegistro) {
      registrar();
    } else {
      login();
    }
  };

  const login = React.useCallback(async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, pass);
      setEmail("");
      setPass("");
      setError(null);
      props.history.push("/admin");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("Usuario o Password incorrectas");
      }

      if (error.code === "auth/wrong-password") {
        setError("Usuario o Password incorrectas");
      }
    }
  }, [email, pass, props.history]);

  const registrar = React.useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass);
      await db.collection("usuarios").doc(res.user.email).set({
        email: res.user.email,
        uid: res.user.uid,
      });

      await db.collection(res.user.uid).add({
        name: "Tarea de ejemplo",
        fecha: Date.now(),
      });

      setEmail("");
      setPass("");
      setError(null);
      console.log(res.user);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Email inválido");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("Usuario existente");
      }

      console.log(error);
    }
  }, [email, pass]);

  return (
    <div className="mt-5">
      <h3 className="text-center">
        {esRegistro ? "Registro de usuarios" : "Login de acceso"}
      </h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <form onSubmit={procesarDatos}>
            {error ? <div className="alert alert-danger">{error}</div> : null}

            <input
              type="email"
              className="form-control mb-2"
              placeholder="Ingrese un email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Ingrese un password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <button className="btn btn-dark btn-lg btn-block" type="submit">
              {esRegistro ? "Registrarse" : "Acceder"}
            </button>
            <button
              className="btn btn-info btn-sm btn-block"
              onClick={() => setEsRegistro(!esRegistro)}
              type="button"
            >
              {esRegistro ? "Ya estas registrado?" : "No tienes cuenta?"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
