import * as z from 'zod'

export const RegisterSchema = z.object({
  email: z.email(),
  name: z.string(),
  surname: z.string(),
  birthDate: z.string(),
  gender: z.string(),
  password: z.string(),
})
