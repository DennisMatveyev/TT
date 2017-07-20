import { StatusPage } from './app.po';

describe('status App', () => {
  let page: StatusPage;

  beforeEach(() => {
    page = new StatusPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
