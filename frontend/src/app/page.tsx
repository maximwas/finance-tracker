import { initializeApollo } from "@/lib/apolloClient";
import { GET_COUNT } from "@/graphql/queries/clicker";
import ClientClicker from "@/components/ClientClicker";
import { GetCountQuery } from "@/_generate/graphql";

export default async function HomePage() {
  const client = initializeApollo();

  const { data } = await client.query<GetCountQuery>({
    query: GET_COUNT,
    fetchPolicy: "no-cache",
  });

  return (
    <div>
      <p>Count: {data?.getCount.count}</p>
      <ClientClicker />
    </div>
  );
}
