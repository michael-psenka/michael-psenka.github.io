// Update copyright year automatically
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector("footer");
    if (footer) {
        const year = new Date().getFullYear();
        footer.innerHTML = `&copy; ${year} Michael Psenka`;
    }

    const canvas = document.querySelector("#life-background");
    if (!canvas) return;

    const context = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    );
    const labsSeed = [
        "#... .##. ###. .###",
        "#... #..# ...# #...",
        "#... #..# .##. .##.",
        "#... ##.# ...# ...#",
        ".### #..# ..#. ###.",
    ];

    let columns;
    let rows;
    let cellSize;
    let cells;
    let animationFrame;
    let lastStep = 0;

    const seed = () => {
        cells = new Uint8Array(columns * rows);
        const startX = Math.max(0, Math.floor((columns - labsSeed[0].length) / 2));
        const startY = Math.max(0, Math.floor((rows - labsSeed.length) / 2));

        labsSeed.forEach((line, row) => {
            [...line].forEach((cell, column) => {
                if (cell === "#") {
                    cells[(startY + row) * columns + startX + column] = 1;
                }
            });
        });
    };

    const draw = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = getComputedStyle(document.documentElement)
            .getPropertyValue("--fg")
            .trim();

        for (let row = 0; row < rows; row += 1) {
            for (let column = 0; column < columns; column += 1) {
                if (cells[row * columns + column]) {
                    context.fillRect(
                        column * cellSize,
                        row * cellSize,
                        cellSize - 1,
                        cellSize - 1,
                    );
                }
            }
        }
    };

    const step = () => {
        const next = new Uint8Array(cells.length);

        for (let row = 0; row < rows; row += 1) {
            for (let column = 0; column < columns; column += 1) {
                let neighbors = 0;
                for (let y = -1; y <= 1; y += 1) {
                    for (let x = -1; x <= 1; x += 1) {
                        if (x === 0 && y === 0) continue;
                        const neighborRow = row + y;
                        const neighborColumn = column + x;
                        if (
                            neighborRow >= 0 &&
                            neighborRow < rows &&
                            neighborColumn >= 0 &&
                            neighborColumn < columns
                        ) {
                            neighbors +=
                                cells[neighborRow * columns + neighborColumn];
                        }
                    }
                }

                const index = row * columns + column;
                next[index] =
                    neighbors === 3 || (cells[index] && neighbors === 2) ? 1 : 0;
            }
        }

        cells = next;
    };

    const resize = () => {
        const scale = window.devicePixelRatio || 1;
        cellSize = Math.max(14, Math.min(28, Math.floor(window.innerWidth / 30)));
        columns = Math.ceil(window.innerWidth / cellSize);
        rows = Math.ceil(window.innerHeight / cellSize);
        canvas.width = Math.ceil(window.innerWidth * scale);
        canvas.height = Math.ceil(window.innerHeight * scale);
        context.setTransform(scale, 0, 0, scale, 0, 0);
        seed();
        draw();
    };

    const animate = (time) => {
        if (time - lastStep >= 500) {
            step();
            draw();
            lastStep = time;
        }
        animationFrame = requestAnimationFrame(animate);
    };

    const updateMotion = () => {
        cancelAnimationFrame(animationFrame);
        if (!prefersReducedMotion.matches) {
            lastStep = performance.now();
            animationFrame = requestAnimationFrame(animate);
        }
    };

    resize();
    updateMotion();
    window.addEventListener("resize", resize);
    prefersReducedMotion.addEventListener("change", updateMotion);
    document.addEventListener("click", (event) => {
        const clickedColumn = Math.floor(event.clientX / cellSize);
        const clickedRow = Math.floor(event.clientY / cellSize);

        for (let row = clickedRow - 1; row <= clickedRow + 1; row += 1) {
            for (let column = clickedColumn - 1; column <= clickedColumn + 1; column += 1) {
                if (row >= 0 && row < rows && column >= 0 && column < columns) {
                    cells[row * columns + column] = Math.random() < 0.5 ? 1 : 0;
                }
            }
        }

        draw();
    });
});
