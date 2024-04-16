export async function timeCount(fn, msg) {
   const s = performance.now();
   const o = await fn();
   const e = performance.now() - s;
   //console.info(`time : ${e} ms in ${msg}`);
   return {o,e};
}

export function sampling(fn, numofSampling = 10) {
   const values = [];
   for (let i = 0; i < numofSampling; i++) {
      values.push(timeCount(fn));
   }
   
   // Calculate the average
   const sum = values.reduce((acc, val) => acc + val, 0);
   const average = sum / values.length;

   // Calculate the variance
   const variance = values.reduce((acc, val) => acc + Math.pow(val - average, 2), 0) / values.length;

   console.info(`average: ${average.toFixed(4)} / variance: ${(variance*100).toFixed(2)}% in ${fn.name}`)
}