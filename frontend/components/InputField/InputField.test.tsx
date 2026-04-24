import { fireEvent, render, screen } from "@testing-library/react";

import { InputField } from "./InputField";

describe("InputField", () => {
  test("renders label, placeholder and required indicator", () => {
    render(
      <InputField
        label="E-mail"
        id="email"
        value=""
        onChange={jest.fn()}
        placeholder="tecnico@prefeitura.rio"
        required
      />
    );

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("tecnico@prefeitura.rio")
    ).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  test("calls onChange when the value changes", () => {
    const handleChange = jest.fn();

    render(
      <InputField
        label="Senha"
        id="password"
        type="password"
        value=""
        onChange={handleChange}
      />
    );

    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "123456" },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("shows error state and message", () => {
    render(
      <InputField
        label="E-mail"
        id="email"
        value="invalido"
        onChange={jest.fn()}
        error="E-mail inválido"
      />
    );

    const input = screen.getByLabelText(/E-mail/i);

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-error");
    expect(screen.getByText("E-mail inválido")).toBeInTheDocument();
  });
});
