const { Keypair } = require('@solana/web3.js');
const { derivePath } = require('ed25519-hd-key');
const bip39 = require('bip39');
const bs58 = require('bs58');

const deriveWalletsHd = async () => {
  const mnemonic = bip39.generateMnemonic();
  console.log('mnemonic', mnemonic);

  const seed = bip39.mnemonicToSeedSync(mnemonic);

  for (let i = 0; i < 10; i++) {
    const path = `m/44'/501'/${i}'/0'`;
    const derivedSeed = derivePath(path, seed.toString('hex')).key;

    const keypair = Keypair.fromSeed(derivedSeed);
    const publicKey = keypair.publicKey.toBase58();
    const secretKey = bs58.default.encode(keypair.secretKey);

    console.log(`Public key ${i}:`, publicKey);
    console.log(`Secretkey key ${i}:`, secretKey);
    console.log('-----------------------------------------');
  }
};
deriveWalletsHd();
