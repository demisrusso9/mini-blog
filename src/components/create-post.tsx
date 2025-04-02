import { postSchema } from '@/utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export type CreatePostFieldsProps = z.infer<typeof postSchema>

interface CreatePostProps {
	handleSubmitForm(data: CreatePostFieldsProps): void
}

interface FormFieldMap {
	id: 'title' | 'image_url' | 'body' | 'tags'
	title: string
	type: string
	placeholder: string
}

export function CreatePost({ handleSubmitForm }: CreatePostProps) {
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(postSchema)
	})

	const formFields: FormFieldMap[] = [
		{
			id: 'title',
			title: 'Título:',
			type: 'text',
			placeholder: 'Pense num bom título'
		},
		{
			id: 'image_url',
			title: 'URL da imagem:',
			type: 'text',
			placeholder: 'Insira uma imagem que representa seu post'
		},
		{
			id: 'body',
			title: 'Conteúdo:',
			type: 'text',
			placeholder: 'Insira o conteúdo do post'
		},
		{
			id: 'tags',
			title: 'Tags:',
			type: 'text',
			placeholder: 'Insira tags separadas por virgula'
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
				Criar post
			</button>
		</form>
	)
}
