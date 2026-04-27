import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  const mockOnPageChange = jest.fn();
  const defaultProps = {
    page: 1,
    totalPages: 5,
    total: 50,
    pageSize: 10,
    onPageChange: mockOnPageChange,
  };

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  test("renders pagination summary", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText(/Mostrando 1 a 10 de 50/)).toBeInTheDocument();
  });

  test("renders all page buttons", () => {
    render(<Pagination {...defaultProps} />);
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByRole("button", { name: `Página ${i}` })).toBeInTheDocument();
    }
  });

  test("marks current page as active", () => {
    render(<Pagination {...defaultProps} page={2} />);
    expect(screen.getByRole("button", { name: "Página 2" })).toHaveAttribute("aria-current", "page");
  });

  test("disables previous button on first page", () => {
    render(<Pagination {...defaultProps} page={1} />);
    expect(screen.getByRole("button", { name: /Página anterior/ })).toBeDisabled();
  });

  test("disables next button on last page", () => {
    render(<Pagination {...defaultProps} page={5} />);
    expect(screen.getByRole("button", { name: /Próxima página/ })).toBeDisabled();
  });

  test("calls onPageChange when page button is clicked", async () => {
    render(<Pagination {...defaultProps} />);
    await userEvent.click(screen.getByRole("button", { name: "Página 3" }));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test("calls onPageChange with previous page when previous button clicked", async () => {
    render(<Pagination {...defaultProps} page={2} />);
    await userEvent.click(screen.getByRole("button", { name: /Página anterior/ }));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  test("calls onPageChange with next page when next button clicked", async () => {
    render(<Pagination {...defaultProps} page={1} />);
    await userEvent.click(screen.getByRole("button", { name: /Próxima página/ }));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test("calculates correct range for last page with partial items", () => {
    render(<Pagination {...defaultProps} page={5} total={47} />);
    expect(screen.getByText(/Mostrando 41 a 47 de 47/)).toBeInTheDocument();
  });
});
