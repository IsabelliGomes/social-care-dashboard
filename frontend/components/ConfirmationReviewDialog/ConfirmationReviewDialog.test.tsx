import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmationReviewDialog } from "./ConfirmationReviewDialog";

describe("ConfirmationReviewDialog", () => {
  test("renders when isOpen is true", () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    render(
      <ConfirmationReviewDialog
        isOpen={true}
        title="Confirmar ação"
        message="Tem certeza?"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    expect(screen.getByText("Confirmar ação")).toBeInTheDocument();
    expect(screen.getByText("Tem certeza?")).toBeInTheDocument();
  });

  test("does not render when isOpen is false", () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    render(
      <ConfirmationReviewDialog
        isOpen={false}
        title="Confirmar ação"
        message="Tem certeza?"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    expect(screen.queryByText("Confirmar ação")).not.toBeInTheDocument();
  });

  test("calls onConfirm when confirm button is clicked", () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    render(
      <ConfirmationReviewDialog
        isOpen={true}
        title="Confirmar ação"
        message="Tem certeza?"
        confirmText="Confirmar"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  test("calls onCancel when cancel button is clicked", () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    render(
      <ConfirmationReviewDialog
        isOpen={true}
        title="Confirmar ação"
        message="Tem certeza?"
        cancelText="Cancelar"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test("disables buttons when isLoading is true", () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    render(
      <ConfirmationReviewDialog
        isOpen={true}
        title="Confirmar ação"
        message="Tem certeza?"
        onConfirm={onConfirm}
        onCancel={onCancel}
        isLoading={true}
      />
    );

    expect(screen.getByRole("button", { name: /confirmar/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /cancelar/i })).toBeDisabled();
  });
});
