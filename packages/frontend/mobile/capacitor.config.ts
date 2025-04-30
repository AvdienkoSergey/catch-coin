import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.catchcoin.app',
  appName: 'Catch Coin',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config; 