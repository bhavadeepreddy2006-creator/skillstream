import "./createpost.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, updatePost, fetchPostById } from "../../api/postApi";
import { resolveMediaUrl } from "../../api/mediaUrl";

function CreatePost() {
    const navigate = useNavigate();
    const { id } = useParams(); // present only on /createpost/edit/:id
    const isEditMode = Boolean(id);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [technologies, setTechnologies] = useState("");
    const [tags, setTags] = useState("");
    const [difficulty, setDifficulty] = useState("Beginner");
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [existingThumbnail, setExistingThumbnail] = useState("");
    const [loading, setLoading] = useState(isEditMode);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!isEditMode) return;

        fetchPostById(id)
            .then((post) => {
                setTitle(post.title);
                setDescription(post.description || "");
                setContent(post.content);
                setCategory(post.category || "");
                setTechnologies(post.technologies.join(", "));
                setTags(post.tags.join(", "));
                setDifficulty(post.difficulty);
                setExistingThumbnail(post.thumbnail || "");
            })
            .catch(() => setMessage("Could not load this post."))
            .finally(() => setLoading(false));
    }, [id, isEditMode]);

    function toList(commaSeparated) {
        return commaSeparated.split(",").map((item) => item.trim()).filter(Boolean);
    }

    async function handleSubmit(status) {
        if (!title.trim() || !content.trim()) {
            setMessage("Title and content are required.");
            return;
        }

        setSubmitting(true);
        setMessage("");

        const payload = {
            title,
            description,
            content,
            category,
            technologies: toList(technologies),
            tags: toList(tags),
            difficulty,
            status,
        };

        try {
            const post = isEditMode
                ? await updatePost(id, payload, thumbnailFile)
                : await createPost(payload, thumbnailFile);

            navigate(`/post/${post._id}`);
        } catch (error) {
            setMessage(error.response?.data?.message || "Could not save this post.");
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="createpost-page">

            <div className="createpost-card">

                <h1>{isEditMode ? "Edit Post" : "Create a Post"}</h1>

                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="A clear, specific title" />

                <label>Short Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="One or two lines shown in the feed" />

                <label>Content</label>
                <textarea
                    className="content-textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your tutorial, case study, or experience here..."
                />

                <div className="createpost-row">
                    <div>
                        <label>Category</label>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Tutorial, Career Guidance" />
                    </div>
                    <div>
                        <label>Difficulty</label>
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                </div>

                <label>Technologies (comma-separated)</label>
                <input type="text" value={technologies} onChange={(e) => setTechnologies(e.target.value)} placeholder="React, Node.js, MongoDB" />

                <label>Tags (comma-separated)</label>
                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="beginner-friendly, backend, career" />

                <label>Thumbnail</label>
                {existingThumbnail && !thumbnailFile && (
                    <img className="thumbnail-preview" src={resolveMediaUrl(existingThumbnail)} alt="Current thumbnail" />
                )}
                <input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files[0])} />

                {message && <p className="createpost-message">{message}</p>}

                <div className="createpost-actions">
                    <button className="draft-btn" onClick={() => handleSubmit("draft")} disabled={submitting}>
                        Save as Draft
                    </button>
                    <button className="publish-btn" onClick={() => handleSubmit("published")} disabled={submitting}>
                        {submitting ? "Publishing..." : "Publish"}
                    </button>
                </div>

            </div>

        </div>
    );
}

export default CreatePost;
