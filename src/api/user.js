// import request from "@/utils/request"

export async function login(data) {
  const { username } = data
  return { data: { token: username } }
  // TODO real request
  // return request({
  //   url: "/user/login",
  //   method: "post",
  //   data,
  // })
}

export async function getInfo(token) {
  await new Promise((r) =>
    setTimeout(() => {
      r()
    }, 1000)
  )
  return { data: { name: token } }
  // TODO real request
  // return request({
  //   url: "/user/login",
  //   method: "post",
  //   data,
  // })
  // return request({
  //   url: "/user/info",
  //   method: "get",
  //   params: { token },
  // })
}

export function logout() {
  return new Promise((r) =>
    setTimeout(() => {
      r()
    }, 100)
  )
  //TODO real request
  // return request({
  //   url: "/user/logout",
  //   method: "post",
  // })
}
