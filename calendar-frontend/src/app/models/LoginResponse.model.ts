export interface LoginResponseModel {
  access_token: string;
  user: {
    id: string;
    email: string;
    birthDate: Date;
    name: string;
    surname: string;
  };
}
