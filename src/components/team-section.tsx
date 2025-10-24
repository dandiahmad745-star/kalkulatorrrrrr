
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const teamMembers = [
  {
    name: 'Arul Faathir',
    title: 'Visioner & Konseptor Utama',
    description: 'Arul adalah otak di balik ide besar CoffeeMixer Lab. Terinspirasi dari dunia barista dan eksperimen rasa, ia menciptakan konsep kalkulator rasa kopi yang mampu meniru keputusan manusia saat mencampur bahan. Visi Arul adalah menghadirkan alat digital yang membantu café besar menciptakan rasa sempurna dengan konsistensi profesional.',
    avatar: 'https://i.pravatar.cc/150?u=arul',
    icon: '☕',
  },
  {
    name: 'Rendra',
    title: 'Pengembang Sistem AI & Logika Rasa',
    description: 'Rendra bertanggung jawab dalam merancang sistem AI Taste Logic, yaitu algoritma yang mampu menilai keseimbangan rasa (sweet, nutty, creamy, dan bitter). Ia memastikan sistem dapat membaca setiap bahan secara matematis namun tetap terasa manusiawi di hasil akhirnya.',
    avatar: 'https://i.pravatar.cc/150?u=rendra',
    icon: '💻',
  },
  {
    name: 'Nadya',
    title: 'Desainer Antarmuka & Pengalaman Pengguna',
    description: 'Nadya membawa sentuhan visual yang lembut dan profesional. Ia merancang tampilan antarmuka agar pengguna merasa seperti berada di meja barista sungguhan—setiap tombol, warna, dan animasi dibuat untuk menciptakan pengalaman yang halus dan berkelas.',
    avatar: 'https://i.pravatar.cc/150?u=nadya',
    icon: '🎨',
  },
  {
    name: 'Fikri',
    title: 'Peneliti Rasa & Formulasi Bahan',
    description: 'Sebagai seorang peneliti kopi dan bahan baku, Fikri mengumpulkan data rasa dari berbagai merek sirup, creamer, dan susu. Ia menyusun profil rasa realistis untuk setiap bahan agar sistem bisa menghitung rasa dengan akurat, bukan sekadar tebakan.',
    avatar: 'https://i.pravatar.cc/150?u=fikri',
    icon: '🔬',
  },
  {
    name: 'Sinta',
    title: 'Ahli Bisnis & Operasional Café',
    description: 'Sinta membawa perspektif dunia nyata café ke dalam proyek ini. Ia mengatur agar sistem dapat menghitung biaya produksi, profit margin, dan efisiensi bahan baku layaknya sistem manajemen café profesional. Setiap perhitungan dirancang agar bisa diterapkan langsung di dunia usaha kopi.',
    avatar: 'https://i.pravatar.cc/150?u=sinta',
    icon: '📊',
  },
  {
    name: 'Rizky',
    title: 'Pengembang Integrasi & Otomasi',
    description: 'Rizky bertanggung jawab pada bagian teknis otomatisasi, memastikan seluruh fitur—dari Switch Brand System hingga Real-Time Taste Estimator—berjalan lancar. Ia menciptakan fondasi agar website dapat berkembang menjadi platform riset dan inovasi rasa kopi di masa depan.',
    avatar: 'https://i.pravatar.cc/150?u=rizky',
    icon: '🧩',
  },
];

const TeamSection = () => {
  return (
    <Card className="mt-8">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl">Enam Pencipta di Balik CoffeeMixer Lab</CardTitle>
        <CardDescription className="max-w-3xl mx-auto text-base">
          Kami berasal dari latar belakang yang berbeda—barista, pengembang, desainer, dan peneliti rasa—namun disatukan oleh satu hal yang sama: cinta terhadap kopi dan sains di balik setiap tetesnya.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <Avatar className="h-28 w-28 border-4 border-primary/50 mb-4">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold text-primary">{member.name}</h3>
              <p className="font-semibold text-muted-foreground mb-2">{member.icon} {member.title}</p>
              <p className="text-sm text-foreground/80">{member.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center text-muted-foreground italic max-w-2xl mx-auto">
          <p>
            Bersama, kami membangun CoffeeMixer Lab bukan hanya sebagai alat, tetapi sebagai jembatan antara dunia barista dan kecerdasan buatan.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamSection;
