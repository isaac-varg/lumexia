
export async function register() {
  // We only want to schedule this on the server side, not edge/client
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Dynamically import to avoid bundling issues
    const cron = await import('node-cron');

    /*
    cron.schedule('* * * * *', async () => {

      await completePurchaseOrders()
    });
    */
  }
}
