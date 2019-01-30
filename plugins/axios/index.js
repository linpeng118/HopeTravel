export default function ({
  $axios,
  redirect
}) {
  // 请求回调
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  // 响应回调
  $axios.onResponse(res => {
    console.log('Making response to ' + res.url)
  })

  // 错误回调
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}