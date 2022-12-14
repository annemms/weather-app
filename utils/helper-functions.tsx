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
        <Image width={'40'} height={'40'} alt='sol-med-sky' src={SolMedSky} />
      );
    case 'fair_day':
      return <Image width={'40'} height={'40'} alt='sol-med-sky' src={Sol} />;
    case 'cloudy':
      return <Image width={'40'} height={'40'} alt='sol-med-sky' src={Sky} />;
    case 'clearsky_day':
      return (
        <Image width={'40'} height={'40'} alt='sol-med-sky' src={SolMedSky} />
      );

    default:
      return <Image width={'40'} height={'40'} alt='sol-med-sky' src={Sky} />;
  }
};
