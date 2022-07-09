import {
  object, string, TypeOf,
} from 'zod';

const createSessionSchema = object({
  body: object({
    email: string({
      required_error: 'Name is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 characters minimum'),
  }),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>;

export default createSessionSchema;
