import type { SeedImage } from './types.js';

// NOTE: URLs de Unsplash (licencia Unsplash). Hotlinking permitido por la plataforma.
export const PRODUCT_IMAGES: Record<string, SeedImage> = {
    'MEN-SHI-001': { url: 'https://images.unsplash.com/photo-1693443688057-85f57b872a3c?auto=format&fit=crop&w=900&q=80', alt: 'Northline Linen Shirt detail', source: 'unsplash' },
    'MEN-SHI-002': { url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80', alt: 'Aster Everyday Tee front view', source: 'unsplash' },
    'MEN-JAC-003': { url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80', alt: 'ModeaVelour bomber jacket', source: 'unsplash' },
    'MEN-JAC-004': { url: 'https://images.unsplash.com/photo-1548883354-d056ab7b441f?auto=format&fit=crop&w=900&q=80', alt: 'Aster Wool Field Jacket', source: 'unsplash' },
    'MEN-SHO-004': { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80', alt: 'Northline Runner profile', source: 'unsplash', review: 'Possible visible logo on the side; review needed before final approval.' },
    'MEN-WAT-005': { url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80', alt: 'Aster Chrono Watch on wrist', source: 'unsplash' },
    'WOM-SHI-006': { url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80', alt: 'ModeaVelour soft knit blouse', source: 'unsplash' },
    'WOM-SHI-007': { url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', alt: 'Northline flow shirt', source: 'unsplash' },
    'WOM-JAC-008': { url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80', alt: 'Aster trench coat', source: 'unsplash' },
    'WOM-BAG-009': { url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80', alt: 'Northline tote handbag', source: 'unsplash' },
    'WOM-WAT-010': { url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80', alt: 'ModeaVelour watch on wrist', source: 'unsplash' },
    'KID-SHI-011': { url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80', alt: 'Aster Kids Graphic Tee', source: 'unsplash' },
    'KID-SHI-012': { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80', alt: 'Northline Kids Tee', source: 'unsplash' },
    'KID-JAC-013': { url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80', alt: 'ModeaVelour kids puffer', source: 'unsplash' },
    // REVIEW: Aster Kids Cap photographed on an adult model; a child-facing frame may be preferred.
    'KID-CAP-014': { url: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&w=900&q=80', alt: 'Aster Kids Cap', source: 'unsplash', review: 'Aster Kids Cap photographed on an adult model; a child-facing composition should be reviewed if preferred.' },
    'KID-SHO-015': { url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=900&q=80', alt: 'Northline kids sneakers', source: 'unsplash' },
    'KID-BAG-016': { url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80', alt: 'ModeaVelour mini bag', source: 'unsplash' },
    'WOM-SHO-018': { url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80', alt: 'Northline Street Sneaker', source: 'unsplash', review: 'Review the heel and side profile for logo clarity and the final shoe angle.' },

    // ---------- MEN ----------
    'MEN-SHI-003': { url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80', alt: 'Northline Overshirt', source: 'unsplash' },
    'MEN-JAC-005': { url: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80', alt: 'Northline Utility Layer', source: 'unsplash' },
    'MEN-SHO-007': { url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80', alt: 'Aster Street Sneaker', source: 'unsplash' },
    'MEN-SHO-008': { url: 'https://images.unsplash.com/photo-1726133731483-d4b8bcabeb43?auto=format&fit=crop&w=900&q=80', alt: 'ModeaVelour City Runner', source: 'unsplash' },
    'MEN-CAP-010': { url: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80', alt: 'Aster Cap', source: 'unsplash' },
    'MEN-CAP-011': { url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80', alt: 'Northline Travel Cap', source: 'unsplash' },
    'MEN-CAP-012': { url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80', alt: 'ModeaVelour Studio Cap', source: 'unsplash' },
    'MEN-BAG-013': { url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80', alt: 'Northline Weekday Tote', source: 'unsplash' },
    'MEN-BAG-014': { url: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=900&q=80', alt: 'ModeaVelour Mini Carrier', source: 'unsplash' },
    'MEN-BAG-015': { url: 'https://images.unsplash.com/photo-1667411424594-403300e5cc35?auto=format&fit=crop&w=900&q=80', alt: 'Aster City Sling', source: 'unsplash' },
    'MEN-WAT-016': { url: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=80', alt: 'Northline Dress Watch', source: 'unsplash' },
    'MEN-WAT-017': { url: 'https://images.unsplash.com/photo-1557531365-e8b22d93dbd0?auto=format&fit=crop&w=900&q=80', alt: 'ModeaVelour Everyday Watch', source: 'unsplash' },

    // ---------- WOMEN ----------
    'WOM-SHI-019': { url: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80', alt: 'Aster Seamless Linen', source: 'unsplash' },
    'WOM-JAC-022': { url: 'https://images.unsplash.com/photo-1636529109797-0749811c4916?auto=format&fit=crop&w=900&q=80', alt: 'Northline Reversible Layer', source: 'unsplash' },
    'WOM-JAC-023': { url: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=900&q=80', alt: 'ModeaVelour Soft Shell', source: 'unsplash' },
    'WOM-SHO-025': { url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80', alt: 'Aster Everyday Sneaker', source: 'unsplash' },
    'WOM-SHO-026': { url: 'https://images.unsplash.com/photo-1613972798457-45fc5237ae32?auto=format&fit=crop&w=900&q=80', alt: 'ModeaVelour Recovery Runner', source: 'unsplash' },
    'WOM-CAP-028': { url: 'https://images.unsplash.com/photo-1560774358-d727658f457c?auto=format&fit=crop&w=900&q=80', alt: 'Northline Day Cap', source: 'unsplash' },
    'WOM-CAP-029': { url: 'https://images.unsplash.com/photo-1628753611124-5d20c4f3e177?auto=format&fit=crop&w=900&q=80', alt: 'ModeaVelour Soft Crown', source: 'unsplash' },
    'WOM-CAP-030': { url: 'https://images.unsplash.com/photo-1661983229504-c545e360f930?auto=format&fit=crop&w=900&q=80', alt: 'Aster Utility Cap', source: 'unsplash' },
    'WOM-BAG-031': { url: 'https://images.unsplash.com/photo-1473188588951-666fce8e7c68?auto=format&fit=crop&w=900&q=80', alt: 'ModeaVelour Leather Satchel', source: 'unsplash' },
    'WOM-BAG-032': { url: 'https://images.unsplash.com/photo-1760624294514-3548bee70d26?auto=format&fit=crop&w=900&q=80', alt: 'Aster Everyday Crossbody', source: 'unsplash' },
    'WOM-WAT-034': { url: 'https://images.unsplash.com/photo-1506193095-80bc749473f2?auto=format&fit=crop&w=900&q=80', alt: 'Aster Leather Time', source: 'unsplash' },
    'WOM-WAT-035': { url: 'https://images.unsplash.com/photo-1616928231359-fc8b7e244c3b?auto=format&fit=crop&w=900&q=80', alt: 'Northline Minimal Watch', source: 'unsplash' },

    // ---------- KIDS ----------
    'KID-SHI-037': { url: 'https://images.unsplash.com/photo-1761615676196-f519281e10d6?auto=format&fit=crop&w=900&q=80', alt: 'ModeaVelour Kids Stripe Tee', source: 'unsplash' },
    'KID-JAC-040': { url: 'https://images.unsplash.com/photo-1589579049385-750bc38dd833?auto=format&fit=crop&w=900&q=80', alt: 'Aster Kids Denim Layer', source: 'unsplash' },
    'KID-JAC-041': { url: 'https://images.unsplash.com/photo-1547954569-06aabe3b39b1?auto=format&fit=crop&w=900&q=80', alt: 'Northline Kids Windbreaker', source: 'unsplash' },
    'KID-SHO-043': { url: 'https://images.unsplash.com/photo-1584564515943-b54cbb61836b?auto=format&fit=crop&w=900&q=80', alt: 'Aster Kids Runner', source: 'unsplash' },
    'KID-SHO-044': { url: 'https://images.unsplash.com/photo-1742390671647-bc9c5399fdf3?auto=format&fit=crop&w=900&q=80', alt: 'ModeaVelour Kids Street Sneaker', source: 'unsplash' },
    'KID-CAP-046': { url: 'https://images.unsplash.com/photo-1565795675658-668e0924df8b?auto=format&fit=crop&w=900&q=80', alt: 'Northline Kids Sport Cap', source: 'unsplash' },
    'KID-CAP-047': { url: 'https://images.unsplash.com/photo-1732041101434-7dc72bd24a18?auto=format&fit=crop&w=900&q=80', alt: 'ModeaVelour Kids Cap', source: 'unsplash' },
    'KID-BAG-049': { url: 'https://images.unsplash.com/photo-1669906858295-66661469bfb4?auto=format&fit=crop&w=900&q=80', alt: 'Northline Carry Tote', source: 'unsplash' },
    'KID-BAG-050': { url: 'https://images.unsplash.com/photo-1657296177449-8854b68537fb?auto=format&fit=crop&w=900&q=80', alt: 'Aster Mini Backpack', source: 'unsplash' },
    'KID-WAT-052': { url: 'https://images.unsplash.com/photo-1535449425-adc6f5faa71c?auto=format&fit=crop&w=900&q=80', alt: 'Aster Kids Watch', source: 'unsplash' },
    'KID-WAT-053': { url: 'https://images.unsplash.com/photo-1566879873726-77fda17417c9?auto=format&fit=crop&w=900&q=80', alt: 'Northline Kids Time', source: 'unsplash' },
    'KID-WAT-054': { url: 'https://images.unsplash.com/photo-1590003168385-8dd2c82fdbfd?auto=format&fit=crop&w=900&q=80', alt: 'ModeaVelour Kids Watch', source: 'unsplash' },
};

export const SEED_IMAGE_MAP = PRODUCT_IMAGES;
export const SEED_IMAGE_KEYS = Object.keys(SEED_IMAGE_MAP);
