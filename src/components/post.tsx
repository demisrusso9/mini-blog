import { IPost } from '@/@types/post'
import { transformTags } from '@/utils/transformTags'
import { useNavigate } from 'react-router'

interface PostProps {
	post: IPost
}

export function Post({ post }: PostProps) {
	const navigate = useNavigate()

	function handleView(post: IPost) {
		navigate(`/post/${post.id}`, { state: post })
	}

	return (
		<section>
			<img src={post.image_url} alt="" />

			<h2 className="pt-4 pb-2 text-2xl font-bold">{post.title}</h2>

			<p className="mb-4 text-sm font-thin">por: {post.author}</p>

			{transformTags(post.tags).map((tag, i) => (
				<span className="align-middle text-base" key={i}>
					<span className="font-bold">#</span>
					{tag}
					{'  '}
				</span>
			))}

			<button
				className="mt-4 block w-20 cursor-pointer rounded-sm border p-2 hover:bg-black hover:text-gray-100"
				onClick={() => handleView(post)}
			>
				Ler
			</button>
		</section>
	)
}
