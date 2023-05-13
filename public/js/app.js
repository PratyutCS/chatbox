// static/app.js
const socket = io()
const chat = document.querySelector('.chat-form')
const chatInput = document.querySelector('.chat-input')

const cookieString = document.cookie;
const cookies = cookieString.split(';');
let email="";
for (let i = 0; i < cookies.length; i++) {
  const cookie = cookies[i].trim();
  if (cookie.startsWith('email=')) {
    email = cookie.substring(6);
  }
}
document.querySelector(".heading").innerHTML="Welcome "+email+" to your dashboard!";

chat.addEventListener('submit', e => {
  e.preventDefault();
  if((chatInput.value).trim() === ''){
    return;
  }
  let text=email+":"+chatInput.value.trim();
  socket.emit('chat', text)
  chatInput.value = ''
})
const client_dump = document.querySelector('.client_dump')
const user_dump = document.querySelector('.user_dump')
const render = ({message, id}) => {
  const div = document.createElement('div')
  const div2 = document.createElement('div')
  const txt = document.createElement('h5')
  let text=message;
  let text1=text.split(":");
  div2.classList.add('free')
  if (id === socket.id) {
    txt.innerHTML = text1[1];
    div.classList.add('chat-client_div')
    txt.classList.add('chat-message--user')
    div.appendChild(txt)
    user_dump.appendChild(div)
    // console.log(div.offsetHeight);
    div2.style.height=div.offsetHeight+"px";
    client_dump.appendChild(div2)
  }
  else{
    txt.innerHTML = text1[0]+" :: "+text1[1];
    div.classList.add('chat-user_div')
    txt.classList.add('chat-message--client')
    div.appendChild(txt)
    client_dump.appendChild(div)
    // console.log(div.offsetHeight);
    div2.style.height=div.offsetHeight+"px";
    user_dump.appendChild(div2)
  }
}
socket.on('chat', data => {
  render(data)
})