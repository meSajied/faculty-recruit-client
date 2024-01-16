import axios from "axios";

export async function getJobList(url) {
  return await axios.get(url).then(r => {
    return r.data;
  });
}

export async function getUserLoginDatafromUrl(user) {
  return await axios.get('http://localhost:4414/account/applicant/login', {
    params: user,
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(r => {
    return r.data;
  })
}

export async function createUserAccount(user, url) {
  return await axios.post(url, user).then(r => {
    return r.data;
  });
}