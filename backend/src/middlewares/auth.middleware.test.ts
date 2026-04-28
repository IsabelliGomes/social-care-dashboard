import type { NextFunction, Response } from "express";
import { requireAuth, type AuthRequest } from "./auth.middleware";
import * as authService from "../services/auth/auth.service";

jest.mock("../services/auth/auth.service");

const mockVerifyToken = authService.verifyToken as jest.MockedFunction<
  typeof authService.verifyToken
>;

function createRes(): Response {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe("requireAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns 401 when Authorization header is missing", () => {
    const req = { headers: {} } as AuthRequest;
    const res = createRes();
    const next = jest.fn() as NextFunction;

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Missing or invalid authorization header",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("returns 401 when Authorization is not Bearer", () => {
    const req = {
      headers: { authorization: "Basic xyz" },
    } as AuthRequest;
    const res = createRes();
    const next = jest.fn() as NextFunction;

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test("returns 401 when token is invalid or expired", () => {
    mockVerifyToken.mockReturnValue(null);
    const req = {
      headers: { authorization: "Bearer bad-token" },
    } as AuthRequest;
    const res = createRes();
    const next = jest.fn() as NextFunction;

    requireAuth(req, res, next);

    expect(mockVerifyToken).toHaveBeenCalledWith("bad-token");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid or expired token",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("calls next and sets req.user when token is valid", () => {
    const payload = { preferred_username: "user@example.com" };
    mockVerifyToken.mockReturnValue(payload);
    const req = {
      headers: { authorization: "Bearer valid.jwt.token" },
    } as AuthRequest;
    const res = createRes();
    const next = jest.fn() as NextFunction;

    requireAuth(req, res, next);

    expect(mockVerifyToken).toHaveBeenCalledWith("valid.jwt.token");
    expect(req.user).toEqual(payload);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
