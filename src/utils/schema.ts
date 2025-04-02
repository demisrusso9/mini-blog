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

export const loginSchema = z.object({
	email: z.string().email({ message: 'E-mail inválido.' }),
	password: z.string()
})

export const postSchema = z.object({
	title: z.string().min(4, { message: 'No mínimo 4 caracteres' }),
	image_url: z.string().url({ message: 'URL inválida' }),
	body: z.string(),
	tags: z.string()
})
