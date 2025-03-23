import { LoginForm } from '@/components/login-form'

export interface LoginFormFieldsProps {
	email: string
	password: string
}

export function Login() {
	function handleSubmitForm(data: LoginFormFieldsProps) {
		console.log(data)
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
