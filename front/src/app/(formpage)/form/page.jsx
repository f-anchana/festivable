import styles from "./Form.module.css";
import AuthContainer from "@/components/AuthContainer/AuthContainer";
import SignupButtons from "@/components/SignupButtons/SignupButtons";
import LoginForm from "@/components/LoginForm/LoginForm";
import style from "../form/style.css";

export default function FormulairePage() {
  return (
    <div className={styles.container}>
      <LoginForm />
      <AuthContainer />
        <SignupButtons />
    </div>

  );
}
