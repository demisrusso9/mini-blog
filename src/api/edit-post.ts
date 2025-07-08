import { db } from '@/services/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

interface EditPostParams {
	title: string
	image_url: string
	body: string
	tags: string
}

/**
 * Updates an existing post in the Firestore database with new data.
 *
 * @param id - The unique identifier of the post to edit.
 * @param data - An object containing the updated post fields: title, body, tags, image_url, etc.
 * @returns A promise that resolves when the post has been updated.
 *
 * @remarks
 * - If the post with the given `id` does not exist, no update is performed.
 * - The `updatedAt` field is automatically set to the current ISO timestamp.
 */
export async function editPost(id: string, data: EditPostParams) {
	const collectionName = 'posts'
	const docRef = doc(db, collectionName, id)

	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		await updateDoc(docRef, {
			title: data.title,
			body: data.body,
			tags: data.tags,
			image_url: data.image_url,
			updatedAt: new Date().toISOString()
		})
	}
}
