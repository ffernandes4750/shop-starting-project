import { useQuery } from "@tanstack/react-query";
import Header from "../../components/Header.tsx";
import type { StationType } from "../../types/station.ts";
import { useProductsRealtime } from "../../sockets/useProductsRealtime.ts";
import CojmosContainer from "./CojmosContainer.tsx";
import { fetchStations } from "../../api/cojmos.ts";

export default function HomePage() {
  useProductsRealtime();

  const {
    data: stations = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<StationType[], Error>({
    queryKey: ["stations"],
    queryFn: fetchStations,
  });

  let message: React.ReactNode = null;
  if (isLoading) message = <p>A carregar produtos…</p>;
  else if (isError) message = <p>Erro a obter produtos: {error.message}</p>;
  else if (isFetching) message = <p>A atualizar produtos…</p>;

  return (
    <>
      <Header cojmosMode={true} name={"COJMOS"} />
      {/* {message} */}
      <CojmosContainer stations={stations} />
    </>
  );
}
