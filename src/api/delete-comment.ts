import { db } from '@/services/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

interface DeleteCommentParams {
	postId: string
	commentId: string
}

/**
 * Deletes a comment from a specific post in the Firestore database.
 *
 * @param params - The parameters required to delete a comment.
 * @param params.postId - The ID of the post from which the comment will be deleted.
 * @param params.commentId - The ID of the comment to be deleted.
 * @returns A promise that resolves when the comment has been removed and the post updated.
 */
export async function deleteComment({
	postId,
	commentId
}: DeleteCommentParams) {
	const collectionName = 'posts'
	const docRef = doc(db, collectionName, postId)

	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		const postData = docSnap.data()

		const updatedComments = postData.comments.filter(
			(comment: { id: string }) => comment.id !== commentId
		)

		await updateDoc(docRef, {
			comments: updatedComments,
			updatedAt: new Date().toISOString()
		})
	}
}
