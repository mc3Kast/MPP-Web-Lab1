const {Router} = require('express');
const Task = require('../models/Task');
const router = Router();

router.get('/', async (req, res) => {
    const todos = await Task.find({}).lean();

    res.render('index', {
        title: 'Todo list',
        isIndex: true,
        todos
    });
});

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    });
});

router.post('/create', async (req, res) => {
    const todo = new Task({
        name: req.body.name,
        //completed: req.body.completed
    });

    await todo.save();
    res.redirect('/');
});

router.post('/complete', async (req, res) => {
    const todo = await Task.findById(req.body.id)

    todo.status = !!req.body.completed;
    await todo.save();

    res.redirect('/')
});
module.exports = router;