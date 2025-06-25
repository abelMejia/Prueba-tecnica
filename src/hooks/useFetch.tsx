import { useEffect, useState } from "react"
import HttpClient from "../api/HttpClient";

function useFetch<T>(endpoint: string) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await HttpClient.get<{ results: T[]}>(endpoint);

              const details = await Promise.all(response.results.map((pokemon: any) => HttpClient.get<T>(pokemon.url.split('/v2')[1])))
              setData(details)
          } catch (error) {
              setError(error instanceof Error ? error.message: 'Error desconocido')
          } finally {
            setLoading(false)
          }
      }

      fetchData();
    }, []);

    return { loading, data, error }
}

export default useFetch
