export type AuthActionStateDTO = {
  error?: string;
  success?: string;
};

export type SignInDTO = {
  email: string;
  password: string;
};

export type SignUpDTO = {
  email: string;
  fullName: string;
  password: string;
};
