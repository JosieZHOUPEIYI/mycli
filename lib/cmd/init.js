// 初始化一个模板
// 操作命令行，获取用户输入
// 拉仓库代码，创建项目目录
const co = require('co')//同步管理命令
const prompt = require('co-prompt')
const ora = require('ora')
const loading = ora('正在生成...')
const exec = require('child_process').exec
const template = require('../../template.json')
module.exports = () => {
  co(function* () {
    const tmpName = yield prompt('请输入模板名：')
    const programName = yield prompt('请输入项目名：')
    if (!template[tmpName]) {
      console.log('模板不存在')
      process.exit()
    }
    return new Promise(res => {
      res({
        tmpName,
        programName,
        ...template[tmpName]
      })
    })
  }).then(settmp)
}

const settmp = (res) => {
  const { url, tmpName, programName, branch } = res
  loading.start()
  const cmdStr = `git clone ${url} ${programName} && cd ${programName} && git checkout ${branch}`
  exec(cmdStr, (err) => {
    if (err) {
      console.log(err, '下载失败，请重试')
      process.exit()
    }
    loading.stop()
    console.log('初始化成功')
    process.exit()
  })
}