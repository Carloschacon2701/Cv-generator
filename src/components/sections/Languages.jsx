const emptyEntry = { language: '', proficiency: '' }

const proficiencyLevels = [
    '',
    'Native',
    'Fluent',
    'Advanced',
    'Intermediate',
    'Basic',
]

export default function Languages({ cvData, updateField }) {
    const entries = cvData.languages

    const addEntry = () => {
        updateField('languages', [...entries, { ...emptyEntry }])
    }

    const removeEntry = (index) => {
        updateField('languages', entries.filter((_, i) => i !== index))
    }

    const updateEntry = (index, field, value) => {
        const updated = entries.map((entry, i) =>
            i === index ? { ...entry, [field]: value } : entry
        )
        updateField('languages', updated)
    }

    return (
        <>
            {entries.map((entry, i) => (
                <div className="entry-card" key={i}>
                    <div className="entry-header">
                        <span className="entry-number">Language #{i + 1}</span>
                        <button className="btn-remove" onClick={() => removeEntry(i)}>✕ Remove</button>
                    </div>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Language</label>
                            <input
                                type="text"
                                placeholder="English"
                                value={entry.language}
                                onChange={e => updateEntry(i, 'language', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Proficiency</label>
                            <select
                                value={entry.proficiency}
                                onChange={e => updateEntry(i, 'proficiency', e.target.value)}
                            >
                                {proficiencyLevels.map(level => (
                                    <option key={level} value={level}>
                                        {level || '— Select —'}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            ))}
            <button className="btn-add" onClick={addEntry}>+ Add Language</button>
        </>
    )
}
