import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import {
  getWeatherIcon,
  isRaining,
  getDayName,
  getDegreeColor,
} from '../utils/helper-functions';

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
    next_6_hours: {
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60&lon=5.3`
      );
      const json = await res.json();
      setData(json.properties);
    };
    fetchData();
  }, []);

  const tomorrow = new Date().getDate() + 1;
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
    <div>
      <Head>
        <title>Weather App</title>
        <meta name='description' content='Hvordan er vaeret der du er?' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div className={styles.bigCard}>
          <h1 className={styles.title}>Regner det i Bergen?</h1>

          <div>{getWeatherIcon(weatherIcon)}</div>
          <div style={{ fontSize: '2rem' }}>{isRaining(weatherIcon)}</div>

          <p
            style={{
              fontSize: '2rem',
              margin: '0',
              color: `${getDegreeColor(degrees)}`,
            }}
          >
            {degrees}
          </p>
        </div>

        <div style={{ width: '100%', padding: '20px' }}>
          {tommorowData && (
            <div className={styles.card} style={{ marginBottom: '20px' }}>
              <p
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
              >
                {getDayName(new Date(), 'no')}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>07:00</p>
                <div>
                  {getWeatherIcon(
                    tommorowData[8].data.next_1_hours.summary.symbol_code
                  )}
                </div>
                <p style={{ color: `${getDegreeColor(degrees)}` }}>
                  {tommorowData[8].data.instant.details.air_temperature}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>12:00</p>
                <div>
                  {getWeatherIcon(
                    tommorowData[13].data.next_1_hours.summary.symbol_code
                  )}
                </div>
                <p style={{ color: `${getDegreeColor(degrees)}` }}>
                  {tommorowData[13].data.instant.details.air_temperature}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>18:00</p>
                <div>
                  {getWeatherIcon(
                    tommorowData[19].data.next_1_hours.summary.symbol_code
                  )}
                </div>
                <p style={{ color: `${getDegreeColor(degrees)}` }}>
                  {tommorowData[19].data.instant.details.air_temperature}
                </p>
              </div>
            </div>
          )}
          {dayAfterTomorrowData && (
            <div className={styles.card}>
              <p
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
              >
                {getDayName(dayAfterTomorrow, 'no')}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>07:00</p>
                <div>
                  {getWeatherIcon(
                    dayAfterTomorrowData[8].data.next_1_hours.summary
                      .symbol_code
                  )}
                </div>
                <p style={{ color: `${getDegreeColor(degrees)}` }}>
                  {dayAfterTomorrowData[8].data.instant.details.air_temperature}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>12:00</p>
                <div>
                  {getWeatherIcon(
                    dayAfterTomorrowData[13].data.next_1_hours.summary
                      .symbol_code
                  )}
                </div>
                <p style={{ color: `${getDegreeColor(degrees)}` }}>
                  {
                    dayAfterTomorrowData[13].data.instant.details
                      .air_temperature
                  }
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>18:00</p>
                <div>
                  {getWeatherIcon(
                    dayAfterTomorrowData[19].data.next_6_hours.summary
                      .symbol_code
                  )}
                </div>
                <p style={{ color: `${getDegreeColor(degrees)}` }}>
                  {
                    dayAfterTomorrowData[19].data.instant.details
                      .air_temperature
                  }
                </p>
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
