import { getAuth, User } from 'firebase/auth'
import { getUser } from '../../src/api/get-user'

jest.mock('firebase/auth', () => ({
	getAuth: jest.fn()
}))

describe('getUser', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should return the current user when logged in', () => {
		const mockUser = { uid: '123', email: 'test@example.com' } as User
		;(getAuth as jest.Mock).mockReturnValue({ currentUser: mockUser })

		const result = getUser()
		expect(result).toBe(mockUser)
	})

	it('should return null when no user is logged in', () => {
		;(getAuth as jest.Mock).mockReturnValue({ currentUser: null })

		const result = getUser()
		expect(result).toBeNull()
	})
})
