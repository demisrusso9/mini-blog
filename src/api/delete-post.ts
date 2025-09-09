import { db } from '@/services/firebase'
import { deleteDoc, doc } from 'firebase/firestore'

/**
 * Deletes a post from the Firestore database by its unique identifier.
 *
 * @param id - The unique identifier of the post to delete.
 * @returns A promise that resolves when the post has been deleted.
 */
export async function deletePost(id: string) {
	const collection = 'posts'
	await deleteDoc(doc(db, collection, id))
}
