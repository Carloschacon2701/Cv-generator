import { useState } from 'react'
import PersonalInfo from './sections/PersonalInfo'
import Summary from './sections/Summary'
import Education from './sections/Education'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Certifications from './sections/Certifications'
import Languages from './sections/Languages'

const sections = [
    { id: 'personal', title: 'Personal Information', icon: '👤', Component: PersonalInfo },
    { id: 'summary', title: 'Professional Summary', icon: '📝', Component: Summary },
    { id: 'education', title: 'Education', icon: '🎓', Component: Education },
    { id: 'experience', title: 'Experience', icon: '💼', Component: Experience },
    { id: 'skills', title: 'Skills', icon: '⚡', Component: Skills },
    { id: 'projects', title: 'Projects', icon: '🚀', Component: Projects },
    { id: 'certifications', title: 'Certifications', icon: '📜', Component: Certifications },
    { id: 'languages', title: 'Languages', icon: '🌐', Component: Languages },
]

export default function FormPanel({ cvData, updateField, updatePersonalInfo, clearAll, onExportPDF }) {
    const [openSections, setOpenSections] = useState({ personal: true })

    const toggleSection = (id) => {
        setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))
    }

    return (
        <div className="form-panel">
            <div className="form-header">
                <h1>CV Generator</h1>
                <p>Harvard Style • Fill in your details below</p>
            </div>

            <div className="actions-bar">
                <button className="btn-export" onClick={onExportPDF}>
                    📄 Download PDF
                </button>
                <button className="btn-clear" onClick={clearAll}>
                    🗑️ Clear All
                </button>
            </div>

            {sections.map(({ id, title, icon, Component }) => (
                <div className="section-card" key={id}>
                    <div className="section-header" onClick={() => toggleSection(id)}>
                        <div className="section-header-left">
                            <span className="section-icon">{icon}</span>
                            <span className="section-title">{title}</span>
                        </div>
                        <span className={`section-toggle ${openSections[id] ? 'open' : ''}`}>
                            ▼
                        </span>
                    </div>
                    {openSections[id] && (
                        <div className="section-body">
                            <Component
                                cvData={cvData}
                                updateField={updateField}
                                updatePersonalInfo={updatePersonalInfo}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
