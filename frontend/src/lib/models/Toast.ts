export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

export interface Toast {
  type: ToastType
  message: string
  hasBeenFired: boolean
}
