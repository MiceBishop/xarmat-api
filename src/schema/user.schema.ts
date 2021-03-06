import {
  date, object, string, TypeOf,
} from 'zod';

const createUserSchema = object({
  body: object({
    firstname: string({
      required_error: 'Name is required',
    }),
    lastname: string({
      required_error: 'Name is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 characters minimum'),
    email: string({
      required_error: 'Password is required',
    }).email('Not a valid email'),
    phoneNumber: string({
      required_error: 'Phone number is required',
    }),
    companyName: string().optional(),
    address: string().optional(),
    birthdate: date().optional(),
    additionnalInfos: object({}).optional(),
    role: string({
      required_error: 'Role is required',
    }),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;

export default createUserSchema;
