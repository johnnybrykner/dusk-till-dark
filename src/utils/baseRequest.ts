import { useStore } from "@/store";
import { OurFilmInterface, RequestMethods } from "@/types/apiTypes";

export default async function baseRequest(
  url: string,
  method: RequestMethods,
  queryString?: string,
  body?: OurFilmInterface
) {
  const store = useStore();
  store.loading = true;
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
    store.handleError(error as string);
  } finally {
    store.loading = false;
  }
}
