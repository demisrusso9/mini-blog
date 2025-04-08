import { getHomepagePosts } from '@/api/get-homepage-posts'
import { Post } from '@/components/post'
import { transformTags } from '@/utils/transformTags'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

export function Home() {
	const { data: posts } = useQuery({
		queryKey: ['posts'],
		queryFn: getHomepagePosts
	})

	const [search, setSearch] = useState('')

	const filteredPosts = useMemo(() => {
		if (!search) return posts || []

		return (
			posts?.filter((post) => {
				const tags = transformTags(post.tags)
				return tags.includes(search)
			}) || []
		)
	}, [posts, search])

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
						value={search}
						onChange={(e) => setSearch(e.currentTarget.value)}
					/>
				</div>

				<div className="flex flex-col gap-12">
					{filteredPosts.length > 0 ? (
						filteredPosts.map((post) => <Post key={post.id} post={post} />)
					) : (
						<p className="text-center text-gray-500">Nenhum post encontrado.</p>
					)}
				</div>
			</div>
		</div>
	)
}
