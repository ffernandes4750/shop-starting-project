import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchReadings } from "../../api/cojmos.ts";
import Header from "../../components/Header.tsx";

function formatForInput(d: Date) {
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
}

export default function CojmosStationPage() {
  const { stationId } = useParams();
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 24 * 60 * 60 * 1000),
    end: new Date(),
  });

  const { data: readings, isLoading } = useQuery({
    queryKey: [
      "readings",
      stationId,
      dateRange.start.toISOString(),
      dateRange.end.toISOString(),
    ],
    queryFn: () => fetchReadings(stationId!, dateRange.start, dateRange.end),
    enabled: !!stationId,
    refetchOnWindowFocus: false,
  });

  const variableIds = useMemo(() => {
    const ids = new Set<string>();
    readings?.forEach((r) => r.variables.forEach((v) => ids.add(v.id)));
    return Array.from(ids);
  }, [readings]);

  if (!stationId) return <div>Station ID not found</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Header cojmosMode={true} name="COJMOS" />

      <div className="container mt-4">
        <h2>Station: {stationId}</h2>

        <div className="mb-4 d-flex align-items-center gap-3">
          <label>
            Start:
            <input
              type="datetime-local"
              value={formatForInput(dateRange.start)}
              onChange={(e) =>
                setDateRange((prev) => ({
                  ...prev,
                  start: new Date(e.target.value),
                }))
              }
              className="form-control ms-2"
            />
          </label>

          <label>
            End:
            <input
              type="datetime-local"
              value={formatForInput(dateRange.end)}
              onChange={(e) =>
                setDateRange((prev) => ({
                  ...prev,
                  end: new Date(e.target.value),
                }))
              }
              className="form-control ms-2"
            />
          </label>
        </div>

        {!readings || readings.length === 0 ? (
          <div>Nenhuma leitura encontrada no intervalo seleccionado.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  {variableIds.map((id) => (
                    <th key={id}>{id}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {readings.map((reading) => {
                  const lookup = new Map(
                    reading.variables.map((v) => [v.id, v.value])
                  );
                  return (
                    <tr key={new Date(reading.timestamp).toISOString()}>
                      <td>{new Date(reading.timestamp).toLocaleString()}</td>
                      {variableIds.map((id) => (
                        <td key={id}>{lookup.get(id) ?? ""}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
