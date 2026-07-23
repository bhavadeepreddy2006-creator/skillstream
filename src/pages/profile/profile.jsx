import "./profile.css";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
    fetchMyProfile,
    updateMyProfile,
    uploadMyProfilePhoto,
    uploadMyCoverPhoto,
} from "../../api/creatorProfileApi";
import { resolveMediaUrl } from "../../api/mediaUrl";

// Turns a comma-separated input string into a clean array, and back —
// used for skills/technologies/achievements/certifications, which are all
// simple string-list fields on the CreatorProfile model.
function toList(commaSeparated) {
    return commaSeparated
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}

function Profile({ currentUser }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    // Local edit-form state — kept separate from `profile` so "Cancel" can
    // discard changes without a refetch.
    const [form, setForm] = useState(null);

    useEffect(() => {
        fetchMyProfile()
            .then((data) => setProfile(data))
            .catch(() => setMessage("Could not load your profile."))
            .finally(() => setLoading(false));
    }, []);

    function startEditing() {
        setForm({
            bio: profile.bio || "",
            category: profile.category || "",
            industryRole: profile.industryRole || "",
            experience: profile.experience || "",
            skills: profile.skills.join(", "),
            technologies: profile.technologies.join(", "),
            achievements: profile.achievements.join(", "),
            certifications: profile.certifications.join(", "),
            projects: profile.projects.length ? [...profile.projects] : [],
            links: { ...profile.links },
        });
        setIsEditing(true);
        setMessage("");
    }

    function addProjectRow() {
        setForm((prev) => ({
            ...prev,
            projects: [...prev.projects, { title: "", description: "", link: "" }],
        }));
    }

    function updateProjectRow(index, field, value) {
        setForm((prev) => {
            const projects = [...prev.projects];
            projects[index] = { ...projects[index], [field]: value };
            return { ...prev, projects };
        });
    }

    function removeProjectRow(index) {
        setForm((prev) => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index),
        }));
    }

    async function handleSave() {
        setSaving(true);
        setMessage("");
        try {
            const updated = await updateMyProfile({
                bio: form.bio,
                category: form.category,
                industryRole: form.industryRole,
                experience: form.experience,
                skills: toList(form.skills),
                technologies: toList(form.technologies),
                achievements: toList(form.achievements),
                certifications: toList(form.certifications),
                projects: form.projects.filter((p) => p.title.trim()),
                links: form.links,
            });
            setProfile(updated);
            setIsEditing(false);
        } catch (error) {
            setMessage(error.response?.data?.message || "Could not save your profile.");
        } finally {
            setSaving(false);
        }
    }

    async function handlePhotoChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const newPath = await uploadMyProfilePhoto(file);
            setProfile((prev) => ({ ...prev, profilePhoto: newPath }));
        } catch (error) {
            setMessage(error.response?.data?.message || "Could not upload profile photo.");
        }
    }

    async function handleCoverChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const newPath = await uploadMyCoverPhoto(file);
            setProfile((prev) => ({ ...prev, coverPhoto: newPath }));
        } catch (error) {
            setMessage(error.response?.data?.message || "Could not upload cover photo.");
        }
    }

    if (loading) {
        return <h2>Loading profile...</h2>;
    }

    if (!profile) {
        return <h2>{message || "Profile not found."}</h2>;
    }

    return (
        <div className="profile-page">

            <div className="profile-card">

                <div
                    className="cover-photo"
                    style={profile.coverPhoto ? { backgroundImage: `url(${resolveMediaUrl(profile.coverPhoto)})` } : undefined}
                >
                    <label className="photo-upload-btn cover-upload-btn">
                        Change Cover
                        <input type="file" accept="image/*" onChange={handleCoverChange} hidden />
                    </label>
                </div>

                <div className="profile-image">
                    {profile.profilePhoto ? (
                        <img src={resolveMediaUrl(profile.profilePhoto)} alt="Profile" />
                    ) : (
                        <FaUserCircle />
                    )}
                    <label className="photo-upload-btn">
                        Change Photo
                        <input type="file" accept="image/*" onChange={handlePhotoChange} hidden />
                    </label>
                </div>

                <div className="profile-details">

                    <h2>{currentUser?.name || profile.user?.name}</h2>
                    <p className="profile-role">{currentUser?.email || profile.user?.email}</p>

                    {!isEditing ? (
                        <>
                            <div className="profile-info">
                                <div className="info-box">
                                    <span className="label">Role</span>
                                    <span className="value">{currentUser?.role || profile.user?.role}</span>
                                </div>
                                {profile.category && (
                                    <div className="info-box">
                                        <span className="label">Category</span>
                                        <span className="value">{profile.category}</span>
                                    </div>
                                )}
                                {profile.industryRole && (
                                    <div className="info-box">
                                        <span className="label">Industry Role</span>
                                        <span className="value">{profile.industryRole}</span>
                                    </div>
                                )}
                                {profile.experience && (
                                    <div className="info-box">
                                        <span className="label">Experience</span>
                                        <span className="value">{profile.experience}</span>
                                    </div>
                                )}
                            </div>

                            {profile.bio && <p className="profile-bio">{profile.bio}</p>}

                            {profile.skills.length > 0 && (
                                <div className="tag-section">
                                    <h4>Skills</h4>
                                    <div className="tag-list">
                                        {profile.skills.map((skill) => (
                                            <span className="tag" key={skill}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {profile.technologies.length > 0 && (
                                <div className="tag-section">
                                    <h4>Technologies</h4>
                                    <div className="tag-list">
                                        {profile.technologies.map((tech) => (
                                            <span className="tag" key={tech}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {profile.projects.length > 0 && (
                                <div className="tag-section">
                                    <h4>Projects</h4>
                                    {profile.projects.map((project) => (
                                        <div className="project-item" key={project.title}>
                                            <strong>{project.title}</strong>
                                            {project.description && <p>{project.description}</p>}
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noreferrer">
                                                    {project.link}
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {profile.achievements.length > 0 && (
                                <div className="tag-section">
                                    <h4>Achievements</h4>
                                    <ul>
                                        {profile.achievements.map((item) => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>
                            )}

                            {profile.certifications.length > 0 && (
                                <div className="tag-section">
                                    <h4>Certifications</h4>
                                    <ul>
                                        {profile.certifications.map((item) => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>
                            )}

                            {(profile.links.portfolio || profile.links.resume || profile.links.linkedin || profile.links.github || profile.links.website) && (
                                <div className="tag-section">
                                    <h4>Links</h4>
                                    <div className="links-list">
                                        {profile.links.portfolio && <a href={profile.links.portfolio} target="_blank" rel="noreferrer">Portfolio</a>}
                                        {profile.links.resume && <a href={profile.links.resume} target="_blank" rel="noreferrer">Resume</a>}
                                        {profile.links.linkedin && <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
                                        {profile.links.github && <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>}
                                        {profile.links.website && <a href={profile.links.website} target="_blank" rel="noreferrer">Website</a>}
                                    </div>
                                </div>
                            )}

                            <button className="edit-btn" onClick={startEditing}>
                                Edit Profile
                            </button>
                        </>
                    ) : (
                        <div className="profile-edit-form">
                            <label>Bio</label>
                            <textarea
                                maxLength={500}
                                value={form.bio}
                                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                            />

                            <label>Category</label>
                            <input
                                type="text"
                                placeholder="e.g. Mentor, Trainer, Researcher"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                            />

                            <label>Industry Role</label>
                            <input
                                type="text"
                                placeholder="e.g. Senior MERN Developer"
                                value={form.industryRole}
                                onChange={(e) => setForm({ ...form, industryRole: e.target.value })}
                            />

                            <label>Experience</label>
                            <input
                                type="text"
                                placeholder="e.g. 3 years"
                                value={form.experience}
                                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                            />

                            <label>Skills (comma-separated)</label>
                            <input
                                type="text"
                                value={form.skills}
                                onChange={(e) => setForm({ ...form, skills: e.target.value })}
                            />

                            <label>Technologies (comma-separated)</label>
                            <input
                                type="text"
                                value={form.technologies}
                                onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                            />

                            <label>Achievements (comma-separated)</label>
                            <input
                                type="text"
                                value={form.achievements}
                                onChange={(e) => setForm({ ...form, achievements: e.target.value })}
                            />

                            <label>Certifications (comma-separated)</label>
                            <input
                                type="text"
                                value={form.certifications}
                                onChange={(e) => setForm({ ...form, certifications: e.target.value })}
                            />

                            <label>Projects</label>
                            {form.projects.map((project, index) => (
                                <div className="project-edit-row" key={index}>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={project.title}
                                        onChange={(e) => updateProjectRow(index, "title", e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        value={project.description}
                                        onChange={(e) => updateProjectRow(index, "description", e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Link"
                                        value={project.link}
                                        onChange={(e) => updateProjectRow(index, "link", e.target.value)}
                                    />
                                    <button type="button" className="remove-project-btn" onClick={() => removeProjectRow(index)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button type="button" className="add-project-btn" onClick={addProjectRow}>
                                + Add Project
                            </button>

                            <label>Portfolio Link</label>
                            <input
                                type="text"
                                value={form.links.portfolio}
                                onChange={(e) => setForm({ ...form, links: { ...form.links, portfolio: e.target.value } })}
                            />

                            <label>Resume Link</label>
                            <input
                                type="text"
                                value={form.links.resume}
                                onChange={(e) => setForm({ ...form, links: { ...form.links, resume: e.target.value } })}
                            />

                            <label>LinkedIn</label>
                            <input
                                type="text"
                                value={form.links.linkedin}
                                onChange={(e) => setForm({ ...form, links: { ...form.links, linkedin: e.target.value } })}
                            />

                            <label>GitHub</label>
                            <input
                                type="text"
                                value={form.links.github}
                                onChange={(e) => setForm({ ...form, links: { ...form.links, github: e.target.value } })}
                            />

                            <label>Website</label>
                            <input
                                type="text"
                                value={form.links.website}
                                onChange={(e) => setForm({ ...form, links: { ...form.links, website: e.target.value } })}
                            />

                            <div className="profile-edit-actions">
                                <button className="edit-btn" onClick={handleSave} disabled={saving}>
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                                <button className="cancel-btn" onClick={() => setIsEditing(false)} disabled={saving}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {message && <p className="profile-message">{message}</p>}

                </div>

            </div>

        </div>
    );
}

export default Profile;
