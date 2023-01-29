import Head from "next/head";
import Cards from "../components/cards";
import styled from "styled-components";
import Filter from "../components/filter";
import GET_VIDEOS from "../gql/queries/videos";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Videos = () => {
  const { query } = useRouter();
  const { loading, error, data, fetchMore, refetch } = useQuery(GET_VIDEOS, {
    variables: {
      perPage: 9,
      query: "",
    },
  });
  const videos = data?.videos?.data;

  useEffect(() => {
    refetch({ query: query.q as string });
  }, [query, refetch]);

  if (loading && !videos) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Filter />
        <Cards
          loadMore={() => {
            fetchMore({
              variables: {
                page: data.videos.page + 1,
              },
            });
          }}
          data={data}
        />
      </Container>
    </div>
  );
};

export default Videos;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 2em;
`;
