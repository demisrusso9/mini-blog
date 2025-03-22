import { registerSchema } from '@/utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export type FormFieldsProps = z.infer<typeof registerSchema>

interface FormProps {
	handleSubmitForm(data: FormFieldsProps): void
}

interface FormFieldId {
	id: 'name' | 'email' | 'password' | 'confirm_password'
	title: string
	type: string
	placeholder: string
}

export function Form({ handleSubmitForm }: FormProps) {
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(registerSchema)
	})

	const formFields: FormFieldId[] = [
		{
			id: 'name',
			title: 'Nome:',
			type: 'text',
			placeholder: 'Nome do usuário'
		},
		{
			id: 'email',
			title: 'Email:',
			type: 'email',
			placeholder: 'E-mail do usuário'
		},
		{
			id: 'password',
			title: 'Senha:',
			type: 'password',
			placeholder: 'Insira a senha'
		},
		{
			id: 'confirm_password',
			title: 'Confirmação de senha:',
			type: 'password',
			placeholder: 'Confirme a senha'
		}
	]

	return (
		<form
			onSubmit={handleSubmit(handleSubmitForm)}
			className="flex w-full max-w-[580px] flex-col gap-6"
		>
			{formFields.map((field) => (
				<div className="flex w-full flex-col" key={field.id}>
					<p className="mt-2 text-sm text-red-400">
						{errors?.[field.id]?.message}
					</p>

					<label htmlFor={field.id} className="text-base font-bold">
						{field.title}
					</label>

					<input
						className="border-0 border-b-1 px-0 py-2 placeholder:text-sm placeholder:font-thin focus:outline-0"
						id={field.id}
						type={field.type}
						placeholder={field.placeholder}
						{...register(field.id)}
					/>
				</div>
			))}

			<button
				type="submit"
				className="cursor-pointer rounded-sm border p-2 hover:bg-black hover:text-gray-100"
			>
				Criar usuário
			</button>
		</form>
	)
}
