import { config } from '@vue/test-utils';

// Configure global mocks for translations
config.global.mocks = { $t: (msg: string) => msg };
