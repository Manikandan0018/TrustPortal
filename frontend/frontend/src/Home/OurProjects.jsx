import { BookOpen, GraduationCap, TreePalm, HeartHandshake, Brain, Star } from 'lucide-react';

const projects = [
  {
    icon: <GraduationCap className="w-8 h-8 text-white" />,
    title: 'SIGARAM',
    motto: 'To educate underprivileged students.',
    mode: 'Supporting college education for deserving students.',
    norms: [
      'Students from poor families (single parent / orphan / unsupported).',
      'Preferably studying in government colleges.',
      'Fee receipts to be submitted.',
      'Students must attend review meetings and stay in contact with the trust.'
    ],
    color: 'from-orange-500 to-yellow-400'
  },
  {
    icon: <BookOpen className="w-8 h-8 text-white" />,
    title: 'ARIVUCHOLAI',
    motto: 'To inculcate knowledge among rural students.',
    mode: 'Setting up libraries in rural areas and government schools.',
    norms: [
      'Target schools without any existing library.',
      'Priority to rural areas with educational need.'
    ],
    color: 'from-green-500 to-lime-400'
  },
  {
    icon: <TreePalm className="w-8 h-8 text-white" />,
    title: 'PAIMPOZHIL',
    motto: 'To plant trees and promote green villages.',
    mode: 'Planting coconut and native saplings in villages/schools.',
    norms: [
      'Locations where people care for and maintain the plants.'
    ],
    color: 'from-emerald-500 to-green-300'
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-white" />,
    title: 'SERVAGE',
    motto: 'To care for orphaned elderly.',
    mode: 'Visiting and supporting underfunded old age homes every 6 months.',
    norms: [
      'Old age homes without support from reputed sources.'
    ],
    color: 'from-purple-500 to-pink-400'
  },
  {
    icon: <Brain className="w-8 h-8 text-white" />,
    title: 'MIND CARE',
    motto: 'To counsel students and those in distress.',
    mode: 'Promoting mental well-being and positive reinforcement.',
    norms: [
      'Students with learning disabilities.',
      'Patients suffering from chronic illness.'
    ],
    color: 'from-cyan-500 to-sky-400'
  },
  {
    icon: <Star className="w-8 h-8 text-white" />,
    title: 'PERSONALITY DEVELOPMENT',
    motto: 'To empower youth to reach their life goals.',
    mode: 'Workshops and motivational sessions by Dr. Elamurugan.',
    norms: [
      'SIGARAM students and school students benefit from this program.'
    ],
    color: 'from-red-500 to-orange-400'
  }
];

const OurProject = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b bg-black">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-orange-600 mb-4">🌟 Our Contributing Projects</h2>
        <p className="text-white text-lg max-w-2xl mx-auto">
          Each project is a heartfelt step towards making lives better. Join us in transforming compassion into action.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${project.color} text-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-3 rounded-full">{project.icon}</div>
              <h3 className="text-2xl font-bold">{project.title}</h3>
            </div>
            <p className="italic mb-2">“{project.motto}”</p>
            <p className="text-sm font-medium mb-4">Mode: <span className="font-normal">{project.mode}</span></p>
            <ul className="list-disc list-inside space-y-1 text-sm text-white/90">
              {project.norms.map((n, i) => (
                <li key={i}>✓ {n}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProject;
