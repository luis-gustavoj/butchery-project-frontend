import { GetServerSideProps } from "next";
import Head from "next/head";
import { DashboardModule } from "src/modules/Dashboard";
import { withSSRAuth } from "src/utils/withSSRAuth";

export default function ProductsPage() {
  return (
    <>
      <Head>
        <title>MyButchery | Dashboard</title>
      </Head>
      <DashboardModule />
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
