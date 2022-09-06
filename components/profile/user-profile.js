import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function UserProfile() {
  const { data: session, status } = useSession();
  // Redirect away if NOT auth
  // useEffect(() => {
  //   if (!session) {
  //     return (window.location.href = `/auth`);
  //   }
  // }, [session]);

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
