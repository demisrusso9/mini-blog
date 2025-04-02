import { createPost } from '@/api/create-post'
import { CreatePost, CreatePostFieldsProps } from '@/components/create-post'
import { useNavigate } from 'react-router'

export function Posts() {
	const navigate = useNavigate()

	async function handleSubmitForm(data: CreatePostFieldsProps) {
		try {
			await createPost(data)
			navigate('/dashboard')
		} catch (error) {
			console.log(error)
		}
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
