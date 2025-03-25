import { Post } from '@/components/post'

export function Home() {
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
					{Array.from({ length: 5 }).map(() => (
						<Post
							imgUrl="https://images3.alphacoders.com/133/thumb-1920-1334079.png"
							title="forza motorsport"
							description="lorem"
							author="demis"
							tags={['game', 'xbox', 'abc', 'test', '123']}
							isHomeView
						/>
					))}
				</div>
			</div>
		</div>
	)
}
