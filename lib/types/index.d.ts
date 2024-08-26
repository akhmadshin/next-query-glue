export {};

declare global {
  interface Window {
    __NEXT_OPTIMISTIC_LINK_RENDERED_PATHNAME?: string;
  }
}