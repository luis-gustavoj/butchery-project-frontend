import { GetServerSideProps } from "next";
import Head from "next/head";
import { CostsModule } from "src/modules/Costs";
import { withSSRAuth } from "src/utils/withSSRAuth";

export default function ProductsPage() {
  return (
    <>
      <Head>
        <title>MyButchery | Custos</title>
      </Head>
      <CostsModule />
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
    roles: ["user"],
  }
);
