const express = require('express');
const router = express.Router();

const userController = require('../Controllers/userController');
const boardController = require('../Controllers/boardController');
const columnController = require('../Controllers/columnController');
const taskController = require('../Controllers/taskController'); 
const jwtMiddelWare = require('../Middlewares/JWTmiddleware');

router.post('/reg', userController.userReg);
router.post('/log', userController.loginUser);

router.post('/createBoard', jwtMiddelWare, boardController.createBoard);
router.get('/getAllBoards', jwtMiddelWare, boardController.getBoards);
router.get('/getBoard/:id', jwtMiddelWare, boardController.getBoardById);
router.put('/updateBoard/:id', jwtMiddelWare, boardController.updateBoard);
router.delete('/deleteBoard/:id', jwtMiddelWare, boardController.deleteBoard);

router.post('/createColumn', jwtMiddelWare, columnController.createColumn);
router.get('/columns/:boardId', jwtMiddelWare, columnController.getColumnsByBoard);
router.put('/updateColumn/:id', jwtMiddelWare, columnController.updateColumn);
router.delete('/deleteColumn/:id', jwtMiddelWare, columnController.deleteColumn);
router.patch('/columns-reorder', jwtMiddelWare, columnController.reorderColumns);

router.post('/createTask', jwtMiddelWare, taskController.createTask);
router.get('/tasks/:columnId', jwtMiddelWare, taskController.getTasksByColumn); // Optional
router.put('/updateTask/:id', jwtMiddelWare, taskController.updateTask);
router.delete('/deleteTask/:id', jwtMiddelWare, taskController.deleteTask);
router.patch('/tasks-reorder', jwtMiddelWare, taskController.reorderTasks); // ✅ REORDER WITHIN/CROSS COLUMNS

module.exports = router;
