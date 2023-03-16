import { Injectable, TemplateRef } from '@angular/core';

export interface ToastInfo {
  header: string;
  body: string;
  delay?: number;
  classname:string;
  textOrTpl:TemplateRef<any>;
}

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  constructor() { }
  toasts: ToastInfo[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
		this.toasts.push({ textOrTpl, ...options });
	}
  
  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}
