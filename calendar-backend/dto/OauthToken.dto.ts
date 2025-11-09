export class OauthTokenDto {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  emailVerified: boolean;
  nbf: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}
