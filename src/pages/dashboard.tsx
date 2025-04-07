import { IPost } from '@/@types/post'
import { deletePost } from '@/api/delete-post'
import { getUserPosts } from '@/api/get-user-posts'
import { Button } from '@/components/button'
import { Loading } from '@/components/loading'
import { sortByDate } from '@/utils/sortByDate'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

export function Dashboard() {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { data: posts, isLoading } = useQuery({
		queryKey: ['user-posts'],
		queryFn: getPosts
	})

	const { mutateAsync: deletePostFn } = useMutation({
		mutationFn: deletePost
	})

	async function getPosts() {
		const data = await getUserPosts()

		const posts = data
			.map((post) => post)
			.sort((a, b) => sortByDate(b.createdAt, a.createdAt))

		return posts
	}

	function handleEditPost(post: IPost) {
		navigate(`/post/edit/${post.id}`, { state: post })
	}

	function handleViewPost(post: IPost) {
		navigate(`/post/${post.id}`, { state: post })
	}

	async function handleDelete(postId: string) {
		await deletePostFn(postId)
		queryClient.invalidateQueries({ queryKey: ['user-posts'] })
	}

	return (
		<div className="flex w-full flex-col items-center justify-center bg-gray-300 px-10 py-10">
			<h2 className="mb-4 text-2xl font-bold">Dashboard</h2>
			<p className="mb-4 text-base font-thin">Gerencie os seus posts</p>

			{!isLoading && (
				<div className="flex w-full justify-between border-b-2 pb-4">
					<span className="text-base font-bold">Título</span>
					<span className="text-base font-bold">Ações</span>
				</div>
			)}

			{posts ? (
				posts.map((post) => (
					<div
						className="flex w-full items-center border-b-1 py-4"
						key={post.id}
					>
						<p className="flex flex-1">{post.title}</p>

						<div className="flex gap-3">
							<Button
								title="Ver"
								isLoading={false}
								onClick={() => handleViewPost(post)}
							/>

							<Button
								title="Editar"
								isLoading={false}
								onClick={() => handleEditPost(post)}
							/>

							<Button
								title="Excluir"
								isLoading={false}
								onClick={() => handleDelete(post.id)}
							/>
						</div>
					</div>
				))
			) : (
				<div className="my-10">
					<Loading />
				</div>
			)}
		</div>
	)
}
