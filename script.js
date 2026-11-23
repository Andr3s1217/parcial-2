/* Busca y devuelve un elemento del documento a partir de su identificador. */
const byId = (id) => document.getElementById(id);

/* Convierte un valor a una representación legible y evita decimales innecesarios. */
function formatNumber(value, maximumDecimals = 2) {
  return new Intl.NumberFormat("es", { maximumFractionDigits: maximumDecimals }).format(value);
}

/* Muestra un mensaje normal o de error en la zona de resultados correspondiente. */
function showResult(id, message, isError = false) {
  const output = byId(id);
  output.textContent = message;
  output.classList.toggle("is-error", isError);
}

/* Lee un campo numérico y comprueba que se haya ingresado un valor finito. */
function readNumber(id) {
  const input = byId(id);
  const value = input.value.trim() === "" ? Number.NaN : input.valueAsNumber;
  if (!Number.isFinite(value)) {
    input.focus();
    return null;
  }
  return value;
}

/* Calcula el cubo del número ingresado y comunica el resultado. */
byId("cube-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const number = readNumber("cube-number");
  if (number === null) return showResult("cube-result", "Escribe un número válido para calcular su cubo.", true);
  showResult("cube-result", `El cubo de ${formatNumber(number)} es: ${formatNumber(number ** 3)}.`);
});

/* Calcula el área del triángulo con la fórmula (base × altura) ÷ 2. */
byId("triangle-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const base = readNumber("triangle-base");
  const height = readNumber("triangle-height");
  if (base === null || height === null) return showResult("triangle-result", "Ingresa una base y una altura válidas.", true);
  if (base < 0 || height < 0) return showResult("triangle-result", "La base y la altura deben ser valores positivos.", true);
  const area = (base * height) / 2;
  showResult("triangle-result", `El área del triángulo es: ${formatNumber(area)} m².`);
});

/* Valida el nombre, promedia las tres calificaciones y muestra ambas cosas. */
byId("average-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const student = byId("student-name").value.trim();
  const grades = ["grade-one", "grade-two", "grade-three"].map(readNumber);
  if (!student) {
    byId("student-name").focus();
    return showResult("average-result", "Escribe el nombre del estudiante.", true);
  }
  if (grades.some((grade) => grade === null)) return showResult("average-result", "Ingresa las tres calificaciones como números válidos.", true);
  const average = grades.reduce((total, grade) => total + grade, 0) / grades.length;
  showResult("average-result", `El promedio de ${student} es: ${formatNumber(average)} puntos.`);
});

/* Compara los dos números y calcula la diferencia, incluso cuando son iguales. */
byId("compare-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const first = readNumber("compare-first");
  const second = readNumber("compare-second");
  if (first === null || second === null) return showResult("compare-result", "Ingresa dos números válidos para compararlos.", true);
  const greater = Math.max(first, second);
  const lesser = Math.min(first, second);
  const difference = greater - lesser;
  if (difference === 0) {
    return showResult("compare-result", `Ambos números son iguales (${formatNumber(first)}); la diferencia es 0.`);
  }
  showResult("compare-result", `El número mayor es ${formatNumber(greater)}, el menor es ${formatNumber(lesser)}, y su diferencia es ${formatNumber(difference)}.`);
});
