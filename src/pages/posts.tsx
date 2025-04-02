import { CreatePost, CreatePostFieldsProps } from '@/components/create-post'

export function Posts() {
	async function handleSubmitForm(data: CreatePostFieldsProps) {
		console.log({ data })
	}

	return (
		<div className="flex w-full flex-col items-center justify-center bg-gray-300 py-10">
			<h2 className="mb-4 text-2xl font-bold">Criar post</h2>

			<p className="mb-4 text-base font-thin">
				Aqui você pode criar um novo post para compartilhar suas ideias com o
				mundo!
			</p>

			<CreatePost handleSubmitForm={handleSubmitForm} />
		</div>
	)
}
