import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleFilter'
})
export class TitleFilterPipe implements PipeTransform {
  
  transform(items: any[], title: string): any[] {
    if (!items || !title || title.length < 3) {
      return items;
    }

    return items.filter(item => item.title.toLowerCase().includes(title.toLowerCase()));
  }
}
