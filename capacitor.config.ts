import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.goApp.app',
  appName: 'go-play',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
