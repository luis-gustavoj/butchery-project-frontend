import Head from "next/head";
import { ProductsModule } from "src/modules/Products";

export default function ProductsPage() {
  return (
    <>
      <Head>
        <title>MyButchery | Produtos</title>
      </Head>
      <ProductsModule />
    </>
  );
}
