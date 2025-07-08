import { IPost } from '@/@types/post'
import { db } from '@/services/firebase'
import { getAuth } from 'firebase/auth'

import { collection, getDocs, query, where } from 'firebase/firestore'

/**
 * Retrieves all posts authored by the currently authenticated user.
 *
 * @async
 * @returns {Promise<IPost[]>} A promise that resolves to an array of posts authored by the current user, each including its document ID.
 *
 * @throws Will throw an error if the user is not authenticated or if the Firestore query fails.
 */
export async function getUserPosts(): Promise<IPost[]> {
	const { currentUser } = getAuth()

	const userPosts = query(
		collection(db, 'posts'),
		where('authorId', '==', currentUser?.uid)
	)

	const querySnapshot = await getDocs(userPosts)

	const posts = querySnapshot.docs.map((post) => {
		return {
			...(post.data() as IPost),
			id: post.id
		}
	})

	return posts
}
