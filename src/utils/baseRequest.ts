import { Film, RequestMethods } from "@/types/apiTypes";

export default async function baseRequest(
  url: string,
  method: RequestMethods,
  body?: Film
) {
  const rawResponse = await fetch(url, {
    method,
    body: JSON.stringify(body),
  });
  return await rawResponse.json();
}
