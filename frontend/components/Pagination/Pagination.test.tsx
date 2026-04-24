import { fireEvent, render, screen } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  test("renders the summary text", () => {
    const { container } = render(
      <Pagination
        page={2}
        totalPages={3}
        total={12}
        pageSize={5}
        onPageChange={jest.fn()}
      />
    );

    const summary = container.querySelector(".summary");
    expect(summary).toBeInTheDocument();
    expect(summary?.textContent?.includes("Mostrando")).toBe(true);
    expect(summary?.textContent?.includes("12")).toBe(true);
  });

  test("disables previous button on first page and next on last page", () => {
    const { rerender } = render(
      <Pagination
        page={1}
        totalPages={3}
        total={12}
        pageSize={5}
        onPageChange={jest.fn()}
      />
    );

    expect(screen.getByRole("button", { name: /anterior/i })).toBeDisabled();

    rerender(
      <Pagination
        page={3}
        totalPages={3}
        total={12}
        pageSize={5}
        onPageChange={jest.fn()}
      />
    );

    expect(screen.getByRole("button", { name: /pr.*xima/i })).toBeDisabled();
  });

  test("calls onPageChange when clicking controls", () => {
    const onPageChange = jest.fn();

    render(
      <Pagination
        page={2}
        totalPages={4}
        total={20}
        pageSize={5}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /4/ }));
    fireEvent.click(screen.getByRole("button", { name: /anterior/i }));
    fireEvent.click(screen.getByRole("button", { name: /pr.*xima/i }));

    expect(onPageChange).toHaveBeenCalledWith(4);
    expect(onPageChange).toHaveBeenCalledWith(1);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test("marks the current page with aria-current", () => {
    render(
      <Pagination
        page={2}
        totalPages={3}
        total={12}
        pageSize={5}
        onPageChange={jest.fn()}
      />
    );

    expect(screen.getByRole("button", { name: /2/ })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });
});
