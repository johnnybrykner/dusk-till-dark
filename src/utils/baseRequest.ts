import { useStore } from "@/store";
import { AccountSettings, OurFilmInterface, RequestMethods, UserAccount } from "@/types/apiTypes";

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

export async function baseAccountRequest(
  urlSuffix: string,
  method: RequestMethods,
  body?: OurFilmInterface | AccountSettings,
): Promise<UserAccount | void> {
  const store = useStore();
  store.loading = true;
  try {
    const rawResponse = await fetch(
      process.env.VUE_APP_DUSK_API_BASE_URL + urlSuffix,
      {
        credentials: "include",
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!rawResponse.ok) {
      const errorObject = await rawResponse.json();
      throw errorObject.error;
    }
    const response = await rawResponse.json();
    if (response.message) {
      store.showNotification(response.message);
      return;
    } else {
      return response;
    }
  } catch (error) {
    store.handleError(error as string);
  } finally {
    store.loading = false;
  }
}
