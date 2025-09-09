import { IPost } from '@/@types/post'
import { db } from '@/services/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

interface AddCommentsToPostParams {
	id: string
	comments: IPost['comments']
}

/**
 * Adds or updates the comments for a specific post in the Firestore database.
 *
 * @param params - The parameters for adding comments to a post.
 * @param params.id - The unique identifier of the post to update.
 * @param params.comments - The array of comments to associate with the post.
 * @returns A promise that resolves when the comments have been added or updated.
 *
 * @remarks
 * This function checks if the post exists before attempting to update its comments.
 * If the post does not exist, no action is taken.
 */
export async function addCommentsToPost({
	id,
	comments
}: AddCommentsToPostParams) {
	const collectionName = 'posts'
	const docRef = doc(db, collectionName, id)

	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		await updateDoc(docRef, { comments })
	}
}
