import { SkycasePage } from './app.po';

describe('skycase App', () => {
  let page: SkycasePage;

  beforeEach(() => {
    page = new SkycasePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('SKYCASE™'))
      .then(done, done.fail);
  });
});
