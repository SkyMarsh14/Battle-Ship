export default function generateGameboard(container) {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell", `index${i}`);
    container.append(cell);
  }
}
