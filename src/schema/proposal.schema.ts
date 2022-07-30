import {
  object, string, TypeOf, array, number,
} from 'zod';

const createProposalSchema = object({
  body: object({
    coverLetter: string({
      required_error: 'Cover letter is required',
    }),
    budget: array(number({
      required_error: 'Budget is required',
    })),
    duration: string({
      required_error: 'Duration is required',
    }),
    job: string({
      required_error: 'Job ID is required',
    }),
  }),
});

export type CreateProposalInput = TypeOf<typeof createProposalSchema>;

export default createProposalSchema;
