import { GetServerSideProps } from "next";
import Head from "next/head";
import { LoginModule } from "src/modules/Login";
import { withSSRGuest } from "src/utils/withSSRGuest";

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

export const getServerSideProps: GetServerSideProps = withSSRGuest(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
