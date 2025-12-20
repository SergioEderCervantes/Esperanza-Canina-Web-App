import localFont from 'next/font/local';

export const myFont = localFont({
  src: [
    {
      path: '../../public/fonts/RockoFLF.woff2',
      weight: '200',
      style: 'normal',
    },
    
  ],
  variable: '--font-myFont',
  display: 'swap',
});