import { GetServerSideProps } from "next";
import Head from "next/head";
import { AnalysisModule } from "src/modules/Analysis";
import { withSSRAuth } from "src/utils/withSSRAuth";

export default function ProductsPage() {
  return (
    <>
      <Head>
        <title>MyButchery | Análise de rendimento</title>
      </Head>
      <AnalysisModule />
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
