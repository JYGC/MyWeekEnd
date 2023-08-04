import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.snailz.myweekend',
  appName: 'MyWeekEnd',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    hostname: '127.0.0.1',
    cleartext: true,
    allowNavigation: ['*'],
  }
};

export default config;
