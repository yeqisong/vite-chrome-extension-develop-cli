'use strict';

var commander = require('commander');
var inquirer = require('inquirer');
var fs = require('fs-extra');
var osLocale = require('os-locale');
var chalk = require('chalk');
var fs$1 = require('fs');
var path = require('path');
var download = require('download-git-repo');
var ora = require('ora');
var Metalsmith = require('metalsmith');
var Handlebars = require('handlebars');
var spawn = require('cross-spawn');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var commander__default = /*#__PURE__*/_interopDefaultLegacy(commander);
var inquirer__default = /*#__PURE__*/_interopDefaultLegacy(inquirer);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var osLocale__default = /*#__PURE__*/_interopDefaultLegacy(osLocale);
var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);
var download__default = /*#__PURE__*/_interopDefaultLegacy(download);
var ora__default = /*#__PURE__*/_interopDefaultLegacy(ora);
var Metalsmith__default = /*#__PURE__*/_interopDefaultLegacy(Metalsmith);
var Handlebars__default = /*#__PURE__*/_interopDefaultLegacy(Handlebars);
var spawn__default = /*#__PURE__*/_interopDefaultLegacy(spawn);

var name$1 = "vite-chrome-extension-develop-cli";
var version$1 = "1.0.0";
var description = "Quickly build the basic project structure of chrome extension development.";
var main = "libs/index.js";
var scripts = {
	build: "rollup -c",
	watch: "rollup -c --watch",
	test: "echo \"Error: no test specified\" && exit 1"
};
var bin = {
	crx: "bin/index.js"
};
var keywords = [
	"chrome extension develop",
	"vite2",
	"manifest v3"
];
var author = "yeqisong";
var license = "MIT";
var dependencies = {
	chalk: "^4.1.1",
	commander: "^7.2.0",
	"cross-spawn": "^7.0.3",
	"download-git-repo": "^3.0.2",
	"fs-extra": "^10.0.0",
	handlebars: "^4.7.7",
	inquirer: "^8.1.0",
	metalsmith: "^2.3.0",
	ora: "^5.4.1",
	"os-locale": "^5.0.0",
	path: "^0.12.7",
	prettier: "2.3.1"
};
var devDependencies = {
	rollup: "^2.51.1",
	"@rollup/plugin-babel": "^5.3.0",
	"@rollup/plugin-commonjs": "^19.0.0",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "^13.0.0",
	eslint: "^7.28.0",
	"eslint-plugin-prettier": "^3.4.0"
};
var require$$0 = {
	name: name$1,
	version: version$1,
	description: description,
	main: main,
	scripts: scripts,
	bin: bin,
	keywords: keywords,
	author: author,
	license: license,
	dependencies: dependencies,
	devDependencies: devDependencies
};

/**
 * 当前系统语言
 */

const osLocaleSync = () => osLocale__default['default'].sync();
/**
 * 检查文件或目录是否存在且可操作
 * @param {*} sdir
 */

