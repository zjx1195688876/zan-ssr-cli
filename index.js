#!/usr/bin/env node

const path = require('path');
const clone = require('git-clone-promise');
const program = require('commander');
const shell = require('shelljs');
const color = require('colors-cli');

program
  .version(require('./package').version)
  .command('create [projectName]') // 命名命令，可选参数projecName,传入action函数第一个参数
  .alias('c') // 命令简写
  .description('构建youzan ssr模板项目')
  .option('-t, --type [type]',  '选择SSR模版 simple/muti', /^(simple|muti)$/i, 'simple') // 可选参数，只能传入指定值，默认'simple'
  .action(function (projectName = 'test-project', options) { // 执行命令的的函数
    let pwd = shell.pwd();
    let localpath = path.join(pwd.toString(), projectName);
    const { type } = options;
    const PROJECT = {
      simple: 'git@github.com:zjx1195688876/astroboy-ssr-simple.git',
      muti: 'git@github.com:zjx1195688876/astroboy-ssr-muti-extend.git'
    };
    console.log(color.yellow('创建模版中，请稍后...'));
    clone(PROJECT[type], localpath).then(res => {
      shell.rm('-rf', path.join(localpath, '.git'));
      console.log(color.blue('模板工程建立完成'));
    });
  });

program
  .on('--help', () => {
    console.log('');
    console.log(color.green('-------------------------------------------------------------------'));
    console.log(color.green(`| 创建(SPA / MUTI PAGE)工程:                                      |`));
    console.log(color.green(`|                                                                 |`));
    console.log(color.green(`| 1. zan-ssr create 工程名称 -t simple // 创建一个SPA SSR模版     |`));
    console.log(color.green(`|                                                                 |`));
    console.log(color.green(`| 2. zan-ssr create 工程名称 -t muti // 创建一个MUTI PAGE SSR模版 |`));
    console.log(color.green('-------------------------------------------------------------------'));
  });

program.parse(process.argv);
