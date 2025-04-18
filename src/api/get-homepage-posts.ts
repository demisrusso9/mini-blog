import { IPost } from '@/@types/post'
import { db } from '@/services/firebase'

import { collection, getDocs, query } from 'firebase/firestore'

export async function getHomepagePosts() {
	const data = query(collection(db, 'posts'))
	const querySnapshot = await getDocs(data)

	const posts = querySnapshot.docs.map((post) => {
		return {
			...(post.data() as IPost),
			id: post.id
		}
	})

	return posts || []
}
