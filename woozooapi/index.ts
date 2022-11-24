import { auth } from "./auth";
import { diagnosis } from "./diagnosis";
import { doctor } from "./doctor";
import { fileUpload } from "./fileUpload";
import { hospital } from "./hospital";
import { settlementAccount } from "./settlementAccount";
import { terms } from "./terms";
import { counselor } from "./counselor";

export * from "./auth";
export * from "./diagnosis";
export * from "./doctor";
export * from "./fileUpload";
export * from "./hospital";
export * from "./terms";
export * from "./settlementAccount";

export const api = {
  auth,
  doctor,
  hospital,
  diagnosis,
  settlementAccount,
  counselor,
  terms,
  fileUpload,
};
