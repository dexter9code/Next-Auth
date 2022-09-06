import UserProfile from "../components/profile/user-profile";

import { getSession } from "next-auth/react";

function ProfilePage(props) {
  return <UserProfile />;
}

export default ProfilePage;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: `/auth`,
        permanent: false, //is this permanent redirect ?
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
