import Head from "next/head";
import { ResultsAnalysisModule } from "src/modules/ResultsAnalysis";

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
