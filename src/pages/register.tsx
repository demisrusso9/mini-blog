import { createUser } from '@/api/create-user'
import {
	RegisterForm,
	RegisterFormFieldsProps
} from '@/components/register-form'
import { FirebaseError } from 'firebase/app'
import { toast } from 'react-toastify'

export function Register() {
	async function handleSubmitForm({
		name,
		email,
		password
	}: RegisterFormFieldsProps) {
		try {
			await createUser({ name, email, password })
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				if (error.code === 'auth/email-already-in-use') {
					toast.error('E-mail já existe')
				}
			}
		}
	}

	return (
		<div className="flex w-full flex-col items-center justify-center bg-gray-300 py-10">
			<h2 className="mb-4 text-2xl font-bold">Cadastre-se para postar</h2>

			<p className="mb-4 text-base font-thin">
				Crie seu usuário e compartilhe suas histórias
			</p>

			<RegisterForm handleSubmitForm={handleSubmitForm} />
		</div>
	)
}
