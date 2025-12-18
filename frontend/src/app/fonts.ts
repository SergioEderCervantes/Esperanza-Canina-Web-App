import localFont from 'next/font/local';

export const myFont = localFont({
  src: [
    {
      path: '../../public/fonts/RockoFLF.ttf',
      weight: '200',
      style: 'normal',
    },
    
  ],
  variable: '--font-myFont',
});