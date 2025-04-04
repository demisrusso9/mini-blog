import { getHomepagePosts } from '@/api/get-homepage-posts'
import { Loading } from '@/components/loading'
import { Post } from '@/components/post'
import { useQuery } from '@tanstack/react-query'

export function Home() {
	const { data: posts } = useQuery({
		queryKey: ['posts'],
		queryFn: getHomepagePosts
	})

	return (
		<div className="flex w-full flex-col items-center justify-center bg-gray-300 py-12">
			<h1 className="mb-8 text-4xl font-bold">
				Veja nossos posts mais recentes
			</h1>

			<div className="flex w-full max-w-[720px] flex-col gap-2">
				<div className="mb-4 flex w-full">
					<input
						className="flex-1 border-0 border-b-1 px-0 py-2 placeholder:font-thin focus:outline-0"
						type="text"
						placeholder="ou busque por tags..."
					/>

					<button className="cursor-pointer rounded-sm border bg-black p-2 text-gray-100">
						Pesquisar
					</button>
				</div>

				<div className="flex flex-col gap-12">
					{posts ? (
						posts.map((post) => <Post key={post.id} post={post} />)
					) : (
						<Loading />
					)}
				</div>
			</div>
		</div>
	)
}
