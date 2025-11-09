export interface LoginResponseModel {
  access_token: string;
  user: {
    id: string;
    email: string;
    birthDate: string;
    name: string;
    surname: string;
  };
}
