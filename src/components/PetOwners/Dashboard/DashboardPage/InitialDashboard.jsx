import { useGetUserDetailsQuery } from "@/redux/services/userApi";
import { Activity, MessageSquare, PawPrint, Plus, ShoppingBag, Stethoscope, Cpu, ArrowRight, Play } from "lucide-react"
import { useRouter } from "next/navigation"

const InitialDashboard = () => {
  const router = useRouter();
  const { data: { user } = {}, isLoading } = useGetUserDetailsQuery();
  const features = [
    { title: "Health Tracker", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "AI Health Tools", icon: Cpu, color: "text-pink-600", bg: "bg-pink-100" },
    { title: "Vet Consultation", icon: Stethoscope, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Vet Chat", icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "AI Shop", icon: ShoppingBag, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="py-4 border-b border-b-slate-100 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <PawPrint size={18} className="text-white" />
            </div>
            <span className="font-black text-xl tracking-tight text-slate-900">PetVetPals</span>
          </div>
          <button className="p-2 bg-slate-100 rounded-full animate-pulse">
            <Play size={20} className="text-slate-600" />
          </button>
        </div>
      </header> */}

      <main className="flex-1 space-y-8">
        <section className="space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-900">Hello, {user.fullName}!</h1>
          <p className="text-slate-500 text-sm">Let's get your furry friend started</p>
        </section>

        <section
          onClick={() => router.push("/dashboard/pets")}
          className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200 active:scale-[0.98] transition-transform cursor-pointer"
        >

          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -mr-10 -mt-10" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
              <Plus size={32} className="text-white" strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Add Your First Pet</h2>
              <p className="text-slate-400 text-xs mt-1 px-4">Unlock tracking, AI health checks, and 24/7 vet support</p>
            </div>
            <div className="bg-white/10 text-white text-xs font-bold py-2 px-6 rounded-full border border-white/20 backdrop-blur-md">
              Tap to Begin
            </div>
          </div>
        </section>

        <section className="space-y-4 overflow-hidden">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-slate-800 tracking-tight">Explore Features</h3>
            <button onClick={() => router.push("/dashboard/pets")} className="text-xs font-bold text-primary flex items-center gap-1">
              See All <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-5 px-5">
            {features.map((f, i) => (
              <div
                key={i}
                className={`flex-shrink-0 w-32 aspect-square ${f.bg} rounded-[1.7rem] p-4 flex flex-col items-center justify-center text-center`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2`}>
                  <f.icon size={25} className={f.color} />
                </div>
                <span className="text-[10px] font-bold text-slate-700 leading-tight">{f.title}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-[2rem] p-6 border border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 mb-5">Getting Started</h3>
          <div className="space-y-6">
            {[
              { title: "Pet Profile", desc: "Basic info and photos", active: true },
              { title: "Health History", desc: "Log previous records", active: false },
              { title: "Care Plan", desc: "Personalized AI routine", active: false }
            ].map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step.active ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {i + 1}
                  </div>
                  {i < 2 && <div className="w-0.5 flex-1 bg-slate-100 my-1" />}
                </div>
                <div className="pb-1">
                  <p className={`text-sm font-bold ${step.active ? 'text-slate-900' : 'text-slate-400'}`}>{step.title}</p>
                  <p className="text-xs text-slate-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="sticky bottom-0 p-4 pb-8 max-md:mt-5">
        <button
          onClick={() => router.push("/dashboard/pets")}
          className="w-full bg-primary text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/20 active:scale-[0.97] transition-all"
        >
          <Plus size={20} strokeWidth={3} /> Add Pet to Start
        </button>
      </footer>
    </div>
  )
}

export default InitialDashboard;