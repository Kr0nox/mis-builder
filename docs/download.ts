/*// Usage: node download-images.js
// Requires Node 18+ (uses built-in fetch). No dependencies.

//const fs = require('fs/promises');
//const path = require('path');
import {basename, extname, join} from 'path'
import {writeFileSync, mkdirSync} from 'fs'

// ---- Paste your links here ----
const urls = [
  "https://minecraft.wiki/images/Invicon_Poplar_Log.png?bb789",
  "https://minecraft.wiki/images/Invicon_Stripped_Poplar_Log.png?bb789",
  "https://minecraft.wiki/images/Invicon_Poplar_Wood.png?202d9",
  "https://minecraft.wiki/images/Invicon_Stripped_Poplar_Wood.png?bb789",
  "https://minecraft.wiki/images/Invicon_Poplar_Planks.png?bb789",
  "https://minecraft.wiki/images/Invicon_Poplar_Stairs.png?202d9",
  "https://minecraft.wiki/images/Invicon_Poplar_Slab.png?bb789",
  "https://minecraft.wiki/images/Invicon_Poplar_Sign.png?bb789",
  "https://minecraft.wiki/images/Invicon_Poplar_Hanging_Sign.png?202d9",
  "https://minecraft.wiki/images/Invicon_Poplar_Button.png?bb789",
  "https://minecraft.wiki/images/Invicon_Poplar_Pressure_Plate.png?736a7",
  "https://minecraft.wiki/images/Invicon_Poplar_Door.png?754eb",
  "https://minecraft.wiki/images/Invicon_Poplar_Fence.png?bb789",
  "https://minecraft.wiki/images/Invicon_Poplar_Fence_Gate.png?202d9",
  "https://minecraft.wiki/images/Invicon_Poplar_Trapdoor.png?202d9",
  "https://minecraft.wiki/images/Invicon_Poplar_Shelf.png?202d9",
  "https://minecraft.wiki/images/Invicon_Poplar_Boat.png?bb789",
  "https://minecraft.wiki/images/Invicon_Poplar_Boat_with_Chest.png?bb789",
  "https://minecraft.wiki/images/Invicon_Red_Poplar_Leaves.png?202d9",
  "https://minecraft.wiki/images/Invicon_Orange_Poplar_Leaves.png?202d9",
  "https://minecraft.wiki/images/Invicon_Yellow_Poplar_Leaves.png?202d9",
  "https://minecraft.wiki/images/Invicon_Poplar_Sapling.png?202d9",
  "https://minecraft.wiki/images/Invicon_Red_Shrub.png?3fbb4",
  "https://minecraft.wiki/images/Invicon_Shelf_Mushroom.png?efe06",
  "https://minecraft.wiki/images/Invicon_White_Wool_Stairs.png?e89bc",
  "https://minecraft.wiki/images/Invicon_White_Wool_Slab.png?7d58f",
  "https://minecraft.wiki/images/Invicon_White_Cushion.png?70a98",
  "https://minecraft.wiki/images/Invicon_Light_Gray_Wool_Stairs.png?e89bc",
  "https://minecraft.wiki/images/Invicon_Light_Gray_Wool_Slab.png?7d58f",
  "https://minecraft.wiki/images/Invicon_Light_Gray_Cushion.png?9b860",
  "https://minecraft.wiki/images/Invicon_Gray_Wool_Stairs.png?e89bc",
  "https://minecraft.wiki/images/Invicon_Gray_Wool_Slab.png?7d58f",
  "https://minecraft.wiki/images/Invicon_Gray_Cushion.png?7f43c",
  "https://minecraft.wiki/images/Invicon_Black_Wool_Stairs.png?60f20",
  "https://minecraft.wiki/images/Invicon_Black_Wool_Slab.png?7d58f",
  "https://minecraft.wiki/images/Invicon_Black_Cushion.png?410a9",
  "https://minecraft.wiki/images/Invicon_Brown_Wool_Stairs.png?e89bc",
  "https://minecraft.wiki/images/Invicon_Brown_Wool_Slab.png?7d58f",
  "https://minecraft.wiki/images/Invicon_Brown_Cushion.png?b608b",
  "https://minecraft.wiki/images/Invicon_Red_Wool_Stairs.png?e89bc",
  "https://minecraft.wiki/images/Invicon_Red_Wool_Slab.png?7d58f",
  "https://minecraft.wiki/images/Invicon_Red_Cushion.png?6df03",
  "https://minecraft.wiki/images/Invicon_Orange_Wool_Stairs.png?e89bc",
  "https://minecraft.wiki/images/Invicon_Orange_Wool_Slab.png?7d58f",
  "https://minecraft.wiki/images/Invicon_Orange_Cushion.png?9ef34",
  "https://minecraft.wiki/images/Invicon_Yellow_Wool_Stairs.png?e89bc",
  "https://minecraft.wiki/images/Invicon_Yellow_Wool_Slab.png?7d58f",
  "https://minecraft.wiki/images/Invicon_Yellow_Cushion.png?5ef08",
  "https://minecraft.wiki/images/Invicon_Lime_Wool_Stairs.png?e89bc",
  "https://minecraft.wiki/images/Invicon_Lime_Wool_Slab.png?7d58f",
  "https://minecraft.wiki/images/Invicon_Lime_Cushion.png?df49a",
  "https://minecraft.wiki/images/Invicon_Green_Wool_Stairs.png?e89bc",
  "https://minecraft.wiki/images/Invicon_Green_Wool_Slab.png?7d58f",
  "https://minecraft.wiki/images/Invicon_Green_Cushion.png?6947f",
  "https://minecraft.wiki/images/Invicon_Cyan_Wool_Stairs.png?e89bc",
  "https://minecraft.wiki/images/Invicon_Cyan_Wool_Slab.png?7d58f",
  "https://minecraft.wiki/images/Invicon_Cyan_Cushion.png?91926",
  "https://minecraft.wiki/images/Invicon_Light_Blue_Wool_Stairs.png?e89bc",
  "https://minecraft.wiki/images/Invicon_Light_Blue_Wool_Slab.png?7d58f",
  "https://minecraft.wiki/images/Invicon_Light_Blue_Cushion.png?994b3",
  "https://minecraft.wiki/images/Invicon_Blue_Wool_Stairs.png?e89bc",
  "https://minecraft.wiki/images/Invicon_Blue_Wool_Slab.png?7d58f",
  "https://minecraft.wiki/images/Invicon_Blue_Cushion.png?585a1",
  "https://minecraft.wiki/images/Invicon_Purple_Wool_Stairs.png?acddf",
  "https://minecraft.wiki/images/Invicon_Purple_Wool_Slab.png?7d58f",
  "https://minecraft.wiki/images/Invicon_Purple_Cushion.png?b3f03",
  "https://minecraft.wiki/images/Invicon_Magenta_Wool_Stairs.png?e89bc",
  "https://minecraft.wiki/images/Invicon_Magenta_Wool_Slab.png?7d58f",
  "https://minecraft.wiki/images/Invicon_Magenta_Cushion.png?d4543",
  "https://minecraft.wiki/images/Invicon_Pink_Wool_Stairs.png?acddf",
  "https://minecraft.wiki/images/Invicon_Pink_Wool_Slab.png?7d58f",
  "https://minecraft.wiki/images/Invicon_Pink_Cushion.png?f4090",
  "https://minecraft.wiki/images/Invicon_White_Concrete_Stairs.png?c2a89",
  "https://minecraft.wiki/images/Invicon_White_Concrete_Slab.png?c2a89",
  "https://minecraft.wiki/images/Invicon_Light_Gray_Concrete_Stairs.png?8c09f",
  "https://minecraft.wiki/images/Invicon_Light_Gray_Concrete_Slab.png?704e0",
  "https://minecraft.wiki/images/Invicon_Gray_Concrete_Stairs.png?d97fe",
  "https://minecraft.wiki/images/Invicon_Gray_Concrete_Slab.png?c7ccb",
  "https://minecraft.wiki/images/Invicon_Black_Concrete_Stairs.png?a8341",
  "https://minecraft.wiki/images/Invicon_Black_Concrete_Slab.png?8fd3c",
  "https://minecraft.wiki/images/Invicon_Brown_Concrete_Stairs.png?d6b15",
  "https://minecraft.wiki/images/Invicon_Brown_Concrete_Slab.png?d6b15",
  "https://minecraft.wiki/images/Invicon_Red_Concrete_Stairs.png?c77c4",
  "https://minecraft.wiki/images/Invicon_Red_Concrete_Slab.png?c77c4",
  "https://minecraft.wiki/images/Invicon_Orange_Concrete_Stairs.png?d14d0",
  "https://minecraft.wiki/images/Invicon_Orange_Concrete_Slab.png?fd8c2",
  "https://minecraft.wiki/images/Invicon_Yellow_Concrete_Stairs.png?7f1a4",
  "https://minecraft.wiki/images/Invicon_Yellow_Concrete_Slab.png?30cf7",
  "https://minecraft.wiki/images/Invicon_Lime_Concrete_Stairs.png?9107f",
  "https://minecraft.wiki/images/Invicon_Lime_Concrete_Slab.png?8c09f",
  "https://minecraft.wiki/images/Invicon_Green_Concrete_Stairs.png?edf58",
  "https://minecraft.wiki/images/Invicon_Green_Concrete_Slab.png?edf58",
  "https://minecraft.wiki/images/Invicon_Cyan_Concrete_Stairs.png?c7ccb",
  "https://minecraft.wiki/images/Invicon_Cyan_Concrete_Slab.png?36231",
  "https://minecraft.wiki/images/Invicon_Light_Blue_Concrete_Stairs.png?704e0",
  "https://minecraft.wiki/images/Invicon_Light_Blue_Concrete_Slab.png?afafb",
  "https://minecraft.wiki/images/Invicon_Blue_Concrete_Stairs.png?2ca86",
  "https://minecraft.wiki/images/Invicon_Blue_Concrete_Slab.png?a8341",
  "https://minecraft.wiki/images/Invicon_Purple_Concrete_Stairs.png?c0822",
  "https://minecraft.wiki/images/Invicon_Purple_Concrete_Slab.png?82389",
  "https://minecraft.wiki/images/Invicon_Magenta_Concrete_Stairs.png?286ab",
  "https://minecraft.wiki/images/Invicon_Magenta_Concrete_Slab.png?286ab",
  "https://minecraft.wiki/images/Invicon_Pink_Concrete_Stairs.png?82389",
  "https://minecraft.wiki/images/Invicon_Pink_Concrete_Slab.png?d14d0",
  "https://minecraft.wiki/images/Invicon_Straw_Bed.png?db308",
]

const OUTPUT_DIR = './newSprites';
const CONCURRENCY = 5;

const MIME_TO_EXT = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/svg+xml': '.svg',
  'image/avif': '.avif',
  'image/bmp': '.bmp',
};

const usedNames = new Set();

function makeFilename(url, contentType, index) {
  let base = 'image';
  let ext = '';
  try {
    const parsed = new URL(url);
    const last = basename(decodeURIComponent(parsed.pathname));
    ext = extname(last);
    base = basename(last, ext) || 'image';
  } catch {}

  if (!ext) {
    ext = MIME_TO_EXT[(contentType || '').split(';')[0].trim()] || '.img';
  }

  // Strip characters that are unsafe in filenames
  base = base.replace(/[^\w.-]+/g, '_').slice(0, 80);

  const parts = base.split('_').map(p => p.toLowerCase()).map(n => n === 'slab' ? 'slabs' : n).slice(1).join('_')


  let name = `${parts}${ext}`;
  if (usedNames.has(name)) name = `${base}_${index}${ext}`;
  usedNames.add(name);
  return name;
}

async function downloadOne(url, index) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const buffer = Buffer.from(await res.arrayBuffer());
    const name = makeFilename(url, res.headers.get('content-type'), index);
    writeFileSync(join(OUTPUT_DIR, name), buffer);

    console.log(`[${index + 1}/${urls.length}] saved ${name}`);
    return { url, ok: true };
  } catch (err) {
    console.error(`[${index + 1}/${urls.length}] FAILED ${url} (${err.message})`);
    return { url, ok: false };
  }
}

async function main() {
  if (urls.length === 0) {
    console.log('The urls array is empty. Paste your links into it first.');
    return;
  }

  mkdirSync(OUTPUT_DIR);

  // Simple worker pool to limit concurrent downloads
  const results = [];
  let next = 0;
  async function worker() {
    while (next < urls.length) {
      const i = next++;
      results[i] = await downloadOne(urls[i], i);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const failed = results.filter((r) => !r.ok);
  console.log(`\nDone: ${results.length - failed.length} downloaded, ${failed.length} failed.`);
  if (failed.length) {
    console.log('Failed URLs:\n' + failed.map((f) => f.url).join('\n'));
  }
}

main();*/