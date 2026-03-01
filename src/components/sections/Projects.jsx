const emptyEntry = { name: '', description: '', technologies: '', link: '' }

export default function Projects({ cvData, updateField }) {
    const entries = cvData.projects

    const addEntry = () => {
        updateField('projects', [...entries, { ...emptyEntry }])
    }

    const removeEntry = (index) => {
        updateField('projects', entries.filter((_, i) => i !== index))
    }

    const updateEntry = (index, field, value) => {
        const updated = entries.map((entry, i) =>
            i === index ? { ...entry, [field]: value } : entry
        )
        updateField('projects', updated)
    }

    return (
        <>
            {entries.map((entry, i) => (
                <div className="entry-card" key={i}>
                    <div className="entry-header">
                        <span className="entry-number">Project #{i + 1}</span>
                        <button className="btn-remove" onClick={() => removeEntry(i)}>✕ Remove</button>
                    </div>
                    <div className="form-grid">
                        <div className="form-group full-width">
                            <label>Project Name</label>
                            <input
                                type="text"
                                placeholder="My Awesome Project"
                                value={entry.name}
                                onChange={e => updateEntry(i, 'name', e.target.value)}
                            />
                        </div>
                        <div className="form-group full-width">
                            <label>Description</label>
                            <textarea
                                placeholder="Brief description of the project and your role..."
                                value={entry.description}
                                onChange={e => updateEntry(i, 'description', e.target.value)}
                                rows={3}
                            />
                        </div>
                        <div className="form-group">
                            <label>Technologies</label>
                            <input
                                type="text"
                                placeholder="React, Node.js, PostgreSQL"
                                value={entry.technologies}
                                onChange={e => updateEntry(i, 'technologies', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Link</label>
                            <input
                                type="text"
                                placeholder="github.com/user/project"
                                value={entry.link}
                                onChange={e => updateEntry(i, 'link', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button className="btn-add" onClick={addEntry}>+ Add Project</button>
        </>
    )
}
