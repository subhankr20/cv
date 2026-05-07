import { CV_DATA } from '@/data/cv'

export default function PlainCV({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] bg-[#FFF8EC] text-[#1A1A1A] overflow-y-auto p-6 md:p-16">
      <button
        onClick={onClose}
        className="fixed top-6 right-6 px-4 py-2 bg-[#1A1A1A] text-[#FFF8EC] rounded-full text-sm font-mono shadow-lg hover:bg-[#2D2A4A] transition-colors z-[210]"
      >
        ✕ Close
      </button>

      <div className="max-w-3xl mx-auto font-body">
        <header className="mb-10 border-b-2 border-[#E63946] pb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[#1A1A1A]">{CV_DATA.candidate.name}</h1>
          <div className="flex flex-wrap gap-3 text-sm font-mono text-[#2D6A8F] mt-3">
            <span>{CV_DATA.candidate.phone}</span>
            <span>|</span>
            <a href={`mailto:${CV_DATA.candidate.email}`} className="hover:underline">{CV_DATA.candidate.email}</a>
          </div>
        </header>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#E63946] uppercase tracking-wider border-b border-[#C4B8A8] pb-2">Summary</h2>
          <p className="text-[#333] leading-relaxed">{CV_DATA.candidate.summary}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#E63946] uppercase tracking-wider border-b border-[#C4B8A8] pb-2">Education</h2>
          <div className="space-y-6">
            {CV_DATA.education.map((edu, i) => (
              <div key={i}>
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold">{edu.school}</h3>
                    <p className="text-[#555] italic">{edu.title}</p>
                  </div>
                  <div className="text-right text-sm font-mono text-[#666]">
                    <p>{edu.location}</p>
                    <p>{edu.years}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#E63946] uppercase tracking-wider border-b border-[#C4B8A8] pb-2">Experience</h2>
          <div className="space-y-8">
            {CV_DATA.experience.map((job, i) => (
              <div key={i}>
                <div className="flex flex-wrap justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold">{job.role}</h3>
                    <p className="text-[#E63946] font-semibold">{job.company}</p>
                  </div>
                  <div className="text-right text-sm font-mono text-[#666]">
                    <p>{job.dates}</p>
                    <p>{job.location}</p>
                  </div>
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
          <h2 className="text-xl font-bold mb-4 text-[#E63946] uppercase tracking-wider border-b border-[#C4B8A8] pb-2">Achievements</h2>
          <h3 className="text-lg font-bold mb-2">{CV_DATA.achievement.title}</h3>
          <ul className="list-disc pl-5 space-y-2">
            {CV_DATA.achievement.points.map((pt, i) => (
              <li key={i} className="text-[#333] leading-relaxed">{pt}</li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#E63946] uppercase tracking-wider border-b border-[#C4B8A8] pb-2">Certifications</h2>
          <ul className="list-disc pl-5 space-y-2">
            {CV_DATA.certifications.map((cert, i) => (
              <li key={i} className="text-[#333]">{cert}</li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#E63946] uppercase tracking-wider border-b border-[#C4B8A8] pb-2">Technical Skills</h2>
          <div className="flex flex-wrap gap-2">
            {CV_DATA.skills.map(skill => (
              <span key={skill} className="px-3 py-1 bg-[#2D2A4A] text-[#FFF8EC] rounded-md text-sm font-mono">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#E63946] uppercase tracking-wider border-b border-[#C4B8A8] pb-2">Language Skills</h2>
          <p className="text-[#333]">{CV_DATA.candidate.languages.join(', ')}</p>
        </section>
      </div>
    </div>
  )
}
