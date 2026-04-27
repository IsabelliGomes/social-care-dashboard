import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputField } from "./InputField";

describe("InputField", () => {
  test("renders label and input", () => {
    render(
      <InputField
        label="Email"
        id="email"
        value=""
        onChange={jest.fn()}
      />
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  test("shows required asterisk when required is true", () => {
    render(
      <InputField
        label="Email"
        id="email"
        value=""
        onChange={jest.fn()}
        required={true}
      />
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  test("calls onChange when input value changes", async () => {
    const handleChange = jest.fn();
    render(
      <InputField
        label="Email"
        id="email"
        value=""
        onChange={handleChange}
      />
    );
    const input = screen.getByLabelText("Email");
    await userEvent.type(input, "test@example.com");
    expect(handleChange).toHaveBeenCalled();
  });

  test("displays error message when error is provided", () => {
    render(
      <InputField
        label="Email"
        id="email"
        value=""
        onChange={jest.fn()}
        error="Email inválido"
      />
    );
    expect(screen.getByText("Email inválido")).toBeInTheDocument();
  });

  test("marks input as invalid when error is present", () => {
    render(
      <InputField
        label="Email"
        id="email"
        value=""
        onChange={jest.fn()}
        error="Email inválido"
      />
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });

  test("disables input when disabled is true", () => {
    render(
      <InputField
        label="Email"
        id="email"
        value=""
        onChange={jest.fn()}
        disabled={true}
      />
    );
    expect(screen.getByLabelText("Email")).toBeDisabled();
  });

  test("sets input type correctly", () => {
    render(
      <InputField
        label="Password"
        id="password"
        type="password"
        value=""
        onChange={jest.fn()}
      />
    );
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
  });

  test("shows placeholder text", () => {
    render(
      <InputField
        label="Email"
        id="email"
        value=""
        onChange={jest.fn()}
        placeholder="Enter email"
      />
    );
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
  });
});
