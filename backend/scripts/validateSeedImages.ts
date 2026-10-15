/// <reference types="node" />

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEED_PRODUCTS } from '../prisma/seed-data/catalog.js';

const previewMode = process.argv.includes('--preview');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tmpDir = path.resolve(__dirname, '../tmp');
const previewFile = path.join(tmpDir, 'seed-images-preview.html');
const MAX_RETRIES = 2;
const MAX_CONCURRENCY = 5;

type ValidationResult = {
    sku: string;
    title: string;
    imageUrl?: string;
    alt?: string;
    review?: string;
    status: 'OK' | 'MISSING' | 'FAIL';
    ok: boolean;
    reason?: string;
};

const normalizeImageUrl = (url: string) => {
    if (!url.startsWith('https://')) {
        return 'invalid protocol';
    }

    const parsed = new URL(url);
    if (parsed.hostname !== 'images.unsplash.com') {
        return `hostname ${parsed.hostname} is not allowed`;
    }

    if (url.startsWith('/assets') || url.startsWith('assets/')) {
        return 'asset URL is not allowed';
    }

    return `${parsed.origin}${parsed.pathname}`;
};

const fetchImageHead = async (url: string) => {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
        try {
            const response = await fetch(url, {
                method: 'HEAD',
                signal: AbortSignal.timeout(10_000),
                redirect: 'follow',
            });

            if (response.status === 403 || response.status === 405) {
                continue;
            }

            return response;
        } catch {
            if (attempt >= MAX_RETRIES) {
                throw new Error(`Image probe failed for ${url}`);
            }
        }
    }

    throw new Error(`Image probe failed for ${url}`);
};

const fetchImageRange = async (url: string) => {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { Range: 'bytes=0-0' },
                signal: AbortSignal.timeout(10_000),
                redirect: 'follow',
            });

            if (response.status === 200) {
                return response;
            }
        } catch {
            if (attempt >= MAX_RETRIES) {
                throw new Error(`Image probe failed for ${url}`);
            }
        }
    }

    throw new Error(`Image probe failed for ${url}`);
};

const probeImage = async (url: string) => {
    const headResponse = await fetchImageHead(url).catch((error) => error as Error);
    if (headResponse instanceof Error) {
        return await fetchImageRange(url).catch((error) => error as Error);
    }

    if (headResponse.status === 403 || headResponse.status === 405) {
        return await fetchImageRange(url).catch((error) => error as Error);
    }

    return headResponse;
};

const results: ValidationResult[] = SEED_PRODUCTS.map((product) => {
    if (!product.image) {
        return {
            sku: product.sku,
            title: product.title,
            status: 'MISSING',
            ok: false,
            reason: 'No image mapped in PRODUCT_IMAGES',
        };
    }

    return {
        sku: product.sku,
        title: product.title,
        imageUrl: product.image.url,
        alt: product.image.alt,
        review: product.image.review,
        status: 'OK',
        ok: true,
    };
});

const failures: string[] = [];
const uniqueKeys = new Set<string>();

for (const item of results) {
    if (!item.imageUrl) {
        failures.push(`${item.sku}: MISSING image`);
        item.status = 'MISSING';
        item.reason = 'No image mapped in PRODUCT_IMAGES';
        continue;
    }

    const urlValidation = normalizeImageUrl(item.imageUrl);
    if (urlValidation !== 'invalid protocol' && urlValidation !== 'asset URL is not allowed' && !urlValidation.startsWith('hostname')) {
        const normalized = urlValidation;
        if (uniqueKeys.has(normalized)) {
            failures.push(`${item.sku}: duplicate image path -> ${item.imageUrl}`);
            item.status = 'FAIL';
            item.reason = 'duplicate image path';
            item.ok = false;
        }
        uniqueKeys.add(normalized);
    }

    if (!item.imageUrl.startsWith('https://')) {
        failures.push(`${item.sku}: invalid protocol -> ${item.imageUrl}`);
        item.status = 'FAIL';
        item.reason = 'invalid protocol';
        item.ok = false;
        continue;
    }

    if (item.imageUrl.startsWith('/assets') || item.imageUrl.startsWith('assets/')) {
        failures.push(`${item.sku}: relative asset URL -> ${item.imageUrl}`);
        item.status = 'FAIL';
        item.reason = 'relative asset URL';
        item.ok = false;
        continue;
    }

    try {
        const parsed = new URL(item.imageUrl);
        if (parsed.hostname !== 'images.unsplash.com') {
            failures.push(`${item.sku}: invalid host -> ${parsed.hostname}`);
            item.status = 'FAIL';
            item.reason = `hostname ${parsed.hostname} is not allowed`;
            item.ok = false;
            continue;
        }

        const key = `${parsed.origin}${parsed.pathname}`;
        if (uniqueKeys.has(key)) {
            failures.push(`${item.sku}: duplicate image path -> ${item.imageUrl}`);
            item.status = 'FAIL';
            item.reason = 'duplicate image path';
            item.ok = false;
        }
        uniqueKeys.add(key);
    } catch {
        failures.push(`${item.sku}: invalid URL -> ${item.imageUrl}`);
        item.status = 'FAIL';
        item.reason = 'invalid URL';
        item.ok = false;
    }
}

