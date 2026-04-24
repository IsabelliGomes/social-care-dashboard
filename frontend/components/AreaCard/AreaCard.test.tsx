import { render, screen } from "@testing-library/react";
import { AreaCard } from "./AreaCard";

describe("AreaCard", () => {
  test("renders saude area with alerts", () => {
    render(
      <AreaCard
        area="saude"
        data={{
          ultima_consulta: "2024-02-10",
          vacinas_em_dia: false,
          alertas: ["Acompanhamento pendente"],
        }}
      />
    );
    expect(screen.getByText("Acompanhamento pendente")).toBeInTheDocument();
    expect(screen.getByText("Alerta")).toBeInTheDocument();
    expect(screen.getByText(/última consulta/i)).toBeInTheDocument();
  });

  test("renders educacao area with frequency", () => {
    render(
      <AreaCard
        area="educacao"
        data={{
          escola: "CIEP 208 Paulo Sarasate",
          frequencia_percent: 41,
          alertas: [],
        }}
      />
    );
    expect(screen.getByText(/CIEP 208/)).toBeInTheDocument();
    expect(screen.getByText(/41%/)).toBeInTheDocument();
  });

  test("renders assistenciaSocial area with benefits", () => {
    render(
      <AreaCard
        area="assistenciaSocial"
        data={{
          cad_unico: false,
          beneficio_ativo: false,
          alertas: ["cadastro_desatualizado"],
        }}
      />
    );
    expect(screen.getByText(/cadastro_desatualizado/)).toBeInTheDocument();
  });

  test("renders empty state when data is null", () => {
    render(<AreaCard area="saude" data={null} />);
    expect(screen.getByText(/nenhum dado/i)).toBeInTheDocument();
  });
});
