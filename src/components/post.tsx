interface PostProps {
	imgUrl: string
	title: string
	description: string
	author: string
	tags: string[]
	isHomeView: boolean
}

export function Post({
	title,
	description,
	imgUrl,
	author,
	tags,
	isHomeView
}: PostProps) {
	return (
		<>
			{isHomeView ? (
				<section>
					<img src={imgUrl} alt="" />

					<h2 className="pt-4 pb-2 text-2xl font-bold">{title}</h2>

					<p className="mb-4 text-sm font-thin">por: {author}</p>

					{tags.map((tag, i) => (
						<span className="align-middle text-base" key={i}>
							<span className="font-bold">#</span>
							{tag}
							{'  '}
						</span>
					))}

					<button className="mt-4 block w-20 cursor-pointer rounded-sm border p-2 hover:bg-black hover:text-gray-100">
						Ler
					</button>
				</section>
			) : (
				<section className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center bg-gray-300 py-12">
					<h2 className="pt-4 pb-2 text-2xl font-bold">{title}</h2>
					<img src={imgUrl} alt="" />

					<div>
						<p className="my-4">{description}</p>
					</div>

					<p className="mb-2 block text-xl font-bold">Este post trata sobre:</p>

					<div className="flex gap-2">
						{tags.map((tag) => (
							<span className="text-base">
								<span className="font-bold">#</span>
								{tag}
							</span>
						))}
					</div>
				</section>
			)}
		</>
	)
}
