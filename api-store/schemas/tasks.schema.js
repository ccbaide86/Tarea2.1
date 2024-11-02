import { z } from 'zod'

const taskSchema = z.object(
    {
        "titulo": z.string({
            invalid_type_error: "El titulo debe de ser un string"
        }).trim().min(1, {
            message: "El titulo es obligatorio"
        }),
        "descripcion": z.string().trim().min(20, {
            message: "La descripcion debe de tener al menos 20 caracteres"
        }),
        "completada": z.boolean({
            invalid_type_error: "El campo completada debe ser un booleano"
        }),
        "fecha_creacion": z.string().datetime({
            message: "La fecha de creación debe estar en formato ISO 8601"
        })
    },

)

export const validarTaskSchema = (task) => taskSchema.safeParse(task) 