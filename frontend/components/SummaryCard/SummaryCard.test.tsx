import { render, screen } from "@testing-library/react";
import { Users } from "lucide-react";
import { SummaryCard } from "./SummaryCard";

describe("SummaryCard", () => {
  test("renders title and value", () => {
    render(<SummaryCard title="Total de Crianças" value={42} icon={Users} />);

    expect(screen.getByText("Total de Crianças")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  test("renders description when provided", () => {
    render(
      <SummaryCard
        title="Revisadas"
        value={10}
        icon={Users}
        description="casos revisados"
      />
    );

    expect(screen.getByText("casos revisados")).toBeInTheDocument();
  });

  test("does not render description when omitted", () => {
    render(<SummaryCard title="Pendentes" value={5} icon={Users} />);

    expect(screen.queryByRole("paragraph", { name: /description/ })).toBeNull();
  });

  test("renders string value (loading placeholder)", () => {
    render(<SummaryCard title="Alertas" value="—" icon={Users} />);

    expect(screen.getByText("—")).toBeInTheDocument();
  });

  test("applies correct accent class for alert variant", () => {
    const { container } = render(
      <SummaryCard title="Alertas" value={3} icon={Users} accent="alert" />
    );

    const article = container.querySelector("article");
    expect(article?.className).toMatch(/accent-alert/);
  });
});
