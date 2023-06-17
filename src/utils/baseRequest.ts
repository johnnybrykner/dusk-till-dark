import { useStore } from "@/store";
import {
  AWSEndpoints,
  OurFilmInterface,
  RequestMethods,
} from "@/types/apiTypes";

export async function baseTmdbRequest(
  url: string,
  method: RequestMethods,
  queryString?: string,
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
      },
    );
    return await rawResponse.json();
  } catch (error) {
    store.handleError(error as string);
  } finally {
    store.loading = false;
  }
}

export async function baseAwsRequest(
  urlPrefix: AWSEndpoints,
  method: RequestMethods,
  body?: OurFilmInterface,
) {
  const store = useStore();
  store.loading = true;
  try {
    const rawResponse = await fetch(
      urlPrefix + process.env.VUE_APP_AWS_BASE_URL,
      {
        method,
        body: JSON.stringify(body),
      },
    );
    return await rawResponse.json();
  } catch (error) {
    store.handleError(error as string);
  } finally {
    store.loading = false;
  }
}
