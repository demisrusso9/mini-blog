import { IPost } from '@/@types/post'
import { db } from '@/services/firebase'
import { doc, getDoc } from 'firebase/firestore'

/**
 * Retrieves the comments for a specific post by its ID.
 *
 * @param id - The unique identifier of the post whose comments are to be fetched.
 * @returns A promise that resolves to an array of comments associated with the post.
 */
export async function getPostComments(id: string): Promise<IPost['comments']> {
	const collectionName = 'posts'
	const docRef = doc(db, collectionName, id)

	const docSnap = await getDoc(docRef)
	const { comments } = docSnap.data() as IPost

	return comments || []
}
