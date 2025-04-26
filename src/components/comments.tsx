import { IPost } from '@/@types/post'
import { addCommentsToPost } from '@/api/add-comments-to-post'
import { deleteComment } from '@/api/delete-comment'
import { getPostComments } from '@/api/get-post-comments'
import { getUser } from '@/api/get-user'
import { sortByDate } from '@/utils/sortByDate'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Trash, User2 } from 'lucide-react'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Button } from './button'
import { Loading } from './loading'

interface CommentsProps {
	post: IPost
}

export function Comments({ post }: CommentsProps) {
	const [commentInput, setCommentInput] = useState('')
	const user = getUser()

	const {
		data: comments,
		isLoading,
		refetch
	} = useQuery({
		queryKey: ['comments'],
		queryFn: () => getPostComments(post.id)
	})

	const { mutateAsync: addCommentsToPostFn } = useMutation({
		mutationFn: addCommentsToPost,
		onSuccess: async () => {
			await refetch()
		}
	})

	const { mutateAsync: deleteCommentFn } = useMutation({
		mutationFn: deleteComment,
		onSuccess: async () => {
			await refetch()
		}
	})

	async function handleAddComment() {
		if (!user || !commentInput) return

		const newComment = {
			id: uuid(),
			user_id: user.uid,
			user_photo: user.photoURL,
			username: user.displayName,
			body: commentInput,
			createdAt: new Date().toISOString()
		}

		const allComments = [...(comments || []), newComment]

		await addCommentsToPostFn({ id: post.id, comments: allComments })
		setCommentInput('')
	}

	async function handleDeleteComment(commentId: string) {
		await deleteCommentFn({ postId: post.id, commentId })
	}

	const canDeleteComment = (commentUserId: string) =>
		post.authorId === user?.uid || commentUserId === user?.uid

	return (
		<div className="flex w-full flex-col gap-2">
			<h2 className="mb-4 text-base font-bold">Comentários:</h2>

			{comments && comments.length === 0 && (
				<div className="mb-4 w-full">
					<p className="text-sm">
						Sem comentários por enquanto! seja o primeiro a comentar!
					</p>
				</div>
			)}

			{user && (
				<div className="mb-4 flex gap-2">
					<input
						type="text"
						placeholder="Adicionar comentário"
						className="w-full rounded-sm border p-2"
						value={commentInput}
						onChange={(e) => setCommentInput(e.target.value)}
					/>

					<Button onClick={handleAddComment} title="Enviar" />
				</div>
			)}

			{isLoading ? (
				<div className="mt-12">
					<Loading />
				</div>
			) : (
				comments
					?.sort((a, b) => sortByDate(b.createdAt, a.createdAt))
					?.map((comment) => (
						<section
							className="my-4 mb-4 flex flex-col justify-between border-b pb-4"
							key={comment.id}
						>
							<div className="mb-4 flex flex-col">
								<div className="mb-2 flex gap-2">
									{comment.user_photo ? (
										<img
											src={comment.user_photo}
											alt=""
											className="h-6 w-6 rounded-sm"
										/>
									) : (
										<User2 className="h-6 w-6 rounded-sm border" />
									)}

									<span className="">{comment.username}</span>
								</div>

								<p className="text-base font-light">{comment.body}</p>
							</div>

							{canDeleteComment(comment.user_id) && (
								<button
									className="cursor-pointer"
									onClick={() => handleDeleteComment(comment.id)}
								>
									<Trash size={16} />
								</button>
							)}
						</section>
					))
			)}
		</div>
	)
}
