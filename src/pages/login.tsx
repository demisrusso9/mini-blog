import { signInUser } from '@/api/sign-in-user'
import { LoginForm } from '@/components/login-form'
import { FirebaseError } from 'firebase/app'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

export interface LoginFormFieldsProps {
	email: string
	password: string
}

export function Login() {
	const navigate = useNavigate()

	async function handleSubmitForm({ email, password }: LoginFormFieldsProps) {
		try {
			await signInUser({ email, password })
			navigate('/dashboard', { replace: true })
		} catch (error) {
			if (error instanceof FirebaseError) {
				if (error.code === 'auth/invalid-credential') {
					toast.error('Credenciais inválidas')
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

			<LoginForm handleSubmitForm={handleSubmitForm} />
		</div>
	)
}
