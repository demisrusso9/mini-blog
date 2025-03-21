import { Header } from '@/components/header'
import { Footer } from './components/footer'

function App() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />

			<div className="flex flex-1"></div>

			<Footer />
		</div>
	)
}

export default App
