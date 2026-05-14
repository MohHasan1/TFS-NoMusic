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
  name: string;
  password: string;
};
