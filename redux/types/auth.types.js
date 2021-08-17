import { generateActions } from "../../utils";

export const LOGIN = generateActions("LOGIN");
export const SIGNUP = generateActions("SIGNUP");
export const INITIATE_PASSWORD_RESET = generateActions(
	"INITIATE_PASSWORD_RESET"
);
export const VALIDATE_PASSWORD_RESET_TOKEN = generateActions(
	"VALIDATE_PASSWORD_RESET_TOKEN"
);
export const RESET_PASSWORD = generateActions("RESET_PASSWORD");
export const LOGOUT = generateActions("LOGOUT");
