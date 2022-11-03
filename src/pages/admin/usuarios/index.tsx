import { GetServerSideProps } from "next";
import Head from "next/head";
import { UsersModule } from "src/modules/Users";
import { withSSRAuth } from "src/utils/withSSRAuth";

export default function UsersPage() {
  return (
    <>
      <Head>
        <title>MyButchery | Usuários</title>
      </Head>
      <UsersModule />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  },
  {
    roles: ["admin"],
  }
);
