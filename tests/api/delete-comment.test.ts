import { db } from '@/services/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { deleteComment } from '../../src/api/delete-comment'

jest.mock('firebase/firestore', () => ({
	doc: jest.fn(),
	getDoc: jest.fn(),
	updateDoc: jest.fn()
}))

jest.mock('@/services/firebase', () => ({
	db: 'mockDb'
}))

describe('deleteComment', () => {
	const mockPostId = 'post123'
	const mockCommentId = 'comment123'
	const mockDocRef = { id: 'mockDocRef' }
	const mockDate = '2025-07-21T12:00:00Z'

	// Setup initial test comments
	const initialComments = [
		{ id: 'comment123', body: 'Test comment 1', username: 'User1' },
		{ id: 'comment456', body: 'Test comment 2', username: 'User2' },
		{ id: 'comment789', body: 'Test comment 3', username: 'User3' }
	]

	beforeEach(() => {
		jest.clearAllMocks()
		;(doc as jest.Mock).mockReturnValue(mockDocRef)

		// Mock the Date.toISOString() to return a fixed date for testing
		const originalDate = global.Date
		global.Date = class extends originalDate {
			constructor() {
				super()
			}
			toISOString() {
				return mockDate
			}
		} as unknown as typeof Date
	})

	afterEach(() => {
		// Restore the original Date implementation
		jest.restoreAllMocks()
	})

	it('should delete a comment when document and comment exist', async () => {
		// Mock document with comments
		const mockDocSnap = {
			exists: jest.fn().mockReturnValue(true),
			data: jest.fn().mockReturnValue({
				title: 'Test Post',
				comments: [...initialComments]
			})
		}
		;(getDoc as jest.Mock).mockResolvedValue(mockDocSnap)
		;(updateDoc as jest.Mock).mockResolvedValue(undefined)

		// Call function to test
		await deleteComment({ postId: mockPostId, commentId: mockCommentId })

		// Verify document was retrieved
		expect(doc).toHaveBeenCalledWith(db, 'posts', mockPostId)
		expect(getDoc).toHaveBeenCalledWith(mockDocRef)

		// Verify update was called with filtered comments (removing comment123)
		expect(updateDoc).toHaveBeenCalledWith(mockDocRef, {
			comments: [
				{ id: 'comment456', body: 'Test comment 2', username: 'User2' },
				{ id: 'comment789', body: 'Test comment 3', username: 'User3' }
			],
			updatedAt: mockDate
		})
	})

	it('should not update document when the post does not exist', async () => {
		// Mock document that doesn't exist
		const mockDocSnap = {
			exists: jest.fn().mockReturnValue(false),
			data: jest.fn().mockReturnValue(null)
		}
		;(getDoc as jest.Mock).mockResolvedValue(mockDocSnap)

		// Call function to test
		await deleteComment({ postId: mockPostId, commentId: mockCommentId })

		// Verify document was retrieved but update wasn't called
		expect(doc).toHaveBeenCalledWith(db, 'posts', mockPostId)
		expect(getDoc).toHaveBeenCalledWith(mockDocRef)
		expect(updateDoc).not.toHaveBeenCalled()
	})

	it('should not remove any comments if the comment ID does not exist', async () => {
		// Mock document with comments that don't include the target comment ID
		const mockDocSnap = {
			exists: jest.fn().mockReturnValue(true),
			data: jest.fn().mockReturnValue({
				title: 'Test Post',
				comments: [...initialComments]
			})
		}
		;(getDoc as jest.Mock).mockResolvedValue(mockDocSnap)
		;(updateDoc as jest.Mock).mockResolvedValue(undefined)

		const nonExistentCommentId = 'nonexistent123'

		// Call function to test with non-existent comment ID
		await deleteComment({ postId: mockPostId, commentId: nonExistentCommentId })

		// Verify document was updated with the same comments (no changes)
		expect(updateDoc).toHaveBeenCalledWith(mockDocRef, {
			comments: initialComments,
			updatedAt: mockDate
		})
	})

	it('should handle empty comments array', async () => {
		// Mock document with no comments
		const mockDocSnap = {
			exists: jest.fn().mockReturnValue(true),
			data: jest.fn().mockReturnValue({
				title: 'Test Post',
				comments: []
			})
		}
		;(getDoc as jest.Mock).mockResolvedValue(mockDocSnap)
		;(updateDoc as jest.Mock).mockResolvedValue(undefined)

		// Call function to test
		await deleteComment({ postId: mockPostId, commentId: mockCommentId })

		// Verify empty comments array is preserved
		expect(updateDoc).toHaveBeenCalledWith(mockDocRef, {
			comments: [],
			updatedAt: mockDate
		})
	})

	it('should handle missing comments property', async () => {
		// Mock document with no comments property
		const mockDocSnap = {
			exists: jest.fn().mockReturnValue(true),
			data: jest.fn().mockReturnValue({
				title: 'Test Post'
				// No comments property
			})
		}
		;(getDoc as jest.Mock).mockResolvedValue(mockDocSnap)
		;(updateDoc as jest.Mock).mockResolvedValue(undefined)

		// Call function to test
		await deleteComment({ postId: mockPostId, commentId: mockCommentId })

		// Verify updateDoc isn't called when comments property is missing
		expect(updateDoc).not.toHaveBeenCalled()
	})

	it('should throw an error when getDoc operation fails', async () => {
		// Mock getDoc to reject with error
		const mockError = new Error('Firestore operation failed')
		;(getDoc as jest.Mock).mockRejectedValue(mockError)

		// Verify function throws the error
		await expect(
			deleteComment({ postId: mockPostId, commentId: mockCommentId })
		).rejects.toThrow('Firestore operation failed')
	})

	it('should throw an error when updateDoc operation fails', async () => {
		// Mock document with comments
		const mockDocSnap = {
			exists: jest.fn().mockReturnValue(true),
			data: jest.fn().mockReturnValue({
				title: 'Test Post',
				comments: [...initialComments]
			})
		}
		;(getDoc as jest.Mock).mockResolvedValue(mockDocSnap)

		// Mock updateDoc to reject with error
		const mockError = new Error('Update operation failed')
		;(updateDoc as jest.Mock).mockRejectedValue(mockError)

		// Verify function throws the error
		await expect(
			deleteComment({ postId: mockPostId, commentId: mockCommentId })
		).rejects.toThrow('Update operation failed')
	})

	it('should handle malformed comment objects gracefully', async () => {
		// Mock document with malformed comments
		const malformedComments = [
			{ id: 'comment123', body: 'Test comment' },
			{ badKey: 'missing ID field' }, // Missing id property
			null, // null comment
			undefined, // undefined comment
			{ id: 'comment456', body: 'Valid comment' }
		]

		const mockDocSnap = {
			exists: jest.fn().mockReturnValue(true),
			data: jest.fn().mockReturnValue({
				title: 'Test Post',
				comments: malformedComments
			})
		}
		;(getDoc as jest.Mock).mockResolvedValue(mockDocSnap)
		;(updateDoc as jest.Mock).mockResolvedValue(undefined)

		// Call function to test
		await deleteComment({ postId: mockPostId, commentId: 'comment123' })

		// Verify only the valid comment with id 'comment123' was removed
		expect(updateDoc).toHaveBeenCalledWith(mockDocRef, {
			comments: [
				{ badKey: 'missing ID field' },
				null,
				undefined,
				{ id: 'comment456', body: 'Valid comment' }
			],
			updatedAt: mockDate
		})
	})
})
