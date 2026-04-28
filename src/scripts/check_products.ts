import { SOVRADB } from '../../agency/lib/db/SOVRADB.ts';
import * as dotenv from 'dotenv';

dotenv.config();

async function checkProducts() {
    const db = await SOVRADB.getInstance();
    const { rows } = await db.pool.query('SELECT * FROM sovra_products');
    console.log('Current Products in DB:', rows);
    process.exit(0);
}

checkProducts();
