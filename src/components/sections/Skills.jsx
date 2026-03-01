import { useState } from 'react'

export default function Skills({ cvData, updateField }) {
    const [input, setInput] = useState('')
    const skills = cvData.skills

    const addSkill = () => {
        const trimmed = input.trim()
        if (trimmed && !skills.includes(trimmed)) {
            updateField('skills', [...skills, trimmed])
            setInput('')
        }
    }

    const removeSkill = (index) => {
        updateField('skills', skills.filter((_, i) => i !== index))
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addSkill()
        }
    }

    return (
        <>
            <div className="skills-input-row">
                <input
                    type="text"
                    placeholder="Type a skill and press Enter"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="btn-add-skill" onClick={addSkill}>Add</button>
            </div>
            {skills.length > 0 && (
                <div className="skills-tags">
                    {skills.map((skill, i) => (
                        <span className="skill-tag" key={i}>
                            {skill}
                            <button onClick={() => removeSkill(i)}>✕</button>
                        </span>
                    ))}
                </div>
            )}
        </>
    )
}
