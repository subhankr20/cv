import { CV_DATA } from '@/data/cv'

export default function PlainCV({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] bg-[#FFF8EC] text-[#1A1A1A] overflow-y-auto p-6 md:p-16">
      <button 
        onClick={onClose} 
        className="fixed top-6 right-6 px-4 py-2 bg-[#1A1A1A] text-[#FFF8EC] rounded-full text-sm font-mono shadow-lg hover:bg-[#2D2A4A] transition-colors"
      >
        Close CV
      </button>

      <div className="max-w-3xl mx-auto font-body">
        <header className="mb-12 border-b border-[#C4B8A8] pb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display text-[#E63946]">{CV_DATA.candidate.name}</h1>
          <p className="text-lg text-[#2D2A4A] font-medium">{CV_DATA.candidate.location}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm font-mono">
            <a href={`mailto:${CV_DATA.candidate.email}`} className="text-[#2D6A8F] hover:underline">{CV_DATA.candidate.email}</a>
            <span>•</span>
            <a href={`tel:${CV_DATA.candidate.phone}`} className="text-[#2D6A8F] hover:underline">{CV_DATA.candidate.phone}</a>
          </div>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-[#2D2A4A] uppercase tracking-wider">Experience</h2>
          <div className="space-y-8">
            {CV_DATA.experience.map((job, i) => (
              <div key={i}>
                <h3 className="text-xl font-bold">{job.role}</h3>
                <div className="flex justify-between items-center text-sm font-mono text-[#666] mb-3 mt-1">
                  <span className="text-[#E63946] font-bold">{job.company}</span>
                  <span>{job.dates}</span>
                </div>
                {job.points.length > 0 && (
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    {job.points.map((pt, j) => (
                      <li key={j} className="text-[#333] leading-relaxed">{pt}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-[#2D2A4A] uppercase tracking-wider">Education</h2>
          <div className="space-y-6">
            {CV_DATA.education.map((edu, i) => (
              <div key={i}>
                <h3 className="text-xl font-bold">{edu.title}</h3>
                <div className="flex justify-between text-sm font-mono text-[#666] mt-1">
                  <span>{edu.school}</span>
                  <span>{edu.years}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-[#2D2A4A] uppercase tracking-wider">Skills & Tools</h2>
          <div className="flex flex-wrap gap-2">
            {CV_DATA.skills.map(skill => (
              <span key={skill} className="px-3 py-1 bg-[#C4B8A8]/30 rounded-md font-mono text-sm border border-[#C4B8A8]">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-[#2D2A4A] uppercase tracking-wider">Certifications</h2>
          <ul className="list-disc pl-5 space-y-2">
            {CV_DATA.certifications.map((cert, i) => (
              <li key={i} className="text-[#333] leading-relaxed">{cert}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
