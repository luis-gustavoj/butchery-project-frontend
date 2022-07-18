import Head from "next/head";
import { DashboardModule } from "src/modules/Dashboard";

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
