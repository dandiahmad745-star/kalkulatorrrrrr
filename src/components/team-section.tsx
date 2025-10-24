'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from './ui/separator';

const teamMembers = [
  {
    name: 'Arul Faathir',
    role: 'Lead Designer & Visionary',
    avatar: 'https://i.pravatar.cc/150?u=arul',
  },
  {
    name: 'Baskara Putra',
    role: 'Lead Backend Engineer',
    avatar: 'https://i.pravatar.cc/150?u=baskara',
  },
  {
    name: 'Kirana Larasati',
    role: 'AI & Machine Learning Specialist',
    avatar: 'https://i.pravatar.cc/150?u=kirana',
  },
  {
    name: 'Sanjaya Adi',
    role: 'Frontend Developer',
    avatar: 'https://i.pravatar.cc/150?u=sanjaya',
  },
  {
    name: 'Dewi Lestari',
    role: 'Coffee Science Consultant',
    avatar: 'https://i.pravatar.cc/150?u=dewi',
  },
];

const TeamSection = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Tim Pencipta</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
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
