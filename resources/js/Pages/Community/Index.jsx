import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function CommunityIndex({ auth, posts }) {
    const { data, setData, post, processing, reset } = useForm({
        title: '',
        content: '',
    });

    const submitPost = (e) => {
        e.preventDefault();
        post('/posts', {
            onSuccess: () => reset(),
        });
    };

    return (
        <MainLayout auth={auth}>
            <Head title="Community" />

            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Community</h1>

                {/* Create Post Form */}
                {auth?.user && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Create a Post</h2>
                        <form onSubmit={submitPost}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Post title"
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <textarea
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="What's on your mind?"
                                    rows={4}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {processing ? 'Posting...' : 'Post'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Posts List */}
                {posts?.data?.length > 0 ? (
                    <div className="space-y-6">
                        {posts.data.map((post) => (
                            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <Link
                                            href={`/posts/${post.id}`}
                                            className="text-xl font-semibold text-gray-900 hover:text-indigo-600"
                                        >
                                            {post.title}
                                        </Link>
                                        <p className="mt-1 text-sm text-gray-500">
                                            by {post.user?.name || 'Anonymous'} &bull;{' '}
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-600 line-clamp-3">{post.content}</p>
                                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                                    <span>{post.likes_count || 0} likes</span>
                                    <span>{post.comments_count || 0} comments</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No posts yet. Be the first to share!</p>
                    </div>
                )}

                {/* Pagination */}
                {posts?.last_page > 1 && (
                    <div className="mt-8 flex justify-center">
                        <nav className="flex space-x-2">
                            {posts.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                                        link.active
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
