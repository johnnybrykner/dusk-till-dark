import { useStore } from "@/store";

export default function handleError(error: string) {
  const store = useStore();

  store.thrownError = error;
}
