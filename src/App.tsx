import React, { useState } from "react";
import SignUpForm from "./Component/Signupform";
import LoginForm from "./Component/Loginform";

const App: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h1>{isSignUp ? "Sign Up" : "Login"}</h1>
      {isSignUp ? (
        <SignUpForm onSwitch={() => setIsSignUp(false)} />
      ) : (
        <LoginForm onSwitch={() => setIsSignUp(true)} />
      )}
    </div>
  );
};

export default App;
