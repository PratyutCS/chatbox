const cookieString = document.cookie;
const cookies = cookieString.split(';');
let email="";
for (let i = 0; i < cookies.length; i++) {
  const cookie = cookies[i].trim();
  if (cookie.startsWith('email=')) {
    email = cookie.substring(6);
  }
}
document.querySelector(".head").innerHTML="Welcome "+email+" to your dashboard!";