import { Request, Response } from 'express';
import omit from 'lodash/omit';
import get from 'lodash/get';
import { CreateSkillInput } from '../schema/skill.schema';
import {
  createSkill, findSkills, updateSkill, deleteSkill,
} from '../services/skill.service';
import logger from '../utils/logger';

export async function createSkillHandler(req: Request<{}, {}, CreateSkillInput['body']>, res: Response) {
  try {
    const skill = await createSkill(req.body);
    return res.send(skill);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function updateSkillHandler(req: Request<{}, {}, CreateSkillInput['body']>, res: Response) {
  try {
    const skillIdToUpdate = get(req.body, '_id');
    const updates = omit(req.body, '_id');
    updateSkill({ _id: skillIdToUpdate }, updates);
    return res.send({ _id: skillIdToUpdate, ...updates });
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getSkillsHandler(req: Request, res: Response) {
  const skills = await findSkills();
  return res.send(skills);
}

export async function deleteSkillHandler(req: Request, res: Response) {
  try {
    const skillIdToDelete = get(req.body, '_id');
    await deleteSkill({ _id: skillIdToDelete });
    return res.send(skillIdToDelete);
  } catch (error) {
    logger.error(error);
    return res.status(409).send((error as Error).message);
  }
}
