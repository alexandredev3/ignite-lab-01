import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

import { withApollo } from "lib/withApollo";
import {
  getServerPageGetProducts,
  ssrGetProducts,
  useMe,
} from "graphql/generated/page";

function Home({ data }) {
  const { user } = useUser();
  const { data: me, loading, error } = useMe();

  return (
    <div>
      <h1>Home</h1>
      {/* <pre>{JSON.stringify(data.products, null, 2)}</pre> */}
      {error ? (
        <pre>{JSON.stringify(error, null, 2)}</pre>
      ) : (
        <pre>{JSON.stringify(me, null, 2)}</pre>
      )}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    // return getServerPageGetProducts({}, ctx);

    return {
      props: {},
    };
  },
});

// ssrGetProducts.withPage()(Home) This is necessary to execute the query on the server side.
export default withApollo(ssrGetProducts.withPage()(Home));
