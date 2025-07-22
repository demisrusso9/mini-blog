import { db } from '@/services/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

interface DeleteCommentParams {
	postId: string
	commentId: string
}

export async function deleteComment({
	postId,
	commentId
}: DeleteCommentParams) {
	const collectionName = 'posts'
	const docRef = doc(db, collectionName, postId)

	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		const postData = docSnap.data()

		if (!postData.comments) return

		const updatedComments = postData.comments.filter(
			(comment: { id?: string }) => comment?.id !== commentId
		)

		await updateDoc(docRef, {
			comments: updatedComments,
			updatedAt: new Date().toISOString()
		})
	}
}
