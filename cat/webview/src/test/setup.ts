import '@testing-library/jest-dom';

// Mock localStorage for tests
const localStorageMock = {
  getItem: (key: string) => {
    return (global as any).localStorageData?.[key] || null;
  },
  setItem: (key: string, value: string) => {
    if (!(global as any).localStorageData) {
      (global as any).localStorageData = {};
    }
    (global as any).localStorageData[key] = value;
  },
  clear: () => {
    (global as any).localStorageData = {};
  },
};

global.localStorage = localStorageMock as Storage;
