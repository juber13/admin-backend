import express from 'express';

const router = express.Router();

import { raiseTicket , getAllTicket , updateTicketStatus } from '../controllers/ticketController.js'
router.post('/raise-ticket', raiseTicket)
router.get('/getAll-ticket' , getAllTicket) 
router.post('/update-status' , updateTicketStatus) 

export default router;