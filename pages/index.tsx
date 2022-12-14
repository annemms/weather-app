import Head from 'next/head';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { getWeatherIcon } from '../utils/helper-functions';
import SolmedSky from '../public/solmedsky.svg';

type Weather = {
  data: {
    instant: {
      details: {
        air_temperature: string;
      };
    };
    next_1_hours: {
      summary: {
        symbol_code: string;
      };
    };
  };
  time: Date;
};

type WeatherData = {
  timeseries: Weather[];
};

export default function Home() {
  const [data, setData] = useState<WeatherData>();
  const [query, setQuery] = useState('react');
  const [search, setSearch] = useState('react');
  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60&lon=11`
      );
      const json = await res.json();
      setData(json.properties);
    };
    fetchData();
  }, [search]);

  const tomorrow = new Date().getDate() + 1;

  function getDayName(dateStr: any, locale: string) {
    let date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
  }

  const tommorowData = data?.timeseries.filter(
    (t) => new Date(t.time).getDate() === tomorrow
  );

  const dayAfterTomorrow = new Date().getDate() + 2;
  const dayAfterTomorrowData = data?.timeseries.filter(
    (t) => new Date(t.time).getDate() === dayAfterTomorrow
  );

  const degrees = data?.timeseries[0].data.instant.details.air_temperature;
  const weatherIcon = data?.timeseries[0].data.next_1_hours.summary.symbol_code;

  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
        <meta name='description' content='Hvordan er vaeret der du er?' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Hvordan er været der du er?</h1>
        {/* <form>
          <input
            placeholder='Navn på sted'
            type='text'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button onClick={() => setSearch(query)}>Search</button>
        </form> */}
        <p>I Oslo akkurat nå:</p>
        <div>{getWeatherIcon(weatherIcon)}</div>
        <p style={{ fontSize: '2rem' }}>{degrees}</p>

        <div style={{ display: 'flex', columnGap: '3rem' }}>
          {tommorowData && (
            <div>
              <p>{getDayName(new Date(), 'no')}</p>
              <p>
                07:00 {tommorowData[8].data.instant.details.air_temperature}
              </p>
              <div>
                {getWeatherIcon(
                  tommorowData[8].data.next_1_hours.summary.symbol_code
                )}
              </div>
              <p>
                12:00 {tommorowData[13].data.instant.details.air_temperature}
              </p>
              <div>
                {getWeatherIcon(
                  tommorowData[13].data.next_1_hours.summary.symbol_code
                )}
              </div>
              <p>
                20:00 {tommorowData[21].data.instant.details.air_temperature}
              </p>
              <div>
                {getWeatherIcon(
                  tommorowData[21].data.next_1_hours.summary.symbol_code
                )}
              </div>
            </div>
          )}
          {dayAfterTomorrowData && (
            <div>
              <p>{getDayName(dayAfterTomorrow, 'no')}</p>
              <p>
                07:00{' '}
                {dayAfterTomorrowData[8].data.instant.details.air_temperature}
              </p>
              <div>
                {getWeatherIcon(
                  dayAfterTomorrowData[8].data.next_1_hours.summary.symbol_code
                )}
              </div>
              <p>
                12:00{' '}
                {dayAfterTomorrowData[13].data.instant.details.air_temperature}
              </p>
              <div>
                {getWeatherIcon(
                  dayAfterTomorrowData[8].data.next_1_hours.summary.symbol_code
                )}
              </div>
              <p>
                20:00{' '}
                {dayAfterTomorrowData[21].data.instant.details.air_temperature}
              </p>
              <div>
                {getWeatherIcon(
                  dayAfterTomorrowData[8].data.next_1_hours.summary.symbol_code
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Av Anne-Marie Samuelsen</p>
      </footer>
    </div>
  );
}
