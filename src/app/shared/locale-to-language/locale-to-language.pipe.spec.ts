import { LocaleToLanguagePipe } from './locale-to-language.pipe';

describe('LocaleToLanguagePipe', () => {
  it('create an instance', () => {
    const pipe = new LocaleToLanguagePipe();
    expect(pipe).toBeTruthy();
  });
  it('Extract fr', () => {
    const pipe = new LocaleToLanguagePipe();
    expect(pipe.transform('/fr-FR/')).toBe('fr');
  });
  it('Extract en', () => {
    const pipe = new LocaleToLanguagePipe();
    expect(pipe.transform('/en-US/')).toBe('en');
  });
});
