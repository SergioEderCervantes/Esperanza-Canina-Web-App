import localFont from 'next/font/local';

export const myFont = localFont({
  src: [
    {
      path: '../../public/fonts/Typo_Round_Regular_Demo.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Typo_Round_Bold_Demo.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-myFont',
});