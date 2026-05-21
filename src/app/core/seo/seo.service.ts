import { Injectable, inject, signal } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface SeoData {
  title?: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  private readonly currentTitle = signal('');
  private readonly currentDescription = signal('');

  setSeo(data: SeoData) {
    if (data.title) {
      this.currentTitle.set(data.title);
      this.title.setTitle(`${data.title} | Star Wars Explorer`);
    }

    if (data.description) {
      this.currentDescription.set(data.description);
      this.meta.updateTag({
        name: 'description',
        content: data.description,
      });
    }
  }

  setDynamicSeo(title: string, description: string) {
    this.setSeo({ title, description });
  }
}