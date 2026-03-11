document.getElementById('helloBtn').addEventListener('click', () => {
  const name = document.getElementById('nameInput').value;
  document.getElementById('message').textContent = `Hello, ${name}!`;
});
