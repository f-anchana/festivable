import styles from "./Form.module.css";
import AuthContainer from "@/components/AuthContainer/AuthContainer";
import SignupForm from "@/components/SignupForm/SignupForm";
import LoginForm from "@/components/LoginForm/LoginForm";

export default function FormulairePage() {
  return (
<div className={styles.container}>
        <AuthContainer />
        <SignupForm />
    </div>

  );
}
