import { useState, useCallback } from 'react'
import FormPanel from './components/FormPanel'
import PreviewPanel from './components/PreviewPanel'

const initialState = {
  personalInfo: {
    fullName: 'Miguel Angel Duran Garcia',
    jobTitle: 'Lead FrontEnd Architect',
    email: 'midudev@gmail.com',
    phone: '+34 688 99 99 88',
    location: 'Barcelona, Spain',
    linkedin: 'linkedin.com/in/midudev',
    website: '',
  },
  summary: 'More than 15 years of experience as a Software Developer. Led the FrontEnd development at Adevinta, achieving a 40% improvement in product delivery, a 25% gain in web performance, and a unified platform. As a Content Creator, I run the most-watched programming channel on Twitch in Spanish.',
  education: [
    {
      institution: 'Universitat Oberta De Catalunya',
      degree: 'Computer Engineering',
      field: 'Computer Science',
      location: 'Barcelona, Spain',
      startDate: '2003-09',
      endDate: '2007-05',
      gpa: '',
    },
  ],
  experience: [
    {
      company: 'Adevinta',
      jobTitle: 'Lead FrontEnd Architect',
      location: 'Barcelona, Spain',
      startDate: '2017-08',
      endDate: '2022-09',
      description: '- Developed a unified platform of components and tools for the company\'s different products to converge technically and accelerate product delivery\n- Implemented CI/CD practices to improve software delivery efficiency, reducing errors and delivery times by lowering deployment times by more than 80%\n- Led web performance improvement for products like Fotocasa and InfoJobs, mentoring with best practices and creating DataDog dashboards\n- Built the cookie management tool across all products to comply with user consent permission laws',
    },
    {
      company: 'Another Company',
      jobTitle: 'FullStack Developer',
      location: 'Bergen, Norway',
      startDate: '2014-07',
      endDate: '2020-08',
      description: '- Use action verbs: Optimize, Improve, Develop, Implement, Design, Facilitate, Integrate\n- Show numbers, as they draw the attention of the person reading\n- If you don\'t have professional experience, showcase any project you have worked on in detail, using the same action verbs',
    },
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'CSS', 'HTML', 'Git', 'CI/CD', 'Web Performance'],
  projects: [
    {
      name: 'Open Source Design System',
      description: 'Built a comprehensive design system used by 12+ product teams across the organization.',
      technologies: 'React, TypeScript, Storybook, CSS Modules',
      link: 'github.com/example/design-system',
    },
  ],
  certifications: [
    {
      name: 'AWS Solutions Architect',
      organization: 'Amazon Web Services',
      date: '2021-03',
    },
  ],
  languages: [
    { language: 'Spanish', proficiency: 'Native' },
    { language: 'English', proficiency: 'Fluent' },
    { language: 'Catalan', proficiency: 'Advanced' },
  ],
}

function App() {
  const [cvData, setCvData] = useState(initialState)
  const [mobileView, setMobileView] = useState('form')

  const updateField = useCallback((section, value) => {
    setCvData(prev => ({ ...prev, [section]: value }))
  }, [])

  const updatePersonalInfo = useCallback((field, value) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }, [])

  const clearAll = useCallback(() => {
    setCvData(initialState)
  }, [])

  const handleExportPDF = () => {
    window.print()
  }

  return (
    <div className="app-layout">
      <div className="mobile-toggle">
        <button
          className={`mobile-toggle-btn ${mobileView === 'form' ? 'active' : ''}`}
          onClick={() => setMobileView('form')}
        >
          ✏️ Edit
        </button>
        <button
          className={`mobile-toggle-btn ${mobileView === 'preview' ? 'active' : ''}`}
          onClick={() => setMobileView('preview')}
        >
          👁️ Preview
        </button>
      </div>
      <div className={`panel-form ${mobileView === 'form' ? 'mobile-visible' : 'mobile-hidden'}`}>
        <FormPanel
          cvData={cvData}
          updateField={updateField}
          updatePersonalInfo={updatePersonalInfo}
          clearAll={clearAll}
          onExportPDF={handleExportPDF}
        />
      </div>
      <div className={`panel-preview ${mobileView === 'preview' ? 'mobile-visible' : 'mobile-hidden'}`}>
        <PreviewPanel cvData={cvData} />
      </div>
    </div>
  )
}

export default App
