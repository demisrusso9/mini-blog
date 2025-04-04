import { IPost } from '@/@types/post'
import { transformTags } from '@/utils/transformTags'
import { useLocation } from 'react-router'

export function ViewPost() {
	const location = useLocation()
	const post = location.state as IPost

	return (
		<div className="my-10 flex w-full flex-col items-center justify-center bg-gray-300">
			<section className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center bg-gray-300 py-12">
				<h2 className="mb-4 text-2xl font-bold">{post.title}</h2>
				<img src={post.image_url} alt="" />

				<div>
					<p className="my-4">{post.body}</p>
				</div>

				<p className="mb-2 block text-xl font-bold">Este post trata sobre:</p>

				<div className="flex gap-2">
					{transformTags(post.tags).map((tag, i) => (
						<span className="text-base" key={i}>
							<span className="font-bold">#</span>
							{tag}
						</span>
					))}
				</div>
			</section>
		</div>
	)
}
