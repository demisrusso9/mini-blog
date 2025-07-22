import { createPost } from '@/api/create-post'
import { db } from '@/services/firebase'
import { Auth, getAuth } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

jest.mock('firebase/auth')
jest.mock('firebase/firestore')
jest.mock('@/services/firebase')

jest.mock('firebase/auth', () => ({
	getAuth: jest.fn()
}))

jest.mock('firebase/firestore', () => ({
	addDoc: jest.fn(),
	collection: jest.fn()
}))

jest.mock('@/services/firebase', () => ({
	db: {}
}))

describe('createPost', () => {
	const mockCurrentUser = {
		displayName: 'Test User',
		uid: 'test-user-id'
	}
	const mockAddDoc = addDoc as jest.MockedFunction<typeof addDoc>
	const mockCollection = collection as jest.MockedFunction<typeof collection>
	const mockGetAuth = getAuth as jest.MockedFunction<typeof getAuth>

	beforeEach(() => {
		jest.clearAllMocks()
		mockGetAuth.mockReturnValue({
			currentUser: mockCurrentUser
		} as Auth)
		mockCollection.mockReturnValue(
			'mock-collection' as unknown as ReturnType<typeof collection>
		)
	})

	it('should create a post with valid data', async () => {
		const postData = {
			title: 'Test Title',
			image_url: 'https://example.com/image.jpg',
			body: 'Test body content',
			tags: 'test,unit,jest'
		}

		const expectedPost = {
			...postData,
			author: mockCurrentUser.displayName,
			authorId: mockCurrentUser.uid,
			createdAt: expect.any(String),
			updatedAt: expect.any(String),
			comments: []
		}

		await createPost(postData)

		expect(mockCollection).toHaveBeenCalledWith(db, 'posts')
		expect(mockAddDoc).toHaveBeenCalledTimes(1)
		expect(mockAddDoc).toHaveBeenCalledWith(
			'mock-collection',
			expect.objectContaining(expectedPost)
		)
	})

	it('should use default author name if displayName is not available', async () => {
		mockGetAuth.mockReturnValue({
			currentUser: {
				...mockCurrentUser,
				displayName: null
			}
		} as object as ReturnType<typeof getAuth>)

		const postData = {
			title: 'Test Title',
			image_url: 'https://example.com/image.jpg',
			body: 'Test body content',
			tags: 'test'
		}

		await createPost(postData)

		expect(mockAddDoc).toHaveBeenCalledWith(
			'mock-collection',
			expect.objectContaining({
				author: 'user-from-miniblog'
			})
		)
	})

	it('should not create a post when user is not authenticated', async () => {
		mockGetAuth.mockReturnValue({ currentUser: null } as object as ReturnType<
			typeof getAuth
		>)

		const postData = {
			title: 'Test Title',
			image_url: 'https://example.com/image.jpg',
			body: 'Test body content',
			tags: 'test'
		}

		await createPost(postData)

		expect(mockAddDoc).not.toHaveBeenCalled()
	})
})
