import { DocumentDefinition, FilterQuery, UpdateQuery } from 'mongoose';
import Proposal, { ProposalDocument } from '../models/proposal.model';

export async function createProposal(input: DocumentDefinition<Omit<ProposalDocument, 'createdAt' | 'updatedAt'>>) {
  try {
    const proposal = await Proposal.create(input);
    return proposal.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findProposal(query: FilterQuery<ProposalDocument>) {
  try {
    return await Proposal.findOne(query).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findProposals(query: FilterQuery<ProposalDocument>) {
  try {
    const proposals = await Proposal.find(query || {}).lean();
    return proposals;
  } catch (error: any) {
    throw new Error(error);
  }
}

// eslint-disable-next-line max-len
export async function updateProposal(query: FilterQuery<ProposalDocument>, update: UpdateQuery<ProposalDocument>) {
  try {
    return await Proposal.updateOne(query, update);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteProposal(query: FilterQuery<ProposalDocument>) {
  try {
    return await Proposal.deleteOne(query);
  } catch (error: any) {
    throw new Error(error);
  }
}
