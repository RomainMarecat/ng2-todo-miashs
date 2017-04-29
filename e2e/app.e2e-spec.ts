import { Ng2TodoPage } from './app.po';

describe('ng2-todo App', () => {
  let page: Ng2TodoPage;

  beforeEach(() => {
    page = new Ng2TodoPage();
  });

  it('should display main title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Todo List');
  });
});
