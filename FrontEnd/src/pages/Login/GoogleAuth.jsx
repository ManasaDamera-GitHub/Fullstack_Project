import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in:", user);
      //   console.log(user.getIdToken());
      const idToken = await user.getIdToken();
      console.log("ID Token:", idToken);
      // You can redirect or perform other actions here
      toast.success(`welcome ${user.displayName}`);
      //   localStorage.setItem(
      //     "user",
      //     JSON.stringify({
      //       token: idToken,
      //       userid: user.uid,
      //       userName: user.displayName,
      //       email: user.email,
      //     })
      //   );
      localStorage.setItem("userId", user.uid);
      localStorage.setItem("userName", user.displayName);
      localStorage.setItem("token", idToken);
      navigate("/home");
    } catch (error) {
      toast.error("Google login failed. Please try again.");
      console.error("Google login error:", error);
    }
  };
  return (
    <div className="social-buttons">
      <button className="social-btn google-btn" onClick={handleGoogleLogin}>
        <FcGoogle className="social-icon" />
        Sign Up with Google
      </button>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default GoogleLoginButton;
