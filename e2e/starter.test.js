import {device, element, by} from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('searchBox'))).toBeVisible();
  });

  it('should show hello screen after tap', async () => {
    await element(by.id('searchBox')).typeText('Vulpix');
    await element(by.id('pokemonBtn')).tap();
    await element(by.id('clearBtn')).tap();
    await expect(element(by.id('searchBox'))).toHaveText('');
  });
});
