import { Request, Response } from 'express';
import { loginPlan } from '../data/plans'; 


const getPlanByName = (req: Request, res: Response) => {
  const { planName } = req.params;

  
  if (planName === 'login-plan') {
    res.status(200).json(loginPlan);
  } else {
    res.status(404).json({ message: 'Plan not found' });
  }
};

export { getPlanByName };




