import { getSummaryService } from "../services/summary.service";

describe("getSummaryService", () => {
  test("returns aggregated summary data", () => {
    const expectedTotalChildren = 25;
    const expectedReviewedChildren = 4;
    const expectedHealthAlerts = 8;
    const expectedEducationAlerts = 9;
    const expectedSocialAssistanceAlerts = 8;

    const result = getSummaryService();

    expect(result.totalChildren).toBe(expectedTotalChildren);
    expect(result.reviewedChildren).toBe(expectedReviewedChildren);
    expect(result.alertsByArea.saude).toBe(expectedHealthAlerts);
    expect(result.alertsByArea.educacao).toBe(expectedEducationAlerts);
    expect(result.alertsByArea.assistenciaSocial).toBe(
      expectedSocialAssistanceAlerts
    );
  });
});
