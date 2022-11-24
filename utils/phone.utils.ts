import parse from "libphonenumber-js";

export const toIntPhoneNumber = (phone: string): string => {
  return parse(phone, "KR")?.number.replace("+", "") ?? phone;
};

export const toDashedPhoneNumber = (
  phone: string | null | undefined
): string => {
  if (typeof phone !== "string") return "";

  return parse(phone, "KR")?.formatNational() ?? phone;
};
