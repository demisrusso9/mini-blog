import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from '../../src/components/button'

describe('Button', () => {
	it('renders the button with the given title', () => {
		render(<Button title="Click Me" onClick={jest.fn()} />)
		expect(screen.getByText('Click Me')).toBeInTheDocument()
	})

	it('calls onClick when the button is clicked', () => {
		const handleClick = jest.fn()
		render(<Button title="Click Me" onClick={handleClick} />)
		fireEvent.click(screen.getByRole('button'))
		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('shows loader when isLoading is true', () => {
		render(<Button title="Click Me" isLoading onClick={jest.fn()} />)
		expect(document.querySelector('svg.animate-spin')).toBeInTheDocument()
		expect(screen.queryByText('Click Me')).not.toBeInTheDocument()
	})

	it('does not show loader when isLoading is false', () => {
		render(<Button title="Click Me" isLoading={false} onClick={jest.fn()} />)
		expect(screen.getByText('Click Me')).toBeInTheDocument()
		expect(screen.queryByRole('svg')).not.toBeInTheDocument()
	})

	it('has correct styling with hover states', () => {
		render(<Button title="Click Me" onClick={jest.fn()} />)
		const button = screen.getByRole('button')
		expect(button).toHaveClass('rounded-sm')
		expect(button).toHaveClass('hover:bg-black')
		expect(button).toHaveClass('hover:text-gray-100')
	})

	it('applies animate-spin class to loader', () => {
		render(<Button title="Click Me" isLoading onClick={jest.fn()} />)
		const loader = document.querySelector('svg.animate-spin')
		expect(loader).toHaveClass('animate-spin')
	})

	it('is clickable even when loading', () => {
		const handleClick = jest.fn()
		render(<Button title="Click Me" isLoading onClick={handleClick} />)
		fireEvent.click(screen.getByRole('button'))
		expect(handleClick).toHaveBeenCalledTimes(1)
	})
})
