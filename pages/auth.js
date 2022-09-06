import AuthForm from "../components/auth/auth-form";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";

function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace(`/`);
      } else {
        setLoading(false);
      }
    });
  }, [loading, router]);

  if (loading) {
    return <p>loading....</p>;
  }
  return <AuthForm />;
}

export default AuthPage;
