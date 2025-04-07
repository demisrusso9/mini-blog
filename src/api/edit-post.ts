import { db } from '@/services/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

interface EditPostParams {
	title: string
	image_url: string
	body: string
	tags: string
}

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
