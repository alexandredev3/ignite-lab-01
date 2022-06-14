import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "@auth0/nextjs-auth0";
import httpProxyMiddleware from "next-http-proxy-middleware";

const SCHEMA = process.env.NEXT_PUBLIC_GRAPHQL_SCHEMA;

export const config = {
  api: {
    bodyParser: false,
    // since we won't send any body request, we can disable the bodyParser.
  },
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { accessToken } = await getAccessToken(request, response);

  return httpProxyMiddleware(request, response, {
    target: SCHEMA, // to where we going to pass the new headers.
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
