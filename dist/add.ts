/*import { writeFileSync } from 'fs';

export interface Color {
  rgb: [number, number, number];
  hsl: [number, number, number];
  hex: string;
}

interface Item {
  id: string;
  name: string;
  sprite: string;
  color: Color;
  category: string[];
  group: string[];
  material: string;
}

const colors = ['white',
'Light Gray',
'Gray',
'Black',
'Brown',
'Red',
'Orange',
'Yellow',
'Lime',
'Green',
'Cyan',
'Light Blue',
'Blue',
'Purple',
'Magenta',
'Pink'].map(c => c.toLowerCase().replaceAll(' ', '_'))

const newItemNames = colors.flatMap(c => [c + '_cushion', c + '_wool_slabs', c + '_wool_stairs', c + '_concrete_stairs', c + '_concrete_slabs'])

newItemNames.push('stripped_poplar_log', 'stripped_poplar_wood', 'red_poplar_leaves','orange_poplar_leaves','yellow_poplar_leaves', 'straw_bed', 'red_shrub', 'shelf_mushroom')
newItemNames.push(...['_log', '_wood',  '_planks', '_stairs', '_slabs', '_fence', '_fence_gate', '_door', '_trapdoor', '_pressure_plate', '_button', '_sapling', '_shelf', '_sign', '_hanging_sign', '_boat', '_chest_boat'].map(n => 'poplar'+ n))

const actualItems: Item[] = newItemNames.map(n => ({
  id: n,
  category: [],
  material: '',
  group: [],
  color: {rgb: [0,0,0], hsl: [0,0,0], hex: '#000000'},
  sprite: 'newSprites/' + n + '.png',
  name: n.split('_').map(titleCaseWord).join(' ')
}))

function titleCaseWord(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

writeFileSync('newItems.json', JSON.stringify(actualItems))*/