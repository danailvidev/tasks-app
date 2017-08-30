import { Pipe, PipeTransform } from '@angular/core';

/*
  # Description:

  Repackages an array subset as a new array.

  **Reasoning:**

  Angular2's change checker freaks out when you ngFor an array that's a subset
    of a larger data structure.

  # Usage:
  ``
  <div *ng-for="#value of arrayOfObjects | mapToIterable"> </div>
  ``
*/
@Pipe({ name: 'mapToIterable',  pure: false })
export class MapToIterable implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value).map(key => value[key]);
  }
}