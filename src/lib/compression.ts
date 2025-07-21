import pako from 'pako';

export const compressToBase64Url = (data: object): string => {
  const json = JSON.stringify(data);
  const deflated = pako.deflate(json, { level: 9 });
  const base64 = btoa(String.fromCharCode(...deflated));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const decompressFromBase64Url = <T>(base64url: string): T => {
  const base64 = base64url
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(Math.ceil(base64url.length / 4) * 4, '=');

  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  const inflated = pako.inflate(bytes, { to: 'string' });

  return JSON.parse(inflated);
};
