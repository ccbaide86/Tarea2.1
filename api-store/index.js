import express, { json } from 'express'

const app = express() // instance de express (createServer)

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Lista en memoria para almacenar las tareas 
let tasks = []

//Rutas para obtener las tareas
app.get('/tasks', (req, res) => {
    res.json(tasks);
})

app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
