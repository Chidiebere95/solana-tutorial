const {
  Connection,
  Keypair,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} = require('@solana/web3.js');
const bs58 = require('bs58');

const fromSecretKey =
  '3SV7kzjgpBFvJrBw5V1JbUNGEgYUvXXju8ZqKXr76JtkQY2kHp1qVhzoTsMVBTQeqmS1thp4YTKByBxEvKWidVc5';
const toPublicKey = '77A3ih3WUV4PuA6Ronz3P9Bktz6ej16xwTi9BowNzGwG';
const amountInSol = 0.128;

const transfer = async () => {
  try {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const fromSecretKeyDecoded = bs58.default.decode(fromSecretKey);
    const fromKeypair = Keypair.fromSecretKey(fromSecretKeyDecoded);
    const amounsInLamports = amountInSol * LAMPORTS_PER_SOL;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toPublicKey,
        lamports: amounsInLamports,
      })
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      fromKeypair,
    ]);

    console.log('transaction successful', signature);
  } catch (error) {
    console.log('error', error);
  }
};
transfer();
