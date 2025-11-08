import express from 'express';
import multer from 'multer';
import {
  textController,
  getTodos,
  updateTodo,
  deleteTodo,
  todoLike,
  todoComment
} from '../controllers/text.controller.js';

import  {newEvent,getEvent,deleteEvent,updateEvent}  from '../controllers/newEvent.controller.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/todoPost', upload.single('image'), textController);
router.get('/todoGet', getTodos);
router.put('/updateTodo/:id', upload.single('image'), updateTodo);
router.delete('/todoDelete/:id', deleteTodo);
router.post('/todoLike/:id', todoLike);
router.post('/todoComment/:id', todoComment);
router.post('/newEvent',newEvent)
router.get('/getEvent',getEvent)
router.delete('/deleteEvent/:id',deleteEvent)
router.put('/updateEvent/:id',updateEvent)

export default router;
