import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfirmationReviewDialog } from "./ConfirmationReviewDialog";

describe("ConfirmationReviewDialog", () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    mockOnConfirm.mockClear();
    mockOnCancel.mockClear();
  });

  test("does not render when isOpen is false", () => {
    const { container } = render(
      <ConfirmationReviewDialog
        isOpen={false}
        message="Test message"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );
    expect(screen.queryByText("Test message")).not.toBeInTheDocument();
  });

  test("renders when isOpen is true", () => {
    render(
      <ConfirmationReviewDialog
        isOpen={true}
        message="Test message"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  test("renders default title", () => {
    render(
      <ConfirmationReviewDialog
        isOpen={true}
        message="Test message"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );
    expect(screen.getByText("Confirmar revisão")).toBeInTheDocument();
  });

  test("renders custom title", () => {
    render(
      <ConfirmationReviewDialog
        isOpen={true}
        title="Custom title"
        message="Test message"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );
    expect(screen.getByText("Custom title")).toBeInTheDocument();
  });

  test("renders default button texts", () => {
    render(
      <ConfirmationReviewDialog
        isOpen={true}
        message="Test message"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );
    expect(screen.getByRole("button", { name: /Confirmar/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancelar/ })).toBeInTheDocument();
  });

  test("calls onConfirm when confirm button is clicked", async () => {
    render(
      <ConfirmationReviewDialog
        isOpen={true}
        message="Test message"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  test("calls onCancel when cancel button is clicked", async () => {
    render(
      <ConfirmationReviewDialog
        isOpen={true}
        message="Test message"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /Cancelar/ }));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test("calls onCancel when overlay is clicked", async () => {
    render(
      <ConfirmationReviewDialog
        isOpen={true}
        message="Test message"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );
    const overlay = screen.getByRole("presentation", { hidden: true });
    await userEvent.click(overlay);
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test("disables buttons when isLoading is true", () => {
    render(
      <ConfirmationReviewDialog
        isOpen={true}
        message="Test message"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        isLoading={true}
      />
    );
    expect(screen.getByRole("button", { name: /Processando/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Cancelar/ })).toBeDisabled();
  });

  test("shows loading text when isLoading is true", () => {
    render(
      <ConfirmationReviewDialog
        isOpen={true}
        message="Test message"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        isLoading={true}
      />
    );
    expect(screen.getByText("Processando...")).toBeInTheDocument();
  });
});
