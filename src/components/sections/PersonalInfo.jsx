export default function PersonalInfo({ cvData, updatePersonalInfo }) {
    const { personalInfo } = cvData

    const handleBlur = (field, value) => {
        // Auto-format: capitalize name
        if (field === 'fullName') {
            const formatted = value
                .split(' ')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                .join(' ')
                .trim()
            updatePersonalInfo(field, formatted)
        }
    }

    return (
        <div className="form-grid">
            <div className="form-group">
                <label>Full Name</label>
                <input
                    type="text"
                    placeholder="John Doe"
                    value={personalInfo.fullName}
                    onChange={e => updatePersonalInfo('fullName', e.target.value)}
                    onBlur={e => handleBlur('fullName', e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Job Title</label>
                <input
                    type="text"
                    placeholder="Software Engineer"
                    value={personalInfo.jobTitle}
                    onChange={e => updatePersonalInfo('jobTitle', e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    placeholder="john@example.com"
                    value={personalInfo.email}
                    onChange={e => updatePersonalInfo('email', e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={personalInfo.phone}
                    onChange={e => updatePersonalInfo('phone', e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Location</label>
                <input
                    type="text"
                    placeholder="New York, NY"
                    value={personalInfo.location}
                    onChange={e => updatePersonalInfo('location', e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>LinkedIn</label>
                <input
                    type="text"
                    placeholder="linkedin.com/in/johndoe"
                    value={personalInfo.linkedin}
                    onChange={e => updatePersonalInfo('linkedin', e.target.value)}
                />
            </div>
            <div className="form-group full-width">
                <label>Website</label>
                <input
                    type="text"
                    placeholder="johndoe.com"
                    value={personalInfo.website}
                    onChange={e => updatePersonalInfo('website', e.target.value)}
                />
            </div>
        </div>
    )
}