const queue: Array<() => Promise<void>> = results
    .filter((item) => item.imageUrl && item.ok && item.status !== 'MISSING')
    .map((item) => async () => {
        if (!item.imageUrl) {
            return;
        }

        try {
            const response = await probeImage(item.imageUrl);
            if (response instanceof Error) {
                throw response;
            }

            const contentType = response.headers.get('content-type') ?? '';
            if (response.status !== 200 || !contentType.startsWith('image/')) {
                item.ok = false;
                item.status = 'FAIL';
                item.reason = `status=${response.status}, content-type=${contentType}`;
                failures.push(`${item.sku}: ${item.reason}`);
                return;
            }

            item.ok = true;
            item.status = 'OK';
        } catch (error) {
            item.ok = false;
            item.status = 'FAIL';
            item.reason = error instanceof Error ? error.message : String(error);
            failures.push(`${item.sku}: ${item.reason}`);
        }
    });

const workers = Array.from({ length: Math.min(MAX_CONCURRENCY, queue.length || 1) }, async () => {
    while (queue.length > 0) {
        const task = queue.shift();
        if (!task) {
            continue;
        }
        await task();
    }
});
await Promise.all(workers);

if (previewMode) {
    await fs.mkdir(tmpDir, { recursive: true });
    const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Seed image preview</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 24px; background: #f7f4ef; color: #221d17; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; }
      .card { background: white; border: 1px solid #e7e1d6; border-radius: 18px; overflow: hidden; }
      .card.missing { border-style: dashed; background: #f5f0ea; }
      .card.fail { border-color: #ef4444; }
      .image { width: 100%; height: 260px; object-fit: cover; display: block; background: #ede7df; }
      .missing .image { display: flex; align-items: center; justify-content: center; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
      .meta { padding: 12px; }
      .sku { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 700; }
      .title { margin-top: 8px; font-size: 15px; }
      .status { margin-top: 8px; display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
      .status.ok { color: #186534; }
      .status.missing { color: #7c2d12; }
      .status.fail { color: #991b1b; }
      .review { margin-top: 10px; padding: 6px 8px; border-radius: 999px; background: #fef3c7; color: #92400e; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; display: inline-block; }
      .reason { margin-top: 8px; font-size: 12px; color: #444; }
    </style>
  </head>
  <body>
    <h1>Seed image preview</h1>
    <div class="grid">
      ${results.map((item) => {
        if (!item.imageUrl) {
            return `
                <article class="card missing">
                  <div class="image">MISSING</div>
                  <div class="meta">
                    <div class="sku">${item.sku}</div>
                    <div class="title">${item.title}</div>
                    <div class="status missing">MISSING</div>
                    <div class="reason">${item.reason ?? 'No image mapped in PRODUCT_IMAGES'}</div>
                  </div>
                </article>
              `;
        }

        const reviewMarkup = item.review ? `<div class="review">REVIEW</div>` : '';
        return `
            <article class="card ${item.status.toLowerCase()}">
              <img class="image" src="${item.imageUrl}" alt="${item.alt ?? item.title}" />
              <div class="meta">
                <div class="sku">${item.sku}</div>
                <div class="title">${item.title}</div>
                <div class="status ${item.status.toLowerCase()}">${item.status}</div>
                ${reviewMarkup}
                ${item.reason ? `<div class="reason">${item.reason}</div>` : ''}
              </div>
            </article>
          `;
    }).join('')}
    </div>
  </body>
</html>`;

    await fs.writeFile(previewFile, html, 'utf8');
    console.log(`Preview generated at ${previewFile}`);
}

console.log('Seed image validation results:');
for (const item of results) {
    const state = item.status.toUpperCase();
    const url = item.imageUrl ?? 'MISSING';
    console.log(`${state} ${item.sku} | ${url}`);
}

if (failures.length > 0) {
    console.error('\nSeed image validation failed with the following errors:');
    for (const failure of failures) {
        console.error(`- ${failure}`);
    }
    process.exit(1);
}

console.log(`Validated ${results.length} seed catalog entries successfully.`);
