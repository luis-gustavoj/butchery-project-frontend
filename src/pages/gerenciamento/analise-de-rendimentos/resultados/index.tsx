import { GetServerSideProps } from "next";
import Head from "next/head";
import { ResultsAnalysisModule } from "src/modules/ResultsAnalysis";
import { withSSRAuth } from "src/utils/withSSRAuth";

export default function ProductsPage() {
  return (
    <>
      <Head>
        <title>MyButchery | Análise de rendimento</title>
      </Head>
      <ResultsAnalysisModule />
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
