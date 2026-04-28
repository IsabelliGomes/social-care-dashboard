import { childrenRouter } from "./children.routes";
import { summaryRouter } from "./summary.routes";
import { requireAuth } from "../middlewares/auth.middleware";

describe("protected API routers", () => {
  test("children router registers requireAuth before route handlers", () => {
    expect(childrenRouter.stack.length).toBeGreaterThanOrEqual(4);
    expect(childrenRouter.stack[0].handle).toBe(requireAuth);
  });

  test("summary router registers requireAuth before route handlers", () => {
    expect(summaryRouter.stack.length).toBeGreaterThanOrEqual(2);
    expect(summaryRouter.stack[0].handle).toBe(requireAuth);
  });
});
