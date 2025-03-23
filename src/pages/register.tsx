import {
	RegisterForm,
	RegisterFormFieldsProps
} from '@/components/register-form'

export function Register() {
	function handleSubmitForm(data: RegisterFormFieldsProps) {
		console.log(data)
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
