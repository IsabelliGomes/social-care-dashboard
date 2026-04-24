import { render, screen } from "@testing-library/react";
import { ChartsSection } from "./ChartsSection";
import type { SummaryResponse } from "@/types";

jest.mock("@/components/AlertsByAreaChart/AlertsByAreaChart", () => ({
  AlertsByAreaChart: () => <div data-testid="alerts-by-area-chart" />,
}));

jest.mock("@/components/ReviewStatusChart/ReviewStatusChart", () => ({
  ReviewStatusChart: () => <div data-testid="review-status-chart" />,
}));

const summary: SummaryResponse = {
  totalChildren: 50,
  reviewedChildren: 30,
  alertsByArea: { saude: 4, educacao: 2, assistenciaSocial: 1 },
};

describe("ChartsSection", () => {
  test("renders both chart components", () => {
    render(<ChartsSection summary={summary} loading={false} />);

    expect(screen.getByTestId("alerts-by-area-chart")).toBeInTheDocument();
    expect(screen.getByTestId("review-status-chart")).toBeInTheDocument();
  });

  test("renders with null summary and loading state", () => {
    render(<ChartsSection summary={null} loading={true} />);

    expect(screen.getByTestId("alerts-by-area-chart")).toBeInTheDocument();
    expect(screen.getByTestId("review-status-chart")).toBeInTheDocument();
  });
});
