import { signIn, signOut, useSession } from "next-auth/react";

const AuthPage = () => {
  const { data: session } = useSession();
  console.log(session);
  
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default AuthPage;
