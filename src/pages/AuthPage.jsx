import React from "react";
import "../styles/index.css";
import LogInComponent from "../components/userAuth/LogInComponent";
import RegisterComponent from "../components/userAuth/RegisterComponent";
import { useState } from "react";

function AuthPage() {
    // en state som toggles for å enten vise login- eller registrer-componenten
    const [visLogin, setVisLogin] = useState(true);


    return (
        <><div className="login-page-wrapper">
            <div className="login-page-empty"></div><div className="login-page-empty"></div>
            <div className="login-page-main">

                { visLogin ? <LogInComponent/> : <RegisterComponent/> }

                <button onClick={()=> setVisLogin(!visLogin)} className="user-auth-toggle"> {/*hva enn den var, bytter.*/}
                    {visLogin ? "Create an account" : "Back to login"}
                </button>
            </div>
            <div className="login-page-empty"></div><div className="login-page-empty"></div>
        </div>
        </>
    );
}

export default AuthPage;