export default function PreviewPanel({ cvData }) {
    const { personalInfo, summary, education, experience, skills, projects, certifications, languages } = cvData

    const hasAnyContent =
        personalInfo.fullName ||
        summary ||
        education.length > 0 ||
        experience.length > 0 ||
        skills.length > 0 ||
        projects.length > 0 ||
        certifications.length > 0 ||
        languages.length > 0

    if (!hasAnyContent) {
        return (
            <div className="preview-panel">
                <div className="cv-paper">
                    <div className="cv-empty">
                        <div className="cv-empty-icon">📄</div>
                        <h3>Your CV Preview</h3>
                        <p>Start filling in the form to see your Harvard-style CV here.</p>
                    </div>
                </div>
            </div>
        )
    }

    const contactParts = []
    if (personalInfo.location) contactParts.push({ type: 'text', value: personalInfo.location })
    if (personalInfo.linkedin) contactParts.push({
        type: 'link',
        value: personalInfo.linkedin,
        href: personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`
    })
    if (personalInfo.phone) contactParts.push({ type: 'text', value: personalInfo.phone })
    if (personalInfo.email) contactParts.push({ type: 'email', value: personalInfo.email })
    if (personalInfo.website) contactParts.push({
        type: 'link',
        value: personalInfo.website,
        href: personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`
    })

    const formatDate = (dateStr) => {
        if (!dateStr) return ''
        const [year, month] = dateStr.split('-')
        if (!month) return year
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return `${months[parseInt(month, 10) - 1]} ${year}`
    }

    const formatDateRange = (start, end) => {
        const s = formatDate(start)
        const e = end ? formatDate(end) : 'Present'
        if (!s) return ''
        return `${s} – ${e}`
    }

    const parseBullets = (text) => {
        if (!text) return []
        return text
            .split('\n')
            .map(line => line.replace(/^[-•*]\s*/, '').trim())
            .filter(Boolean)
    }

    return (
        <div className="preview-panel">
            <div className="cv-paper">
                {/* Header */}
                {(personalInfo.fullName || contactParts.length > 0) && (
                    <div className="cv-header">
                        {personalInfo.fullName && <h1 className="cv-name">{personalInfo.fullName}</h1>}
                        {contactParts.length > 0 && (
                            <div className="cv-contact">
                                {contactParts.map((part, i) => (
                                    <span key={i}>
                                        {i > 0 && <span className="cv-contact-sep"> • </span>}
                                        {part.type === 'email' ? (
                                            <a href={`mailto:${part.value}`}>{part.value}</a>
                                        ) : part.type === 'link' ? (
                                            <a href={part.href} target="_blank" rel="noreferrer">{part.value}</a>
                                        ) : (
                                            part.value
                                        )}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Summary */}
                {summary && (
                    <div className="cv-summary">
                        <p className="cv-summary-text">{summary}</p>
                    </div>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <div className="cv-section">
                        <h2 className="cv-section-title">Professional Experience</h2>
                        {experience.map((exp, i) => {
                            const bullets = parseBullets(exp.description)
                            return (
                                <div className="cv-entry" key={i}>
                                    <div className="cv-entry-row">
                                        <span className="cv-entry-org">{exp.company}</span>
                                        <span className="cv-entry-location">{exp.location}</span>
                                    </div>
                                    <div className="cv-entry-row">
                                        <span className="cv-entry-role">{exp.jobTitle}</span>
                                        <span className="cv-entry-dates">{formatDateRange(exp.startDate, exp.endDate)}</span>
                                    </div>
                                    {bullets.length > 0 && (
                                        <ul className="cv-entry-bullets">
                                            {bullets.map((b, j) => <li key={j}>{b}</li>)}
                                        </ul>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <div className="cv-section">
                        <h2 className="cv-section-title">Education</h2>
                        {education.map((edu, i) => (
                            <div className="cv-entry" key={i}>
                                <div className="cv-entry-row">
                                    <span className="cv-entry-org">{edu.institution}</span>
                                    <span className="cv-entry-location">{edu.location}</span>
                                </div>
                                <div className="cv-entry-row">
                                    <span className="cv-entry-role">
                                        {[edu.degree, edu.field].filter(Boolean).join(', ')}
                                    </span>
                                    <span className="cv-entry-dates">
                                        {edu.endDate ? formatDate(edu.endDate) : formatDateRange(edu.startDate, edu.endDate)}
                                    </span>
                                </div>
                                {edu.gpa && (
                                    <div className="cv-entry-detail">GPA: {edu.gpa}</div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <div className="cv-section">
                        <h2 className="cv-section-title">Projects</h2>
                        {projects.map((proj, i) => (
                            <div className="cv-entry" key={i}>
                                <div className="cv-entry-row">
                                    <span className="cv-entry-org">{proj.name}</span>
                                    {proj.link && <span className="cv-entry-location">{proj.link}</span>}
                                </div>
                                {proj.technologies && <div className="cv-entry-role">{proj.technologies}</div>}
                                {proj.description && <div className="cv-entry-detail">{proj.description}</div>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <div className="cv-section">
                        <h2 className="cv-section-title">Skills</h2>
                        <div className="cv-skills-list">{skills.join(' • ')}</div>
                    </div>
                )}

                {/* Certifications */}
                {certifications.length > 0 && (
                    <div className="cv-section">
                        <h2 className="cv-section-title">Certifications</h2>
                        {certifications.map((cert, i) => (
                            <div className="cv-entry" key={i}>
                                <div className="cv-entry-row">
                                    <span className="cv-entry-org">{cert.name}</span>
                                    <span className="cv-entry-dates">{formatDate(cert.date)}</span>
                                </div>
                                {cert.organization && <div className="cv-entry-role">{cert.organization}</div>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Languages */}
                {languages.length > 0 && (
                    <div className="cv-section">
                        <h2 className="cv-section-title">Languages</h2>
                        <div className="cv-skills-list">
                            {languages.map((lang, i) => (
                                <span key={i}>
                                    {i > 0 && ' • '}
                                    <strong>{lang.language}</strong>
                                    {lang.proficiency && ` (${lang.proficiency})`}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
