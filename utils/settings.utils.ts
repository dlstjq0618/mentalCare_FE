import { SettingsDiagnosisInfoForm } from "~/components";

export const getCleanedDiagnosisUpdatePayload = (
  data: SettingsDiagnosisInfoForm
) => {
  const cleanedEstimatedItem = data.estimatedItem
    .filter((item) => item.name && item.price != null)
    ?.map((item) => ({
      ...item,
      isVariable: item.isVariable ?? false,
    }));
  return {
    ...data,
    estimatedItem: cleanedEstimatedItem,
  };
};
