import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { createUser } from '../../src/api/create-user'

jest.mock('firebase/auth', () => ({
	createUserWithEmailAndPassword: jest.fn(),
	updateProfile: jest.fn()
}))

jest.mock('../../src/services/firebase', () => ({
	auth: {}
}))

describe('createUser', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should create a new user with email and password', async () => {
		const mockUserData = {
			name: 'Test User',
			email: 'test@example.com',
			password: 'Password123!'
		}

		const mockUser = { uid: '123', displayName: null }
		const mockResponse = { user: mockUser }

		;(createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(
			mockResponse
		)
		;(updateProfile as jest.Mock).mockResolvedValue(undefined)

		const result = await createUser(mockUserData)

		expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
			{},
			mockUserData.email,
			mockUserData.password
		)

		expect(updateProfile).toHaveBeenCalledWith(mockUser, {
			displayName: mockUserData.name
		})

		expect(result).toBe(mockUser)
	})

	it('should throw an error if user creation fails', async () => {
		const mockUserData = {
			name: 'Test User',
			email: 'test@example.com',
			password: 'Password123!'
		}

		const mockError = new Error('Firebase: Error creating user.')
		;(createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(mockError)

		await expect(createUser(mockUserData)).rejects.toThrow(
			'Firebase: Error creating user.'
		)

		expect(createUserWithEmailAndPassword).toHaveBeenCalled()

		expect(updateProfile).not.toHaveBeenCalled()
	})

	it('should throw an error if updating profile fails', async () => {
		const mockUserData = {
			name: 'Test User',
			email: 'test@example.com',
			password: 'Password123!'
		}

		const mockUser = { uid: '123', displayName: null }
		const mockResponse = { user: mockUser }

		;(createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(
			mockResponse
		)

		const mockError = new Error('Firebase: Error updating profile.')
		;(updateProfile as jest.Mock).mockRejectedValue(mockError)

		await expect(createUser(mockUserData)).rejects.toThrow(
			'Firebase: Error updating profile.'
		)

		expect(createUserWithEmailAndPassword).toHaveBeenCalled()
		expect(updateProfile).toHaveBeenCalled()
	})
})
