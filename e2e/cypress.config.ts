import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run expandi:serve:development',
        production: 'nx run expandi:serve:production',
      },
      ciWebServerCommand: 'nx run expandi:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
