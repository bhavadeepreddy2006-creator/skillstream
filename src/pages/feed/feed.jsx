import "./feed.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFeed } from "../../api/postApi";
import { fetchMyLikedPostIds, toggleLike, toggleSavePost, fetchMySavedPostIds } from "../../api/engagementApi";
import { resolveMediaUrl } from "../../api/mediaUrl";
import { FaEye, FaRegClock, FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";

function Feed() {
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("latest");
    const [filter, setFilter] = useState("all");
    const [likedIds, setLikedIds] = useState(new Set());
    const [savedIds, setSavedIds] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState("");

    // Liked/saved state loaded once — individual like/save toggles update
    // these sets locally rather than refetching.
    useEffect(() => {
        Promise.all([fetchMyLikedPostIds(), fetchMySavedPostIds()])
            .then(([liked, saved]) => {
                setLikedIds(new Set(liked));
                setSavedIds(new Set(saved));
            })
            .catch(() => {
                // Non-critical — like/save buttons just default to the
                // "not liked/saved" state if this fails.
            });
    }, []);

    function loadFeed(targetPage, replace) {
        const setBusy = replace ? setLoading : setLoadingMore;
        setBusy(true);
        setError("");

        fetchFeed({
            page: targetPage,
            limit: 9,
            search: search || undefined,
            sort,
            filter: filter === "following" ? "following" : undefined,
        })
            .then((data) => {
                setPosts((prev) => (replace ? data.posts : [...prev, ...data.posts]));
                setPagination(data.pagination);
                setPage(targetPage);
            })
            .catch(() => setError("Could not load the feed. Please try again."))
            .finally(() => setBusy(false));
    }

    useEffect(() => {
        let cancelled = false;

        fetchFeed({
            page: 1,
            limit: 9,
            search: search || undefined,
            sort,
            filter: filter === "following" ? "following" : undefined,
        })
            .then((data) => {
                if (cancelled) return;
                setPosts(data.posts);
                setPagination(data.pagination);
                setPage(1);
            })
            .catch(() => {
                if (!cancelled) setError("Could not load the feed. Please try again.");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, filter]);

    function handleSearchSubmit(e) {
        e.preventDefault();
        loadFeed(1, true);
    }

    async function handleToggleLike(e, postId) {
        e.preventDefault(); // don't navigate — the button sits inside a <Link> card
        e.stopPropagation();
        try {
            const result = await toggleLike(postId);
            setLikedIds((prev) => {
                const next = new Set(prev);
                result.liked ? next.add(postId) : next.delete(postId);
                return next;
            });
            setPosts((prev) => prev.map((p) => (p._id === postId ? { ...p, likesCount: result.likesCount } : p)));
        } catch {
            // Silently ignore — a failed like toggle isn't worth an error banner.
        }
    }

    async function handleToggleSave(e, postId) {
        e.preventDefault();
        e.stopPropagation();
        try {
            const result = await toggleSavePost(postId);
            setSavedIds((prev) => {
                const next = new Set(prev);
                result.saved ? next.add(postId) : next.delete(postId);
                return next;
            });
        } catch {
            // Silently ignore, same reasoning as handleToggleLike.
        }
    }

    const hasMore = pagination && page < pagination.totalPages;

    return (
        <div className="feed-page">

            <div className="feed-header">
                <h1>Knowledge Feed</h1>

                <form className="feed-controls" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All Posts</option>
                        <option value="following">Following</option>
                    </select>
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="latest">Latest</option>
                        <option value="trending">Trending</option>
                    </select>
                    <button type="submit">Search</button>
                </form>
            </div>

            {loading ? (
                <p className="feed-status">Loading posts...</p>
            ) : error ? (
                <p className="feed-status">{error}</p>
            ) : posts.length === 0 ? (
                <p className="feed-status">
                    {filter === "following"
                        ? "No posts yet from creators you follow — try Explore to find some."
                        : "No posts yet. Be the first to share something!"}
                </p>
            ) : (
                <>
                    <div className="feed-grid">
                        {posts.map((post) => {
                            const isLiked = likedIds.has(post._id);
                            const isSaved = savedIds.has(post._id);
                            return (
                                <Link className="post-card" to={`/post/${post._id}`} key={post._id}>
                                    <div
                                        className="post-thumbnail"
                                        style={post.thumbnail ? { backgroundImage: `url(${resolveMediaUrl(post.thumbnail)})` } : undefined}
                                    />
                                    <div className="post-card-body">
                                        {post.category && <span className="post-category">{post.category}</span>}
                                        <h3>{post.title}</h3>
                                        {post.description && <p>{post.description}</p>}
                                        <div className="post-card-meta">
                                            <span>{post.author?.name}</span>
                                            <span><FaEye /> {post.views}</span>
                                            <span><FaRegClock /> {new Date(post.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="post-card-engagement">
                                            <button className="engagement-btn" onClick={(e) => handleToggleLike(e, post._id)}>
                                                {isLiked ? <FaHeart className="liked-icon" /> : <FaRegHeart />}
                                                <span>{post.likesCount}</span>
                                            </button>
                                            <button className="engagement-btn" onClick={(e) => handleToggleSave(e, post._id)}>
                                                {isSaved ? <FaBookmark className="saved-icon" /> : <FaRegBookmark />}
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {hasMore && (
                        <button className="load-more-btn" onClick={() => loadFeed(page + 1, false)} disabled={loadingMore}>
                            {loadingMore ? "Loading..." : "Load More"}
                        </button>
                    )}
                </>
            )}

        </div>
    );
}

export default Feed;
