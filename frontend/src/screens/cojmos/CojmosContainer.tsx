import { Container, Row, Col } from "react-bootstrap";

import Station from "./Station.tsx";

import type { StationType } from "../../types/station.ts";

type CojmosContainerProps = {
  stations: StationType[];
};

export default function CojmosContainer({ stations }: CojmosContainerProps) {
  return (
    <>
      <section id="shop" className="py-4">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 m-0">Estações</h2>
          </div>

          <Row xs={1} md={2} lg={3} className="g-4">
            {stations.map((s) => (
              <Col key={s.id}>
                <Station {...s} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}
