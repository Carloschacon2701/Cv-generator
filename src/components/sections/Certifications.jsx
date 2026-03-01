const emptyEntry = { name: '', organization: '', date: '' }

export default function Certifications({ cvData, updateField }) {
    const entries = cvData.certifications

    const addEntry = () => {
        updateField('certifications', [...entries, { ...emptyEntry }])
    }

    const removeEntry = (index) => {
        updateField('certifications', entries.filter((_, i) => i !== index))
    }

    const updateEntry = (index, field, value) => {
        const updated = entries.map((entry, i) =>
            i === index ? { ...entry, [field]: value } : entry
        )
        updateField('certifications', updated)
    }

    return (
        <>
            {entries.map((entry, i) => (
                <div className="entry-card" key={i}>
                    <div className="entry-header">
                        <span className="entry-number">Certification #{i + 1}</span>
                        <button className="btn-remove" onClick={() => removeEntry(i)}>✕ Remove</button>
                    </div>
                    <div className="form-grid">
                        <div className="form-group full-width">
                            <label>Certification Name</label>
                            <input
                                type="text"
                                placeholder="AWS Solutions Architect"
                                value={entry.name}
                                onChange={e => updateEntry(i, 'name', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Issuing Organization</label>
                            <input
                                type="text"
                                placeholder="Amazon Web Services"
                                value={entry.organization}
                                onChange={e => updateEntry(i, 'organization', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input
                                type="month"
                                value={entry.date}
                                onChange={e => updateEntry(i, 'date', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button className="btn-add" onClick={addEntry}>+ Add Certification</button>
        </>
    )
}
