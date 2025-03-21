export function Footer() {
	const year = new Date().getFullYear()

	return (
		<footer className="flex h-40 flex-col items-center justify-center bg-gray-200 p-4">
			<h1 className="mb-6 text-2xl font-bold">
				Escreva sobre o que você tem interesse
			</h1>

			<p>Mini Blog &copy; {year}</p>
		</footer>
	)
}
