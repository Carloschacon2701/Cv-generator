export default function Summary({ cvData, updateField }) {
    return (
        <div className="form-group">
            <label>Professional Summary</label>
            <textarea
                placeholder="A brief 2-3 sentence summary of your professional background, key skills, and career objectives..."
                value={cvData.summary}
                onChange={e => updateField('summary', e.target.value)}
                rows={4}
            />
        </div>
    )
}
