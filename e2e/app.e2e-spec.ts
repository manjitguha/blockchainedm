import { BlockchaindemoPage } from './app.po';

describe('blockchaindemo App', function() {
  let page: BlockchaindemoPage;

  beforeEach(() => {
    page = new BlockchaindemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
