import { db } from '@/services/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { addCommentsToPost } from '../../src/api/add-comments-to-post'

jest.mock('firebase/firestore', () => ({
	doc: jest.fn(),
	getDoc: jest.fn(),
	updateDoc: jest.fn()
}))

jest.mock('@/services/firebase', () => ({
	db: 'mockDb'
}))

describe('addCommentsToPost', () => {
	const mockDocRef = { id: 'mockDocRef' }
	const mockId = 'post123'
	const mockComments = [
		{
			id: 'comment1',
			user_id: 'user123',
			user_photo: 'https://example.com/profile1.jpg',
			username: 'TestUser1',
			body: 'This is a test comment',
			createdAt: '2025-07-20T12:00:00Z'
		},
		{
			id: 'comment2',
			user_id: 'user456',
			user_photo: null,
			username: 'TestUser2',
			body: 'Another test comment',
			createdAt: '2025-07-21T10:30:00Z'
		},
		{
			id: 'comment3',
			user_id: 'user789',
			user_photo: 'https://example.com/profile3.jpg',
			username: null,
			body: 'Comment with null username',
			createdAt: '2025-07-21T11:45:00Z'
		}
	]
	beforeEach(() => {
		jest.clearAllMocks()
		;(doc as jest.Mock).mockReturnValue(mockDocRef)
	})

	it('should add comments to a post when the document exists', async () => {
		const mockDocSnap = {
			exists: jest.fn().mockReturnValue(true),
			data: jest.fn().mockReturnValue({ title: 'Test Post', comments: [] })
		}
		;(getDoc as jest.Mock).mockResolvedValue(mockDocSnap)
		;(updateDoc as jest.Mock).mockResolvedValue(undefined)

		await addCommentsToPost({ id: mockId, comments: mockComments })

		expect(doc).toHaveBeenCalledWith(db, 'posts', mockId)
		expect(getDoc).toHaveBeenCalledWith(mockDocRef)
		expect(updateDoc).toHaveBeenCalledWith(mockDocRef, {
			comments: mockComments
		})
	})

	it('should not update document when the post does not exist', async () => {
		const mockDocSnap = {
			exists: jest.fn().mockReturnValue(false),
			data: jest.fn().mockReturnValue(null)
		}
		;(getDoc as jest.Mock).mockResolvedValue(mockDocSnap)

		await addCommentsToPost({ id: mockId, comments: mockComments })

		expect(doc).toHaveBeenCalledWith(db, 'posts', mockId)
		expect(getDoc).toHaveBeenCalledWith(mockDocRef)
		expect(updateDoc).not.toHaveBeenCalled()
	})

	it('should handle empty comments array', async () => {
		const mockDocSnap = {
			exists: jest.fn().mockReturnValue(true),
			data: jest.fn().mockReturnValue({ title: 'Test Post', comments: [] })
		}
		;(getDoc as jest.Mock).mockResolvedValue(mockDocSnap)

		await addCommentsToPost({ id: mockId, comments: [] })

		expect(updateDoc).toHaveBeenCalledWith(mockDocRef, { comments: [] })
	})

	it('should throw an error when Firestore operations fail', async () => {
		const mockError = new Error('Firestore operation failed')
		;(getDoc as jest.Mock).mockRejectedValue(mockError)

		await expect(
			addCommentsToPost({ id: mockId, comments: mockComments })
		).rejects.toThrow('Firestore operation failed')
	})

	it('should throw an error when updateDoc fails', async () => {
		const mockDocSnap = {
			exists: jest.fn().mockReturnValue(true),
			data: jest.fn().mockReturnValue({ title: 'Test Post', comments: [] })
		}
		;(getDoc as jest.Mock).mockResolvedValue(mockDocSnap)

		const mockError = new Error('Update operation failed')
		;(updateDoc as jest.Mock).mockRejectedValue(mockError)

		await expect(
			addCommentsToPost({ id: mockId, comments: mockComments })
		).rejects.toThrow('Update operation failed')
	})
})
