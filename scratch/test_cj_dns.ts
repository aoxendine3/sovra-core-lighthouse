import axios from 'axios';
import dns from 'dns';

async function test() {
    console.log('--- DNS LOOKUP ---');
    dns.lookup('api.cj.com', (err, address, family) => {
        if (err) console.error('DNS Lookup Error:', err);
        else console.log(`DNS Resolved: ${address} (IPv${family})`);
    });

    console.log('\n--- AXIOS FETCH ---');
    try {
        const res = await axios.get('https://api.cj.com/v2/earnings', { timeout: 5000 });
        console.log('Axios Success Status:', res.status);
    } catch (e: any) {
        console.error('Axios Error:', e.message);
        if (e.code) console.error('Error Code:', e.code);
    }
}

test();
