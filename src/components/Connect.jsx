import React, { useEffect } from 'react';
import mqtt from 'mqtt'; // Pastikan library MQTT sudah diinstal
import { useState } from 'react';

const Connect = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const initialConnectionOptions = {
      protocol: 'wss',
      host: 'b579eab42dbe4d60a49f09a4f513b74d.s1.eu.hivemq.cloud',
      clientId: 'test',
      port: 8884,
      username: 'bisaa',
      password: 'Yabisadong11',
    };

    const connect = (url, options) => {
      const client = mqtt.connect(url, options);
      client.subscribe('esp32_data');

      // Handle connection events
      client.on('connect', () => {
        console.log('Connected to MQTT broker');
      });

      client.on('error', (err) => {
        console.error('MQTT connection error:', err);
        client.end();
      });

      // ... tambahkan penanganan peristiwa lainnya sesuai kebutuhan
      client.on('message', (topic, message) => {
        // called each time a message is received
        const parsedData = JSON.parse(message.toString());
        setData(parsedData);
        console.log('Received message:', topic, parsedData);
      });
    };

    // Jalankan koneksi sekali menggunakan initialConnectionOptions
    connect(`${initialConnectionOptions.protocol}://${initialConnectionOptions.host}:${initialConnectionOptions.port}/mqtt`, {
      clientId: initialConnectionOptions.clientId,
      username: initialConnectionOptions.username,
      password: initialConnectionOptions.password,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
    });
  }, []);

  return (
    <>
      <div>
        <p>{data?.gacor}</p>
      </div>
    </>
  );
};

export default Connect;
