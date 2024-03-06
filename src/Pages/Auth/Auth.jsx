import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Auth = () => {
  const [toRegister, setToRegister] = useState(false);

  return (
    <div>
      {toRegister && (
        <SignUp toRegister={(boolean) => setToRegister(boolean)} />
      )}
      {!toRegister && (
        <SignIn toRegister={(boolean) => setToRegister(boolean)} />
      )}
    </div>
  );
};

export default Auth;
