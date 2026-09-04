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
    const colorPalette = [
        "#ffbded",
        "#81a0f2",
        "#6b4742",
        "#a0d7fe",
        "#ffebc2",
        "#b7e6b0",
    ];
    const initialColor = "#8a8a8a";

    let columns;
    let rows;
    let cellSize;
    let cells;
    let cellColors;
    let animationFrame;
    let lastStep = 0;
    let hasStarted = false;

    const seed = () => {
        cells = new Uint8Array(columns * rows);
        cellColors = new Uint8Array(columns * rows);
        const startX = Math.max(
            0,
            Math.floor((columns - labsSeed[0].length) / 2),
        );
        const startY = Math.max(0, Math.floor((rows - labsSeed.length) / 2));

        labsSeed.forEach((line, row) => {
            [...line].forEach((cell, column) => {
                if (cell === "#") {
                    cells[(startY + row) * columns + startX + column] = 1;
                }
            });
        });
    };

    const randomColor = () =>
        Math.floor(Math.random() * colorPalette.length) + 1;

    const showClickEffect = (x, y) => {
        const directions = [
            [0, -42],
            [42, 0],
            [0, 42],
            [-42, 0],
        ];

        directions.forEach(([offsetX, offsetY]) => {
            const particle = document.createElement("span");
            particle.className = "life-click-particle";
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.setProperty("--scatter-x", `${offsetX}px`);
            particle.style.setProperty("--scatter-y", `${offsetY}px`);
            particle.addEventListener("animationend", () => particle.remove(), {
                once: true,
            });
            document.body.append(particle);
        });
    };

    const draw = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let row = 0; row < rows; row += 1) {
            for (let column = 0; column < columns; column += 1) {
                const index = row * columns + column;
                if (cells[index]) {
                    context.fillStyle =
                        cellColors[index] === 0
                            ? initialColor
                            : colorPalette[cellColors[index] - 1];
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
        const nextColors = new Uint8Array(cellColors.length);

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
                const survives =
                    cells[index] && (neighbors === 2 || neighbors === 3);
                const isBorn = !cells[index] && neighbors === 3;
                next[index] = survives || isBorn ? 1 : 0;
                nextColors[index] = survives
                    ? cellColors[index]
                    : isBorn
                      ? randomColor()
                      : 0;
            }
        }

        cells = next;
        cellColors = nextColors;
    };

    const resize = () => {
        const scale = window.devicePixelRatio || 1;
        cellSize = Math.max(
            14,
            Math.min(28, Math.floor(window.innerWidth / 30)),
        );
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
            hasStarted = true;
            lastStep = performance.now() - 500;
            animationFrame = requestAnimationFrame(animate);
        }
    };

    resize();
    window.addEventListener("resize", resize);
    prefersReducedMotion.addEventListener("change", updateMotion);
    window.setTimeout(updateMotion, 2000);
    document.addEventListener("click", (event) => {
        if (!hasStarted) return;

        showClickEffect(event.clientX, event.clientY);
        const clickedColumn = Math.floor(event.clientX / cellSize);
        const clickedRow = Math.floor(event.clientY / cellSize);

        for (let row = clickedRow - 1; row <= clickedRow + 1; row += 1) {
            for (
                let column = clickedColumn - 1;
                column <= clickedColumn + 1;
                column += 1
            ) {
                if (row >= 0 && row < rows && column >= 0 && column < columns) {
                    const index = row * columns + column;
                    const wasAlive = cells[index] === 1;
                    const isAlive = Math.random() < 0.5;
                    cells[index] = isAlive ? 1 : 0;
                    cellColors[index] = isAlive
                        ? wasAlive
                            ? cellColors[index]
                            : randomColor()
                        : 0;
                }
            }
        }

        draw();
    });
});
