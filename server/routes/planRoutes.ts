import express from 'express';
import { getPlanByName } from '../controllers/planController';

const router = express.Router();

router.route('/:planName').get(getPlanByName);

export default router;


