import Head from "next/head";
import { CostsModule } from "src/modules/Costs";

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
