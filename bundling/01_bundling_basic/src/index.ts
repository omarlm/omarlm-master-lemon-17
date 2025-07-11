import './styles.scss';

const appDiv: HTMLElement | null = document.getElementById('app');

if (appDiv) {
    appDiv.innerHTML = `
        <h1 class="title">Hello World!</h1>
        <img src="/lemoncode.png" alt="Logo" class="logo">
    `;
}
