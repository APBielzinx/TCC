import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./services/firebase";
import Login from "./components/Login";
import Loading from "./components/Loading";

    const App = () => {

        const [user, loading] = useAuthState(auth);

        useEffect(() => {
            if (user) {
              db.collection("users").doc(user.uid).set({
                email: user.email,
                photoURL: user.photoURL,
              });
            }
          }, [user]);

          if (loading) return <Loading />;

          if (!user) return <Login />;

        return <div>App</div>;

    };

    export default App;