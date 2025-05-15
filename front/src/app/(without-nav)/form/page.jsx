import styles from "./Form.module.css";
import AuthContainer from "@/components/AuthContainer/AuthContainer";
import SignupButtons from "@/components/SignupButtons/SignupButtons";
import LoginForm from "@/components/LoginForm/LoginForm";
import Image from "next/image";

export default function FormulairePage() {
  return (
    <div className={`${styles.container} form`}>
      <LoginForm />
      <AuthContainer />
      <SignupButtons />
      <Image src="/decor/slider-decor-1.png" alt="" width={200} height={200} className={`${styles.decor4}`} />
      <Image src="/decor/slider-decor-3.png" alt="" width={80} height={90} className={`${styles.decor5}`} />
    </div>

  );
}
