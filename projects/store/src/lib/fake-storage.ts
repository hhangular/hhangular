export class FakeStorage implements Storage {
  get length(): number {
    return 0;
  }
  clear(): void {}
  getItem(key: string): string | null {
    return null;
  }
  key(index: number): string | null {
    return null;
  }
  removeItem(key: string): void {}
  setItem(key: string, value: string): void {}
}
