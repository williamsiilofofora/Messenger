import { IFormField } from "../../utils/types";

export function validateNameField(lastname: IFormField) {
  lastname.isValid = (/^[a-z]+$/gi).test(lastname.value);
  if (!lastname.isValid) {
    lastname.error = "Le format de du nom est invalide";
  }
}
