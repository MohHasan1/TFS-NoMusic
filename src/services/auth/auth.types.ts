import { TSigninSchema } from "#validations/auth/signin";
import { TSignupSchema } from "#validations/auth/signup";

export type AuthActionStateDTO = {
  error?: string;
  success?: string;
};

export type TSignin = TSigninSchema;
export type TSignup = Omit<TSignupSchema, "confirmPassword">;
