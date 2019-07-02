import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('Tome Comb :: Book Search');
  });

  it('should only have an image and search bar (no books)', () => {
    expect(page.getLogo().getAttribute('alt')).toEqual('Tome Comb');
    expect(element(by.name('searchterm'))).toBeTruthy();
  });

  it('should search for books after 3 keystrokes and 1 second', () => {
    page.search('ha');
    expect(page.getBooks().count()).toEqual(0);
    page.search('r');
    expect(page.getBooks().count()).toEqual(12);
  });

  it('should load a page of books', () => {
    page.getSearchbar().clear();
    page.search('tron');
    expect(page.getBooks().count()).toEqual(12);
    page.getBooks().each(function(book, index) {
      let text = book.getText();
      expect(book.getText()).toMatch(/tron/i, "Tron wasn't found in book # " + index);
    })
  });

  it('should navigate between pages of books', () => {
    page.getSearchbar().clear();
    page.search('Angular Testing');
    expect(page.getPageRange()).toContain('1 - 12 of ');
    page.nextPage();
    expect(page.getPageRange()).toContain('13 - 24 of ');
    page.nextPage();
    expect(page.getPageRange()).toContain('25 - 36 of ');
    page.previousPage();
    expect(page.getPageRange()).toContain('13 - 24 of ');
    page.previousPage();
    expect(page.getPageRange()).toContain('1 - 12 of ');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
