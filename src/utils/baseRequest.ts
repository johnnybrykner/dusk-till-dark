import { Film, RequestMethods } from "@/types/apiTypes";

export default async function baseRequest(
  url: string,
  method: RequestMethods,
  body?: Film
) {
  const rawResponse = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  console.log(rawResponse);
}
