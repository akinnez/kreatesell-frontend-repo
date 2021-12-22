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
export const ENABLE_AND_DISABLE_2FA = generateActions("ENABLE_AND_DISABLE_2FA");
export const RESOLVE_2FA_LOGIN = generateActions("RESOLVE_2FA_LOGIN");
export const RESEND_2FA = generateActions("RESEND_2FA");
export const RESEND_CONFIRMATION_EMAIL = generateActions(
	"RESEND_CONFIRMATION_EMAIL"
);
export const LOGOUT = generateActions("LOGOUT");
export const SUPER_ADMIN_LOGIN = generateActions("SUPER_ADMIN_LOGIN");
export const SUPER_ADMIN_RESET_PASSWORD = generateActions(
	"SUPER_ADMIN_RESET_PASSWORD"
);
