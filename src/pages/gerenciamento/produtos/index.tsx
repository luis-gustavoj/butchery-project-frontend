import { GetServerSideProps } from "next";
import Head from "next/head";
import { ProductsModule } from "src/modules/Products";
import { withSSRAuth } from "src/utils/withSSRAuth";

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
