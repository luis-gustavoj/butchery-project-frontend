import Head from "next/head";
import { AnalysisModule } from "src/modules/Analysis";

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
