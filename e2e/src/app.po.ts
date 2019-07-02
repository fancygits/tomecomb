import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getLogo() {
    return element(by.css("img[src*='assets/img/tome_comb_logo.svg']"));
  }

  getSearchbar() {
    return element(by.name('searchterm'));
  }

  search(term: string) {
    element(by.name('searchterm')).sendKeys(term);
    browser.sleep(5000);
  }

  getBooks() {
    return element.all(by.css('mat-card'));
  }

  getPageRange() {
    return element(by.css('.mat-paginator-range-label')).getText();
  }

  nextPage() {
    element(by.css('.mat-paginator-navigation-next')).click();
    browser.sleep(5000);
  }

  previousPage() {
    element(by.css('.mat-paginator-navigation-previous')).click();
    browser.sleep(5000);
  }
}
