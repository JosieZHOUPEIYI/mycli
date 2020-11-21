// 管理用户输入
const program = require('commander')
program
  .command('init')
  .alias('i')
  .description('生成模板')
  .action(() => {
    require('../cmd/init')()
  })
program
  .command('add')
  .alias('a')
  .description('生成模板')
  .action(() => {
    // require('../cmd/add')()
  })

program.parse(process.argv)
if (!program.args.length) {
  program.help()
}