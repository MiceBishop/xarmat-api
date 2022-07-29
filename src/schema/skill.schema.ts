import {
  object, string, TypeOf,
} from 'zod';

const createSkillSchema = object({
  body: object({
    label: string({
      required_error: 'Label is required',
    }),
    shortCode: string({
      required_error: 'Short code is required',
    }),
  }),
});

export type CreateSkillInput = TypeOf<typeof createSkillSchema>;

export default createSkillSchema;
