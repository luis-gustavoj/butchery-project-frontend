import Head from "next/head";
import { RegisterModule } from "src/modules/Register";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>MyButchery | Login</title>
      </Head>
      <RegisterModule />
    </>
  );
}
