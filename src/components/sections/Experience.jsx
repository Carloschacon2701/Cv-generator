const emptyEntry = { company: '', jobTitle: '', location: '', startDate: '', endDate: '', description: '' }

export default function Experience({ cvData, updateField }) {
    const entries = cvData.experience

    const addEntry = () => {
        updateField('experience', [...entries, { ...emptyEntry }])
    }

    const removeEntry = (index) => {
        updateField('experience', entries.filter((_, i) => i !== index))
    }

    const updateEntry = (index, field, value) => {
        const updated = entries.map((entry, i) =>
            i === index ? { ...entry, [field]: value } : entry
        )
        updateField('experience', updated)
    }

    const handleBlur = (index, field, value) => {
        if (field === 'company' || field === 'jobTitle' || field === 'location') {
            const formatted = value
                .split(' ')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ')
                .trim()
            updateEntry(index, field, formatted)
        }
    }

    return (
        <>
            {entries.map((entry, i) => (
                <div className="entry-card" key={i}>
                    <div className="entry-header">
                        <span className="entry-number">Experience #{i + 1}</span>
                        <button className="btn-remove" onClick={() => removeEntry(i)}>✕ Remove</button>
                    </div>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Company</label>
                            <input
                                type="text"
                                placeholder="Google"
                                value={entry.company}
                                onChange={e => updateEntry(i, 'company', e.target.value)}
                                onBlur={e => handleBlur(i, 'company', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                placeholder="Mountain View, CA"
                                value={entry.location}
                                onChange={e => updateEntry(i, 'location', e.target.value)}
                                onBlur={e => handleBlur(i, 'location', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Job Title</label>
                            <input
                                type="text"
                                placeholder="Senior Engineer"
                                value={entry.jobTitle}
                                onChange={e => updateEntry(i, 'jobTitle', e.target.value)}
                                onBlur={e => handleBlur(i, 'jobTitle', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Start Date</label>
                            <input
                                type="month"
                                value={entry.startDate}
                                onChange={e => updateEntry(i, 'startDate', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input
                                type="month"
                                value={entry.endDate}
                                onChange={e => updateEntry(i, 'endDate', e.target.value)}
                            />
                        </div>
                        <div className="form-group full-width">
                            <label>Description (one bullet per line)</label>
                            <textarea
                                placeholder="- Led a team of 5 engineers&#10;- Improved system performance by 40%&#10;- Built micro-service architecture"
                                value={entry.description}
                                onChange={e => updateEntry(i, 'description', e.target.value)}
                                rows={4}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button className="btn-add" onClick={addEntry}>+ Add Experience</button>
        </>
    )
}
