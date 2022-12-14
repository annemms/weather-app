import Image from 'next/image';
import Natt from '../public/natt.svg';
import Sky from '../public/sky.svg';
import Halvmaane from '../public/halvmaane.svg';
import Sno from '../public/snø.svg';
import SolMedSky from '../public/solmedsky.svg';
import Sol from '../public/sol.svg';

export const getWeatherIcon = (icon: any) => {
  switch (icon) {
    case 'partlycloudy_night':
      return (
        <Image width={'40'} height={'40'} alt='halvmaane' src={Halvmaane} />
      );
    case 'fair_day':
      return <Image width={'40'} height={'40'} alt='sol-med-sky' src={Sol} />;
    case 'cloudy':
      return <Image width={'40'} height={'40'} alt='sky' src={Sky} />;
    case 'clearsky_day':
      return (
        <Image width={'40'} height={'40'} alt='sol-med-sky' src={SolMedSky} />
      );
    case 'clearsky_night':
      return <Image width={'40'} height={'40'} alt='natt' src={Natt} />;

    default:
      return <Image width={'40'} height={'40'} alt='sky' src={Sky} />;
  }
};

export const isRaining = (icon: any) => {
  switch (icon) {
    case 'rain':
      return <p>Ja, selvfølgelig.</p>;
    case 'lightrain':
      return <p>Ja, selvfølgelig.</p>;
    case 'heavyrain':
      return <p>Ja, selvfølgelig.</p>;
  }
  return <p>Overraskende ikke.</p>;
};

export const getDayName = (dateStr: any, locale: string) => {
  let date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: 'long' });
};

export const getDegreeColor = (degrees: any) => {
  return degrees?.toString()?.startsWith('-') ? 'blue' : 'red';
};
