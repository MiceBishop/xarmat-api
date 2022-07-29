import Router from 'express-promise-router';
import {
  createSkillHandler, deleteSkillHandler, getSkillsHandler, updateSkillHandler,
} from '../../controllers/skill.controller';
import validate from '../../middleware/validateResource';
import createSkillSchema from '../../schema/skill.schema';

const router = Router();

router.post('/', validate(createSkillSchema), (createSkillHandler));
router.get('/', (getSkillsHandler));
router.patch('/', (updateSkillHandler));
router.delete('/', (deleteSkillHandler));

export default router;
