import { TitleFilterPipe } from './todos/title-filter.pipe';

describe('TitleFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new TitleFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
