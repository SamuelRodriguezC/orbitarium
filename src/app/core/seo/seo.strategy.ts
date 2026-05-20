// seo.strategy.ts
import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  constructor(
    private readonly title: Title,
    private readonly meta: Meta
  ) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot) {
    const title = this.buildTitle(snapshot);
    const seo = snapshot.root.firstChild?.data?.['seo'];

    if (title) {
      this.title.setTitle(title);
    }

    if (seo) {
      this.meta.updateTag({ name: 'description', content: seo.description });
      this.meta.updateTag({ property: 'og:title', content: seo.title });
      this.meta.updateTag({ property: 'og:description', content: seo.description });
    }
  }
}