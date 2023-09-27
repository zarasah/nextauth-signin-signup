'use client'
import { signOut } from 'next-auth/react';

function SignOutButton() {
  const handleSignOut = () => {
    signOut();
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}

export default SignOutButton;
