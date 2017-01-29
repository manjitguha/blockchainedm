import { Pipe, PipeTransform } from '@angular/core';

import { Provider } from '../models/index';

@Pipe({ name: 'provider-pcp-transformer' })
export class ProviderPCPTransformerPipe implements PipeTransform {
  transform(allProviders: Provider[]) {
    return allProviders.filter(provider => provider.pcpFlag);
  }
}
