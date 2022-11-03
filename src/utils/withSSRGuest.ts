import jwtDecode from "jwt-decode";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

type ButcherUser = {
  role: string;
};

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies["butcher.access_token"];

    if (token) {
      const user = jwtDecode(token) as ButcherUser;

      if (user.role === "admin") {
        return {
          redirect: {
            destination: "/admin/usuarios",
            permanent: false,
          },
        };
      } else {
        return {
          redirect: {
            destination: "/gerenciamento/dashboard",
            permanent: false,
          },
        };
      }
    } else {
      return await fn(ctx);
    }
  };
}
