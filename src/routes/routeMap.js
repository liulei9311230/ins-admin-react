/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-21 11:02:38
 * @LastEditTime: 2020-05-11 14:59:06
 * @LastEditors: Please set LastEditors
 */
const menu = [
  {
    resName: '首页',
    iconType: 'home',
    href: '#/home/index'
  },
  {
    resName: '基础安全',
    iconType: 'file-protect',
    child: [
      {
        resName: '资产列表',
        href: '#/basisSecurity/assetList/index'
      },
      {
        resName: '主机探测',
        child: [
          {
            resName: '任务列表',
            href: '#/basisSecurity/hostProbe/task-list'
          },
          {
            resName: '资产列表',
            href: '#/basisSecurity/hostProbe/asset-list'
          }
        ]
      },
      {
        resName: '域名探测',
        child: [
          {
            resName: '任务列表',
            href: '#/basisSecurity/dnProbe/task-list'
          },
          {
            resName: '子域名列表',
            href: '#/basisSecurity/dnProbe/sub-dn-list'
          }
        ]
      },
      {
        resName: '弱口令扫描',
        child: [
          {
            resName: '任务列表',
            href: '#/basisSecurity/weakPwdScan/task-list'
          },
          {
            resName: '弱口令列表',
            href: '#/basisSecurity/weakPwdScan/weak-pwd-list'
          }
        ]
      },
      {
        resName: '主机漏洞扫描',
        child: [
          {
            resName: '任务列表',
            href: '#/basisSecurity/hostLeakScan/task-list'
          },
          {
            resName: '漏洞列表',
            href: '#/basisSecurity/hostLeakScan/leak-list'
          }
        ]
      },
      {
        resName: '公网资产监控',
        child: [
          {
            resName: '风险列表',
            href: '#/basisSecurity/publicNetAssetMonitor/risk-list'
          }
        ]
      }
    ]
  },
  {
    resName: '应用安全',
    iconType: 'appstore',
    child: [
      {
        resName: '应用漏洞扫描',
        child: [
          {
            resName: '任务列表',
            href: '#/appSecurity/leakScan/task-list'
          },
          {
            resName: '漏洞列表',
            href: '#/appSecurity/leakScan/list'
          }
        ]
      },
      {
        resName: 'GitHub监控',
        child: [
          {
            resName: '任务列表',
            href: '#/appSecurity/githubMonitor/task-list'
          },
          {
            resName: '源码泄露列表',
            href: '#/appSecurity/githubMonitor/source-leaked-list'
          }
        ]
      },
      {
        resName: 'APP审计',
        child: [
          {
            resName: '审计列表',
            href: '#/appSecurity/appAudit/task-list'
          }
        ]
      },
      {
        resName: '越权检测',
        child: [
          {
            resName: '接口列表',
            href: '#/appSecurity/manualDetect/task-list'
          },
          {
            resName: '请求列表',
            href: '#/appSecurity/manualDetect/leak-list'
          }
        ]
      },
      {
        resName: 'SQL注入检测',
        child: [
          {
            resName: '任务列表',
            href: '#/appSecurity/sqlInjectDetect/task-list'
          },
          {
            resName: '漏洞列表',
            href: '#/appSecurity/sqlInjectDetect/leak-list'
          }
        ]
      },
      {
        resName: 'XSS检测',
        child: [
          {
            resName: '任务列表',
            href: '#/appSecurity/xssDetect/task-list'
          },
          {
            resName: '漏洞列表',
            href: '#/appSecurity/xssDetect/leak-list'
          }
        ]
      },
      {
        resName: 'JAR包检测',
        child: [
          {
            resName: '任务列表',
            href: '#/appSecurity/jarPkgDetect/task-list'
          },
          {
            resName: '漏洞列表',
            href: '#/appSecurity/jarPkgDetect/leak-list'
          }
        ]
      },
      {
        resName: 'SONAR检测',
        child: [
          {
            resName: '任务列表',
            href: '#/appSecurity/sonarDetect/task-list'
          },
          {
            resName: '漏洞列表',
            href: '#/appSecurity/sonarDetect/leak-list'
          },
          {
            resName: '规则白名单',
            href: '#/appSecurity/sonarDetect/white-list'
          }
        ]
      },
      {
        resName: 'SONAR检测(外部)',
        child: [
          {
            resName: '规则配置',
            href: '#/appSecurity/sonarDetectOut/rule-config-list'
          },
          {
            resName: '待确认漏洞',
            href: '#/appSecurity/sonarDetectOut/confirm-leak-list'
          },
          {
            resName: '已确认漏洞',
            href: '#/appSecurity/sonarDetectOut/confirmed-leak-list'
          }
        ]
      },
      {
        resName: 'GitLab监控',
        child: [
          {
            resName: '项目列表',
            href: '#/appSecurity/gitlabMonitor/project-list'
          },
          {
            resName: '项目成员列表',
            href: '#/appSecurity/gitlabMonitor/user-list'
          },
          {
            resName: '项目成员白名单',
            href: '#/appSecurity/gitlabMonitor/user-white-list'
          },
          {
            resName: '项目成员历史记录',
            href: '#/appSecurity/gitlabMonitor/user-history-list'
          }
        ]
      },
      {
        resName: '安全漏洞管理',
        child: [
          {
            resName: '问题列表',
            href: '#/appSecurity/leakManage/question-list'
          }
        ]
      },
      {
        resName: '自动化越权检测',
        child: [
          {
            resName: '待核查接口',
            href: '#/appSecurity/automatiCmanualDetect/to-be-check-list'
          },
          {
            resName: '已核查接口',
            href: '#/appSecurity/automatiCmanualDetect/checked-list'
          }
        ]
      },
      {
        resName: '应用安全总览',
        child: [
          {
            resName: '域名列表',
            href: '#/appSecurity/overview/domain-list'
          },
          {
            resName: '应用列表',
            href: '#/appSecurity/overview/app-list'
          },
          {
            resName: '接口列表',
            href: '#/appSecurity/overview/server-list'
          },
          {
            resName: '应用名配置',
            href: '#/appSecurity/overview/name-config-list'
          }
        ]
      },
      {
        resName: '灰盒测试',
        child: [
          {
            resName: '漏洞列表',
            href: '#/appSecurity/grayBoxTest/leakScan-list'
          }
        ]
      }
    ]
  },
  {
    resName: '安全场景',
    iconType: 'safety',
    child: [
      {
        resName: '安全考试培训',
        href: '#/securityScene/exam-train'
      },
      {
        resName: '安全需求分析',
        child: [
          {
            resName: '安全红线管理',
            href: '#/securityScene/requireAnalysis/red-line-manage'
          },
          {
            resName: '安全评审管理',
            child: [
              {
                resName: '评审领取列表',
                href: '#/securityScene/requireAnalysis/reviewManage/get-list'
              },
              {
                resName: '评审状态列表',
                href: '#/securityScene/requireAnalysis/reviewManage/status-list'
              },
              {
                resName: '评审汇总列表',
                href: '#/securityScene/requireAnalysis/reviewManage/all-list'
              }
            ]
          },
          {
            resName: '第三方评审管理',
            child: [
              {
                resName: '评审状态列表',
                href:
                  '#/securityScene/requireAnalysis/thirdReviewManage/status-list'
              },
              {
                resName: '评审结果列表',
                href:
                  '#/securityScene/requireAnalysis/thirdReviewManage/result-list'
              }
            ]
          }
        ]
      },
      {
        resName: '上线红线审核',
        child: [
          {
            resName: '审核列表',
            href: '#/securityScene/onlineRedVerify/verify-list'
          },
          {
            resName: '安全审核状态',
            href: '#/securityScene/onlineRedVerify/verify-status',
            blank: true
          },
          {
            resName: '服务接口越权确认',
            href: '#/securityScene/onlineRedVerify/interface-over-auth-confirm',
            blank: true
          },
          {
            resName: '开关控制',
            href: '#/securityScene/onlineRedVerify/switch-control'
          }
        ]
      },
      {
        resName: '服务上线黑名单',
        href: '#/securityScene/service-launch-black-list'
      },
      {
        resName: 'App静态权限检测',
        child: [
          {
            resName: '检测结果',
            href: '#/securityScene/appPermissionsCheck/check-result-list'
          },
          {
            resName: 'App权限白名单列表',
            href: '#/securityScene/appPermissionsCheck/white-list'
          }
        ]
      }
    ]
  },
  {
    resName: '文件中转站',
    iconType: 'home',
    href: '#/fileTransfer/transferPage/'
  }
];

const getId = () => {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now();
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
    c
  ) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });

  return uuid;
};

const menuDel = data => {
  data.map(v => {
    v.id = getId();
    if (v.child) {
      menuDel(v.child);
    }
  });
};
menuDel(menu);
export default menu;
