import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface MentionBoxProps {
  avatarSrc: string;
  fallbackText: string;
  title: string;
  date: string;
  link: string;
  picture: React.ReactNode;
  tags: string;
}

const MentionBox: React.FC<MentionBoxProps> = ({ avatarSrc, fallbackText, title, date, link, picture, tags }) => {
  return (
    <div className='px-6 pb-6 pt-4'>
      <div className='flex'>
        <Avatar>
          <AvatarImage src={avatarSrc} alt='Avatar' />
          <AvatarFallback>{fallbackText}</AvatarFallback>
        </Avatar>
        <div className='ml-4 flex-1'>
          <div className='flex justify-between w-full'>
            <div className='font-semibold text-gray-500 text-lg'>{title}</div>
            <div className='ml-4 text-gray-600'>{date}</div>
          </div>
          <div className='flex items-center mt-2'>
            <a className="text-green-600 no-underline" href={link} target="_blank" rel="noopener noreferrer">{link}</a>
            <div className="ml-2">
              {picture}
            </div>
          </div>
        </div>
      </div>
      <div className='text-sm leading-relaxed mt-2 mb-2'>{tags}</div>
    </div>
  );
};

export { MentionBox };
