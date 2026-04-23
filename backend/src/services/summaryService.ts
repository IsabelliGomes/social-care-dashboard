import { getChildren } from "../data/childrenStore";

export const getSummaryService = async () => {
  const children = await getChildren();

  const totalChildren = children.length;
  const reviewedChildren = children.filter((child) => child.revisado).length;
  const healthAlerts = children.filter(
    (child) => (child.saude?.alertas?.length ?? 0) > 0
  ).length;
  const educationAlerts = children.filter(
    (child) => (child.educacao?.alertas?.length ?? 0) > 0
  ).length;
  const socialAssistanceAlerts = children.filter(
    (child) => (child.assistencia_social?.alertas?.length ?? 0) > 0
  ).length;

  return {
    totalChildren,
    reviewedChildren,
    alertsByArea: {
      saude: healthAlerts,
      educacao: educationAlerts,
      assistenciaSocial: socialAssistanceAlerts,
    },
  };
};
