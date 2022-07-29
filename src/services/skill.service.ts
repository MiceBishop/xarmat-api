import { DocumentDefinition, FilterQuery, UpdateQuery } from 'mongoose';
import Skill, { SkillDocument } from '../models/skill.model';

export async function createSkill(input: DocumentDefinition<Omit<SkillDocument, 'createdAt' | 'updatedAt'>>) {
  try {
    const skill = await Skill.create(input);
    return skill.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findSkill(query: FilterQuery<SkillDocument>) {
  return Skill.findOne(query).lean();
}

export async function findSkills(query?: FilterQuery<SkillDocument>) {
  const skills = await Skill.find(query || {}).lean();
  return skills;
}

// eslint-disable-next-line max-len
export async function updateSkill(query: FilterQuery<SkillDocument>, update: UpdateQuery<SkillDocument>) {
  return Skill.updateOne(query, update);
}

export async function deleteSkill(query: FilterQuery<SkillDocument>) {
  return Skill.deleteOne(query);
}
