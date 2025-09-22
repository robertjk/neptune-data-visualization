// WebWorker handling computational-heavy tasks from the Chart component

type ChartWorkerMessage = string;

self.onmessage = (event: MessageEvent<ChartWorkerMessage>) => {
  console.log(event.data);
};
