import classes from "./profile-form.module.css";
import { useRef } from "react";

function ProfileForm() {
  const newPasswordRef = useRef();
  const oldPasswordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPassword = newPasswordRef.current.value;
    const oldPassword = oldPasswordRef.current.value;

    const res = await fetch(`/api/user/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword, oldPassword }),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
