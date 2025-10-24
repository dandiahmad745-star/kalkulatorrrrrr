'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const teamMembers = [
  {
    name: 'Arul Faathir',
    role: 'Sang Pendesain',
    avatar: 'https://i.pravatar.cc/150?u=arul',
  },
  {
    name: 'Baskara Putra',
    role: 'Sang Pengkoding',
    avatar: 'https://i.pravatar.cc/150?u=baskara',
  },
  {
    name: 'Kirana Larasati',
    role: 'Sang Peracik AI',
    avatar: 'https://i.pravatar.cc/150?u=kirana',
  },
  {
    name: 'Sanjaya Adi',
    role: 'Sang Penata Tampilan',
    avatar: 'https://i.pravatar.cc/150?u=sanjaya',
  },
  {
    name: 'Dewi Lestari',
    role: 'Sang Peneliti Rasa',
    avatar: 'https://i.pravatar.cc/150?u=dewi',
  },
  {
    name: 'Rizky Ananda',
    role: 'Sang Penghitung Biaya',
    avatar: 'https://i.pravatar.cc/150?u=rizky',
  },
];

const TeamSection = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Tim Pencipta</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 border-4 border-primary/50">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamSection;
