type EventCallback<T = any> = (data: T) => void;

interface EventListeners {
  [key: string]: EventCallback[];
}

class EventBus {
  private listeners: EventListeners = {};

  on<T = any>(event: string, callback: EventCallback<T>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off<T = any>(event: string, callback: EventCallback<T>): void {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== callback
      );
    }
  }

  emit<T = any>(event: string, data?: T): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => listener(data));
    }
  }
}

const eventBus = new EventBus();
export default eventBus;