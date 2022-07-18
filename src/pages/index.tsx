import Head from "next/head";
import { LoginModule } from "src/modules/Login";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>MyButchery | Login</title>
      </Head>
      <LoginModule />
    </>
  );
}
