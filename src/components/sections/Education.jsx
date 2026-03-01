const emptyEntry = { institution: '', degree: '', field: '', location: '', startDate: '', endDate: '', gpa: '' }

export default function Education({ cvData, updateField }) {
    const entries = cvData.education

    const addEntry = () => {
        updateField('education', [...entries, { ...emptyEntry }])
    }

    const removeEntry = (index) => {
        updateField('education', entries.filter((_, i) => i !== index))
    }

    const updateEntry = (index, field, value) => {
        const updated = entries.map((entry, i) =>
            i === index ? { ...entry, [field]: value } : entry
        )
        updateField('education', updated)
    }

    const handleBlur = (index, field, value) => {
        if (field === 'institution' || field === 'degree' || field === 'field' || field === 'location') {
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
                        <span className="entry-number">Education #{i + 1}</span>
                        <button className="btn-remove" onClick={() => removeEntry(i)}>✕ Remove</button>
                    </div>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Institution</label>
                            <input
                                type="text"
                                placeholder="Harvard University"
                                value={entry.institution}
                                onChange={e => updateEntry(i, 'institution', e.target.value)}
                                onBlur={e => handleBlur(i, 'institution', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                placeholder="Cambridge, MA"
                                value={entry.location}
                                onChange={e => updateEntry(i, 'location', e.target.value)}
                                onBlur={e => handleBlur(i, 'location', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Degree</label>
                            <input
                                type="text"
                                placeholder="Bachelor of Science"
                                value={entry.degree}
                                onChange={e => updateEntry(i, 'degree', e.target.value)}
                                onBlur={e => handleBlur(i, 'degree', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Field of Study</label>
                            <input
                                type="text"
                                placeholder="Computer Science"
                                value={entry.field}
                                onChange={e => updateEntry(i, 'field', e.target.value)}
                                onBlur={e => handleBlur(i, 'field', e.target.value)}
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
                        <div className="form-group">
                            <label>GPA (optional)</label>
                            <input
                                type="text"
                                placeholder="3.8/4.0"
                                value={entry.gpa}
                                onChange={e => updateEntry(i, 'gpa', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button className="btn-add" onClick={addEntry}>+ Add Education</button>
        </>
    )
}