const canDo = sdir => {
  try {
    fs__default['default'].accessSync(sdir, fs__default['default'].constants.R_OK | fs__default['default'].constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
};
/**
 * 是否是目录
 */

const isDir = sdir => {
  if (canDo(sdir)) {
    return fs__default['default'].lstatSync(sdir).isDirectory();
  }

  return false;
};
/**
 * 是否是空目录
 * @param {*} sdir 
 * @returns true是
 */

const isEmptyDir = sdir => {
  if (!isDir(sdir)) {
    return false;
  } // 如果是空目录


  try {
    const fls = fs__default['default'].readdirSync(sdir);

    if (!fls.length) {
      return true;
    }

    return false;
  } catch (e) {
    console.error(`[functions.isEmptyDir()] errors in ${sdir}:`);
    return false;
  }
};
/**
 * 创建目录
 */

const {
  name,
  version
} = require$$0;
var constants = {
  NAME: name,
  VERSION: version,
  CWD_DIR: process.cwd(),
  REPO: 'git@github.com:yeqisong/crx3-dev-template.git',
  PARAM_FILES: ['package.json', 'manifest.json', 'messages.json']
};

// 英文文件夹名称
const enDirName = /^[a-zA-Z]([-_a-zA-Z0-9]{2,20})$/; // 长度验证

const vLength = (min, max) => {
  if (!min) {
    return new RegExp('.*');
  }

  if (max) {
    return new RegExp(`^[\\s\\S]{${min || 0},${max}}$`);
  }

  return new RegExp(`^[\\s\\S]{${min || 0},}$`);
};

// 本地语言环境
const uLocale = {
  default: 'en',

  setLocale(l) {
    this.default = ['zh-CN', 'zh_CN'].indexOf(l) > -1 ? 'zh_CN' : 'en';
  }

}; // 语言包

const messages = {
  'en': {
    'set project dir name': 'set project directory name',
    'set project dir name error': 'The directory name starts with a letter and can only contain "letters", "_" and "-"',
    'set manifest title': 'set the title in manifest.json',
    'set manifest title error': 'The title length must be between 5 and 25 characters',
    'set manifest description': 'set the description in manifest.json',
    'set manifest description error': 'The description length must be between 5 and 300 characters',
    'set manifest locale': 'set the default_locale in manifest.json',
    'repo download start': 'Downloading project template...',
    'repo download success': 'Project template downloaded successfully.',
    'repo download fail': 'Project template download failed.',
    'generator fail1': 'Invalid source: ',
    'generator start': 'Setting project information...',
    'generator success': 'Project setup is complete.',
    'generator fail': 'Project setup failed.',
    'install start': 'Installing project dependencies...',
    'install success': 'Installation project dependency is complete.',
    'install fail': 'Failed to install project dependencies.',
    'install not found': 'The package.json file of the project does not exist.',
    'init success': 'Project created successfully.'
  },
  'zh_CN': {
    'set project dir name': '设置项目目录名称',
    'set project dir name error': '项目目录名称只能以字母开头，且只能包含字母、_(短下划线)和-(短横线)',
    'set manifest title': '设置拓展manifest中的Tite',
    'set manifest title error': 'title的长度必须在5-25个字符之间',
    'set manifest description': '设置拓展manifest中的Description',
    'set manifest description error': 'description的长度必须在5-300个字符之间',
    'set manifest locale': '设置拓展manifest中默认语言环境',
    'repo download start': '正在下载项目模板...',
    'repo download success': '项目模板下载成功！',
    'repo download fail': '项目模板下载失败！',
    'generator fail1': '无效的source：',
    'generator start': '正在设置项目信息',
    'generator success': '项目设置完成',
    'generator fail': '项目设置失败',
    'install start': '正在安装项目依赖',
    'install success': '依赖安装完成',
    'install fail': '依赖安装失败',
    'install not found': '项目package.json未找到',
    'init success': '项目创建成功'
  }
};
/**
 * 
 * @param {string} k 语言包key
 * @param {strng} l 强制使用的语言类型
 * @returns 
 */

const __msg__ = (k, l) => messages[(l || uLocale.default) === 'zh_CN' ? 'zh_CN' : 'en']?.[k] || 'this msg dont defined';

const generator = (metadata = {}, src, dest = '.') => {
  if (!src) {
    return Promise.reject(new Error(__msg__('generator fail1') + src));
  }

  const spinner = ora__default['default'](__msg__('generator start')).start();
  return new Promise((resolve, reject) => {
    Metalsmith__default['default'](constants.CWD_DIR).metadata(metadata).clean(false).source(src).destination(dest).use((files, metalsmith, done) => {
      const meta = metalsmith.metadata();
      Object.keys(files).filter(fileName => constants.PARAM_FILES.indexOf(path.basename(fileName)) > -1).forEach(fileName => {
        const t = files[fileName].contents.toString();
        files[fileName].contents = Buffer.from(Handlebars__default['default'].compile(t)(meta));
      });
      done();
    }).build(err => {
      fs.removeSync(src);

      if (!err) {
        spinner.text = __msg__('generator success');
        spinner.succeed();
        resolve();
      } else {
        spinner.text = __msg__('generator fail');
        spinner.fail();
        reject(err);
      }
    });
  });
};

async function installDependencied(projectDir) {
  if (!canDo(path.join(projectDir, 'package.json'))) {
    throw new Error(__msg__('install not found'));
  }

  const spinner = ora__default['default'](__msg__('install start')).start();
  const r = spawn__default['default'].sync('npm', ['install'], {
    stdio: 'inherit',
    cwd: projectDir
  });

  if (!r.status) {
    spinner.text = __msg__('install success');
    spinner.succeed();
    return true;
  } else {
    spinner.text = __msg__('install fail');
    spinner.fail();
    throw new Error();
  }
}

const langOpt = {
  'en': 'en',
  '中文': 'zh_CN'
}; // 项目初始设置

async function programPrompt(emptyRoot = true, langSet = false) {
  return inquirer__default['default'].prompt([{
    type: 'input',
    name: 'projectDirName',
    message: `${__msg__('set project dir name')}: `,
    when: () => !emptyRoot,
    validate: val => {
      if (!val.match(enDirName)) {
        console.log(chalk__default['default'].red(__msg__('set project dir name error')));
        return false;
      }

      return true;
    }
  }, {
    type: 'input',
    name: 'appTitle',
    message: `${__msg__('set manifest title')}: `,
    validate: val => {
      if (!vLength(5, 30).test(val)) {
        console.log(chalk__default['default'].red(__msg__('set manifest title error')));
        return false;
      }

      return true;
    }
  }, {
    type: 'input',
    name: 'appDesc',
    message: `${__msg__('set manifest description')}: `,
    validate: val => {
      if (!vLength(5, 30).test(val)) {
        console.log(chalk__default['default'].red(__msg__('set manifest description error')));
        return false;
      }

      return true;
    }
  }, {
    type: 'list',
    name: 'manifestLocale',
    message: `${__msg__('set manifest locale')}: `,
    when: () => !langSet,
    choices: Object.keys(langOpt)
  }]).then(answers => {
    if (langSet) {
      answers.manifestLocale = uLocale.default;
    } else {
      answers.manifestLocale = langOpt[answers.manifestLocale];
    }

    return answers;
  });
} // 下载模板


const downloadRepo = (target, repo) => new Promise((resolve, reject) => {
  const spinner = ora__default['default'](__msg__('repo download start')).start();
  download__default['default'](`direct:${repo}`, target, {
    clone: true
  }, err => {
    if (!err) {
      spinner.text = __msg__('repo download success');
      spinner.succeed();
      resolve();
    } else {
      spinner.text = __msg__('repo download fail');
      spinner.fail();
      reject(err);
    }
  });
});

var init = (async options => {
  // 语言option
  let langSet = false; // option.locale设置默认语言

  if (options.locale) {
    langSet = true;
    uLocale.setLocale(options.locale);
  } // 项目路径


  let projectDir = constants.CWD_DIR; // 当前目录是否为空

  const emptyDir = isEmptyDir(constants.CWD_DIR); // 设置项目初始信息：manifest的title、descript、默认本地化语言

  const projectInfo = await programPrompt(emptyDir, langSet).catch(); // 如果需新建文件夹

  if (projectInfo.projectDirName) {
    fs$1.mkdirSync(projectInfo.projectDirName, {
      recursive: true
    });
    projectDir = path.join(projectDir, projectInfo.projectDirName);
  } // 远程拉取模板


  await downloadRepo(path.join(projectDir, 'gittmp'), constants.REPO).catch(); // 修改模板变量

  await generator(projectInfo, path.join(projectDir, 'gittmp'), projectDir).catch(err => {
    console.log(chalk__default['default'].red(err));
  }); // 安装依赖

  await installDependencied(projectDir).catch(err => {
    console.log(chalk__default['default'].red(err));
  });
  console.log(chalk__default['default'].green(__msg__('init success')));
});

const program = new commander__default['default'].Command();
program.version(version$1, '-V, --version', 'output the current version').option('-h, --help', 'chrome-extension-devlop-cli help'); // 选项
// const options = program.opts()
// 本地语言设置

const osLc = osLocaleSync();
uLocale.setLocale(osLc); // init子命令

program.command('init').description('the name for chrome-extension; if the directory is not empty, it will create a directory with init name.').option('-l, --locale <type>', 'chrome-extension-project default locale').action(options => {
  init(options);
});
program.parse(process.agrv);
