function updateBrowserInfo() {
    document.getElementById("btnPrompt").addEventListener("click", () => {
        const name = prompt("cómo te llamas?", "alumna");
        if (name !== null) {
            const confirmation = confirm(`Hola ${name}, ¿quieres ver una alerta?`);
            if (confirmation) alert("esta alerta bloquea toda la pestaña hasta que pulses aceptar");
        }
    });

    document.getElementById("btnClock").addEventListener("click", () => {
        let seconds = 5;
        const span = document.getElementById("countdown");
        span.textContent = `Quedan ${seconds}s...`;

        const interval = setInterval(() => {
            seconds--;
            span.textContent = `Quedan ${seconds}s...`;
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            span.textContent = `tiempo agotado`;
        }, 5000);
    });
}

const STORAGE_KEY = "classTasks";
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];

function saveAndRenderTask() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = `${task}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveAndRenderTask();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function init() {
    const form = document.getElementById("formTask");
    const input = document.getElementById("inputTask");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        tasks.push(text);
        input.value = "";
        saveAndRenderTask();
    });

    document.getElementById("btnClear").addEventListener("click", () =>{
        localStorage.removeItem(STORAGE_KEY);
        tasks = [];
        saveAndRenderTask();
    });
}


updateBrowserInfo();
init();
saveAndRenderTask();