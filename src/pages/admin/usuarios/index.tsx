import Head from "next/head";
import { UsersModule } from "src/modules/Users";

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
