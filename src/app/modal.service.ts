import { Injectable } from '@angular/core';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';

/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any;

export declare class NgbModalRefCustom<T = any> extends NgbModalRef {
  /**
   * The instance of a component used for the modal content.
   *
   * When a `TemplateRef` is used as the content or when the modal is closed, will return `undefined`.
   */
  get componentInstance(): T extends new (...args: any[]) => any
    ? InstanceType<T>
    : undefined;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private modalService: NgbModal) {}

  open<T>(content: T, options?: NgbModalOptions): NgbModalRefCustom<T> {
    let modalRef = this.modalService.open(content, options);
    return modalRef;
  }
}
