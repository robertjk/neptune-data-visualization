# Neptune Data Visualization

Application for displaying plots of simple (x, y) numerical data. The plots can be animated.

## Setup

### Prerequisites

You need to have [Bun](https://bun.com/) installed.

### Install dependencies

```bash
$ bun install
```

## Instructions

### Start the app

1. Run a server with the application:
   ```bash
   $ bun run dev
   ```
2. Open [http://localhost:5173/](http://localhost:5173) to see the app.

### Load data

Then load some data using _Browse file_ button. Inside the repository there is a file you can use for testing purposes:
[data-example.1M.csv](https://github.com/robertjk/neptune-data-visualization/blob/master/data-example.1M.csv).

### Plot and animation

After the data is loaded, the plot is being rendered. You can animate it by pressing _Start_ button. Pressing it again will
pause the animation.

The parameters of the plot and animation are adjustable using 4 controls:

- _Data window size (N)_ - How many data rows are displayed in the plot window
- _Data start index (S)_ - Index of first (leftmost) displayed data row
- _Refresh time (T)_ - Time interval in ms for updating animation frames (FPS = 1000 / T)
- _Refresh index shift (P)_ - Amount of data rows which is shifted (moved to the right) each
  animation frame
