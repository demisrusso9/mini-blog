import { IPost } from '@/@types/post'
import { db } from '@/services/firebase'

import { collection, getDocs, query } from 'firebase/firestore'

/**
 * Retrieves all posts from the 'posts' collection in the database for the homepage.
 *
 * @returns {Promise<IPost[]>} A promise that resolves to an array of posts, each including its document ID.
 *
 * @example
 * const posts = await getHomepagePosts();
 * console.log(posts);
 */
export async function getHomepagePosts(): Promise<IPost[]> {
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
