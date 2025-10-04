import express from 'express';
import { getPlanByName } from '../controllers/planController';

const router = express.Router();

router.route('/:planName').get(getPlanByName);

export default router;


// import express from 'express';
// import { generateAiPlan } from '../controllers/planController';

// const router = express.Router();

// // This is our new AI-powered route
// router.route('/generate').post(generateAiPlan);

// export default router;