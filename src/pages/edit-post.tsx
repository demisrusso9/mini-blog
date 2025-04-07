import { IPost } from '@/@types/post'
import { editPost } from '@/api/edit-post'
import {
	EditPostForm,
	EditPostFormFieldsProps
} from '@/components/edit-post-form'
import { useLocation, useNavigate } from 'react-router'

export function EditPost() {
	const navigate = useNavigate()
	const location = useLocation()
	const post = location.state as IPost

	async function handleSubmitForm(data: EditPostFormFieldsProps) {
		try {
			await editPost(post.id, data)
			navigate('/dashboard')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="my-10 flex w-full flex-col items-center justify-center bg-gray-300">
			<h2 className="mb-4 text-2xl font-bold">Editar post</h2>

			<EditPostForm handleSubmitForm={handleSubmitForm} post={post} />
		</div>
	)
}
