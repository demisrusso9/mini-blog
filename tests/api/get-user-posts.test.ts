import { getAuth } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { IPost } from '../../src/@types/post'
import { getUserPosts } from '../../src/api/get-user-posts'
import { db } from '../../src/services/firebase'

jest.mock('firebase/auth', () => ({
	getAuth: jest.fn()
}))

jest.mock('firebase/firestore', () => ({
	collection: jest.fn(),
	getDocs: jest.fn(),
	query: jest.fn(),
	where: jest.fn()
}))

jest.mock('../../src/services/firebase', () => ({
	db: {}
}))

describe('getUserPosts', () => {
	const mockUid = 'user-123'
	const mockCurrentUser = { uid: mockUid }
	const mockCollection = {}
	const mockQuery = {}
	const mockWhere = {}
	const mockPosts: IPost[] = [
		{
			id: '1',
			title: 'Post 1',
			image_url: 'https://example.com/image1.jpg',
			body: 'Content 1',
			tags: 'tag1,tag2',
			author: 'Author 1',
			authorId: mockUid,
			createdAt: '2024-01-01T00:00:00Z',
			updatedAt: '2024-01-01T00:00:00Z',
			comments: [
				{
					id: 'c1',
					user_id: 'u1',
					user_photo: null,
					username: 'user1',
					body: 'Nice post!',
					createdAt: '2024-01-01T01:00:00Z'
				}
			]
		},
		{
			id: '2',
			title: 'Post 2',
			image_url: 'https://example.com/image2.jpg',
			body: 'Content 2',
			tags: 'tag3',
			author: 'Author 2',
			authorId: mockUid,
			createdAt: '2024-01-02T00:00:00Z',
			updatedAt: '2024-01-02T00:00:00Z',
			comments: []
		}
	]

	beforeEach(() => {
		;(getAuth as jest.Mock).mockReturnValue({ currentUser: mockCurrentUser })
		;(collection as jest.Mock).mockReturnValue(mockCollection)
		;(where as jest.Mock).mockReturnValue(mockWhere)
		;(query as jest.Mock).mockReturnValue(mockQuery)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should return posts for the current user', async () => {
		const docs = [
			{ id: '1', data: () => mockPosts[0] },
			{ id: '2', data: () => mockPosts[1] }
		]
		;(getDocs as jest.Mock).mockResolvedValue({ docs })

		const result = await getUserPosts()

		expect(getAuth).toHaveBeenCalled()
		expect(collection).toHaveBeenCalledWith(db, 'posts')
		expect(where).toHaveBeenCalledWith('authorId', '==', mockUid)
		expect(query).toHaveBeenCalledWith(mockCollection, mockWhere)
		expect(getDocs).toHaveBeenCalledWith(mockQuery)
		expect(result).toEqual([
			{ ...mockPosts[0], id: '1' },
			{ ...mockPosts[1], id: '2' }
		])
	})

	it('should return an empty array if no posts are found', async () => {
		;(getDocs as jest.Mock).mockResolvedValue({ docs: [] })

		const result = await getUserPosts()

		expect(result).toEqual([])
	})

	it('should handle when currentUser is null', async () => {
		;(getAuth as jest.Mock).mockReturnValue({ currentUser: null })
		;(getDocs as jest.Mock).mockResolvedValue({ docs: [] })

		const result = await getUserPosts()

		expect(where).toHaveBeenCalledWith('authorId', '==', undefined)
		expect(result).toEqual([])
	})

	it('should throw if getDocs fails', async () => {
		const error = new Error('Firestore error')
		;(getDocs as jest.Mock).mockRejectedValue(error)

		await expect(getUserPosts()).rejects.toThrow('Firestore error')
	})
})
