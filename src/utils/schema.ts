import * as z from 'zod'

const name = 'Adicione seu  nome'
const email = 'E-mail inválido'
const password = 'A senha deve ter pelo menos 6 caracteres'
const confirmPassword = 'As senhas não coincidem'

export const registerSchema = z
	.object({
		name: z.string().nonempty({ message: name }),
		email: z.string().email({ message: email }),
		password: z.string().min(6, { message: password }),
		confirm_password: z.string().min(6, { message: password })
	})
	.refine((data) => data.password === data.confirm_password, {
		message: confirmPassword,
		path: ['confirm_password']
	})
