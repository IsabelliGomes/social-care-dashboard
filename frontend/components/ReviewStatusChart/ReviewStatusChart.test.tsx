import { render, screen } from "@testing-library/react";
import { ReviewStatusChart } from "./ReviewStatusChart";
import type { SummaryResponse } from "@/types";

jest.mock("recharts", () => ({
  PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => null,
  Cell: () => null,
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
}));

const summary: SummaryResponse = {
  totalChildren: 128,
  reviewedChildren: 78,
  alertsByArea: { saude: 10, educacao: 5, assistenciaSocial: 3 },
};

describe("ReviewStatusChart", () => {
  test("renders the title", () => {
    render(<ReviewStatusChart summary={summary} loading={false} />);

    expect(screen.getByText("Status de revisão")).toBeInTheDocument();
  });

  test("shows skeleton while loading", () => {
    render(<ReviewStatusChart summary={null} loading={true} />);

    expect(screen.queryByTestId("pie-chart")).not.toBeInTheDocument();
  });

  test("renders chart when not loading", () => {
    render(<ReviewStatusChart summary={summary} loading={false} />);

    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
  });

  test("displays total in the center", () => {
    render(<ReviewStatusChart summary={summary} loading={false} />);

    expect(screen.getByText("128")).toBeInTheDocument();
    expect(screen.getByText("total")).toBeInTheDocument();
  });

  test("shows reviewed count and percentage", () => {
    render(<ReviewStatusChart summary={summary} loading={false} />);

    expect(screen.getByText("Revisados")).toBeInTheDocument();
    expect(screen.getByText(/78/)).toBeInTheDocument();
    expect(screen.getByText("(61%)")).toBeInTheDocument();
  });

  test("shows pending count and percentage", () => {
    render(<ReviewStatusChart summary={summary} loading={false} />);

    expect(screen.getByText("Pendentes")).toBeInTheDocument();
    expect(screen.getByText(/50/)).toBeInTheDocument();
    expect(screen.getByText("(39%)")).toBeInTheDocument();
  });

  test("shows zeros when summary is null and not loading", () => {
    render(<ReviewStatusChart summary={null} loading={false} />);

    expect(
      screen.getByLabelText("0 crianças no total")
    ).toBeInTheDocument();
  });
});
