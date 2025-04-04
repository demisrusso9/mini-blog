import { LoaderCircle } from 'lucide-react'

interface ButtonProps {
	title: string
	isLoading: boolean
	onClick(): void
}

export function Button({ title, isLoading, onClick }: ButtonProps) {
	return (
		<button
			className="flex w-26 cursor-pointer items-center justify-center rounded-sm border p-2 text-center hover:bg-black hover:text-gray-100"
			onClick={onClick}
		>
			{isLoading ? <LoaderCircle size={24} className="animate-spin" /> : title}
		</button>
	)
}
