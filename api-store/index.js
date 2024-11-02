import express, { json } from 'express'
import tasks from './stores/tasks.json' with {type: "json"}
import { validarTaskSchema } from './schemas/tasks.schema.js'

const app = express() // instance de express (createServer)

const PORT = process.env.PORT || 3000

// Middleware 
app.disable('x-powered-y');
app.use(json());

//Rutas para obtener las tareas
app.get('/tasks', (req, res) => {
    res
        .header('Content-Type', 'aplication/json')
        .status(200)
        .json(tasks);
})

app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    // validaciones fallidas con sus respectivos códigos de respuesta
    const data = req.body
    const success = validarTaskSchema(data)

    if (!success) {
        res.status(400).json({
            message: JSON.parse(error.message)
        })
    }

    // Genrar ID numerico unico 
    const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

    data.id = id

    // Guardar 
    tasks.push(data)

    //Respuesta al cliente 
    res.status(201).json(req.body)
});

app.put('/tasks/:id', (req, res) => {
    // validaciones fallidas con sus respectivos códigos de respuesta
    const { id } = req.params
    const data = req.body

    const success = validarTaskSchema(data)
    if (!success) {
        res.status(400).json({
            message: JSON.parse(error.message)
        })
    }

    const taskIndex = tasks.findIndex(task => task.id == id)

    if (taskIndex == -1) {
        res.status(404).json({
            message: "Tarea no encontrada"
        })
    }

    //Actualizar 
    tasks[taskIndex] = { ...tasks[taskIndex], ...data }

    res.json(tasks[taskIndex])
})

app.delete('/tasks/:id', (req, res) => {
    // validaciones fallidas con sus respectivos códigos de respuesta
    const { id } = req.params
    const data = req.body

    const success = validarTaskSchema(data)
    if (!success) {
        res.status(400).json({
            message: JSON.parse(error.message)
        })
    }

    const taskIndex = tasks.findIndex(task => task.id == id)

    if (taskIndex == -1) {
        res.status(404).json({
            message: "Tarea no encontrada"
        })
    }

    //Eliminar 
    const deletedTask = tasks.splice(taskIndex, 1)
    res.json(deletedTask[0])
})


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
