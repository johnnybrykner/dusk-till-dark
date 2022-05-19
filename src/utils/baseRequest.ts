import { Film, RequestMethods } from "@/types/apiTypes";
import handleError from "./handleError";

export default async function baseRequest(
  url: string,
  method: RequestMethods,
  queryString?: string,
  body?: Film
) {
  try {
    const query = queryString
      ? "&query=" + encodeURIComponent(queryString)
      : "";
    const rawResponse = await fetch(
      url + "?api_key=" + process.env.VUE_APP_TMDB_KEY + query,
      {
        method,
        body: JSON.stringify(body),
      }
    );
    return await rawResponse.json();
  } catch (error) {
    handleError(error as string);
  }
}
