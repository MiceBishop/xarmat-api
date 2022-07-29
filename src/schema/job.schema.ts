import {
  object, string, TypeOf, array, number,
} from 'zod';

const createJobSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    description: string({
      required_error: 'Description is required',
    }),
    budget: array(number({
      required_error: 'Budget is required',
    })),
    duration: string({
      required_error: 'Duration is required',
    }),
    skills: array(string({
      required_error: 'Skills are required',
    })),
  }),
});

export type CreateJobInput = TypeOf<typeof createJobSchema>;

export default createJobSchema;
